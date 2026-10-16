# Build the big vocabulary from the free Mulberry symbol library (CC BY-SA 4.0).
# Every new word has its own picture symbol. Output: more_words.json (groups and items, in order).
import csv, json, re, os
D = "/tmp/claude-0/-home-claude-speakeasy/2db665bb-1e96-54f5-959d-f09b9b3123f7/scratchpad/"
rows = list(csv.DictReader(open(D+"mulberry/scripts/data/symbol-info-en.csv", encoding="utf-8-sig")))
vocab = json.load(open(D+"vocab.json"))
used_slugs = set(json.load(open(D+"symmap.json")).values())
slug = lambda f: re.sub(r"[^a-z0-9]+","-", f.lower().replace("_,_to","-to")).strip("-")
have = {v[1].lower() for v in vocab}

# where each library category goes. Existing groups get words added at the end; new groups are created.
NEW = {  # key: (name, symbol)
 "fruitveg":("Fruits and vegetables","🥦"), "meals":("Meals and snacks","🍝"), "treats":("Sweets and drinks","🧁"),
 "kitchen":("Kitchen","🍳"), "home":("Home","🛋️"), "selfcare":("Getting ready","🪥"), "jobs":("Jobs","👷"),
 "moves":("More actions","🤸"), "shapes":("Shapes","🔷"), "where":("Where","🧭"), "sports":("Sports","⚽"),
 "tech":("Phones and computers","💻"), "tools":("Tools","🔧"), "travel":("Going places","🚗"), "nature":("Nature","🌳"),
 "science":("Science","🔬"), "celebrate":("Holidays and parties","🎉"), "art":("Art and music","🎨"), "countries":("Countries","🌎"),
}
CAT = {
 "Food Fruit":"fruitveg","Food Vegetables and salads":"fruitveg","Food Vegetables and salad":"fruitveg","Food Nuts":"fruitveg",
 "Food Meals and snacks":"meals","Food Breads and baking":"meals","Food Pastas and rice":"meals","Food Meat":"meals","Food Poultry":"meals",
 "Food Fish and seafood":"meals","Food Eggs":"meals","Food Dairy":"meals","Food Ingredients":"meals","Food Diet":"meals","Food Festival":"meals",
 "Food Sweets and desserts":"treats","Drink Type":"treats","Drink Containers and measures":"treats","Drink Description":"treats","Drink Actions":"treats",
 "Food Kitchen items":"kitchen","Food Kitchen actions":"kitchen","Food Feeding and eating":"kitchen",
 "Building Contents":"home","Building Furniture":"home","Building Household tasks":"home","Building Structure":"home","Building Residential":"home",
 "Building Equipment and devices":"home","Building Garden and farm":"home","Tools Garden":"home",
 "Healthcare Grooming items":"selfcare","Healthcare Grooming activities":"selfcare",
 "Healthcare Body parts":"body","Healthcare Medical items":"health","Healthcare Medical conditions":"health",
 "Clothes General":"clothes","Clothes Accessories":"clothes","Clothes Jewellery":"clothes",
 "People Profession":"jobs","People Relationship":"people","People Descriptive":"describe","People Feelings":"feelings",
 "Verb":"moves","People Actions":"moves","Tools Actions":"moves","Animal Activity Feeding":"moves","Animal Activity Grooming":"moves","Animal Activity Misc":"moves",
 "Descriptive State":"describe","Descriptive Quantity":"numbers","Number":"numbers","Number Activity":"numbers","Money":"numbers",
 "Descriptive Shape":"shapes","Descriptive Position":"where","Descriptive Direction":"where",
 "Descriptive Time":"time","Work and School Timetable":"time","Environment Weather":"time",
 "Animal Mammal":"animals","Animal Birds":"animals","Animal Spiders and Insects":"animals","Animal Reptiles and Amphibians":"animals",
 "Animal Fish and Marine mammals":"animals","Animal Crustacean and Molluscs":"animals","Animal Other Invertebrates":"animals",
 "Animal Features":"animals","Animal Habitat":"nature",
 "Leisure Toys":"play","Leisure Games":"play","Leisure Playground":"play","Leisure General":"play",
 "Sport":"sports","Sport Accessories":"sports","Clothes Sport":"sports",
 "Work and School Stationery":"school","Work and School Subjects":"school","Work and School Education":"school","Building School":"school",
 "Electrical General":"tech","Electrical Computer":"tech","Electrical Media":"tech","Electrical Phone":"tech","Electrical TV":"tech",
 "Computer Icon":"tech","Communication Aid":"tech",
 "Tools Workshop":"tools",
 "Building Public":"places","Building Shop":"places","Building Office and factory":"places",
 "Transport Road":"travel","Transport Air":"travel","Transport Water":"travel","Transport Rail":"travel","Transport Space":"travel","Holiday and travel":"travel",
 "Plants and Trees":"nature","Science Eco":"nature","Science Astronomy":"nature","Science":"science",
 "Celebration Item":"celebrate","Celebration Event":"celebrate","Religion Festival":"celebrate","Religion General":"celebrate","Religion Person":"celebrate",
 "Art Colour":"colors","Art Making":"art","Music Instrument":"art",
 "Country Flags":"countries","Question":"questions","Communication Conversation":"social","Communication Signs":"social",
}
# British words to American ones, spelling fixes, and clearer names
US = {"mum":"mom","mummy":"mommy","nappy":"diaper","trousers":"pants","crisps":"chips","chips":"fries","biscuit":"cookie","biscuits":"cookies",
 "jumper":"sweater","trainers":"sneakers","lorry":"truck","pram":"stroller","rubbish":"trash","rubbish bin":"trash can","bin":"trash can","tap":"faucet",
 "torch":"flashlight","aubergine":"eggplant","courgette":"zucchini","colour":"color","favourite":"favorite","sweets":"candy","sweet":"candy",
 "jam":"jelly","jelly":"gelatin","cooker":"stove","hob":"stovetop","grill":"broiler","flat":"apartment","lift":"elevator","pavement":"sidewalk",
 "petrol":"gas","petrol station":"gas station","car park":"parking lot","motorway":"highway","football":"soccer","american football":"football",
 "queue":"line","post":"mail","postman":"mail carrier","post box":"mailbox","postbox":"mailbox","dustbin":"trash can","dummy":"pacifier",
 "maths":"math","rubber":"eraser","sellotape":"tape","pyjamas":"pajamas","vest":"undershirt","waistcoat":"vest","pants":"underwear","knickers":"underwear",
 "plaster":"bandage","holiday":"vacation","garden":"yard","takeaway":"takeout","mobile phone":"cell phone","mobile":"cell phone","cinema":"movie theater",
 "film":"movie","sledge":"sled","nought":"zero","grey":"gray","jacket potato":"baked potato","mash potato":"mashed potatoes","candy floss":"cotton candy",
 "ice lolly":"popsicle","lolly":"lollipop","porridge":"oatmeal","fizzy drink":"soda","squash":"juice","fairy cake":"cupcake","sultanas":"raisins",
 "spring onion":"green onion","coriander":"cilantro","rocket":"rocket","hoover":"vacuum","flannel":"washcloth","wardrobe":"closet","cupboard":"cabinet",
 "dressing gown":"robe","tights":"tights","braces":"suspenders","bum bag":"fanny pack","handbag":"purse","purse":"wallet","trolley":"cart",
 "shopping trolley":"shopping cart","tin":"can","tin can":"can","jug":"pitcher","kitchen roll":"paper towel","clingfilm":"plastic wrap","cling film":"plastic wrap",
 "washing up":"wash dishes","washing up liquid":"dish soap","skip":"dumpster","aeroplane":"airplane","plane":"airplane","bonnet":"hood","boot":"trunk",
 "windscreen":"windshield","number plate":"license plate","nappies":"diapers","toilet roll":"toilet paper","cot":"crib","sofa":"couch","settee":"couch",
 "mince":"ground beef","prawn":"shrimp","prawns":"shrimp","beetroot":"beet","maize":"corn","sweetcorn":"corn","lasagne":"lasagna","yoghurt":"yogurt",
 "breafkfast continental":"continental breakfast","doughnut":"donut","chemist":"pharmacy","doctors":"doctor's office","surgery":"doctor's office",
 "fringe":"bangs","plait":"braid","plaits":"braids","hair bunches":"pigtails","hair plaits":"braids","jelly beans":"jelly beans","cutlery":"silverware",
 "dessert spoon":"spoon","tea towel":"dish towel","bap":"bun","bread roll":"roll","gammon":"ham","sausage roll":"sausage roll","stand":"stand"}
DROP_WORDS = r"yorkshire|pot noodle|pastie|beans on toast|gammon|black pudding|haggis|pate|faggots|cream tea|mince pie|marmite|crumpet|scone|trifle|bangers|chip shop|pound|penny|pence|sterling|euro|^flag blank$|asean|caricom|african union|commonwealth|european union|united nations|olympic|nato|arab league|aboriginal|^cross$|swastika|gun|rifle|pistol|bomb|grenade|kill|die$|^drown|knife fight|cigarette|smok|alcohol|beer|wine|vodka|whisky|gin|cocktail|pub$|bar$|casino|gamble|lottery|condom|tampon|sanitary|period|bra$|underarm hair|stubble|tattoo|ugly|fat$|nhs|gp$|council|vicar|bishop|monk|nun|priest|rabbi|imam|guru"
def clean(sym):
    s = sym.replace("_,_to","").replace(",_to","")
    s = s.replace("_-_", " ").replace("_", " ").replace(" ,", ",")
    s = re.sub(r"\s+\d+$", "", s); s = re.sub(r"\s+\d+(?=\s)", "", s)
    s = re.sub(r"^flag\s+", "", s)
    s = re.sub(r"\s+(lady|man|woman|boy|girl)$", "", s) if not re.match(r"^(old|young|police|fire|post|sales|business|bin|milk)", s) else s
    s = s.strip(" ,")
    k = s.lower()
    if k in US: s = US[k]
    else:
        s = " ".join(US.get(w.lower(), w) if len(s.split())>1 and w.lower() in ("colour","favourite","grey","mum","nappy","trousers","rubbish","lorry") else w for w in s.split())
    return s
exec(open(D+"curate.py").read())
NEW["pets"] = ("Pet care","🐾")
out = {k:[] for k in list(NEW)+["body","health","clothes","people","describe","feelings","numbers","time","animals","play","school","places","colors","questions","social"]}
seen = set(have)
skipped = []
for r in rows:
    if r["rated"]!="0" or r["category"] in ("Alphabet","Country Maps","Military","Politics"): continue
    g = CAT.get(r["category"])
    if not g: skipped.append(r["category"]); continue
    if slug(r["symbol"]) in used_slugs: continue
    label = clean(r["symbol"])
    if g=="jobs":
        label = re.sub(r"\s+\d+[a-d]$", "", label)
        if label in JOBS: label = JOBS[label]
    label = re.sub(r"\s+\d+[a-d]$", "", label) if label else label
    if label in RENAME: label = RENAME[label]
    if label and label.startswith("football kit"): continue
    if not label: continue
    if label in PETS: g = "pets"
    g = TO_GROUP.get(label, g)
    if not label or re.search(DROP_WORDS, label.lower()): continue
    if g=="countries" and re.search(r"\b(UAE|Islands?|Antillies|Finland|-)\b", label) and label not in ("Cayman Islands","Cook Islands"): continue
    key = label.lower()
    if key in seen: continue
    seen.add(key)
    pos = "verb" if r["grammar"] in ("Verb","VerbComplex") or "_,_to" in r["symbol"] else ("desc" if g in ("describe","shapes","colors","numbers") else ("prep" if g=="where" else ("q" if g=="questions" else ("social" if g=="social" else "noun"))))
    if g=="moves" and pos!="verb": pos = "verb"
    if g=="pets": pos = "verb" if label.split()[0] in ("brush","feed","pet","walk") else "noun"
    out[g].append([label, pos, r["symbol"]])
json.dump({"new":NEW, "groups":out}, open(D+"more_words.json","w"), ensure_ascii=False, indent=0)
print("new words:", sum(len(v) for v in out.values()))
for k,v in out.items(): print(k, len(v))
print("unmapped categories:", sorted(set(skipped)))
