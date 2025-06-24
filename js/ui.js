// ui.js
import { defaultSongSequence } from "./songs.js";
import { noteDurations } from "./music-constants.js";
import { isPlaying, startPlayback, stopPlayback } from "./player.js";
import {
  selectedNoteIndex,
  selectedHand,
  selectedFinger,
  clearEditor,
} from "./editor.js";

export const noteInput = document.getElementById("note-input");
export const noteTypeInput = document.getElementById("note-type-input");
export const pauseBeforeInput = document.getElementById("pause-before-input");
export const pauseAfterInput = document.getElementById("pause-after-input");
export const timeInput = document.getElementById("note-time-input");
export const restToggle = document.getElementById("rest-toggle");

const addNoteBtn = document.getElementById("add-note-btn");
const updateNoteBtn = document.getElementById("update-note-btn");
const deleteNoteBtn = document.getElementById("delete-note-btn");
const clearEditorBtn = document.getElementById("clear-editor-btn");
export const playBtn = document.getElementById("play-song-btn");
export const rightHandSongNotesList = {
  finger1: document.getElementById("right-finger-1"),
  finger2: document.getElementById("right-finger-2"),
  finger3: document.getElementById("right-finger-3"),
  finger4: document.getElementById("right-finger-4"),
  finger5: document.getElementById("right-finger-5"),
};

export const leftHandSongNotesList = {
  finger1: document.getElementById("left-finger-1"),
  finger2: document.getElementById("left-finger-2"),
  finger3: document.getElementById("left-finger-3"),
  finger4: document.getElementById("left-finger-4"),
  finger5: document.getElementById("left-finger-5"),
};

const saveSongBtn = document.getElementById("save-song-btn");
const clearAllNotesBtn = document.getElementById("clear-all-notes-btn");
export const bpmSlider = document.getElementById("bpm-input");
export const bpmDisplay = document.getElementById("bpm-display");

export function setupUI() {
  const noteNameFromValue = Object.fromEntries(
    Object.entries(noteDurations).map(([name, value]) => [value, name])
  );

  //   EVENT HANDLERS
  bpmSlider.addEventListener("input", () => {
    const bpm = parseInt(bpmSlider.value, 10);
    bpmDisplay.textContent = bpm;
    Tone.Transport.bpm.rampTo(bpm, 0.5);
  });

  playBtn.addEventListener("click", async () => {
    if (!isPlaying) {
      await Tone.start();
      await startPlayback();
    } else {
      stopPlayback();
    }
  });

  restToggle.addEventListener("change", () => {
    const isRest = restToggle.checked;

    noteInput.disabled = isRest;

    if (isRest) {
      noteInput.selectedIndex = 0;
    }
  });
  // Add Note
  addNoteBtn.addEventListener("click", () => {
    const time = parseInt(timeInput.value);

    if (defaultSongSequence.some((n) => n.time === time)) {
      alert("Time already exists. Select a different time or update.");
      return;
    }

    defaultSongSequence.push({
      time,
      left: null,
      right: null,
    });

    clearEditor();
  });

  // Update Note
  deleteNoteBtn.addEventListener("click", () => {
    if (selectedNoteIndex === -1 || !selectedHand) return;

    const noteBlock = defaultSongSequence[selectedNoteIndex];
    noteBlock[selectedHand] = null;

    if (!noteBlock.left && !noteBlock.right) {
      defaultSongSequence.splice(selectedNoteIndex, 1);
      selectedNoteIndex = -1;
    }

    clearEditor();
    defaultSongSequence.sort((a, b) => a.time - b.time);
  });

  updateNoteBtn.addEventListener("click", () => {
    if (selectedNoteIndex === -1 || !selectedHand || !selectedFinger) return;

    const newTime = parseFloat(timeInput.value);

    const noteObj = restToggle.checked
      ? {
          note: null,
          type: noteNameFromValue[noteTypeInput.value] || noteTypeInput.value,
          pauseBefore: pauseBeforeInput.value
            ? noteNameFromValue[pauseBeforeInput.value]
            : null,
          pauseAfter: pauseAfterInput.value
            ? noteNameFromValue[pauseAfterInput.value]
            : null,
        }
      : {
          note: noteInput.value,
          type: noteNameFromValue[noteTypeInput.value] || noteTypeInput.value,
          pauseBefore: pauseBeforeInput.value
            ? noteNameFromValue[pauseBeforeInput.value]
            : null,
          pauseAfter: pauseAfterInput.value
            ? noteNameFromValue[pauseAfterInput.value]
            : null,
        };

    const currentBlock = defaultSongSequence[selectedNoteIndex];
    const currentFingerNote = currentBlock[selectedHand][selectedFinger];

    if (newTime === currentFingerNote.time) {
      // Update the properties directly
      currentBlock[selectedHand][selectedFinger] = {
        time: newTime,
        ...noteObj,
      };
    } else {
      // Check for time conflict in the main sequence array
      const conflict = defaultSongSequence.find(
        (n, i) => n.time === newTime && i !== selectedNoteIndex
      );
      if (conflict) {
        alert("A note block at that time already exists.");
        return;
      }

      // Move note to new time: update block's time and finger
      const moved = { ...currentBlock };
      moved.time = newTime;
      moved[selectedHand] = { ...moved[selectedHand] };
      moved[selectedHand][selectedFinger] = {
        ...noteObj,
        time: newTime,
      };

      // Remove old block and insert moved block at the same index
      defaultSongSequence.splice(selectedNoteIndex, 1);
      defaultSongSequence.splice(selectedNoteIndex, 0, moved);
    }

    clearEditor();
  });

  clearEditorBtn.addEventListener("click", () => {
    clearEditor();
  });

  // Save Song (mock)
  saveSongBtn.addEventListener("click", () => {
    const bpm = parseInt(document.getElementById("bpm-input").value, 10) || 120;
    const name = prompt("Enter a name for the song:", "Untitled Song");
    if (!name) return;

    const song = {
      name,
      bpm,
      sequence: defaultSongSequence
        .map(({ time, left, right }) => ({
          time,
          left,
          right,
        }))
        .sort((a, b) => a.time - b.time),
    };

    // Convert to JSON string
    const json = JSON.stringify(song, null, 2);

    // Create Blob and download link
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, "_").toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`Saved "${name}" as JSON file.`);
  });

  clearAllNotesBtn.addEventListener("click", () => {
    defaultSongSequence.length = 0;
    clearEditor();
  });

  clearAllNotesBtn.addEventListener("click", () => {
    clearEditor();
  });
}
