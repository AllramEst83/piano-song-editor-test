export let currentSongSequence = [
  // Part 1
  {
    time: 0,
    right: { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 }, // pauseAfter halved
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 0.5, // time halved (was 1)
    right: { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 1, // time halved (was 2)
    right: { note: "F4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 1.5, // time halved (was 3)
    right: { note: "G4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "G3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 2, // time halved (was 4)
    right: { note: "G4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "G3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 2.5, // time halved (was 5)
    right: { note: "F4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 3, // time halved (was 6)
    right: { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 3.5, // time halved (was 7)
    right: { note: "D4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "G3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },

  {
    time: 4, // time halved (was 8)
    right: { note: "C4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 4.5, // time halved (was 9)
    right: { note: "C4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 5, // time halved (was 10)
    right: { note: "D4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 5.5, // time halved (was 11)
    right: { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "G3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 6, // time halved (was 12)
    right: { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 6.5, // time halved (was 13)
    right: { note: "D4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "G3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 7, // time halved (was 14)
    right: { note: "D4", type: "half", pauseBefore: 0, pauseAfter: 0.15 }, // pauseAfter halved
    left: { note: "C3", type: "half", pauseBefore: 0, pauseAfter: 0.15 },
  },

  // Part 2
  {
    time: 8, // time halved (was 16)
    right: { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 8.5, // time halved (was 17)
    right: { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 9, // time halved (was 18)
    right: { note: "F4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 9.5, // time halved (was 19)
    right: { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "G3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 10, // time halved (was 20)
    right: { note: "D4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 10.5, // time halved (was 21)
    right: { note: "C4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 11, // time halved (was 22)
    right: { note: "D4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 11.5, // time halved (was 23)
    right: { note: "E4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "G3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },

  {
    time: 12, // time halved (was 24)
    right: { note: "D4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "C3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 12.5, // time halved (was 25)
    right: { note: "C4", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
    left: { note: "G3", type: "quarter", pauseBefore: 0, pauseAfter: 0.05 },
  },
  {
    time: 13, // time halved (was 26)
    right: { note: "C4", type: "half", pauseBefore: 0, pauseAfter: 0.25 }, // pauseAfter halved
    left: { note: "C3", type: "half", pauseBefore: 0, pauseAfter: 0.25 },
  },
];
export const noteDurations = {
  whole: "1n",
  half: "2n",
  quarter: "4n",
  eighth: "8n",
  sixteenth: "16n",
  thirtySecond: "32n",
  sixtyFourth: "64n",
  dottedWhole: "1n.",
  dottedHalf: "2n.",
  dottedQuarter: "4n.",
  dottedEighth: "8n.",
  dottedSixteenth: "16n.",
  wholeTriplet: "1t",
  halfTriplet: "2t",
  quarterTriplet: "4t",
  eighthTriplet: "8t",
  sixteenthTriplet: "16t",
  thirtySecondTriplet: "32t",
  breve: "0.5n",
  doubleDottedQuarter: "4n..",
};
export const pianoKeys = [
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C5",
  "C#5",
  "D5",
  "D#5",
  "E5",
  "F5",
  "F#5",
  "G5",
];
