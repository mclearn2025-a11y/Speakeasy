/* ================= Communara Bird Pack — original illustrations, McLearn Media LLC =================
   Each bird: [name, group, scene, "body head wing belly tail beak legs", beak shape+length, features, fact]
   Scenes: perch, cling, upright, owl, penguin, water, wader, ground, tall, kiwi, flight, hover */
const BIRD_GROUPS = [
  ["backyard","Backyard","🏡"],["prey","Birds of prey","🦅"],["water","Water birds","🦆"],
  ["ocean","Ocean and ice","🐧"],["world","Around the world","🦜"],["farm","Farm and big birds","🐓"]
];
const BIRDS_RAW = [
// ---- Backyard ----
["Northern Cardinal","backyard","perch","C8102E C8102E A80D27 D63A4C A80D27 F07F2A 8A5A44","cone1.1","crest,mask:#1a1a1a","Male cardinals are bright red. Females are soft brown with red edges."],
["Blue Jay","backyard","perch","4F7FC6 5B8BD2 2E63B8 EEF1F4 2E63B8 222 333","cone1","crest,neckring:#1b1b1b,wingbar:#fff","Blue jays can copy the call of a hawk."],
["American Robin","backyard","perch","5E5A57 2B2B2B 4E4A47 D9692A 3A3A3A F2B705 8A6A50","thin1","eyering:#fff","Robins pull earthworms out of the ground after it rains."],
["Northern Mockingbird","backyard","perch","8E8E8E 9A9A9A 5E5E5E E6E6E2 4F4F4F 222 333","thin1.1","wingbar:#fff,tail:1.4","The mockingbird is Mississippi's state bird. It can sing the songs of many other birds."],
["House Sparrow","backyard","perch","A9825B 8C8C8C 7A5636 D4CFC4 6E5236 333 A07A5A","cone0.9","cap:#8a8a8a,nape:#8a5a32,throat:#222,wingbar:#fff","House sparrows live near people in cities and towns all over the world."],
["House Finch","backyard","perch","A58A6E D9383A 8B6E52 E8DCCB 7C624A 9A8A7A 8A6A50","cone0.9","throat:#d9383a,streaks:#8b6e52","Male house finches get their red color from the food they eat."],
["American Goldfinch","backyard","perch","F7D417 F7D417 1E1E1E FBE35A 1E1E1E F2A65A C49A7A","cone0.9","forehead:#111,wingbar:#fff","Goldfinches love thistle and sunflower seeds."],
["Eastern Bluebird","backyard","perch","3B6FD0 3B6FD0 2F5FC0 C8642F 2F5FC0 222 333","thin0.9","lowbelly:#f4f1ea","Bluebirds often nest in boxes that people put up for them."],
["Carolina Chickadee","backyard","perch","9AA0A6 F2F2F0 7C838A EDE6DA 6F767D 222 444","cone0.7","cap:#111,throat:#111","Chickadees say their own name: chick-a-dee-dee-dee!"],
["Tufted Titmouse","backyard","perch","9AA3AE 9AA3AE 8A94A0 EFEDEA 8A94A0 222 555","cone0.7","crest,forehead:#222,flank:#E0A27A","Titmice hide seeds in tree bark to eat later."],
["Mourning Dove","backyard","perch","BFA58C BFA58C A88E76 D8C3AE 9A826A 333 D96C6C","thin0.6","spots:#3a2e26,tail:1.4","A mourning dove's soft cooing sounds a little like an owl."],
["Rock Pigeon","backyard","perch","8C93A3 6E7584 9AA1B0 8C93A3 5A6170 333 D96C6C","thin0.6","neckring:#4FA37B,wingbar:#333","Pigeons can find their way home from very far away."],
["European Starling","backyard","perch","2B2A33 2B2A33 34333D 2F2E38 222 F2C41A 9A6A5A","thin1.1","speckles:#e9e3c7","Starlings fly in huge swirling flocks called murmurations."],
["Red-winged Blackbird","backyard","perch","151515 151515 151515 151515 111 222 333","cone1","shoulder:#E5262A","Male red-winged blackbirds show off red shoulder patches with a yellow edge."],
["Common Grackle","backyard","perch","1E1E2C 2E3A7A 3A2A4A 1E1E2C 1A1A24 222 333","thin1.1","eye:#F2D24B,tail:1.5","Grackles have bright yellow eyes and shiny purple-blue heads."],
["Brown Thrasher","backyard","perch","A0522D A0522D 8E471F F1E4CC 8E471F 333 8A6A50","thin1.4","streaks:#6a3a1a,eye:#F2C230,wingbar:#fff,tail:1.5","Brown thrashers know more than 1,000 different songs."],
["Carolina Wren","backyard","perch","A6612C A6612C 8E5226 E9C38E 8E5226 333 C9A07A","thin1.1","brow:#fff,tailup","This tiny wren sings very loudly for its size."],
["Dark-eyed Junco","backyard","perch","5A5F66 4C5158 4C5158 F2F2F2 3E4248 F0C9C9 A0846E","cone0.8","","Juncos are called snowbirds because many show up in winter."],
["White-breasted Nuthatch","backyard","cling","7D97B8 FFFFFF 6E88AA F5F5F2 4A4A4A 333 555","thin1.1","cap:#111","Nuthatches climb down tree trunks headfirst."],
["Downy Woodpecker","backyard","cling","FFFFFF FFFFFF 111111 FFFFFF 111111 333 555","chisel0.7","cap:#111,nape:#E0262B,stripes:#fff,facestripe:#111","The downy is the smallest woodpecker in North America."],
["Red-bellied Woodpecker","backyard","cling","E9E2D4 E9E2D4 222 EBDDC4 222 333 555","chisel1","cap:#D7262C,barred:#222","Its name is tricky: the red is on its head, and the belly is only a little pink."],
["Pileated Woodpecker","backyard","cling","1D1D1D 1D1D1D 1D1D1D 1D1D1D 111 555 555","chisel1.3","crest:#D7262C,facestripe:#fff","This crow-sized woodpecker digs big rectangle holes in trees."],
["Northern Flicker","backyard","cling","C9A887 B9A792 A08060 F0E2CC 222 333 555","chisel1.1","spots:#222,bib:#111,nape:#D7262C","Flickers often hunt for ants on the ground."],
["Ruby-throated Hummingbird","backyard","hover","3E8E4A 3E8E4A 6A6A6A EDEDE7 3A6E40 222 333","thin1","throat:#D2163A","Hummingbirds beat their wings more than 50 times a second."],
["Barn Swallow","backyard","flight","254B8C 254B8C 1F3F78 E8A36A 1F3F78 222 333","thin0.6","fork,throat:#B5562A","Barn swallows build cup-shaped nests out of mud."],
["Purple Martin","backyard","flight","2C2257 2C2257 231B47 2C2257 231B47 222 333","thin0.6","fork","Purple martins in the East nest almost only in houses people build for them."],
["Cedar Waxwing","backyard","perch","C2A27D B8925E 8C8A88 F0DE9A 7A7A7A 222 333","cone0.8","crest,mask:#111,tailtip:#F5D11B,shoulder:#D92B2B","Waxwings sometimes pass berries to each other down a line."],
["Indigo Bunting","backyard","perch","1F4FC2 1A3FA8 1A3FA8 2A5BD0 1A3FA8 9AA3B0 555","cone0.9","","Indigo buntings look blue, but light makes the color. Their feathers have no blue in them."],
["Painted Bunting","backyard","perch","D9302D 2F4FC9 5DBB3A E5352F 7A3A6A 9AA3B0 555","cone0.9","eyering:#D9302D","Painted buntings look like someone colored them with crayons."],
["Baltimore Oriole","backyard","perch","F28A1E 111 111 F7941F F28A1E 7A8290 555","thin1","wingbar:#fff,bib:#111","Orioles weave hanging nests that look like little bags."],
["Scarlet Tanager","backyard","perch","E0201B E0201B 111 E83A2A 111 9A9A8A 555","cone0.9","","Male scarlet tanagers are bright red with black wings."],
["Summer Tanager","backyard","perch","D9313A D9313A C02A33 E04A50 C02A33 D9C08A 555","cone1","","Summer tanagers eat bees and wasps. They rub off the stinger first."],
["Yellow Warbler","backyard","perch","F2D21B F2D21B C9AE1A F8E04A C9AE1A 333 AA8866","thin0.8","streaks:#C64A2A","Yellow warblers sing 'sweet, sweet, sweet, I'm so sweet!'"],
["American Crow","backyard","perch","141414 141414 1C1C1C 141414 111 111 222","cone1.4","","Crows are very smart. They can solve puzzles and remember faces."],
["Common Raven","backyard","perch","141414 141414 1C1C1C 141414 111 111 222","cone1.8","beard,tail:1.2","Ravens are the largest songbirds in the world."],
["Eastern Towhee","backyard","perch","111 111 111 F2F2F0 111 222 AA8866","cone0.9","flank:#C8632A,eye:#C0262B,bib:#111","Towhees sing 'drink your tea!'"],
// ---- Birds of prey ----
["Bald Eagle","prey","upright","4A2F1F FFFFFF 3D2718 4A2F1F FFFFFF F2C230 F2C230","hook1.4","eye:#F2D24B","The bald eagle is the national bird of the United States."],
["Golden Eagle","prey","upright","5A3A22 B98A3E 4A2F1B 5A3A22 4A2F1B 3A3A3A F2C230","hook1.3","","Golden eagles can dive faster than 150 miles per hour."],
["Red-tailed Hawk","prey","upright","8A5A35 7A4A28 6A4022 F3E8D6 C4572A 333 F2C230","hook1","streaks:#7a4a28","The scream you hear for eagles in movies is usually a red-tailed hawk."],
["Cooper's Hawk","prey","upright","5E6B7A 4B5866 55606E F2D5C0 5E6B7A 333 F2C230","hook0.9","barred:#C4672E,eye:#D84A1A,tail:1.5,cap:#2e3540","Cooper's hawks chase small birds through trees at high speed."],
["Osprey","prey","upright","4A3A2E FFFFFF 3C2E24 FFFFFF 4A3A2E 222 9FB3C0","hook1","mask:#3c2e24,eye:#F2D24B","Ospreys dive feet-first into water to catch fish."],
["Peregrine Falcon","prey","upright","4F5B6B 1F2833 46525F F2EADC 4F5B6B F2C230 F2C230","hook0.8","barred:#6b7480,mustache:#1f2833,eyering:#F2C230,cheek:#f2eadc","The peregrine falcon is the fastest animal on Earth when it dives."],
["American Kestrel","prey","upright","C86A32 7E90C8 7E90C8 F4E2CC C86A32 333 F2C230","hook0.7","mustache:#222,spots:#222,cheek:#fff","The kestrel is the smallest falcon in North America."],
["Turkey Vulture","prey","upright","2A2420 D9443A 3A3029 2A2420 2A2420 EDE6DA D9C7B5","hook0.9","bald","Turkey vultures find food by smell, which is rare for birds."],
["Black Vulture","prey","upright","1C1C1C 555555 2A2A2A 1C1C1C 1C1C1C 9A9A9A BBBBBB","hook0.9","bald","Black vultures often follow turkey vultures to find food."],
["Great Horned Owl","prey","owl","7A5A3A 8A6A48 6A4A2E C9B08A 6A4A2E 333 C9B08A","hook0.6","tufts,eye:#F2C230,disc:#C98A4A,throat:#fff,barred:#5a4028","Great horned owls hoot five deep notes: hoo, h'hoo, hoo, hoo."],
["Barn Owl","prey","owl","D6A45A F4E8D8 C8964C FBF6EE C8964C EDE0CF DDDDDD","hook0.5","heart,eye:#111,disc:#fbf6ee","Barn owls have heart-shaped faces that help them hear."],
["Snowy Owl","prey","owl","F7F7F7 FAFAFA EEEEEE FFFFFF EEEEEE 333 FFFFFF","hook0.5","eye:#F2C230,spots:#333,disc:#ffffff","Snowy owls live in the Arctic and hunt during the day."],
["Eastern Screech-Owl","prey","owl","8E8E8A 9A9A96 7A7A76 BCBCB6 7A7A76 9AB07A AAAAAA","hook0.4","tufts,eye:#F2C230,streaks:#555,disc:#a8a8a2","Screech-owls don't screech. They make a soft whinny and trill."],
["Barred Owl","prey","owl","8A7560 9A8570 7A6550 E8DCC8 7A6550 F2C230 DDDDDD","hook0.5","eye:#2a1a10,barred:#7a6550,disc:#c8b8a0","Barred owls call 'Who cooks for you? Who cooks for you all?'"],
["Burrowing Owl","prey","owl","9A7650 A07C56 85643F F0E2C8 85643F 9A9A8A 9A9A8A","hook0.4","eye:#F2C230,spots:#fff,longlegs,ground,disc:#b08a60,brow:#fff","Burrowing owls live in holes in the ground."],
["Harpy Eagle","prey","upright","3A3A3E 9A9AA2 2E2E32 F4F4F2 2E2E32 222 F2C230","hook1.4","crest:#3a3a3e,neckring:#2e2e32","Harpy eagles live in rainforests and are some of the strongest eagles."],
["Secretary Bird","prey","wader","C9CDD3 C9CDD3 222 DDE0E4 222 9AA3B0 F0B48A","hook1.4","crest:#222,face:#F27A1A,ground","Secretary birds stomp on snakes with their long legs."],
// ---- Water birds ----
["Mallard","water","water","9AA0A8 1F7A3E 8A8A8A 7A3E2A 222 F2C230 F28A1E","flat1","neckring:#fff,speculum:#2E4FC9,chest:#6B3A2A","Male mallards have shiny green heads. Females are speckled brown."],
["Wood Duck","water","water","8A6040 2A6B4A 3A3A5A D9C8A8 222 D9302D F2C230","flat0.8","crest,eye:#D9302D,facestripe:#fff,chest:#7A3A3A,throat:#fff","Wood ducks nest in tree holes. Ducklings jump out the day after they hatch."],
["Canada Goose","water","water","8A7A68 111 7A6A58 D9D0C2 111 111 222","flat0.9","neck:1,cheek:#fff","Canada geese fly in a V shape to save energy."],
["Mute Swan","water","water","FFFFFF FFFFFF F2F2F2 FFFFFF FFFFFF F27A1A 333","flat1","neck:2,knob:#111","Mute swans can weigh as much as a small dog."],
["Black Swan","water","water","1A1A1A 1A1A1A 222 1A1A1A 1A1A1A D9262B 333","flat1","neck:2,eye:#d9262b","Black swans come from Australia."],
["Common Loon","water","water","1A1A1A 1A3A2A 1A1A1A 1A1A1A 1A1A1A 111 222","thin1.4","checker:#fff,neckring:#fff,eye:#D9262B","Loons make spooky, wailing calls across lakes at night."],
["American Coot","water","water","2C2C30 1A1A1E 2A2A2E 2C2C30 2A2A2E FFFFFF 9AC24A","cone0.8","eye:#D9262B,shield:#8a2a2a","Coots have lobed toes instead of webbed feet."],
["Great Blue Heron","water","wader","7B8FA8 E8E8E8 6A7E98 9AA8BC 6A7E98 E8B33A 6A6A5A","long1","brow:#111,plume:#333,neck:#9aa8bc","Great blue herons stand very still, then spear fish with their bills."],
["Great Egret","water","wader","FFFFFF FFFFFF F4F4F4 FFFFFF F4F4F4 F2C230 111","long1.1","","Great egrets were almost wiped out for their feathers. Laws saved them."],
["Snowy Egret","water","wader","FFFFFF FFFFFF F4F4F4 FFFFFF F4F4F4 111 111","long0.9","feet:#F2D21B,plume:#fff","Snowy egrets have black legs and bright yellow feet, like golden slippers."],
["White Ibis","water","wader","FFFFFF FFFFFF F4F4F4 FFFFFF F4F4F4 E8623A E8623A","curve1","face:#E8623A,wingtip:#111","White ibises use their curved bills to feel for crabs in the mud."],
["Roseate Spoonbill","water","wader","F2A0B8 E8E2C8 E8608A F4B4C8 E8A33A B8B8A0 D9446A","spoon1","shoulder:#D92B4A,neck:#f8d8e0","Spoonbills swish their spoon-shaped bills side to side to catch food."],
["Wood Stork","water","wader","FFFFFF 6A6058 FFFFFF FFFFFF 111 6A6058 555","curve0.8","wingtip:#111,neck:#8a8078","Wood storks are the only storks that nest in the United States."],
["Sandhill Crane","water","wader","A8A8AC B8B8BC 9A9AA0 B0B0B4 7A7A80 333 333","long0.8","cap:#D9262B,cheek:#fff","Sandhill cranes dance by jumping, bowing and flapping their wings."],
["Whooping Crane","water","wader","FFFFFF FFFFFF F4F4F4 FFFFFF F4F4F4 7A6A3A 333","long0.8","cap:#D9262B,mustache:#111,wingtip:#111","Whooping cranes are the tallest birds in North America."],
["American Flamingo","water","wader","F4708A F4708A F05A78 F78AA0 E04A6A FFF0F0 F27A92","bent1","oneleg,neck:#f4708a","Flamingos are pink because of the shrimp and algae they eat."],
["Belted Kingfisher","water","perch","5A7AA0 5A7AA0 4A6A90 FFFFFF 4A6A90 222 555","thin1.6","crest,neckring:#fff,band:#5A7AA0","Kingfishers dive headfirst into water to catch fish."],
["Brown Pelican","water","water","7A6E62 F4E8C8 6A5E52 7A6E62 5A4E42 9A8A6A 333","pouch1","neck:1","Brown pelicans dive from the sky into the ocean to scoop up fish."],
["American White Pelican","water","water","FFFFFF FFFFFF FFFFFF FFFFFF FFFFFF F2A63A F2A63A","pouch1.2","neck:1,wingtip:#111","White pelicans work in teams to herd fish."],
["Double-crested Cormorant","water","water","1E1E1E 1E1E1E 2A2A2A 1E1E1E 1E1E1E F27A1A 333","hook1.1","neck:1,eye:#2E9E7A","Cormorants dry their wings by holding them open in the sun."],
["Anhinga","water","water","111 222 3A3A3A 111 111 F2C230 333","long0.7","neck:2,spots:#ddd","Anhingas swim with only their snake-like neck above water."],
["Mandarin Duck","water","water","C86A2A F2A040 2A2A6A 6A4A8A 333 D9302D F2A040","flat0.7","crest:#C8461A,facestripe:#fff,sail:#E8742A,chest:#6A4A8A","Mandarin ducks are some of the most colorful ducks in the world."],
["Killdeer","water","ground","A07A50 A07A50 8A6A44 FFFFFF D9853A 222 F0D9A8","thin0.6","neckring:#111,band:#111,eyering:#E8623A,shore","Killdeer pretend to have a broken wing to lead danger away from their nest."],
// ---- Ocean and ice ----
["Emperor Penguin","ocean","penguin","1E2A38 111 1E2A38 FFFFFF 111 222 333","thin1","earpatch:#F2B233,chest:#FBE7A8","Emperor penguin dads keep the egg warm on their feet all winter."],
["King Penguin","ocean","penguin","3A4A5A 111 3A4A5A FFFFFF 111 222 333","thin1.1","earpatch:#F28A1A,chest:#F7C04A,billspot:#F28A1A","King penguins are the second largest penguins."],
["Gentoo Penguin","ocean","penguin","1E2A38 111 1E2A38 FFFFFF 111 F2602A F28A1A","thin0.8","brow:#fff","Gentoos are the fastest swimming penguins."],
["Little Penguin","ocean","penguin","3E6E9E 3E6E9E 3E6E9E FFFFFF 333 222 DDDDDD","thin0.8","","Little penguins are the smallest penguins. They are also called fairy penguins."],
["Atlantic Puffin","ocean","upright","111 EDEDE8 111 FFFFFF 111 F2602A F28A1A","puffin1","cap:#111,rock","Puffins can hold more than ten small fish in their beaks at once."],
["Herring Gull","ocean","flight","FFFFFF FFFFFF A8B4C0 FFFFFF FFFFFF F2C230 E8A0A0","cone1.2","tips:#111,billspot:#D9262B","Gull chicks peck the red spot on a parent's bill to ask for food."],
["Laughing Gull","ocean","flight","FFFFFF 222 5A6470 FFFFFF FFFFFF 8A1A1A 8A1A1A","cone1.1","tips:#111","Laughing gulls sound like they are laughing: ha-ha-ha!"],
["Wandering Albatross","ocean","flight","FFFFFF FFFFFF 3A3A3A FFFFFF FFFFFF F2C8A8 E8C8C0","hook1.2","longwing","Wandering albatrosses have the longest wings of any bird, about 11 feet."],
["Blue-footed Booby","ocean","ground","8A6A4A D8CBB8 7A5A3A FFFFFF 7A5A3A 5A7A9A 3FB7D9","cone1.3","streaks:#8a6a4a,rock","Blue-footed boobies show off their bright blue feet in a dance."],
["Magnificent Frigatebird","ocean","perch","1A1A1A 1A1A1A 1A1A1A 1A1A1A 1A1A1A 7A7A7A 333","hook1.4","balloon:#E0202A,fork,tail:1.3","Male frigatebirds puff up a giant red throat pouch like a balloon."],
["Arctic Tern","ocean","flight","FFFFFF FFFFFF D8DEE4 FFFFFF FFFFFF D9262B D9262B","thin1","cap:#111,fork","Arctic terns fly from the Arctic to Antarctica and back every year."],
["Sanderling","ocean","ground","C8C8C8 D8D8D8 9A9A9A FFFFFF 8A8A8A 111 111","thin0.9","shore","Sanderlings run back and forth with the waves on the beach."],
// ---- Around the world ----
["Scarlet Macaw","world","upright","E01A2A E01A2A F2C41A E01A2A 1E5FD0 EDE6DA 555","hook1.2","face:#fff,wingband:#1E5FD0,tail:1.9","Macaws can live for more than 50 years."],
["Blue-and-yellow Macaw","world","upright","1E7FD0 1E7FD0 1E6FC0 F7C21A 1E6FC0 111 555","hook1.2","face:#fff,forehead:#2E9E4A,tail:1.9","These macaws use their strong beaks like a third foot to climb."],
["Hyacinth Macaw","world","upright","2A3E9A 2A3E9A 24368A 2A3E9A 24368A 222 555","hook1.3","eyering:#F2D21B,jaw:#F2D21B,tail:1.9","The hyacinth macaw is the largest flying parrot."],
["African Grey Parrot","world","upright","8E9196 A2A5AA 7A7D82 9A9DA2 D9262B 111 555","hook1","face:#eeeeee,tail:0.9","African greys are famous for copying words and sounds."],
["Sulphur-crested Cockatoo","world","upright","FFFFFF FFFFFF F4F4F4 FFFFFF F4F4F4 222 555","hook0.9","crest:#F2D21B,eye:#111","Cockatoos raise their crests when they are excited."],
["Budgerigar","world","perch","6FCB3A F2E24A C9C93A 6FCB3A 2E5FB8 E8C8A8 8AAAC8","hook0.4","barred:#222,throatspots","Budgies are small parrots from Australia. Many can learn words."],
["Cockatiel","world","perch","A8A8A8 F2E24A 9A9A9A A8A8A8 8A8A8A 9A9A9A AAAAAA","hook0.4","crest:#F2E24A,cheek:#F28A3A,wingbar:#fff,tail:1.5","Cockatiels whistle tunes and bob their heads to music."],
["Rainbow Lorikeet","world","upright","2EA84A 2A4FC9 2E9A3A 2A4FC9 2E9A3A E8302A 777","hook0.5","chest:#F25A1A,neckring:#B8E04A","Rainbow lorikeets have brush-tipped tongues for drinking flower nectar."],
["Peach-faced Lovebird","world","perch","4EB84A F28A6A 3EA83A 6ACB5A 2E7AD0 E8E0C8 AAAAAA","hook0.4","throat:#F28A6A","Lovebirds stay close to their partner and often sit side by side."],
["Toco Toucan","world","perch","111 111 111 111 111 F28A1A 4A7AC9","huge1","throat:#fff,eyering:#2E7AD0,billtip:#111","A toucan's huge beak is light because it is mostly hollow."],
["Keel-billed Toucan","world","perch","111 111 111 111 111 7ACB4A 4A7AC9","huge1","throat:#F2D21B,rainbowbill","Its colorful beak helps it reach fruit on thin branches."],
["Great Hornbill","world","perch","111 111 111 FFFFFF FFFFFF F2D21B 555","huge0.9","casque:#F2C21A,wingbar:#fff,neck:#f2e8c8","Hornbill mothers seal themselves inside a tree hole to keep their chicks safe."],
["Resplendent Quetzal","world","perch","2EA86A 2EA86A 1E8A5A D9262B 2EA86A F2D21B 555","cone0.5","crest,tail:2.6","The quetzal's tail feathers can be longer than its body."],
["Laughing Kookaburra","world","perch","E8DCC8 EDE4D2 6A5A4A F2EADC A0602A 333 999","thin1.5","mask:#5a4a3a,cap:#a8977f","Kookaburra calls sound like loud laughing."],
["Indian Peafowl","world","ground","1E5FB8 1E6FC8 C9B88A 1E5FB8 2E7A4A 9A9A8A 9A9A9A","cone0.7","peacockfan,crest","Only male peafowl, called peacocks, have the giant tail with eye spots."],
["Greater Bird-of-paradise","world","perch","6A3A1A F2E24A 6A3A1A 6A3A1A 6A3A1A 9AB0C0 777","cone0.9","throat:#2E7A4A,plumes:#F2C21A","Male birds-of-paradise show off amazing feathers in dances."],
["Shoebill","world","wader","8A96A2 8A96A2 7A8692 9AA6B2 6A7682 C9B898 333","shoe1","eye:#F2E8C8,neck:#8a96a2","The shoebill has a huge beak shaped like a wooden shoe."],
["Kiwi","world","kiwi","7A5A3A 7A5A3A 7A5A3A 8A6A4A 7A5A3A D8C8A8 C9B898","long1","","Kiwis can't fly. They have nostrils at the tip of their beaks to sniff out food."],
["Superb Fairywren","world","perch","4A3A2E 3FB7E8 6A5A4A EDE4D2 2E4FC9 111 777","thin0.7","mask:#111,neckring:#1a2a6a,tailup,tail:1.4","Male fairywrens give flower petals as gifts."],
["Gouldian Finch","world","perch","2EA84A 111 2EA84A F2D21B 111 F0C9B8 E8C8C0","cone0.8","chest:#9A4AC9,neckring:#3FB7E8","Gouldian finches look like they were painted with every color."],
["European Robin","world","perch","8A7A60 8A7A60 7A6A50 EDE6DA 7A6A50 333 8A7A6A","thin0.8","chest:#E8622A,face:#E8622A","European robins often follow gardeners to catch worms."],
["Blue Tit","world","perch","7AA84A FFFFFF 3F7FD0 F2D21B 3F7FD0 222 777","cone0.6","cap:#3F7FD0,mask:#1a2a6a,neckring:#1a2a6a","Blue tits can hang upside down to reach food."],
["European Bee-eater","world","perch","C8562A A8362A 3EA8A8 3FB7D9 2EA88A 111 777","thin1.3","throat:#F2D21B,mask:#111,tail:1.3","Bee-eaters catch bees in the air and rub off the stinger."],
["Hoopoe","world","ground","E8A86A E8A86A 111 EDC8A0 111 333 777","curve0.9","crest:#E8A86A,barred:#fff","Hoopoes raise a fan-shaped crest that looks like a crown."],
["Common Kingfisher","world","perch","1E9AC9 1E8AB9 1E7AA9 F28A3A 1E9AC9 222 F2602A","thin1.5","cheek:#F28A3A,throat:#fff","These tiny kingfishers flash bright blue as they zip over rivers."],
// ---- Farm and big birds ----
["Chicken","farm","ground","C8692A C8692A A8501A D9803A 6A3A1A F2C230 F2C230","cone0.7","comb,wattle","Hens can lay about one egg a day."],
["Rooster","farm","ground","D8862A F2A040 8A2A1A 1A1A1A 1E3A2A F2C230 F2C230","cone0.7","comb,wattle,tailarch:#1E5A3A","Roosters crow 'cock-a-doodle-doo' in the morning, and at other times too."],
["Wild Turkey","farm","ground","4A3A2A 8AA8D8 5A4A3A 3A2A1A 6A4A2A D8C8A8 D9A8A0","cone0.7","tailfan,wattle,bald","Wild turkeys can run fast and fly short distances."],
["Pekin Duck","farm","water","FFFFFF FFFFFF F4F0E8 FFFFFF FFFFFF F2A040 F2A040","flat0.9","","White farm ducks came from wild mallards long ago."],
["Ostrich","farm","tall","1A1A1A E8C8B8 1A1A1A 1A1A1A FFFFFF E8B8A8 E8B8A8","cone0.7","neck:#E8B8B0,wingtip:#fff","The ostrich is the biggest bird in the world. It can run about as fast as a car on a city street."],
["Emu","farm","tall","6A5A4A 3A4A6A 6A5A4A 6A5A4A 6A5A4A 333 6A6A6A","cone0.7","neck:#5A6A8A,shaggy","Emus are the second tallest birds. They can't fly, but they can swim."],
["Southern Cassowary","farm","tall","111 2E7AD0 111 111 111 333 7A7A6A","cone0.8","neck:#2E7AD0,casque:#8A6A3A,wattle:#D9262B","Cassowaries wear a tall helmet on their heads called a casque."],
["Greater Roadrunner","farm","ground","A08A6A 7A6A5A 6A5A4A EDE4D2 5A4A3A 333 6A7A8A","thin1.2","crest:#5a4a3a,streaks:#5a4a3a,tail:1.8,tailup","Roadrunners run up to 20 miles per hour and eat lizards and snakes."],
["Northern Bobwhite","farm","ground","A0623A A0623A 8A5232 EDE0C8 7A4A2A 333 A08A6A","cone0.6","brow:#fff,throat:#fff,barred:#333","Bobwhites whistle their name: bob-WHITE!"],
["Ring-necked Pheasant","farm","ground","B8622A 1E6A4A 9A5A2A A8522A A8823A E8D8A8 999","cone0.7","face:#D9262B,neckring:#fff,longtail","Pheasants can burst into the air almost straight up."],
["Helmeted Guineafowl","farm","ground","3A3A4A 8AC8E8 3A3A4A 3A3A4A 3A3A4A D8B88A 555","cone0.6","spots:#fff,wattle:#D9262B,casque:#C8A86A","Guineafowl make loud alarm calls that warn the whole farm."]
];

const BIRDS = BIRDS_RAW.map((a,i)=>{
  const [name,group,tpl,cols,beak,feat,fact]=a;
  const [b,h,w,l,t,k,g]=cols.split(" ").map(x=>"#"+x);
  const m = beak.match(/^([a-z]+)([\d.]+)?$/);
  const f = {};
  feat.split(",").filter(Boolean).forEach(s=>{ const j=s.indexOf(":"); if(j<0) f[s]=true; else f[s.slice(0,j)]=s.slice(j+1); });
  return {id:"bird-"+i, name, group, tpl, c:{b,h,w,l,t,k,g}, bs:m[1], bl:+(m[2]||1), f, fact};
});

/* ---------------- Drawing ---------------- */
function shade(hex,amt){
  let x=hex.replace("#",""); if(x.length===3) x=[...x].map(c=>c+c).join("");
  const n=parseInt(x,16); const cl=v=>Math.max(0,Math.min(255,v));
  const r=cl((n>>16)+amt), g=cl(((n>>8)&255)+amt), b=cl((n&255)+amt);
  return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}
let BIRD_UID=0;
function birdSVG(B,opt={}){
  const u="bd"+(BIRD_UID++), c=B.c, f=B.f, o=[];
  const P=s=>o.push(s);
  const E=(cx,cy,rx,ry,rot,fill,x="")=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"${rot?` transform="rotate(${rot} ${cx} ${cy})"`:""} ${x}/>`;
  const C=(cx,cy,r,fill,x="")=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${x}/>`;
  const L=(x1,y1,x2,y2,stroke,w,x="")=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${x}/>`;
  const PG=(pts,fill,x="")=>`<polygon points="${pts.map(p=>p.join(",")).join(" ")}" fill="${fill}" ${x}/>`;
  const tpl=B.tpl;

  /* ---- geometry by scene ---- */
  let G;
  switch(tpl){
    case "cling": G={body:[50,56,12,23,8],belly:[53,58,7,17,8],wing:[47,57,9,19,8],head:[54,30,11],beak:[64,31],eye:[57,28],tail:[[44,74],[48,76],[44,94],[38,92]],legs:[[[47,64],[37,63]],[[48,73],[37,73]]]}; break;
    case "upright": G={body:[50,60,17,24,0],belly:[53,64,11,18,0],wing:[43,60,10,21,12],head:[52,31,14],beak:[64,33],eye:[57,29],tail:[[45,78],[55,78],[54,90],[46,90]],legs:[[[46,80],[46,86]],[[54,80],[54,86]]]}; break;
    case "owl": G={body:[50,62,19,23,0],belly:[50,66,13,17,0],wing:[38,62,8,19,8],head:[50,33,17],beak:[50,38],eye:[50,31],tail:[[45,80],[55,80],[54,88],[46,88]],legs:[[[45,82],[45,f.longlegs?92:87]],[[55,82],[55,f.longlegs?92:87]]]}; break;
    case "penguin": G={body:[50,58,19,29,0],belly:[53,62,13,23,0],wing:[37,58,6,18,15],head:[52,25,13],beak:[63,27],eye:[57,23]}; break;
    case "water": { const n=+(f.neck||0);
      G={body:[45,64,27,12,-4],wing:[41,61,17,7,-6],n,tail:[[20,62],[9,54],[24,58]]};
      if(n===0) G.head=[69,50,10]; else if(n===1) G.head= B.bs==="pouch" ? [60,36,8] : [73,36,8]; else G.head=[67,24,7];
      G.beak=[G.head[0]+G.head[2]*0.8,G.head[1]+1]; G.eye=[G.head[0]+G.head[2]*0.3,G.head[1]-G.head[2]*0.25]; break; }
    case "wader": G={body:[45,50,19,11,-12],belly:[49,54,12,6,-12],wing:[41,48,16,8,-14],head:[64,20,7],beak:[69,21],eye:[65.5,18.5],tail:[[28,52],[19,58],[30,56]],legs:[[[45,58],[43,88]],[[51,58],[55,88]]]}; break;
    case "tall": G={body:[42,46,24,15,-6],wing:[38,44,18,10,-8],head:[66,13,6],beak:[70.5,14],eye:[67.5,11.5],tail:[[19,44],[10,40],[14,50]],legs:[[[38,57],[36,90]],[[48,57],[52,90]]]}; break;
    case "kiwi": G={body:[46,62,26,20,0],belly:[48,68,18,12,0],wing:[40,60,14,10,0],head:[69,54,9],beak:[76,56],eye:[71,51],legs:[[[42,79],[41,88]],[[52,79],[53,88]]]}; break;
    case "flight": G={body:[47,52,21,7,-5],head:[69,48,7],beak:[75,49],eye:[70.5,46.5],tail:[[28,54],[16,58],[17,51]]}; break;
    case "hover": G={body:[44,52,12,7,-28],head:[55,42,6.5],beak:[60,43],eye:[56.5,40.5],tail:[[36,58],[27,70],[33,71]]}; break;
    case "ground": G={body:[45,56,23,16,-6],belly:[49,61,15,9,-6],wing:[41,54,16,10,-10],head:[68,34,10],beak:[77,35],eye:[70,32],tail:[[24,52],[12,40],[17,57]],legs:[[[42,70],[40,86]],[[52,70],[54,86]]]}; break;
    default: G={body:[48,58,24,17,-22],belly:[53,63,16,11,-22],wing:[42,55,19,10,-28],head:[68,38,13],beak:[79,40],eye:[71,35],tail:[[34,64],[29,70],[12,84],[17,89]],legs:[[[50,72],[49,82]],[[56,71],[57,82]]]};
  }
  const [hx,hy,hr]=G.head, hs=hr/13;

  /* ---- background scene ---- */
  const sky = tpl==="penguin" ? ["#D8F1FF","#B6E2F8"] : tpl==="owl" && !f.ground ? ["#2B3A67","#4B5D96"] : ["#BFE6FF","#EAF7FF"];
  P(`<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient>`
   +`<clipPath id="${u}h"><circle cx="${hx}" cy="${hy}" r="${hr}"/></clipPath></defs>`);
  P(`<rect width="100" height="100" rx="14" fill="url(#${u}s)"/>`);
  if (tpl==="owl" && !f.ground){ P(C(82,18,8,"#F7F1C8")); P(C(20,24,1.2,"#fff")); P(C(30,12,1,"#fff")); P(C(88,40,1,"#fff")); }
  else if (tpl!=="penguin") P(C(84,15,7,"#FFE58A"));
  if (tpl==="flight"){ P(E(24,26,12,5,0,"#fff","opacity=\".9\"")); P(E(80,74,14,5,0,"#fff","opacity=\".9\"")); }
  const branch = () => { P(`<path d="M2 ${tpl==="upright"||tpl==="owl"?88:83} Q50 ${tpl==="upright"||tpl==="owl"?84:79} 98 ${tpl==="upright"||tpl==="owl"?89:84}" stroke="#7A4E2D" stroke-width="6" fill="none" stroke-linecap="round"/>`);
    P(E(88,78,6,3,-30,"#6BB04A")); P(E(12,80,5,2.5,25,"#6BB04A")); };
  const grass = (y=86,col="#7CC25A") => { P(`<rect x="0" y="${y}" width="100" height="${100-y}" fill="${col}"/>`); P(`<path d="M0 ${y} Q25 ${y-3} 50 ${y} T100 ${y}" fill="${col}"/>`); };
  if (tpl==="perch"||tpl==="hover") { if(tpl==="perch") branch(); }
  if ((tpl==="upright" && !f.rock) || (tpl==="owl" && !f.ground)) branch();
  if (tpl==="upright" && f.rock) grass(84,"#9A9488");
  if (tpl==="owl" && f.ground){ grass(86,"#C9A86A"); P(E(26,88,12,5,0,"#5a4028")); }
  if (tpl==="cling"){ P(`<rect x="18" y="0" width="20" height="100" fill="#7A4E2D"/>`); P(L(24,10,24,40,"#5f3c22",2)); P(L(31,50,31,85,"#5f3c22",2)); }
  if (tpl==="penguin"){ P(`<path d="M0 84 Q50 78 100 84 V100 H0Z" fill="#F4FBFF"/>`); }
  if (tpl==="wader"){ if (f.ground) grass(86,"#D8C27A"); else { P(`<rect x="0" y="80" width="100" height="20" fill="#7FC4E8"/>`); } }
  if (tpl==="ground"||tpl==="tall"||tpl==="kiwi"){ if (f.shore) grass(84,"#EAD8A8"); else if (f.rock) grass(84,"#9A9488"); else grass(86); }
  if (tpl==="hover"){ P(L(86,100,84,60,"#4E9A3A",3)); P(E(91,78,6,2.5,-30,"#6BB04A")); P(`<path d="M76 47 L88 41 L90 60 Z" fill="#E8304A"/>`); P(E(78,50,3,5,-25,"#F25A6A")); }

  const birdStart = o.length;
  /* ---- behind the body ---- */
  if (f.peacockfan){ P(E(30,44,30,30,0,"#2E8A5A")); for(let a=0;a<9;a++){ const t=-1.9+a*0.42, x=30+Math.cos(t)*23, y=44+Math.sin(t)*23; P(C(x,y,4.5,"#C9A23A")); P(C(x,y,3,"#1E5FB8")); P(C(x,y,1.4,"#0b2a5a")); } }
  if (f.tailfan){ for(let a=0;a<7;a++){ const t=-2.6+a*0.32; P(L(32,52,32+Math.cos(t)*28,52+Math.sin(t)*28,c.t,9)); P(L(32+Math.cos(t)*22,52+Math.sin(t)*22,32+Math.cos(t)*28,52+Math.sin(t)*28,"#E8DCC0",9)); } }
  if (f.tailarch){ P(`<path d="M28 54 Q10 30 30 20" stroke="${f.tailarch}" stroke-width="7" fill="none" stroke-linecap="round"/>`); P(`<path d="M26 56 Q4 42 16 26" stroke="${shade(f.tailarch,20)}" stroke-width="6" fill="none" stroke-linecap="round"/>`); }
  if (f.longtail){ P(`<path d="M26 54 L-2 44 L0 50 Z" fill="${c.t}"/>`); P(L(26,54,2,46,"#5a3a1a",1.2,"opacity=\".6\"")); }
  if (f.plumes){ P(`<path d="M30 60 Q10 70 4 90 Q16 76 34 66 Z" fill="${f.plumes}"/>`); P(`<path d="M34 62 Q20 80 18 96 Q26 80 38 66 Z" fill="${shade(f.plumes,-20)}"/>`); }

  /* ---- legs ---- */
  const lw = tpl==="tall" ? 3.5 : tpl==="wader" ? 2.2 : 2.6;
  const legs = () => (G.legs||[]).forEach(([a,b],i)=>{
    if (f.oneleg && i===1){ P(`<polyline points="${a[0]},${a[1]} ${a[0]+8},${a[1]+14} ${a[0]-2},${a[1]+12}" fill="none" stroke="${c.g}" stroke-width="${lw}" stroke-linecap="round" stroke-linejoin="round"/>`); return; }
    P(L(a[0],a[1],b[0],b[1],c.g,lw));
    const fc = f.feet || c.g;
    if (tpl==="cling") return;
    P(E(b[0]+2.5,b[1]+0.5,f.feet||tpl==="ground"&&B.group==="ocean"?4.5:3.2,1.4,0,fc));
  });

  /* ---- tail ---- */
  const tm = +(f.tail||1);
  const tail = () => {
    if (!G.tail || tpl==="penguin" || f.peacockfan || f.tailfan) return;
    let pts = G.tail;
    if (tm!==1){ const base=[pts[0][0],pts[0][1]]; pts=pts.map((p,i)=> i===0 ? p : [base[0]+(p[0]-base[0])*tm, base[1]+(p[1]-base[1])*tm]); }
    const rot = f.tailup ? ` transform="rotate(${tpl==="ground"?40:70} ${pts[0][0]} ${pts[0][1]})"` : "";
    if (f.fork){ const [a,b2]=[pts[0],pts[pts.length-1]]; const mid=pts[1]||b2;
      P(`<g${rot}>${PG([pts[0],[mid[0]-6,mid[1]+8],[mid[0]+2,mid[1]+2],[b2[0]+4,b2[1]],[b2[0]-4,b2[1]+10],pts[0]],c.t)}</g>`); return; }
    P(`<g${rot}>${PG(pts,c.t)}${f.tailtip?PG([pts[pts.length-2],pts[pts.length-1],[(pts[pts.length-1][0]*3+pts[0][0])/4,(pts[pts.length-1][1]*3+pts[0][1])/4],[(pts[pts.length-2][0]*3+pts[0][0])/4,(pts[pts.length-2][1]*3+pts[0][1])/4]],f.tailtip):""}</g>`);
  };

  /* ---- flight wings ---- */
  const lwing = f.longwing ? 1.35 : 1;
  const farWing = () => P(PG([[44,49],[44+18*lwing,49-30*lwing],[44+25*lwing,49-28*lwing],[56,51]],shade(c.w,-25)));
  const nearWing = () => { const tip=[[30-6*(lwing-1)*10/4,14-4*(lwing-1)],[41,13-4*(lwing-1)]];
    P(PG([[40,51],tip[0],tip[1],[56,51]],c.w));
    if (f.tips) P(PG([tip[0],tip[1],[38.5,22],[32,23]],f.tips));
  };

  /* ---- body ---- */
  const body = () => {
    const [cx,cy,rx,ry,rot]=G.body; P(E(cx,cy,rx,ry,rot,c.b));
    if (G.belly && tpl!=="water"){ const [bx,by,brx,bry,br]=G.belly; P(E(bx,by,brx,bry,br,c.l));
      if (f.lowbelly) P(E(bx-2,by+5,brx*0.7,bry*0.55,br,f.lowbelly));
      if (f.chest) P(E(bx+brx*0.35,by-bry*0.35,brx*0.6,bry*0.6,br,f.chest));
      if (f.flank) P(E(bx-brx*0.35,by+bry*0.1,brx*0.5,bry*0.5,br,f.flank));
      const pat = f.streaks||f.barred||(f.spots&&tpl!=="cling"?f.spots:null);
      if (f.streaks) for(let i=0;i<6;i++) P(L(bx-brx*0.5+i*brx*0.22,by-bry*0.3+(i%2)*3,bx-brx*0.5+i*brx*0.22-1,by-bry*0.3+(i%2)*3+4,f.streaks,1.3));
      if (f.barred) for(let i=0;i<4;i++) P(L(bx-brx*0.55,by-bry*0.5+i*bry*0.35,bx+brx*0.55,by-bry*0.5+i*bry*0.35,f.barred,1.2,`opacity=".75" transform="rotate(${br||0} ${bx} ${by})"`));
      if (f.spots && !pat?.startsWith) {}
      if (f.speckles) for(let i=0;i<14;i++) P(C(cx-rx*0.6+((i*37)%100)/100*rx*1.3, cy-ry*0.5+((i*53)%100)/100*ry, 0.9, f.speckles));
      if (f.throatspots) for(let i=0;i<4;i++) P(C(hx+2+i*2.4-4, hy+hr*0.95, 0.9, "#111"));
    }
    if (tpl==="water"){ if (f.chest) P(E(cx+rx*0.7,cy-2,7,8,0,f.chest)); }
    if (tpl==="kiwi" || f.shaggy) for(let i=0;i<12;i++) P(L(cx-rx*0.7+i*rx*0.13,cy-ry*0.4+(i%3)*5,cx-rx*0.7+i*rx*0.13-2,cy-ry*0.4+(i%3)*5+4,shade(c.b,-25),1.2));
  };
  const wing = () => {
    if (!G.wing) return;
    const [wx,wy,wrx,wry,wr]=G.wing;
    P(E(wx,wy,wrx,wry,wr,c.w));
    if (f.stripes) for(let i=0;i<4;i++) P(L(wx-wrx*0.4,wy-wry*0.6+i*wry*0.4,wx+wrx*0.4,wy-wry*0.6+i*wry*0.4,f.stripes,1.6,`transform="rotate(${wr} ${wx} ${wy})"`));
    if (f.checker) for(let i=0;i<10;i++) P(C(wx-wrx*0.7+(i%5)*wrx*0.35, wy-wry*0.3+Math.floor(i/5)*wry*0.6, 0.9, f.checker));
    if (f.wingbar) P(L(wx-wrx*0.45,wy+wry*0.1,wx+wrx*0.35,wy-wry*0.25,f.wingbar,1.8,`transform="rotate(${tpl==="perch"?0:wr} ${wx} ${wy})"`));
    if (f.wingband) P(E(wx,wy+wry*0.45,wrx*0.95,wry*0.45,wr,f.wingband));
    if (f.shoulder) P(E(wx+wrx*0.45,wy-wry*0.2,wrx*0.32,wry*0.45,wr,f.shoulder));
    if (f.speculum) P(E(wx+wrx*0.1,wy+wry*0.1,wrx*0.3,wry*0.35,wr,f.speculum));
    if (f.sail) P(PG([[wx+2,wy-wry],[wx+8,wy-wry-9],[wx+12,wy-wry+1]],f.sail));
    if (f.wingtip) P(E(wx-wrx*0.75,wy+wry*0.15,wrx*0.35,wry*0.5,wr,f.wingtip));
    if (f.back) P(E(wx+2,wy-wry*0.5,wrx*0.6,wry*0.4,wr,f.back));
    if (f.spots){ const [cx,cy,rx,ry]=G.body; for(let i=0;i<12;i++) P(C(cx-rx*0.6+((i*41)%100)/100*rx*1.2, cy-ry*0.45+((i*67)%100)/100*ry*1.05, B.group==="farm"?1.3:1, f.spots)); }
  };

  /* ---- neck ---- */
  const neck = () => {
    const nc = f.neck && f.neck.startsWith("#") ? f.neck : c.h;
    if (tpl==="water"){
      if (G.n===0) P(E(hx-3,hy+6,7,8,0,c.h));
      if (G.n===1) P(`<path d="M${B.bs==="pouch"?52:62} 60 Q${B.bs==="pouch"?58:70} 50 ${hx-1} ${hy+4}" stroke="${tpl==="water"&&B.f.cheek?c.h:nc}" stroke-width="7" fill="none" stroke-linecap="round"/>`);
      if (G.n===2) P(`<path d="M60 60 C78 50 54 34 ${hx-1} ${hy+3}" stroke="${nc}" stroke-width="6" fill="none" stroke-linecap="round"/>`);
    }
    if (tpl==="wader") P(`<path d="M58 46 Q72 38 ${hx-2} ${hy+4}" stroke="${nc}" stroke-width="5" fill="none" stroke-linecap="round"/>`);
    if (tpl==="tall") P(`<path d="M58 40 Q68 28 ${hx-1} ${hy+3}" stroke="${nc}" stroke-width="5" fill="none" stroke-linecap="round"/>`);
    if (tpl==="ground") P(L(61,46,hx-2,hy+4,c.h,11));
    if (tpl==="perch") P(E(hx-4,hy+8,9,8,-20,c.h));
    if (tpl==="hover") P(E(hx-3,hy+4,5,4,-20,c.h));
    if (tpl==="flight") P(E(hx-4,hy+2,6,4.5,-10,c.h));
  };

  /* ---- head ---- */
  const head = () => {
    if (f.crest) { const cc = f.crest===true ? c.h : f.crest;
      P(PG([[hx-hr*0.2,hy-hr*0.8],[hx-hr*0.95,hy-hr*1.75],[hx-hr*0.15,hy-hr*1.35],[hx+hr*0.35,hy-hr*0.85]],cc)); }
    if (f.tufts){ P(PG([[hx-hr*0.75,hy-hr*0.6],[hx-hr*0.95,hy-hr*1.45],[hx-hr*0.3,hy-hr*0.85]],c.h)); P(PG([[hx+hr*0.75,hy-hr*0.6],[hx+hr*0.95,hy-hr*1.45],[hx+hr*0.3,hy-hr*0.85]],c.h)); }
    if (f.comb){ for(let i=0;i<4;i++) P(C(hx-hr*0.5+i*hr*0.38,hy-hr*0.95-(i%2)*1.5,hr*0.32,"#E0202A")); }
    if (f.plume) P(`<path d="M${hx-hr*0.6} ${hy-hr*0.4} Q${hx-hr*2.6} ${hy-hr*0.3} ${hx-hr*3.2} ${hy+hr*0.8}" stroke="${f.plume}" stroke-width="1.6" fill="none"/>`);
    if (f.casque && tpl!=="perch") P(E(hx+hr*0.1,hy-hr*1.05,hr*0.5,hr*0.75,-10,f.casque));
    P(C(hx,hy,hr,f.bald&&tpl==="upright"?c.h:c.h));
    if (f.bald && tpl==="upright") P(E(hx-hr*0.6,hy+hr*0.95,hr*0.9,hr*0.45,0,c.b));
    // features inside the head outline
    const inside=[];
    if (f.cap) inside.push(`<rect x="${hx-hr}" y="${hy-hr}" width="${hr*2}" height="${hr*0.85}" fill="${f.cap}"/>`);
    if (f.forehead) inside.push(C(hx+hr*0.55,hy-hr*0.75,hr*0.5,f.forehead));
    if (f.nape) inside.push(C(hx-hr*0.9,hy-hr*0.3,hr*0.45,f.nape));
    if (f.face) inside.push(E(hx+hr*0.35,hy,hr*0.6,hr*0.55,0,f.face));
    if (f.cheek) inside.push(E(hx-hr*0.05,hy+hr*0.45,hr*0.55,hr*0.4,0,f.cheek));
    if (f.mask) inside.push(`<rect x="${hx-hr*0.2}" y="${G.eye[1]-hr*0.28}" width="${hr*1.3}" height="${hr*0.5}" fill="${f.mask}"/>`);
    if (f.brow) inside.push(`<rect x="${hx-hr*0.6}" y="${G.eye[1]-hr*0.42}" width="${hr*1.4}" height="${hr*0.17}" fill="${f.brow}"/>`);
    if (f.facestripe) inside.push(`<rect x="${hx-hr}" y="${G.eye[1]+hr*0.15}" width="${hr*2}" height="${hr*0.18}" fill="${f.facestripe}"/>`);
    if (f.mustache) inside.push(`<rect x="${G.eye[0]-hr*0.15}" y="${G.eye[1]}" width="${hr*0.22}" height="${hr*0.9}" fill="${f.mustache}"/>`);
    if (f.earpatch) inside.push(E(hx-hr*0.35,hy+hr*0.35,hr*0.35,hr*0.6,15,f.earpatch));
    if (f.disc) inside.push(E(hx,hy+hr*0.05,hr*0.85,hr*0.72,0,f.disc));
    if (f.heart) inside.push(`<path d="M${hx} ${hy-hr*0.45} Q${hx-hr*0.95} ${hy-hr*1.05} ${hx-hr*0.85} ${hy+hr*0.1} Q${hx-hr*0.5} ${hy+hr*0.8} ${hx} ${hy+hr*0.85} Q${hx+hr*0.5} ${hy+hr*0.8} ${hx+hr*0.85} ${hy+hr*0.1} Q${hx+hr*0.95} ${hy-hr*1.05} ${hx} ${hy-hr*0.45}Z" fill="#FFFDF8"/>`);
    if (f.jaw) inside.push(E(hx+hr*0.7,hy+hr*0.35,hr*0.3,hr*0.2,0,f.jaw));
    if (inside.length) P(`<g clip-path="url(#${u}h)">${inside.join("")}</g>`);
    if (f.earpatch && tpl==="penguin") P(E(hx-hr*0.2,hy+hr*1.1,hr*0.3,hr*0.5,-20,f.earpatch));
    if (f.neckring) P(`<path d="M${hx-hr*0.9} ${hy+hr*0.55} Q${hx} ${hy+hr*1.35} ${hx+hr*0.85} ${hy+hr*0.6}" stroke="${f.neckring}" stroke-width="${Math.max(1.6,hr*0.22)}" fill="none"/>`);
    if (f.band) P(`<path d="M${G.body[0]+4} ${G.body[1]-G.body[3]*0.75} Q${G.body[0]+G.body[2]*0.75} ${G.body[1]-G.body[3]*0.2} ${G.body[0]+G.body[2]*0.8} ${G.body[1]-G.body[3]*0.65}" stroke="${f.band}" stroke-width="2.4" fill="none"/>`);
    if (f.throat && tpl!=="hover") P(E(hx+hr*0.35,hy+hr*0.78,hr*0.5,hr*0.42,0,f.throat));
    if (f.throat && tpl==="hover") P(E(hx+1.5,hy+4.5,3.6,2.8,-20,f.throat));
    if (f.bib) P(E(hx+hr*0.15,hy+hr*1.05,hr*0.65,hr*0.5,0,f.bib));
    if (f.beard) for(let i=0;i<3;i++) P(PG([[hx+hr*0.1+i*2.5,hy+hr*0.75],[hx+hr*0.25+i*2.5,hy+hr*1.25],[hx+hr*0.45+i*2.5,hy+hr*0.7]],c.h));
    if (f.balloon) P(E(hx+hr*0.25,hy+hr*1.55,hr*0.85,hr*0.95,0,f.balloon));
  };

  /* ---- beak ---- */
  const beak = () => {
    const [bx,by]=G.beak, bl=B.bl, s=hs;
    let d;
    switch(B.bs){
      case "cone": { const Ln=9*bl*s; d=`M${bx-1} ${by-4*s} L${bx+Ln} ${by} L${bx-1} ${by+4*s}Z`; break; }
      case "chisel": { const Ln=13*bl*s; d=`M${bx-1} ${by-2.6*s} L${bx+Ln} ${by-0.4*s} L${bx+Ln} ${by+0.6*s} L${bx-1} ${by+2.6*s}Z`; break; }
      case "hook": { const Ln=8*bl*s;
        if (tpl==="owl") { d=`M${bx-2.2} ${by-1} L${bx+2.2} ${by-1} L${bx} ${by+4.5*bl}Z`; break; }
        d=`M${bx-1} ${by-4.2*s} Q${bx+Ln*0.95} ${by-5*s} ${bx+Ln} ${by+2.5*s} Q${bx+Ln*0.75} ${by+1*s} ${bx+Ln*0.55} ${by+3.8*s} L${bx-1} ${by+4*s}Z`; break; }
      case "flat": { const Ln=11*bl*s; d=`M${bx-2} ${by-3*s} L${bx+Ln-2.5*s} ${by-2.6*s} Q${bx+Ln} ${by-2.6*s} ${bx+Ln} ${by} Q${bx+Ln} ${by+2.4*s} ${bx+Ln-2.5*s} ${by+2.4*s} L${bx-2} ${by+2.4*s}Z`; break; }
      case "long": { const Ln=(tpl==="kiwi"?16:24)*bl, dy=tpl==="kiwi"?14:0; d=`M${bx-1} ${by-1.6} L${bx+Ln} ${by+dy} L${bx-1} ${by+1.8}Z`; break; }
      case "curve": { const Ln=22*bl; d=`M${bx-1} ${by-1.8} Q${bx+Ln*0.65} ${by-2.5} ${bx+Ln} ${by+9*bl} Q${bx+Ln*0.55} ${by+1.5} ${bx-1} ${by+1.8}Z`; break; }
      case "spoon": { const Ln=20*bl; d=`M${bx-1} ${by-1.6} L${bx+Ln-3} ${by-0.8} Q${bx+Ln+4} ${by-3.5} ${bx+Ln+4} ${by+1.2} Q${bx+Ln+3} ${by+4.5} ${bx+Ln-3} ${by+1.2} L${bx-1} ${by+1.8}Z`; break; }
      case "bent": d=`M${bx-1} ${by-2.6} L${bx+8} ${by-2.2} Q${bx+13.5} ${by+0.5} ${bx+12.5} ${by+9} L${bx+9.5} ${by+8.2} Q${bx+9.5} ${by+2.4} ${bx-1} ${by+2.6}Z`; break;
      case "shoe": d=`M${bx-2} ${by-5} Q${bx+15} ${by-6.5} ${bx+15} ${by+0.5} Q${bx+12} ${by+7} ${bx-2} ${by+5}Z`; break;
      case "huge": { const Ln=26*bl*s; d=`M${bx-1.5} ${by-6.5*s} Q${bx+Ln*0.7} ${by-10*s} ${bx+Ln} ${by-1} Q${bx+Ln*0.75} ${by+5*s} ${bx-1.5} ${by+6.5*s}Z`; break; }
      case "puffin": d=`M${bx-1.5} ${by-6} L${bx+10} ${by+1} L${bx-1.5} ${by+7}Z`; break;
      case "pouch": { const Ln=22*bl; P(`<path d="M${bx} ${by+1.5} Q${bx+Ln*0.45} ${by+12} ${bx+Ln} ${by+2}Z" fill="${shade(c.k,-10)}"/>`);
        d=`M${bx-1} ${by-2} L${bx+Ln} ${by} L${bx+Ln} ${by+2} L${bx-1} ${by+2}Z`; break; }
      default: { const Ln=12*bl*s; d=`M${bx-1} ${by-2.2*s} L${bx+Ln} ${by+0.6*s} L${bx-1} ${by+2.4*s}Z`; }
    }
    P(`<clipPath id="${u}k"><path d="${d}"/></clipPath><path d="${d}" fill="${c.k}"/>`);
    const over=[];
    if (f.billtip) over.push(`<rect x="${bx+18*hs}" y="0" width="30" height="100" fill="${f.billtip}"/>`);
    if (f.rainbowbill){ ["#F28A1A","#E0202A","#2E7AD0"].forEach((col,i)=>over.push(`<rect x="${bx+6*hs+i*6*hs}" y="0" width="${5*hs}" height="100" fill="${col}"/>`)); }
    if (B.bs==="puffin"){ over.push(`<rect x="${bx-2}" y="0" width="3.2" height="100" fill="#3A5A8A"/>`); over.push(`<rect x="${bx+3}" y="0" width="1.6" height="100" fill="#F2D21B"/>`); }
    if (f.billspot) over.push(C(bx+(B.bs==="cone"?7*hs:4),by+1.6*hs,1.8,f.billspot));
    if (B.bs==="bent") over.push(`<rect x="${bx+8}" y="${by+3}" width="10" height="10" fill="#111"/>`);
    if (over.length) P(`<g clip-path="url(#${u}k)">${over.join("")}</g>`);
    if (f.knob) P(E(bx+1,by-3.2*hs,2.2*hs,2*hs,0,f.knob));
    if (f.shield) P(E(bx-0.5,by-3.5*hs,2*hs,3.6*hs,0,f.shield));
    if (f.casque && tpl==="perch") P(`<path d="M${bx-1} ${by-6*hs} Q${bx+8*hs} ${by-13*hs} ${bx+16*hs} ${by-8*hs} Q${bx+8*hs} ${by-6*hs} ${bx-1} ${by-6*hs}Z" fill="${f.casque}"/>`);
    if (f.wattle) P(`<path d="M${bx-1} ${by+3*hs} Q${bx+2} ${by+10*hs} ${bx-3} ${by+11*hs} Q${bx-6} ${by+7*hs} ${bx-1} ${by+3*hs}Z" fill="${f.wattle===true?"#E0202A":f.wattle}"/>`);
  };

  /* ---- eye ---- */
  const eye = () => {
    const er = Math.max(1.4, hr*0.17);
    if (tpl==="owl"){
      const ec = f.eye || "#F2C230";
      [[hx-hr*0.38,hy-hr*0.05],[hx+hr*0.38,hy-hr*0.05]].forEach(([x,y])=>{ P(C(x,y,hr*0.27,ec)); P(C(x,y,hr*0.15,"#111")); P(C(x-hr*0.06,y-hr*0.07,hr*0.05,"#fff")); });
      return;
    }
    const [ex,ey]=G.eye;
    if (f.eyering) P(C(ex,ey,er*1.7,f.eyering));
    if (f.eye){ P(C(ex,ey,er*1.25,f.eye)); }
    P(C(ex,ey,er,"#111")); P(C(ex+er*0.35,ey-er*0.35,er*0.38,"#fff"));
  };

  /* ---- assemble by scene ---- */
  if (tpl==="flight"){ farWing(); tail(); body(); nearWing(); neck(); head(); beak(); eye(); }
  else if (tpl==="hover"){
    P(E(42,38,4.5,13,-25,"#DDEEFF","opacity=\".75\"")); tail(); body(); neck(); head(); beak(); eye();
    P(E(46,34,4.5,14,-5,"#EEF6FF","opacity=\".8\""));
  }
  else if (tpl==="water"){ tail(); body(); wing(); neck(); head(); beak(); eye();
    P(`<path d="M0 68 Q12 65 25 68 T50 68 T75 68 T100 68 V100 H0Z" fill="#4FA8DA"/>`); P(`<path d="M8 78 Q16 75 24 78 M56 84 Q64 81 72 84" stroke="#BFE6FF" stroke-width="1.6" fill="none"/>`); }
  else if (tpl==="penguin"){ body(); wing(); head(); beak(); eye();
    P(E(44,87,5,2,0,c.g)); P(E(57,87,5,2,0,c.g)); }
  else { tail(); legs(); body(); wing(); neck(); head(); beak(); eye(); }

  if (tpl==="flight"){ const parts=o.splice(birdStart); o.push(`<g transform="translate(8 16) scale(0.84)">${parts.join("")}</g>`); }
  if (opt.nobg) o.splice(1, birdStart-1);
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${B.name}">${o.join("")}</svg>`;
}

