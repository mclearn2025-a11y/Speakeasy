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
os.makedirs("photos", exist_ok=True)
credits, missing = {}, []

for b in birds:
    try:
        j = get("https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(b["title"].replace(" ", "_")))
        src = ((j or {}).get("originalimage") or (j or {}).get("thumbnail") or {}).get("source", "")
        if not j or j.get("type") == "disambiguation" or "/wikipedia/commons/" not in src:
            missing.append((b["name"], "no Commons photo on its page")); continue
        m = re.search(r"/commons/(?:thumb/)?[0-9a-f]/[0-9a-f]{2}/([^/]+)", src)
        fname = urllib.parse.unquote(m.group(1))
        q = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({
            "action": "query", "format": "json", "prop": "imageinfo", "iiprop": "url|extmetadata",
            "iiurlwidth": "560", "titles": "File:" + fname})
        info = get(q)
        page = next(iter(info["query"]["pages"].values()))
        ii = page["imageinfo"][0]
        md = ii.get("extmetadata", {})
        lic = plain(md.get("LicenseShortName", {}).get("value", ""), 60)
        if not FREE.search(lic):
            missing.append((b["name"], "license not free: " + lic)); continue
        data = get(ii.get("thumburl") or ii["url"], binary=True)
        if not data:
            missing.append((b["name"], "download failed")); continue
        im = Image.open(io.BytesIO(data)).convert("RGB")
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
        missing.append((b["name"], "error: " + str(e)[:80]))
    time.sleep(0.4)

json.dump(credits, open("photos/credits.json", "w", encoding="utf8"), indent=1, ensure_ascii=False)
with open("photos/CREDITS.md", "w", encoding="utf8") as f:
    f.write("# Bird photo credits\n\nSpeakeasy's bird photos come from Wikimedia Commons under free licenses. "
            "Each photo is resized; nothing else is changed.\n\n| Bird | Photographer | License | Source |\n|---|---|---|---|\n")
    for c in credits.values():
        f.write(f"| {c['name']} | {c['artist'].replace('|', '/')} | {c['license']} | {c['source']} |\n")
    if missing:
        f.write("\n## Birds shown as drawings\n\n" + "".join(f"- {n}: {why}\n" for n, why in missing))
print(f"\n{len(credits)} photos saved, {len(missing)} birds keep their drawing")
for n, why in missing:
    print("  -", n, ":", why)
