export const lessonsData = [
  {
    id: 1,
    number: "I",
    title: "Some Useful Words & Pronouns",
    category: "Vocabulary",
    description: "Learn foundational Kokborok pronouns (I, We, You, He/She, They), possessives, and essential question/location words.",
    grammarRule: "Pronouns in Kokborok form possessives by adding the suffix '-ni' (e.g. Nini = Your, Ani = My). Adding '-no' creates the object form (e.g. Nono = To You, Ano = Me).",
    items: [
      { kokborok: "Ang", english: "I", bengali: "আমি", type: "Pronoun" },
      { kokborok: "Chwng", english: "We", bengali: "আমরা", type: "Pronoun" },
      { kokborok: "Nwng", english: "You", bengali: "তুমি", type: "Pronoun", audioUrl: "https://res.cloudinary.com/naqb7hm2/video/upload/v1786884022/nwng_mvf2co.aac" },
      { kokborok: "Nohrok", english: "You all", bengali: "তোমরা সব", type: "Pronoun" },
      { kokborok: "Nini", english: "Your / Yours", bengali: "তোমার", type: "Possessive" },
      { kokborok: "Nohrokni", english: "Your all (possessive)", bengali: "তোমাদের", type: "Possessive" },
      { kokborok: "Bo", english: "He / She", bengali: "সে / তিনি", type: "Pronoun" },
      { kokborok: "Bohrok", english: "They", bengali: "তারা", type: "Pronoun" },
      { kokborok: "Bohrokni", english: "Theirs", bengali: "তাদের", type: "Possessive" },
      { kokborok: "Nono", english: "To You", bengali: "তোমাকে", type: "Pronoun" },
      { kokborok: "Bohrokno", english: "To You all / Them", bengali: "তোমাদেরকে / তাদেরকে", type: "Pronoun" },
      { kokborok: "Ano", english: "Me", bengali: "আমাকে", type: "Pronoun" },
      { kokborok: "Ani", english: "My / Mine", bengali: "আমার", type: "Possessive" },
      { kokborok: "Chini", english: "Ours", bengali: "আমাদের", type: "Possessive" },
      { kokborok: "Bono", english: "Him / Her", bengali: "তাকে", type: "Pronoun" },
      { kokborok: "Bin", english: "His / Her", bengali: "তার", type: "Possessive" },
      { kokborok: "Sabo", english: "Who", bengali: "কে", type: "Question" },
      { kokborok: "Sabono", english: "Whom", bengali: "কাকে", type: "Question" },
      { kokborok: "Tamo", english: "What", bengali: "কী", type: "Question" },
      { kokborok: "Tamungwi", english: "Why", bengali: "কেন", type: "Question" },
      { kokborok: "Boro", english: "Where", bengali: "কোথায়", type: "Question" },
      { kokborok: "Aro", english: "There", bengali: "সেখানে", type: "Location" },
      { kokborok: "Oro", english: "Here", bengali: "এখানে", type: "Location" },
      { kokborok: "Buphru", english: "When", bengali: "কখন", type: "Question" },
      { kokborok: "Mung", english: "Name", bengali: "নাম", type: "Noun" },
      { kokborok: "Kami", english: "Village", bengali: "গ্রাম", type: "Noun" },
      { kokborok: "Dohli", english: "Town", bengali: "শহর", type: "Noun" },
      { kokborok: "Dohliyung", english: "City", bengali: "নগরী / মহানগর", type: "Noun" },
      { kokborok: "Haste", english: "State", bengali: "রাজ্য", type: "Noun" },
      { kokborok: "Hakotor", english: "Country", bengali: "দেশ", type: "Noun" },
      { kokborok: "Hayung", english: "World", bengali: "পৃথিবী / বিশ্ব", type: "Noun" },
      { kokborok: "Nokha", english: "Sky", bengali: "আকাশ", type: "Noun" },
      { kokborok: "Nokhayung", english: "Universe", bengali: "মহাবিশ্ব", type: "Noun" }
    ],
    sampleSentences: [
      { english: "What is your name?", kokborok: "Nini mung tamo?", bengali: "তোমার নাম কী?" },
      { english: "My name is Mr. X.", kokborok: "Ani mung Mg. X.", bengali: "আমার নাম মি. X।" },
      { english: "Who are you?", kokborok: "Nwng sabo?", bengali: "তুমি কে?" },
      { english: "Where is your village?", kokborok: "Nini kami boro?", bengali: "তোমার গ্রাম কোথায়?" }
    ]
  },
  {
    id: 2,
    number: "II",
    title: "Root Verbs & Present, Past, Future Conjugations",
    category: "Grammar",
    description: "Understand the core verb root system. Standard suffix rules: Present/Imperative uses '-o / -di', Past uses '-kha', and Future uses '-nai'.",
    grammarRule: "Present/Imperative = Root + o / di | Past = Root + kha | Future = Root + nai",
    items: [
      { root: "Chah", meaning: "to eat", present: "Chahuo/Chahdi", past: "Chahkha", future: "Chahnai" },
      { root: "Swi", meaning: "to write", present: "Swio/Swidi", past: "Swikha", future: "Swinai" },
      { root: "Him", meaning: "to walk", present: "Himo/Himdi", past: "Himkha", future: "Himnai" },
      { root: "Achuk", meaning: "to sit", present: "Achugo/Achukdi", past: "Achukkha", future: "Achuknai" },
      { root: "Thahng", meaning: "to go", present: "Thahngo/Thahngdi", past: "Thahngkha", future: "Thahngnai" },
      { root: "Bwcha", meaning: "to stand up", present: "Bwchao/Bwchadi", past: "Bwchakha", future: "Bwchanai" },
      { root: "Bathak", meaning: "to stop", present: "Bathago/Bathakdi", past: "Bathakkha", future: "Bathaknai" },
      { root: "Rwchap", meaning: "to sing", present: "Rwchabo/Rwchapdi", past: "Rwchapkha", future: "Rwchapnai" },
      { root: "Mwsa", meaning: "to dance", present: "Mwsao/Mwsadi", past: "Mwsakha", future: "Mwsanai" },
      { root: "Kog", meaning: "to shoot / fire", present: "Kogo/Kogdi", past: "Kogkha", future: "Kognai" },
      { root: "Kap", meaning: "to cry", present: "Kabo/Kapdi", past: "Kapkha", future: "Kapnai" },
      { root: "Nai", meaning: "to see / watch", present: "Naio/Naidi", past: "Naikha", future: "Nainai" },
      { root: "Sa", meaning: "to speak", present: "Sao/Sadi", past: "Sakha", future: "Sanai" },
      { root: "Phai", meaning: "to come", present: "Phaio/Phaidi", past: "Phaikha", future: "Phainai" },
      { root: "Rom", meaning: "to hold / catch", present: "Romo/Romdi", past: "Romkha", future: "Romnai" },
      { root: "Pori", meaning: "to read", present: "Porio/Poridi", past: "Porikha", future: "Porinai" },
      { root: "Berai", meaning: "to tour / visit", present: "Beraio/Beraidi", past: "Beraikha", future: "Berainai" }
    ]
  },
  {
    id: 3,
    number: "III",
    title: "Making Small Sentences using Verbs",
    category: "Sentences",
    description: "Combine pronouns and conjugated root verbs into clear sentences in present, past, and future tenses.",
    sampleSentences: [
      { tense: "Present", english: "He eats", kokborok: "Bo Chahuo" },
      { tense: "Present", english: "They eat", kokborok: "Bohrok chahuo" },
      { tense: "Present/Imperative", english: "Sit down", kokborok: "Achukdi" },
      { tense: "Present/Imperative", english: "Sit down please", kokborok: "Achukjadi" },
      { tense: "Past", english: "I told", kokborok: "Ang sakha" },
      { tense: "Past", english: "We wrote", kokborok: "Chwng swikha" },
      { tense: "Past", english: "He came", kokborok: "Bo phaikha" },
      { tense: "Future", english: "I shall go", kokborok: "Ang thahngnai" },
      { tense: "Future", english: "We shall sing", kokborok: "Chwng rwchapnai" },
      { tense: "Future", english: "They will come", kokborok: "Bohrok phainai" }
    ]
  },
  {
    id: 4,
    number: "IV",
    title: "Extended Tense Suffixes: jak, ma, khna, anw, glak, ya",
    category: "Grammar",
    description: "Master nuance suffixes for past actions (completion/hearsay: -anw, -khna) and negative future actions (-glak, -ya).",
    grammarRule: "Past nuances: -anw, -khna | Future negation / probability: -glak, -ya, -anw",
    sampleSentences: [
      { type: "Past nuance", english: "I told", kokborok: "Ang thahnganw" },
      { type: "Past nuance", english: "They worked together", kokborok: "Bohrok tanglaikhna" },
      { type: "Future negative", english: "He will not come / He will dance", kokborok: "Bo mwsaya / Bo thahnglak" },
      { type: "Future expectation", english: "I shall go", kokborok: "Ang thahnganw" }
    ]
  },
  {
    id: 5,
    number: "V",
    title: "Present Perfect & Conversion of Verbs",
    category: "Grammar",
    description: "Learn how to express completed actions in the present (Present Perfect / Past Participle) using '-kha'.",
    sampleSentences: [
      { english: "He has eaten", kokborok: "Bo chahkha" },
      { english: "I have eaten", kokborok: "Ang chahkha" },
      { english: "Has come", kokborok: "Phaikha" },
      { english: "Has gone", kokborok: "Thahngkha" },
      { english: "Has read", kokborok: "Porikha" }
    ]
  },
  {
    id: 6,
    number: "VI",
    title: "Sentence Structure Rules: (V), (S+V), and (N+O+V)",
    category: "Grammar",
    description: "Kokborok follows Subject-Object-Verb (SOV) order. Contrast single-verb commands, Subject+Verb, and Noun+Object+Verb.",
    grammarRule: "Kokborok Sentence Structure: Subject + Object + Verb (SOV)",
    sampleSentences: [
      { pattern: "V (Verb only)", english: "Come", kokborok: "Phaio" },
      { pattern: "V (Verb only)", english: "Write", kokborok: "Swio" },
      { pattern: "S + V", english: "I eat", kokborok: "Ang chaho" },
      { pattern: "S + V", english: "We saw", kokborok: "Chwng naikha" },
      { pattern: "N + O + V", english: "I eat rice", kokborok: "Ang mai chahuo" },
      { pattern: "N + O + V", english: "We go there", kokborok: "Chwng uro thahngo" },
      { pattern: "N + O + V", english: "You read book", kokborok: "Nwng bijap porikha" }
    ]
  },
  {
    id: 7,
    number: "VII",
    title: "Complex Verbs: (N+V+V) and (N+N+V+V)",
    category: "Grammar",
    description: "Form advanced sentences with compound verbs and purpose infinitives (e.g., 'went to sleep', 'come to work').",
    sampleSentences: [
      { pattern: "N+V+V", english: "He is reading", kokborok: "Bo poriui tongo" },
      { pattern: "N+V+V", english: "I went to sleep", kokborok: "Ang thuna thahngkha" },
      { pattern: "N+V+V", english: "You come to go", kokborok: "Nwng thahngna phaidi" },
      { pattern: "N+N+V+V", english: "You come to do work", kokborok: "Nwng samung tangna phaidi" },
      { pattern: "N+N+V+V", english: "He remains eating rice", kokborok: "Bo mai chahui tongo" }
    ]
  },
  {
    id: 8,
    number: "VIII",
    title: "Time & Celestial Vocabulary",
    category: "Vocabulary",
    description: "Learn terms for days of the week, times of day, sun, moon, and seasons.",
    items: [
      { kokborok: "Tini", english: "Today", bengali: "আজ" },
      { kokborok: "Khwna", english: "Tomorrow", bengali: "আগামীকাল" },
      { kokborok: "Soni", english: "Day after tomorrow", bengali: "পরশু (আগামী)" },
      { kokborok: "Miya", english: "Yesterday", bengali: "গতকাল" },
      { kokborok: "Okhlwi / Khlwi", english: "Day before yesterday", bengali: "গত পরশু" },
      { kokborok: "Sal", english: "Day / Sun", bengali: "দিন / সূর্য" },
      { kokborok: "Satung", english: "Sunbeam / Sunlight", bengali: "রোদ / সূর্যালোক" },
      { kokborok: "Hor", english: "Night", bengali: "রাত" },
      { kokborok: "Aichuk", english: "Dawn", bengali: "ভোর" },
      { kokborok: "Phung", english: "Morning", bengali: "সকাল" },
      { kokborok: "Sarik", english: "Afternoon", bengali: "দুপুর / অপরাহ্ন" },
      { kokborok: "Sanja", english: "Evening", bengali: "সন্ধ্যা" },
      { kokborok: "Tal", english: "Month / Moon", bengali: "মাস / চাঁদ" },
      { kokborok: "Mol", english: "Season", bengali: "ঋতু" }
    ]
  },
  {
    id: 9,
    number: "IX",
    title: "Interrogative Sentences & Question Words",
    category: "Phrases",
    description: "Form questions using question particles: tamo, de, boro, buphru, made, bahai, khade, yade, naide.",
    sampleSentences: [
      { questionWord: "Tamo", english: "What is your name?", kokborok: "Nini mung tamo?" },
      { questionWord: "De", english: "Do you eat rice?", kokborok: "Nwng maide chahkha?" },
      { questionWord: "Boro", english: "Where has he gone?", kokborok: "Bo boro thahng?" },
      { questionWord: "Buphru", english: "When will you eat?", kokborok: "Nwng buphru chahnai?" },
      { questionWord: "Bahai", english: "How are you?", kokborok: "Bahai nwng kaham-kwrwngde?" },
      { questionWord: "Khade", english: "Have you eaten?", kokborok: "Nwng chahkhade?" },
      { questionWord: "Yade", english: "Will you not dance?", kokborok: "Nwng mwsayade?" },
      { questionWord: "Naide", english: "Will you all come?", kokborok: "Nohrok phainaide?" }
    ]
  },
  {
    id: 10,
    number: "X",
    title: "Negative Sense Form Verbs",
    category: "Grammar",
    description: "Master negative markers: ya, yakhu, yana, glak, niya, ta, kwrwi.",
    grammarRule: "ya (do not) | yakhu (did not yet) | yana (perhaps did not) | glak/niya (will not) | ta (do not - imperative prohibition) | kwrwi (have no / none)",
    sampleSentences: [
      { marker: "ya", english: "I do not eat rice", kokborok: "Ang mai chahya" },
      { marker: "yakhu", english: "He did not come", kokborok: "Bo phaiyakhu" },
      { marker: "glak", english: "Perhaps he did not go", kokborok: "Bo thahnglak" },
      { marker: "ta", english: "You do not go today (Don't go)", kokborok: "Nwng tini tathahngdi" },
      { marker: "kwrwi", english: "I have no food", kokborok: "Ani chahna kwrwi" }
    ]
  },
  {
    id: 11,
    number: "XI",
    title: "Silence of 'To Be' Verbs (am, is, are)",
    category: "Grammar",
    description: "In simple present identity or state sentences, 'am', 'is', and 'are' are omitted in Kokborok.",
    sampleSentences: [
      { english: "I am Kolompa", kokborok: "Ang Kolompa" },
      { english: "He is Tripuris", kokborok: "Bo Tiprasa" },
      { english: "You are happy", kokborok: "Nwng tongthokjak" }
    ]
  },
  {
    id: 12,
    number: "XII",
    title: "Using 'Wng' to represent State / Becoming",
    category: "Grammar",
    description: "When explicitly expressing state, status, or identity, the verb 'Wng' (wngkha) represents am/is/are/became.",
    sampleSentences: [
      { english: "I am Mr. Kwplai", kokborok: "Ang wngkha Mg. Kwplai" },
      { english: "He is Chairman", kokborok: "Bo wngkha Chairman" },
      { english: "What is the matter with you?", kokborok: "Nohrok tamo wng?" }
    ]
  },
  {
    id: 13,
    number: "XIII",
    title: "Present Continuous Tense (-wi / -ui)",
    category: "Grammar",
    description: "Form continuous action verbs ('is writing', 'am eating') by attaching suffix '-wi' or '-ui' + 'tongo'.",
    grammarRule: "Continuous verb = Root + wi/ui + tongo",
    sampleSentences: [
      { suffix: "-wi", english: "He is writing", kokborok: "Swiwi tongo" },
      { suffix: "-wi", english: "They are going", kokborok: "Thahngwi tongo" },
      { suffix: "-wi", english: "We are walking", kokborok: "Chwng himwi tongo" },
      { suffix: "-ui", english: "I am eating", kokborok: "Ang chahui tongo" },
      { suffix: "-ui", english: "I am reading", kokborok: "Ang poriui tongo" }
    ]
  },
  {
    id: 14,
    number: "XIV",
    title: "Honorific Terms for Courtesy (Ja & Nohrok)",
    category: "Phrases",
    description: "Learn respectful honorific speech markers used when addressing elders, in-laws, or guests.",
    sampleSentences: [
      { english: "Please sit down", kokborok: "Achukjadi" },
      { english: "Please take seat (elder)", kokborok: "Nohrok achukjadi" },
      { english: "Please drink", kokborok: "Nwngjadi" },
      { english: "Please, do not speak", kokborok: "Kok tasajadi" },
      { english: "Please come", kokborok: "Phaijadi" }
    ]
  },
  {
    id: 15,
    number: "XV",
    title: "Parts of the Body & Plurals (-rok / -song)",
    category: "Vocabulary",
    description: "Comprehensive anatomy vocabulary and plural suffix rules ('-rok' for objects/parts, '-song' for social relations).",
    grammarRule: "Plural Suffixes: -rok (General plural: Bokhorokrok = Heads) | -song (Kinship/Partners: Logisong = Partners)",
    items: [
      { kokborok: "Bokhorok / Khorok", english: "Head", bengali: "মাথা" },
      { kokborok: "Bukhuk / Khuk", english: "Mouth", bengali: "মুখ" },
      { kokborok: "Bwkhwnai / Khwnai", english: "Hair", bengali: "চুল" },
      { kokborok: "Bukung / Kung", english: "Nose", bengali: "নাক" },
      { kokborok: "Bukhunju / Khunju", english: "Ear", bengali: "কান" },
      { kokborok: "Bumakhang / Mwkhang", english: "Face", bengali: "মুখমণ্ডল" },
      { kokborok: "Bukur / Kur", english: "Skin", bengali: "ত্বক" },
      { kokborok: "Bekereng", english: "Bone", bengali: "হাড়" },
      { kokborok: "Bwchang", english: "Waist", bengali: "কোমর" },
      { kokborok: "Bwkha / Kha", english: "Heart", bengali: "হৃদয়" },
      { kokborok: "Bohok / Ok", english: "Stomach", bengali: "পেট" },
      { kokborok: "Bua / Ua", english: "Tooth", bengali: "দাঁত" },
      { kokborok: "Mokol", english: "Eye", bengali: "চোখ" },
      { kokborok: "Khumchwi", english: "Lip", bengali: "ঠোঁট" },
      { kokborok: "Phikung", english: "Back", bengali: "পিঠ" },
      { kokborok: "Khaklap", english: "Chest", bengali: "বুক" },
      { kokborok: "Yak", english: "Hand", bengali: "হাত" },
      { kokborok: "Yaktwk", english: "Arm", bengali: "বাহু" },
      { kokborok: "Yasi", english: "Finger", bengali: "আঙুল" },
      { kokborok: "Yapri", english: "Step", bengali: "পদক্ষেপ" },
      { kokborok: "Yakung", english: "Leg", bengali: "পা" }
    ]
  },
  {
    id: 16,
    number: "XVI",
    title: "Kinship Vocabulary & 3-Person Forms",
    category: "Vocabulary",
    description: "Understand family relations and how Kokborok changes terms based on person (My Father = Apha, Your Father = Nwpha, His Father = Bupha).",
    grammarRule: "1st Person (My): A- prefix | 2nd Person (Your): Nw- prefix | 3rd Person (His/Her): Bu-/Bi- prefix",
    items: [
      { kokborok: "Pha", english: "Father", my: "Apha", your: "Nwpha", hisHer: "Bupha" },
      { kokborok: "Ma", english: "Mother", my: "Ama", your: "Nwma", hisHer: "Buma" },
      { kokborok: "Sajla", english: "Son", my: "Angsajla", your: "Nwsajla", hisHer: "Bwsajla" },
      { kokborok: "Sajwk", english: "Daughter", my: "Angsajwk", your: "Nwsajwk", hisHer: "Bwsajwk" },
      { kokborok: "Hanok", english: "Younger Sister", my: "Anghanok", your: "Nahanok", hisHer: "Bahanok" },
      { kokborok: "Sai", english: "Husband", my: "Angsai", your: "Nwsai", hisHer: "Bwsai" },
      { kokborok: "Hik", english: "Wife", my: "Anghik", your: "Nihik", hisHer: "Bihik" }
    ]
  },
  {
    id: 17,
    number: "XVII",
    title: "Clothing, Nature & Environment Words",
    category: "Vocabulary",
    description: "Learn terms for Tripuri handwoven textiles (Rignai, Risa), dress, landscape, rivers, and atmosphere.",
    items: [
      { kokborok: "Ri", english: "Cloth", bengali: "কাপড়" },
      { kokborok: "Rignai", english: "Traditional lower cloth for women", bengali: "রিগনই (নারীদের নিম্নবাস)" },
      { kokborok: "Risa", english: "Traditional chest cover cloth", bengali: "রিসা (বক্ষবন্ধনী)" },
      { kokborok: "Rang-ri", english: "Wealth", bengali: "সম্পদ" },
      { kokborok: "Hati", english: "Market", bengali: "বাজার" },
      { kokborok: "Twi", english: "Water", bengali: "জল / পানি" },
      { kokborok: "Twima", english: "River", bengali: "নদী" },
      { kokborok: "Twisa", english: "Small Rivulet / Stream", bengali: "ছোট নদী / ঝরনা" },
      { kokborok: "Twijlang", english: "Ocean", bengali: "মহাসাগর" },
      { kokborok: "Uatwi", english: "Rain", bengali: "বৃষ্টি" },
      { kokborok: "Nobar", english: "Air / Wind", bengali: "বাতাস" },
      { kokborok: "Chumui", english: "Cloud", bengali: "মেঘ" },
      { kokborok: "Athukiri", english: "Star", bengali: "তারা" }
    ]
  },
  {
    id: 18,
    number: "XVIII",
    title: "Colors & Tastes with Verb Forms",
    category: "Vocabulary",
    description: "Master color terms (Kuphur, Kosom, Kwchak) and tastes (Kwtwi, Kwkhwi, Kwkha) along with state-changing verb forms.",
    items: [
      { kokborok: "Kuphur", english: "White", verbPresent: "Phuro", verbPast: "Phurkha", verbFuture: "Phurnai" },
      { kokborok: "Kosom", english: "Black", verbPresent: "Somo", verbPast: "Somkha", verbFuture: "Somnai" },
      { kokborok: "Kwchak", english: "Red", verbPresent: "Khago", verbPast: "Chakkha", verbFuture: "Chaknai" },
      { kokborok: "Kwkhrang", english: "Green", bengali: "সবুজ" },
      { kokborok: "Kormo", english: "Yellow", bengali: "হলুদ" },
      { kokborok: "Pimol", english: "Blue", bengali: "নীল" },
      { kokborok: "Kwtwi", english: "Sweet", verbPresent: "Twio", verbPast: "Twikha", verbFuture: "Twinai" },
      { kokborok: "Kwkhwi", english: "Sour", verbPresent: "Khwio", verbPast: "Khwikha", verbFuture: "Khwinai" },
      { kokborok: "Kwkha", english: "Bitter", bengali: "তিতা" },
      { kokborok: "Kwsai", english: "Stale / Tasteless", verbPresent: "Saio", verbPast: "Saikha", verbFuture: "Sainai" },
      { kokborok: "Kwran", english: "Dry", verbPresent: "Rano", verbPast: "Rankha", verbFuture: "Rannai" },
      { kokborok: "Kwrak", english: "Hard / Strong", bengali: "শক্ত" },
      { kokborok: "Kutung", english: "Hot", bengali: "গরম" }
    ]
  },
  {
    id: 19,
    number: "XIX",
    title: "Noun Formation with Root Verbs & Suffixes",
    category: "Grammar",
    description: "Learn how adding suffixes '-mung', '-thai', and '-nai' converts root verbs into nouns, objects, and agents.",
    grammarRule: "-mung (Action/State Noun: Chah + mung = Chahmung Food) | -thai (Utility/Requirement: Chah + thai = Chahthai Necessary Food) | -nai (Agent: Chah + nai = Chahnai Eater)",
    sampleSentences: [
      { root: "Chah (to eat)", noun: "Chahmung (Food)", english: "Food" },
      { root: "Nwng (to drink)", noun: "Nwngmung (Drinks)", english: "Drinks" },
      { root: "Tang (to do)", noun: "Tangmung (Work)", english: "Work" },
      { root: "Naithok (Nice)", noun: "Naithokmung (Beauty)", english: "Beauty" },
      { root: "Phai (to come)", agent: "Phainai (Comer / Guest)", english: "One who comes" }
    ]
  },
  {
    id: 20,
    number: "XX",
    title: "Uses of Gender (Masculine, Feminine, Common, Neutral)",
    category: "Grammar",
    description: "Understand the 4 gender categories in Kokborok and their specific vocabulary markers.",
    items: [
      { category: "Masculine", kokborok: "Chwla", english: "Man" },
      { category: "Masculine", kokborok: "Togla", english: "Rooster / Cock" },
      { category: "Feminine", kokborok: "Bwrwi", english: "Woman" },
      { category: "Feminine", kokborok: "Tokma", english: "Hen" },
      { category: "Common", kokborok: "Borok", english: "Human being / Person" },
      { category: "Common", kokborok: "Sah", english: "Child (Son or Daughter)" },
      { category: "Neutral", kokborok: "Bijap", english: "Book" },
      { category: "Neutral", kokborok: "Nok", english: "House" }
    ]
  },
  {
    id: 21,
    number: "XXI",
    title: "Forming Adjectives by Affixing Prefixes",
    category: "Grammar",
    description: "Learn how root words turn into adjectives by attaching prefixes (Ko-, Kw-, Ki-, Ke-, Ka-).",
    grammarRule: "Root + Prefix = Adjective (e.g. Sok -> Ko-sok = Kosok / Rotted; Chang -> Kw-chang = Kwchang / Cold)",
    items: [
      { root: "Sok (to rot)", prefix: "Ko-", adjective: "Kosok", meaning: "Rotted" },
      { root: "Chang (to cold)", prefix: "Kw-", adjective: "Kwchang", meaning: "Cold" },
      { root: "Som (to black)", prefix: "Ko-", adjective: "Kosom", meaning: "Black" },
      { root: "Chik (to tear)", prefix: "Ki-", adjective: "Kichik", meaning: "Torn" },
      { root: "Phek (intoxicate)", prefix: "Ke-", adjective: "Kephek", meaning: "Intoxicated" },
      { root: "Ham (to be good)", prefix: "Ka-", adjective: "Kaham", meaning: "Good" }
    ]
  },
  {
    id: 22,
    number: "XXII",
    title: "Degrees of Comparison (Positive, Comparative, Superlative)",
    category: "Grammar",
    description: "Express comparison degrees using suffixes like '-kuk', '-suk', '-thak', or prefix phrases like 'Swlai' and 'Jotoni'.",
    grammarRule: "Positive: Kaham (Good) | Comparative: Swlai Kaham (Better) | Superlative: Kahamkuk / Jotoni Kaham (Best)",
    sampleSentences: [
      { degree: "Positive", phrase: "Kaham", english: "Good" },
      { degree: "Comparative", phrase: "Swlai Kaham", english: "Better than" },
      { degree: "Superlative", phrase: "Kahamkuk / Kahamsuk", english: "Best / Very Good" },
      { degree: "Superlative", phrase: "Jotoni Kaham", english: "Best of all" }
    ]
  },
  {
    id: 23,
    number: "XXIII",
    title: "Adjective Position Rule: Adjectives Always Follow Nouns",
    category: "Grammar",
    description: "Unlike English where adjectives precede nouns ('tall man'), in Kokborok the adjective comes AFTER the noun ('man tall').",
    grammarRule: "Noun + Adjective order (e.g. Aphurai kolok = Man tall / Tall man)",
    sampleSentences: [
      { english: "Tall man / Aphurai is tall", kokborok: "Aphurai kolok" },
      { english: "The Earth is round", kokborok: "Hayung kiting" },
      { english: "Short road", kokborok: "Lama bara" },
      { english: "He is beautiful", kokborok: "Bo naithok" },
      { english: "Small house", kokborok: "Nok bwsate" },
      { english: "Fat man", kokborok: "Borok kuphung" },
      { english: "Rotten meat", kokborok: "Bahan kosok" },
      { english: "Sharp knife", kokborok: "Sengsa kubuk" }
    ]
  },
  {
    id: 24,
    number: "XXIV",
    title: "Counting Method & Numbers in Kokborok",
    category: "Numbers",
    description: "Master the Kokborok number system from 1 (Sa) to 1,000,000 (Chirasai) and 10,000,000 (Rwjag).",
    numbersList: [
      { num: 1, kokborok: "Sa", english: "One" },
      { num: 2, kokborok: "Nwi", english: "Two" },
      { num: 3, kokborok: "Tham", english: "Three" },
      { num: 4, kokborok: "Brwi", english: "Four" },
      { num: 5, kokborok: "Ba", english: "Five" },
      { num: 6, kokborok: "Dok", english: "Six" },
      { num: 7, kokborok: "Sni", english: "Seven" },
      { num: 8, kokborok: "Char", english: "Eight" },
      { num: 9, kokborok: "Chuku", english: "Nine" },
      { num: 10, kokborok: "Chi", english: "Ten" },
      { num: 11, kokborok: "Chisa", english: "Eleven" },
      { num: 12, kokborok: "Chinwi", english: "Twelve" },
      { num: 20, kokborok: "Nwichi", english: "Twenty" },
      { num: 30, kokborok: "Thamchi", english: "Thirty" },
      { num: 40, kokborok: "Brwichi", english: "Forty" },
      { num: 50, kokborok: "Bachi", english: "Fifty" },
      { num: 100, kokborok: "Ra / Sara", english: "One Hundred" },
      { num: 1000, kokborok: "Sai / Sasai", english: "One Thousand" },
      { num: 100000, kokborok: "Rasai", english: "One Lakh" },
      { num: 10000000, kokborok: "Rwjag", english: "One Crore" }
    ]
  },
  {
    id: 25,
    number: "XXV",
    title: "Classifier Counting Method (79 Classifiers)",
    category: "Numbers",
    description: "Kokborok uses shape and species classifier suffixes when counting items (khoroksa for human, toksa for long objects, barsa for flowers).",
    grammarRule: "Item + Classifier + Number (e.g. Borok khoroksa = One human being | Bubar barsa = One flower)",
    classifierHighlights: [
      { item: "Borok (Person)", classifier: "khoroksa", english: "One human being" },
      { item: "Bubar (Flower)", classifier: "barsa", english: "One flower" },
      { item: "Buphang (Tree)", classifier: "phangsa", english: "One tree" },
      { item: "Botok (Long object)", classifier: "toksa", english: "One long object piece" },
      { item: "Bwlaih (Leaf)", classifier: "laihsa", english: "One leaf" },
      { item: "Bwthaih (Fruit)", classifier: "thaihsa", english: "One fruit" }
    ]
  },
  {
    id: 26,
    number: "XXVI",
    title: "Everyday Dialogues & Introduction Conversations",
    category: "Conversation",
    description: "Practical real-world Kokborok dialogue script for meeting people, polite greetings, and hosting guests.",
    conversations: [
      { english: "Good Morning.", kokborok: "Phung Kaham.", bengali: "সুপ্রভাত।" },
      { english: "Good Afternoon.", kokborok: "Sairik Kaham.", bengali: "শুভ অপরাহ্ন।" },
      { english: "Good Evening.", kokborok: "Sanja Kaham.", bengali: "শুভ সন্ধ্যা।" },
      { english: "Good Night.", kokborok: "Hor Kaham.", bengali: "শুভ রাত্রি।" },
      { english: "Sit down please.", kokborok: "Achukjadi.", bengali: "দয়া করে বসুন।" },
      { english: "What is your name?", kokborok: "Nini mung tamo?", bengali: "তোমার নাম কী?" },
      { english: "My name is Mr. X.", kokborok: "Ani mung Mg. X.", bengali: "আমার নাম মি. X।" },
      { english: "How are you?", kokborok: "Nwng kahamde?", bengali: "তুমি কেমন আছ?" },
      { english: "Yes, I am fine.", kokborok: "Au, ang kahmano.", bengali: "হ্যাঁ, আমি ভালো আছি।" },
      { english: "Please come in.", kokborok: "Bisingo phaijadi / Bisingo hapjadi.", bengali: "দয়া করে ভেতরে আসুন।" },
      { english: "What will you take?", kokborok: "Tamo chahnai?", bengali: "আপনি কী নেবেন?" },
      { english: "Cold or Hot?", kokborok: "Kwchangde Kutung?", bengali: "ঠান্ডা না গরম?" },
      { english: "Where do you come from?", kokborok: "Nwng boroni phai?", bengali: "আপনি কোথা থেকে এসেছেন?" },
      { english: "See you again.", kokborok: "Malaiphiuanw.", bengali: "আবার দেখা হবে।" },
      { english: "Kokborok is a sweet language.", kokborok: "Kokborok belai khnathothok.", bengali: "ককবরক খুব মিষ্টি ভাষা।" },
      { english: "Now I can speak Kokborok fluently.", kokborok: "Ang tabuk Kokborok kaham khaino saui mano.", bengali: "আমি এখন সাবলীলভাবে ককবরক বলতে পারি।" },
      { english: "Thank you.", kokborok: "Hambai / Nono hambai.", bengali: "ধন্যবাদ।" }
    ]
  }
];
