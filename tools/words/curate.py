X = None
RENAME = {
# fruit and vegetables
"banana bunch":"bananas","beansprouts":"bean sprouts","blackcurrants":X,"broad beans":"fava beans","brussel sprouts":"brussels sprouts","chilli pepper":"chili pepper",
"chinese cabbage":X,"currants":X,"mange tout":"snow peas","marrow":X,"raisin currants":X,"salad packet":X,"salad plate":X,"satsuma":"tangerine","swede":X,
"plum tomato":X,"tomato slice":X,"spring onions":"green onions","macadamias":"macadamia nuts","pepper":"bell pepper","pea":X,"celeriac":X,"gooseberry":X,
"tinned apricots":X,"tinned cherries":X,"tinned peaches":X,"tinned pears":X,"tinned peas":X,"tinned pineapple":X,"tinned plums":X,"tinned sweetcorn":X,"tinned tomato":X,
"candy cane":X,"chips packet":X,"lentils":"lentils","berry":"berries",
# meals
"biscuit chocolate chip":"chocolate chip cookie","bread roll filled":X,"bread roll granary":X,"bread slice":"slice of bread","bread sliced":X,"breafkfast fried":X,
"bun hot cross":X,"bun currant":X,"cake cup cake":"cupcake","cake slice":"slice of cake","cake sponge":X,"carbohydrates":X,"castor sugar":X,"cereal box bran":X,
"cereal box museli":X,"cereal bran":X,"cereal museli":X,"chapatti":"chapati","cheese brie":X,"cheese burger":"cheeseburger","cheese grated":"grated cheese",
"cheese on toast, melted":"grilled cheese","cheese stilton":X,"chicken deep fried":"fried chicken","chicken pieces":X,"chocolate log":X,"Christmas pudding":X,
"creme fraiche":X,"crisp bread":X,"crisps cheese puffs":"cheese puffs","danish pastry":"danish","dessert menu":X,"dinner cold":X,"egg boiled":"boiled egg",
"egg fried":"fried egg","egg on toast":X,"eggs scrambled":"scrambled eggs","fats":X,"fats high":X,"fats low":X,"fish battered":X,"fish burger":"fish sandwich",
"fish deep fried":X,"flour plain":"flour","flour self raising":X,"food cold":X,"french stick":"baguette","fromage frais":X,"frozen chips":"frozen fries",
"frozen fish fingers":"fish sticks","frozen food box":X,"goose roast":X,"ham packet":X,"hamburger carton":X,"macaroni cheese":"mac and cheese","milk litre":X,
"minced meat":X,"pie meat":"meat pie","poppadoms":X,"poultry":X,"protein":X,"quiche flan":"quiche","ready meal":"frozen dinner","ready meal lamb":X,"rice packet":X,
"salami sausage":"salami","sandwich cheese":"cheese sandwich","sandwich chicken":"chicken sandwich","sandwich ham":"ham sandwich","sandwich sausage":X,
"sandwich toasted":"toasted sandwich","sauce apple":"applesauce","sauce brown":X,"sauce cranberry":"cranberry sauce","sausage and mash":X,"sausage cumberland":X,
"sausage roll":X,"sausage roll small":X,"simnel cake":X,"soup carrot":"carrot soup","soup chicken":"chicken soup","soup mushroom":X,"soup onion":X,"soup pea":X,
"soup tomato":"tomato soup","soup vegetable":"vegetable soup","stock":X,"stock cubes":X,"sugar brown":"brown sugar","sugar white":"sugar","takeaway burger":X,
"takeaway burger and chips":"burger and fries","takeaway chinese":"Chinese takeout","takeaway container":"takeout box","takeaway indian":X,"takeaway pizza":X,
"tinned mushroom soup":X,"toss pancake":"flip pancake","banquet buffet":"buffet","continental breakfast":X,"Christmas cake":X,"packed lunch":"bag lunch",
"dairy products":"dairy","cake mix":"cake mix","corned beef":X,"food":X,"ingredients":"ingredients","pureed food":"pureed food","margarine":X,
# sweets and drinks
"lager":X,"champagne":X,"pop champagne cork":X,"pint":X,"pint half":X,"blackcurrant juice":X,"lemon squash":X,"orange squash":X,"orange fizzy drink":"orange soda",
"cornet":"ice cream cone","pick and mix":X,"jam tart":X,"swiss roll":X,"strawberry jam":"strawberry jelly","coffee instant":X,"tea instant":X,"drink large":X,
"drink medium":X,"drink small":X,"drink cold":"cold drink","drink hot":"hot drink","pour cake mixture":X,"pour custard":X,"meringues":X,"pie apple":"apple pie",
"pie cherry":"cherry pie","chocolate box":"box of chocolates","chocolate egg":X,"bubble gum blow":"blow a bubble","tart":X,"carton":X,"ice cream tub":X,
"milkshake banana":"banana milkshake","milkshake chocolate":"chocolate milkshake","milkshake strawberry":"strawberry milkshake","drinks":X,
# kitchen
"coated spoon":X,"conical flask":X,"cup non spill":"sippy cup","doidy cup":X,"drink consistency firm spoon":X,"drink consistency honey cup":X,"drink consistency juice straw":X,
"dysphagia cup":X,"nosey cup":X,"fork adapted":X,"knife adapted":X,"spoon adapted":X,"plate guard":X,"plate lipped":X,"dish partitioned":"divided plate",
"refridgerate":"refrigerate","serviette":"napkin","tea spoon":"teaspoon","table cloth":X,"pepper mill":"pepper grinder","grill pan":X,"measuring jug":X,
"tin foil":"aluminum foil","dinner people":X,"dinner hot":X,"delicious drink":X,"delicious food":"delicious","open tin":"open can","can opener electric":X,
"food hot":X,"sauce tomato":"ketchup","turn down heat":X,"turn up heat":X,"cake case":X,"cake tin":"cake pan","blender drinks":X,"food blender":"blender",
"deep fat fryer":"deep fryer","garlic crusher":"garlic press","broiler":X,"hand mixer":X,"cover food":X,"crush garlic":X,"break egg":"crack an egg","dish":X,
"place setting":X,"roll pastry":"roll dough","stir fry":"stir-fry","stir mix":"stir","chewy tube":"chew tool",
# home
"back garden":"backyard","bed four poster":X,"bin bag":"trash bag","bin bags":X,"blanket chest":X,"book end":X,"book ends":X,"book shelf":"bookshelf","chair computer":"desk chair",
"chair dining":X,"chair wing back":X,"chaise lounge":X,"cleaner spray":"cleaning spray","cleaning box":X,"corner cabinet":X,"dishwasher powder":"dishwasher soap",
"dressing table":X,"garden clippers":X,"headboard":X,"hedge cutters":X,"hoe":X,"nest of tables":X,"photocopier":"copy machine","put in bin":"throw in the trash",
"recycling bins":"recycling bin","roller blind":X,"roman blind":X,"vertical blinds":X,"rotary washing line":X,"spot light":X,"standard lamp":"floor lamp",
"vacuum cleaner hand held":X,"vacuum cleaner":X,"wash up":X,"washing powder":"laundry soap","washing up bowl":X,"waste paper bin":"wastebasket","wheelie bin":"trash can",
"wool":"yarn","arm chair":"armchair","barbeque":"grill","clothes peg":"clothespin","bell":X,"put out trash":"take out the trash","high chair":"high chair",
"draining board":"dish rack","double bed":X,"bunk beds":"bunk beds","chandelier":X,"filing cabinet":X,"locker":"locker","stool":"stool","field":X,"scarecrow":X,
# getting ready
"clip nails":"cut nails","cotton bud":"cotton swab","cream ointment":"cream","deodorant spray":X,"emery board":X,"eyelash curler":X,"file nails":X,"hair curler":X,
"hair curlers electric":X,"hair curling tongs":"curling iron","hot brush":X,"nail care":X,"paper towels":X,"perm":X,"polish nails":"paint nails","powder puff":X,
"pumice stone":X,"put on cap":X,"take off cap":X,"razor electric":"electric razor","roll on deodorant":X,"shave underarm":X,"shave with razor":X,
"toilet, go to the":"go to the bathroom","toothbrush electric":"electric toothbrush","toupee":X,"aftershave":X,"blusher":"blush","liquid soap":X,"baby oil":X,
"hair dye":X,"eyebrow pencil":X,"shampoo hair":"wash hair","put on coat":"put on coat","bathe":"take a bath","make up":"makeup",
# shapes and where
"apartment":"flat","line diagonal":"diagonal line","line horizontal":"horizontal line","line parallel":"parallel lines","line vertical":"vertical line",
"prism hexagonal":"prism","prism triangular":X,"pyramid square base":"pyramid","pyramid triangular base":X,"triangle acute":X,"triangle equilateral":X,
"triangle isosceles":X,"triangle obtuse":X,"triangle right-angled":"right triangle","triangle scalene":X,"trapezium":"trapezoid","quadrilateral":X,
"one third":"one third","beside next to":"next to","closed":X,"go through door":X,"inside room":"inside","forwards":X,"north east":"northeast",
"north west":"northwest","south east":"southeast","south west":"southwest","highest":"highest","lowest":"lowest","heart shape":"heart shape",
# sports
"baseball base":X,"first base":X,"backstop":X,"boccia chute":X,"bowler":X,"cricket ball":X,"cricket bowler":X,"dribble football":"dribble","aerobics dance":"aerobics",
"race athletics":"race","riding hat":"riding helmet","rosette":X,"rugby ball":"rugby","swimming costume":"swimsuit","swimming trunks":"swim trunks","tracksuit":"sweatsuit",
"bowling gutter":X,"bowling spare":X,"basketball ball":X,"basketball game":X,"baseball game":X,"score goal":"score","bowling strike":"strike","archery target":X,
"climbing rock":"rock climbing","cycle":"bike ride","cycle helmet":"bike helmet","kick ball":"kick the ball","stirrups":X,"skis":X,"judo belt":X,"cricket":X,
"swimming cap":"swim cap","baseball player":"baseball player","exercise":"exercise",
# phones and computers
"camera compact":X,"camera SLR":X,"CD player personal":X,"change tv channel":"change the channel","childrens tv":"kids' TV","comedy tv":X,"tv drama":X,
"communication aid":"talking device","communication aid chat":X,"communication aid gotalk 9p":X,"communication aid listen to me":X,"communication aid scan4":X,
"communication aid techspeak":X,"communication book portable":X,"communication device":X,"headmouse":"head mouse","headpointer":"head pointer","switch mount":X,
"switch low profile":"switch","wheelchair and switch mount":X,"wheelchair communication aid":X,"computer art":X,"computer programme":"computer program",
"DVD player portable":X,"email attachment":"attachment","email send":"send an email","energy monitor":X,"extension lead":"extension cord","mains socket":"outlet",
"mobile phone camera":X,"mobile phone case":"phone case","mobile phone cover":X,"mobile phone no":X,"mobile phone number":"phone number",
"mobile phone ring tone":"ringtone","mobile phone silent":"silent mode","mobile phone video":X,"phone picture video":X,"police radio":X,"telephone handset":X,
"text mobile message":X,"text phone":X,"turn off light switch":"turn off the light","turn on light switch":"turn on the light","usb stick":"USB drive",
"video player":X,"warning light":X,"wire break":X,"sit at computer":X,"install software":X,"print preview":X,"inbox":X,"outbox":X,"computer folder open":X,
"arrow keys":X,"at key":X,"step by step":X,"cable tv":X,"aerial indoor":X,"clock radio":X,"connection":X,"charger electric":"charger","memory card":X,"mouse mat":"mouse pad",
"networked computers":X,"my computer icon":X,"big mac switch":X,"little mac switch":X,"intellikeys":X,"personal passport":X,"sensory tube":X,"cassette tape":X,
"walkman":X,"video tape":X,"tape recorder":X,"fax machine":X,"iPod":X,"iPhone":"smartphone","Wii":X,"Wii Fit":X,"playstation":"game console","channel bbc":X,
"elearning":X,"emagazine":X,"multi media":X,"bulb holder":X,"battery 1a":X,"battery 2a":X,"switch on television":"turn on the TV","computer game":X,"use computer":"use the computer",
"computer cable":X,"computer speaker":"speaker","computer monitor":"monitor","computer keyboard":"keyboard","computer mouse":"mouse","scanning":"scanning","copy":"copy","paste":"paste",
"save":"save","print":"print","download":"download","homepage":"home page","new document":X,"recycle bin":X,"web address":"website","left click":"left click","right click":"right click",
"DVD player":"DVD player","stereo":"speaker system","technology":X,"circuit":X,"switch access":"switch access","lantern":"lantern",
# tools
"delivery trolley":"hand truck","drill electric":"drill","mask dustmask":"dust mask","square setsquare":X,"vice":"vise","wood lathe":X,"woodstain":X,"varnish":X,
"drill bit":X,"clamp":X,"file":X,"apron":"apron",
# going places
"big wheel":"Ferris wheel","bus double decker":"double-decker bus","bus single decker":X,"car boot":"trunk","car bumper":"bumper","car transporter":X,"caravan":"camper",
"coach":"tour bus","cruiser":X,"dumper truck":"dump truck","flat tyre":"flat tire","fork lift truck":"forklift","garden chair folding":"folding chair","handle bars":"handlebars",
"hangar":X,"headlamp":"headlight","holdall":"duffel bag","jet plane":X,"mini bus":"minibus","motor home":"RV","paddles":"paddle","petrol tanker":"tanker truck",
"photographs":"photos","plane landing":"landing","plane take off":"takeoff","post van":"mail truck","refuse truck":"garbage truck","rowing boat":"rowboat","signpost":"sign",
"sun lounger":"lounge chair","theme park":"amusement park","underground sign":X,"underground train":"subway","zebra crossing":"crosswalk","travel":"travel",
# nature
"base rock":X,"bees nest":X,"Earths atmosphere":"atmosphere","non-permeable":X,"permeable":X,"oak leaf":X,"passion flower":X,"recycle logo":"recycle","subsoil":X,
"topsoil":X,"chicken house":"chicken coop","chicken run":X,"cow shed":"barn","spiders web":"spider web","shells":"seashells","fir tree":"evergreen tree","log":"log",
"Earth":"Earth","palm":X,"mistletoe":X,"ivy":"ivy","holly":X,"seedling":"seedling","stick":"stick","stone":"rock","ground":"ground","bud":"bud","clover":"clover",
# science
"bendy":"bendy","dropper pipette":"dropper","Earth crust":X,"Earth inner core":X,"Earth mantle":X,"Earth outer core":X,"filter paper":X,"glass, drinking":X,
"ozone layer":X,"tripod":X,"playdough":"play dough","lens":X,"opaque":X,"atom":"atom","friction":X,"fabric":"fabric",
# celebrate
"Bonfire Night":X,"Guy Fawkes":X,"guy":X,"Boxing Day":X,"Shrove Tuesday":X,"catherine wheel":X,"Father Christmas":"Santa Claus","Father Christmas sack":"Santa's sack",
"Christmas sock":"Christmas stocking","cracker":X,"Puritans":X,"Judas":X,"crown of thorns":X,"Crucifixion":X,"risen":X,"cross palm":X,"frankincense":X,
"Harvest Festival":X,"harvest":"harvest","hat Christmas":"Santa hat","tree ornament chocolate":X,"three wise kings":"three wise men","pumpkin lantern":"jack-o'-lantern",
"party celebration":"party","party popper":X,"carol singer":"caroling","decorate tree":"decorate the tree","Christmas bell":X,"Christmas bauble":"ornament",
"Easter egg hunt":"Easter egg hunt","celebrate birthday":X,"witches hat":X,"wrap":"wrap a present","Rudolph":"reindeer","yule log":X,"Christmas Eve":"Christmas Eve",
"Ash Wednesday":X,"sack":X,"broomstick":X,"elf":"elf","Christian":X,"bless":"bless",
# art and music
"artist palette":"paint palette","cymbals hand":"cymbals","keyboard electric":"electric keyboard","pen and paper":X,"coloured paper":"colored paper","craft table":X,
"computer art":X,
# countries
"blank":X,"Alderney":X,"Sark":X,"Guernsey":X,"Jersey":X,"Seborga":X,"Sami":X,"Red Cross":X,"Rass al Khaimah Sharjah":X,"S Georgia Sandwich Isles":X,
"Tristan de Cunha":X,"Northern Cyprus":X,"Somaliland":X,"Tokelau":X,"Niue":X,"Alaska":X,"Hawaii":X,"Antartica":"Antarctica","Viet Nam":"Vietnam",
"Russian Federation":"Russia","United States of America":"United States","Hong Kong China":"Hong Kong","Swaziland":"Eswatini","Macedonia":"North Macedonia",
"Turks Caicos Isles":"Turks and Caicos","The Azores":X,"The Bahamas":"Bahamas","The Czech Republic":"Czech Republic","The Gambia":"Gambia","The Netherlands":"Netherlands",
"The Sudan":"Sudan","St. Kitts and Nevis":"Saint Kitts and Nevis","St Helena":X,"St Vincent Grenadines":"Saint Vincent","Antigua Barbuda":"Antigua and Barbuda",
"Bosnia Herzegovina":"Bosnia and Herzegovina","Congo Brazzaville":"Congo","Congo Kinshasa":"DR Congo","Guinea Bissau":"Guinea-Bissau","Sao Tome Principe":"São Tomé and Príncipe",
"Timor Leste":"East Timor","Northern Marianas":X,"Isle of Man":X,"Gibraltar":X,"Anguilla":X,"Bermuda":X,"Cayman Islands":X,"Cook Islands":X,"American Samoa":X,
"Guam":X,"New Caledonia":X,"Aruba":X,"Tibet":X,"Western Sahara":X,"Kosovo":"Kosovo","Palestine":"Palestine","Taiwan":"Taiwan",
# body
"airways":X,"bladder kidneys":X,"body outline":X,"features facial":X,"eyebrow bushy":X,"eyes blue":X,"eyes brown":X,"eyes green":X,"lip bottom":X,"lip top":X,
"temple":X,"trachea":X,"underarm":"armpit","front":X,"mole":X,"upper arm":X,"sole":X,"pupil":X,"gum":"gums","intestine":"intestines","toe nail":"toenail",
"fingernail":X,"arms":X,"legs":X,"thumbs":X,"left hand":"left hand","right hand":"right hand","senses":X,"shin":X,"heel":"heel","bladder":"bladder","lips":"lips",
# health
"auroscope":X,"hoist":"patient lift","pool hoist":X,"walking frame":"walker","tablet blister pack":X,"tablets":"pills","sneeze cold":"sneeze","sting bee":"bee sting",
"acne spots":"pimples","back ache":"backache","lump":X,"xray":"X-ray","healthy":"healthy","operation":"surgery","first aid box":"first aid kit","seizure":"seizure",
"blood pressure":"blood pressure","syringe":"shot","vomit":"throw up","burn":"burn","rash":"rash",
# clothes
"bobble hat":"winter hat","bootees":X,"clothes female":X,"clothes male":X,"clothes generic":"clothes","hat ladies":X,"hat mans":X,"jacket mans":X,"jewellery":"jewelry",
"hankerchief":"handkerchief","pop socks":X,"wellington boots":"rain boots","shoe ladies":"high heels","shoe mans":"dress shoes","suit ladys":X,"suit mans":"suit",
"sleep suit baby":"onesie","tartan":X,"petticoat":X,"patch on clothes":X,"handcuffs":X,"police helmet":X,"fire helmet":X,"hooded top":"hoodie","hand bag":"purse",
"heel of shoe":X,"helmet pilot":X,"crown":"crown","briefcase":"briefcase","leg warmers":X,"brooch":X,"bow":"bow","collar":X,"long johns":X,"school bag":X,"beach bag":X,
"wallet":"wallet","undershirt":"undershirt","vest":"vest","robe":"robe","boxer shorts":"boxers","nightgown":"nightgown","bikini":"bikini",
# people
"step dad parent":"stepdad","step mom parent":"stepmom","step brother":"stepbrother","step sister":"stepsister","step son":"stepson","step daughter":"stepdaughter",
# describe
"bright room":X,"clean dishes":X,"clean room":X,"clothes neat":"neat","messy clothes":X,"messy room":"messy","fire":X,"flame":X,"mend":X,"hair ponytail":"ponytail",
"hot person":X,"correct thought":X,"wrong thought":X,"non speaking":"nonspeaking","weak link":X,"warm fire":X,"old object":X,"old person":"older person","spotty":"spotted",
"good person":X,"eyes closed":"eyes closed","inside out":"inside out","handsome":"handsome","absent":"absent","dead":"dead",
# feelings
"concentrating":"focused","desiring":X,"face neutral":"neutral","female side":X,"lady face":X,"man face":X,"serene":"peaceful","sneering":X,
# numbers
"algebra class":X,"algebra formula":X,"bank card":"debit card","cash point":"ATM","counters":X,"eight dots":X,"five dots":X,"four dots":X,"nine dots":X,"one dot":X,
"seven dots":X,"six dots":X,"three dots":X,"two dots":X,"graph column":"bar graph","cheque book":X,"chip and pin device":X,"hat too big":X,"clothes small":X,
"clothes medium":X,"clothes large":X,"clothes extra large":X,"extra large":X,"lots more":"lots more","is this enough":"is this enough?","seventy five percent":X,
"twenty five percent":X,"fifty percent":X,"two thirds":X,"eighth":X,"sum":X,
# time
"IT class":"computer class","PE class":"gym class","english class":"English class","maths class":"math class","tea time":X,"bed time":"bedtime","no class":X,
"autumn":"fall","calendar month":X,"breakfast time":"breakfast time","dinner time":"dinner time","assembly":"assembly","drama class":"drama class",
# animals
"bee bumble":"bumblebee","bee honey":"honeybee","chicken live":"hen","fish koi carp":"koi","fish tropical":"tropical fish","rattle snake":"rattlesnake",
"scales fish":X,"wag tail":X,"squeak":X,"webbed foot":X,"cockerel":X,"budgie":"parakeet","ant eater":"anteater","crane fly":X,"earwig":X,"gnat":X,"shrew":X,
"stoat":X,"ram":X,"stag":X,"fangs":"fangs","hoof":"hoof","horns":"horns","claw":"claw","fin":"fin","flipper":"flipper","prickles":X,"whiskers":"whiskers","quail":X,
# pet care (moved from actions)
"bath animal":X,"brush animal":"brush the pet","cat biscuits":"cat treats","collar pet":"pet collar","comb animal":X,"dog biscuits":"dog treats","dog chew":"chew toy",
"dog coat":X,"enter door":X,"exit door":X,"food bowl dog":"dog bowl","food bowl horse":X,"gravy pour":X,"lead":"leash","pet blanket":X,"pet comb":X,"retire":X,
"shampoo animal":X,"stroke":"pet the animal","take a work break":X,"trap":X,"water bottle hamster":X,"cat bed":"cat bed","dog basket":X,"kennel":X,
"pet carrying basket":X,"hamster maze":X,"goldfish bowl":"fishbowl","bird cage":"birdcage","dog kennel":"doghouse","bridle":X,"saddle":"saddle","bone":"bone",
# actions
"computer folder":X,"forward wind":X,"fried breakfast":X,"verbs collective":X,"dumpster":X,"put in cassette tape":X,"put in cd dvd":X,"write cheque":X,
"hold sledge hammer":X,"file metal":X,"file wood":X,"give up cake":X,"give up foods":X,"kick person":"kick","steal":X,"shoot":X,"arrest":X,"sleep female":X,
"sleep on side":X,"plough":X,"pluck":X,"transport car":X,"trim hedge":X,"telephone mobile":X,"post letter":"mail a letter","change weather":X,"rock chair":"rock",
"rollerskate":"roller skate","set table":X,"turn up light":X,"turn down light":X,"wait table":X,"weigh person":X,"weigh food":X,"carve meat":X,"carve wood":X,
"chop wood":X,"kick swimming":X,"hit something":X,"grow hair":X,"walk up to":X,"put in contact lens":X,"hunt":X,"attract":X,"cheat":"cheat","choke":"choke",
"telephone":"phone","change mind":"change my mind","call out":"call out","bounce ball":"bounce the ball","carry books":X,"get out of chair":"get up from a chair",
"raise feet":X,"raise head":X,"prop up":X,"insert":X,"separate":X,"receive":X,"remove":X,"smear":X,"sneak":X,"trace":X,"trim":X,"type":"type","zoom":X,
"cross fingers":"cross fingers","crumple paper":"crumple","seal envelope":X,"walk downstairs":"go downstairs","walk upstairs":"go upstairs","hold hands":"hold hands",
"put on helmet":"put on a helmet","put on lid":X,"take off lid":X,"take care of":"take care of","take picture":"take a picture","read book":"read a book",
"return book":"return a book","ride car":"ride in the car","ring bell":"ring the bell","ring doorbell":"ring the doorbell","shake hands":"shake hands",
"shake something":X,"sit in beanbag":"sit in the beanbag","sit on floor":"sit on the floor","press button":"press the button","pick up":"pick up","put away":"put away",
"put in":"put in","throw away":"throw away","turn off":"turn off","turn on":"turn on","wake up":"wake up","wear helmet":X,"write letter":"write a letter",
"hang coat":"hang up coat","pack suitcase":"pack","pat dog":"pet the dog","peel orange":"peel","open door":"open the door","close door":"close the door",
"miss bus":"miss the bus","get off bus":"get off the bus","get on bus":"get on the bus","go in":"go in","go out":"go out","go outside":"go outside",
"climb tree":"climb a tree","climb up":"climb up","climb down":"climb down","fall off":"fall off","fall over":"fall down","feed someone":"feed","knock down":"knock down",
"push down":X,"reach for":"reach","roll dice":"roll the dice","roll over":"roll over","slide backwards":X,"slide forwards":X,"walk dog":"walk the dog","feed cat":"feed the cat",
"feed dog":"feed the dog","flip coin":"flip a coin","get up":"get up","clap hands":"clap","cut with scissors":"cut with scissors","daydream":"daydream","dial":X,
"hold sledge":X,"take out":"take out","telephone mobile":X,"transport":X,"unlock":"unlock","visit":"visit","vote":"vote","rewind":X,"return":"return",
# school
"arch lever file":"binder","art room":"art room","IT room":X,"music room":"music room","science room":X,"sensory room":"sensory room","bubble wrap":X,
"drawing pin":"thumbtack","felt tips":"markers","hand punch":X,"plastic pocket":X,"post-it":"sticky note","ring binder":X,"tippex":X,"work book":"workbook",
"PE":X,"english":"English","paint childs":X,"labels":"labels","letter":"letter","glitter":"glitter","group work":"group work","index cards":X,"notepad":X,
# play
"activity centre":"activity center","armwrestle":"arm wrestle","ball beach":"beach ball","ball pool":"ball pit","bingo marker":X,"bubble mixture":X,"bubbles blow":"blow bubbles",
"car toy":X,"colouring book":"coloring book","fibre optic lamp":"sensory light","jigsaw puzzle piece":"puzzle piece","koosh ball":X,"lego":"building bricks",
"mirror ball":X,"play area":X,"playing card picture":X,"playing cards clubs":X,"playing cards diamonds":X,"playing cards hearts":X,"playing cards patience":X,
"playing cards spades":X,"pool snooker":"pool","sand pit":"sandbox","see saw":"seesaw","shapesorter":"shape sorter","spade":"shovel","star stacker":"stacking toy",
"telephone toy":"toy phone","toy soldier":X,"darts":X,"bingo":"bingo","fibre":X,"drumsticks":"drumsticks",
# places
"closed shop":X,"open shop":X,"disabled toilet":"accessible bathroom","ladies toilet":"women's restroom","mens toilet":"men's restroom","office block":"office building",
"operating theatre":"operating room","surgery health centre":"clinic","tomb":X,"shop":X,
# colors
"blue dark":"dark blue","blue light":"light blue","green dark":"dark green","green light":"light green","gray dark":"dark gray","mauve":"lavender","mauve dark":X,
"mauve light":X,"pink bright":"hot pink","pink pale":"light pink","terracotta":X,
# social
"disabled sign":X,"need toilet":"need the bathroom","toilets":"restroom",
}
# jobs: the library has several drawings of each, so keep one and give it an American name
JOBS = {"air person":"flight attendant","air steward":X,"care assistant":X,"caretaker":"janitor","cook chef":"chef","cook school":"cafeteria worker","dinner lady":X,
 "head teacher":"principal","IT assistant":"computer helper","milk person":X,"newspaper person":X,"physio therapist":"physical therapist","police":X,"porter hospital":X,
 "post person":"mail carrier","refuse collector":"garbage collector","speech language therapist":"speech therapist","greengrocer":"grocer","shepherd":X,"soldier":"soldier",
 "doctor":X,"nurse":X,"teacher":X,"visitor":"visitor","secretary":"secretary"}
PETS = {"bird seed","bone","brush the pet","cat treats","cat food","pet collar","dog treats","chew toy","dog food","feed the cat","feed the dog","fish food","dog bowl",
 "hamster food","leash","pet brush","pet the animal","saddle","walk the dog","water bowl","cat bed","dog bed","doghouse","fish tank","fishbowl","pet carrier","birdcage",
 "cage","aquarium","bird feeder","bird bath","stable","pet the dog","relax"}
TO_GROUP = {"relax":"moves","play dough":"play","fire":"nature","shovel":"play","candy cane":"treats","mug":"kitchen","cafe":"places","lunch box":"kitchen"}
RENAME.update({"box":X,"hatch":X,"zip":"zipper","cctv":"security camera","chinese food":"Chinese food","dead":X,"football kit blank":X})
