"""Speakeasy bird photo builder — McLearn Media LLC.

Runs on GitHub (see .github/workflows/bird-photos.yml). For each bird in tools/birds.json it finds the
main photo on that bird's Wikipedia page, keeps it only if it lives on Wikimedia Commons under a free
license (CC0, CC BY, CC BY-SA or public domain), resizes it, and saves it to photos/ with full credit
in photos/credits.json and photos/CREDITS.md. Birds without a usable photo keep their drawing.
"""
import html, io, json, os, re, time, urllib.error, urllib.parse, urllib.request
from PIL import Image

UA = "SpeakeasyApp/1.1 (https://github.com/mclearn2025-a11y/speakeasy) bird-photo-builder"
FREE = re.compile(r"^\s*(cc0|cc[ -]by|public domain|pd)", re.I)


def get(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for i in range(4):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
                return data if binary else json.loads(data)
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            time.sleep(3 * (i + 1))
        except Exception:
            time.sleep(3 * (i + 1))
    return None


def plain(s, limit=140):
    s = html.unescape(re.sub(r"<[^>]+>", " ", s or ""))
    s = re.sub(r"\s+", " ", s).strip()
    return s[:limit].rstrip() + ("…" if len(s) > limit else "")


birds = json.load(open("tools/birds.json", encoding="utf8"))
if os.path.exists("tools/topics.json"):
    birds += json.load(open("tools/topics.json", encoding="utf8"))   # the other topic packs
os.makedirs("photos", exist_ok=True)
credits, missing = {}, []

old = {}
try:
    old = json.load(open("photos/credits.json", encoding="utf8"))
except Exception:
    pass


def page_image(title):
    """The exact file name of the main photo on the bird's Wikipedia page."""
    j = get("https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode({
        "action": "query", "format": "json", "prop": "pageimages", "piprop": "name",
        "redirects": "1", "titles": title}))
    for pg in ((j or {}).get("query", {}).get("pages", {}) or {}).values():
        if pg.get("pageimage"):
            return pg["pageimage"]
    return None


def commons_info(fname):
    """Photo URL and license from Wikimedia Commons, or None if the file isn't on Commons."""
    for i in range(4):
        info = get("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({
            "action": "query", "format": "json", "prop": "imageinfo", "iiprop": "url|extmetadata",
            "iiurlwidth": "560", "titles": "File:" + fname, "maxlag": "5"}))
        pages = ((info or {}).get("query", {}) or {}).get("pages", {})
        for pg in pages.values():
            if "imageinfo" in pg:
                return pg["imageinfo"][0]
            if "missing" in pg and pg.get("imagerepository", "") == "":
                return None          # not on Commons (often a non-free file kept on Wikipedia)
        time.sleep(4 * (i + 1))      # busy or lagging: wait and try again
    return None


for b in birds:
    if b["id"] in old and os.path.exists(os.path.join("photos", old[b["id"]]["file"])):
        credits[b["id"]] = old[b["id"]]; continue
    try:
        fname = page_image(b["title"])
        if not fname:
            missing.append((b["name"], "no photo on its Wikipedia page")); continue
        ii = commons_info(fname)
        if not ii:
            missing.append((b["name"], "photo is not on Wikimedia Commons: " + fname)); continue
        md = ii.get("extmetadata", {})
        lic = plain(md.get("LicenseShortName", {}).get("value", ""), 60)
        if not FREE.search(lic):
            missing.append((b["name"], "license not free: " + lic)); continue
        data = get(ii.get("thumburl") or ii["url"], binary=True)
        if not data:
            missing.append((b["name"], "download failed")); continue
        im = Image.open(io.BytesIO(data))
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGBA"); bg = Image.new("RGB", im.size, "white"); bg.paste(im, mask=im.split()[-1]); im = bg
        else:
            im = im.convert("RGB")
        im.thumbnail((560, 560))
        out = b["id"] + ".jpg"
        im.save(os.path.join("photos", out), "JPEG", quality=80, optimize=True, progressive=True)
        credits[b["id"]] = {
            "file": out, "name": b["name"],
            "artist": plain(md.get("Artist", {}).get("value", "")) or "Unknown photographer",
            "license": lic, "licenseUrl": md.get("LicenseUrl", {}).get("value", ""),
            "source": ii.get("descriptionurl", ""), "w": im.width, "h": im.height}
        print("ok  ", b["name"], "·", lic)
    except Exception as e:
        missing.append((b["name"], "error: " + repr(e)[:100]))
    time.sleep(1.0)

json.dump(credits, open("photos/credits.json", "w", encoding="utf8"), indent=1, ensure_ascii=False)
with open("photos/CREDITS.md", "w", encoding="utf8") as f:
    f.write("# Photo credits\n\nSpeakeasy's photos come from Wikimedia Commons under free licenses. "
            "Each photo is resized; nothing else is changed.\n\n| Bird | Photographer | License | Source |\n|---|---|---|---|\n")
    for c in credits.values():
        f.write(f"| {c['name']} | {c['artist'].replace('|', '/')} | {c['license']} | {c['source']} |\n")
    if missing:
        f.write("\n## Shown as a drawing or emoji\n\n" + "".join(f"- {n}: {why}\n" for n, why in missing))
print(f"\n{len(credits)} photos saved, {len(missing)} birds keep their drawing")
for n, why in missing:
    print("  -", n, ":", why)
