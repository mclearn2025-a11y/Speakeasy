# Package the new words: data for the page, compact symbol files, Spanish words by id.
import json, re, os
D = "/tmp/claude-0/-home-claude-speakeasy/2db665bb-1e96-54f5-959d-f09b9b3123f7/scratchpad/"
M = json.load(open(D+"more_words.json"))
exec(open(D+"es_more.py", encoding="utf8").read())
vocab = json.load(open(D+"vocab.json"))
count = {}
for vid, *_ in vocab: g = vid.rsplit("-",1)[0]; count[g] = count.get(g,0)+1
slug = lambda f: "m-" + re.sub(r"[^a-z0-9]+","-", f.lower().replace("_,_to","-to")).strip("-")
def mini(s):
    s = re.sub(r"<\?xml.*?\?>","",s,flags=re.S); s = re.sub(r"<!--.*?-->","",s,flags=re.S)
    s = re.sub(r"<metadata.*?</metadata>","",s,flags=re.S)
    s = re.sub(r"-?\d*\.\d+(?:e-?\d+)?", lambda m: (lambda v: (" "+str(v)) if v>=0 else str(v))(round(float(m.group(0)))), s)
    s = re.sub(r"\s(width|height)=\"\s*\d+\"","",s,count=2)
    s = re.sub(r">\s+<","><",s); s = re.sub(r"\s{2,}"," ",s); s = re.sub(r"=\" ", "=\"", s); s = re.sub(r"([A-Za-z]) (\d)", r"\1\2", s)
    return s.strip()
page = {"new": M["new"], "groups": {}}
syms, es_words, files = {}, {}, {}
for g, items in M["groups"].items():
    if not items: continue
    base = count.get(g, 0)
    page["groups"][g] = [[lab, pos] for lab, pos, sym in items]
    es = ESM[g].split("|")
    for i, (lab, pos, sym) in enumerate(items):
        vid = f"{g}-{base+i}"
        sl = slug(sym); syms[vid] = sl; es_words[vid] = es[i]
        if sl not in files: files[sl] = mini(open(D+"mulberry/EN/"+sym+".svg", encoding="utf8").read())
# split the symbols into files of about 3 MB, so each loads fast and stays well under hosting limits
os.makedirs(D+"moresym", exist_ok=True)
for f in os.listdir(D+"moresym"): os.remove(D+"moresym/"+f)
parts, cur, size = [], {}, 0
for k, v in files.items():
    if size + len(v) > 3_000_000 and cur: parts.append(cur); cur, size = {}, 0
    cur[k] = v; size += len(v)
if cur: parts.append(cur)
for i, p in enumerate(parts, 1): json.dump(p, open(D+f"moresym/more-{i}.json","w"), separators=(",",":"))
page["syms"] = syms; page["files"] = len(parts)
json.dump(page, open(D+"more_page.json","w"), ensure_ascii=False, separators=(",",":"))
json.dump({"words":es_words, "cats":NAMES}, open(D+"more_es.json","w"), ensure_ascii=False)
print("words", len(syms), "symbol files", len(parts), [round(os.path.getsize(D+f"moresym/more-{i}.json")/1e6,2) for i in range(1,len(parts)+1)])
