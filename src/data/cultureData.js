export const cultureData = {
  overview: {
    title: "Brief about the Kokborok",
    titleBn: "ককবরক পরিচিতি",
    content: `Kokborok is the mother tongue of the Borok people, who are geographically known as Tripuris. It is one of the official state languages of Tripura (notified on January 19, 1979) and was declared the official language of TTAADC on April 20, 1999. The Borok people are estimated at over 1.5 million across Tripura, neighboring North-Eastern Indian states, Bangladesh, Myanmar, Nepal, and Bhutan.`,
    linguisticClassification: "Sino-Tibetan > Tibeto-Burmese > Boro",
    stateLanguageDate: "January 19, 1979",
    ttaadcDate: "April 20, 1999"
  },
  tree: {
    root: "Sino-Tibetan",
    branches: ["Chinese", "Thai", "Tibeto-Burmese"],
    subBranches: ["Boro", "Burmese", "Tibetan"],
    boroLanguages: ["Chutia", "Dimasa", "Garo", "Hojai", "Kokborok", "Kuch", "Mech", "Rabha", "Tiwa (Lalung)"]
  },
  clans: [
    { name: "Bru", subDialects: 17, description: "17 sub-dialects or clans." },
    { name: "Debborma", subDialects: 11, description: "11 sub-dialects or clans." },
    { name: "Jomatia", subDialects: 3, description: "3 sub-dialects or clans." },
    { name: "Koloi", subDialects: 8, description: "8 sub-dialects or clans." },
    { name: "Kwtal (Noatia)", subDialects: 0, description: "Kwtal / Noatia dialect group." },
    { name: "Muraing", subDialects: 4, description: "4 sub-dialects or clans." },
    { name: "Rupini", subDialects: 11, description: "11 sub-dialects or clans." },
    { name: "Tripura", subDialects: 25, description: "25 sub-dialects or clans." },
    { name: "Uchoi", subDialects: 6, description: "6 sub-dialects or clans." }
  ],
  scriptNotes: {
    title: "Spelling Method of Kokborok in Roman & Bengali Script",
    vowels: [
      { letter: "A, a", sound: "as in Apple", example: "Apha", meaning: "My Father" },
      { letter: "E, e", sound: "as in Emperor", example: "Er", meaning: "To increase" },
      { letter: "I, i", sound: "as in Ink", example: "Isri", meaning: "The Queen" },
      { letter: "O, o", sound: "as in Oblige", example: "Ok", meaning: "The Belly" },
      { letter: "U, u", sound: "as in Utgard", example: "Ul", meaning: "Behind" },
      { letter: "W, w", sound: "as in (U) Wake", example: "Wng", meaning: "To be" }
    ],
    conjointLetters: [
      { letter: "Ch", example: "Chap", meaning: "To fold" },
      { letter: "Kh", example: "Kham", meaning: "Drum" },
      { letter: "N'", example: "In'", meaning: "Yes" },
      { letter: "Ng", example: "Nwng", meaning: "You" },
      { letter: "Ph", example: "Phatar", meaning: "Outside" },
      { letter: "Th", example: "Thailik", meaning: "Banana" },
      { letter: "Ua", example: "Uak", meaning: "Pig" },
      { letter: "Uo", example: "Buo", meaning: "Beat" }
    ],
    soundChangeRules: [
      { rule: "Words ending in K & P change to G & B when a vowel suffix is added.", examples: [
        { original: "Paithak (Last)", suffix: "+ o", result: "Pathago (In last)" },
        { original: "Kok (Language)", suffix: "+ o", result: "Kogo (In language)" },
        { original: "Koklop (Poem)", suffix: "+ o", result: "Koklobo (In poem)" },
        { original: "Khaklap (Chest)", suffix: "+ o", result: "Khaklabo (In chest)" }
      ]}
    ],
    toneRules: [
      { normal: "Lai (Easy)", high: "Laih (Crossed)" },
      { normal: "Bor (Senseless)", high: "Bohr (To plant)" },
      { normal: "Cha (Right)", high: "Chah (To eat)" },
      { normal: "Nukhung (Family)", high: "Nukhuhng (Roof)" }
    ]
  }
};
