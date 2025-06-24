/**
 * Represents a sequence of notes for both hands, organized by finger.
 *
 * Each entry in the array represents a moment in the song timeline,
 * with individual finger notes or rests for both the left and right hand.
 *
 * @typedef {Object} FingerNote
 * @property {number} time - Required. Beat position in the song timeline (e.g., 0, 1.5, etc.).
 * @property {string|null} note - Musical note (e.g., "C4") or `null` for a rest.
 * @property {string} type - Required. Note or rest duration. Expected values:
 *   "whole", "half", "quarter", "eighth", "sixteenth", etc.
 * @property {string|null} [pauseBefore] - Optional. Pause before the note/rest starts. Same units as `type`.
 * @property {string|null} [pauseAfter] - Optional. Pause after the note/rest ends. Same units as `type`.
 *
 * @typedef {Object} HandNotes
 * @property {FingerNote} finger1 - Thumb
 * @property {FingerNote} finger2 - Index
 * @property {FingerNote} finger3 - Middle
 * @property {FingerNote} finger4 - Ring
 * @property {FingerNote} finger5 - Pinky
 *
 * @typedef {Object} NoteBlock
 * @property {HandNotes} right - Notes for right hand
 * @property {HandNotes} left - Notes for left hand
 *
 * @type {NoteBlock[]}
 */
const noteDefinition = [
  {
    right: {
      // Example of a note played by the right hand thumb
      finger1: {
        // Required: position in song timeline (in beats/ticks)
        time: 0,
        // Note name (e.g., "C4"), or null if this is a rest
        note: "C4",
        // Required: note or rest duration (e.g., "quarter", "half", "eighth", etc.)
        type: "quarter",
        // Optional: delay before rest (can be null)
        pauseBefore: null,
        // Optional: delay after note or rest ends (can be null)
        pauseAfter: "eighth",
      },
      finger2: {
        // Required: position in song timeline (in beats/ticks)
        time: 0,
        // Note name (e.g., "C4"), or null if this is a rest
        note: "C4",
        // Required: note or rest duration (e.g., "quarter", "half", "eighth", etc.)
        type: "quarter",
        // Optional: delay before rest (can be null)
        pauseBefore: null,
        // Optional: delay after note or rest ends (can be null)
        pauseAfter: "eighth",
      },
      // Example of a rest
      finger3: {
        // Required: time this rest occurs in the song timeline
        time: 4,
        // null = this is a rest (no note played)
        note: null,
        // Required: duration of the rest
        type: "quarter",
        // Optional: delay before rest (can be null)
        pauseBefore: null,
        // Optional: delay after rest (can be null)
        pauseAfter: null,
      },
      // Example of a rest
      finger4: {
        // Required: time this rest occurs in the song timeline
        time: 4,
        // null = this is a rest (no note played)
        note: null,
        // Required: duration of the rest
        type: "quarter",
        // Optional: delay before rest (can be null)
        pauseBefore: null,
        // Optional: delay after rest (can be null)
        pauseAfter: null,
      },
      // Example of a rest
      finger5: {
        // Required: time this rest occurs in the song timeline
        time: 4,
        // null = this is a rest (no note played)
        note: null,
        // Required: duration of the rest
        type: "quarter",
        // Optional: delay before rest (can be null)
        pauseBefore: null,
        // Optional: delay after rest (can be null)
        pauseAfter: null,
      },
    },
    left: {
      // Example of a note played by the right hand thumb
      finger1: {
        // Required: position in song timeline (in beats/ticks)
        time: 0,
        // Note name (e.g., "C4"), or null if this is a rest
        note: "C4",
        // Required: note or rest duration (e.g., "quarter", "half", "eighth", etc.)
        type: "quarter",
        // Optional: delay before rest (can be null)
        pauseBefore: null,
        // Optional: delay after note or rest ends (can be null)
        pauseAfter: "eighth",
      },
      finger2: {
        // Required: position in song timeline (in beats/ticks)
        time: 0,
        // Note name (e.g., "C4"), or null if this is a rest
        note: "C4",
        // Required: note or rest duration (e.g., "quarter", "half", "eighth", etc.)
        type: "quarter",
        // Optional: delay before rest (can be null)
        pauseBefore: null,
        // Optional: delay after note or rest ends (can be null)
        pauseAfter: "eighth",
      },
      // Example of a rest
      finger3: {
        // Required: time this rest occurs in the song timeline
        time: 4,
        // null = this is a rest (no note played)
        note: null,
        // Required: duration of the rest
        type: "quarter",
        // Optional: delay before rest (can be null)
        pauseBefore: null,
        // Optional: delay after rest (can be null)
        pauseAfter: null,
      },
      // Example of a rest
      finger4: {
        // Required: time this rest occurs in the song timeline
        time: 4,
        // null = this is a rest (no note played)
        note: null,
        // Required: duration of the rest
        type: "quarter",
        // Optional: delay before rest (can be null)
        pauseBefore: null,
        // Optional: delay after rest (can be null)
        pauseAfter: null,
      },
      // Example of a rest
      finger5: {
        // Required: time this rest occurs in the song timeline
        time: 4,
        // null = this is a rest (no note played)
        note: null,
        // Required: duration of the rest
        type: "quarter",
        // Optional: delay before rest (can be null)
        pauseBefore: null,
        // Optional: delay after rest (can be null)
        pauseAfter: null,
      },
    },
  },
];

export function getDefaultNoteDefinition() {
  // Deep clone to ensure a fresh, independent object is returned each time
  return JSON.parse(JSON.stringify(defultNoteDefinition));
}

export const defultNoteDefinition = {
  left: {
    finger1: {
      time: 0,
      note: null,
      type: "quarter",
      pauseBefore: null,
      pauseAfter: null,
    },
    finger2: {
      time: 0,
      note: null,
      type: "quarter",
      pauseBefore: null,
      pauseAfter: null,
    },
    finger3: {
      time: 0,
      note: null,
      type: "quarter",
      pauseBefore: null,
      pauseAfter: null,
    },
    finger4: {
      time: 0,
      note: null,
      type: "quarter",
      pauseBefore: null,
      pauseAfter: null,
    },
    finger5: {
      time: 0,
      note: null,
      type: "quarter",
      pauseBefore: null,
      pauseAfter: null,
    },
  },
  right: {
    finger1: {
      time: 0,
      note: null,
      type: "quarter",
      pauseBefore: null,
      pauseAfter: null,
    },
    finger2: {
      time: 0,
      note: null,
      type: "quarter",
      pauseBefore: null,
      pauseAfter: null,
    },
    finger3: {
      time: 0,
      note: null,
      type: "quarter",
      pauseBefore: null,
      pauseAfter: null,
    },
    finger4: {
      time: 0,
      note: null,
      type: "quarter",
      pauseBefore: null,
      pauseAfter: null,
    },
    finger5: {
      time: 0,
      note: null,
      type: "quarter",
      pauseBefore: null,
      pauseAfter: null,
    },
  },
};
