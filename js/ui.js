// ui.js
import { songSequence } from "./songs.js";
import { noteDurations } from "./music-constants.js";
import { isPlaying, startPlayback, stopPlayback } from "./player.js";
import { getDefaultNoteDefinition } from "./note-definitions.js";
import {
  selectedNoteIndex,
  selectedHand,
  selectedFinger,
  setSelectedNoteIndex,
  clearEditor,
  renderSongNotes,
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
    const time = parseInt(timeInput.value, 10);

    // Check if time already exists
    const timeExists = songSequence.some(
      (note) =>
        Object.values(note.left || {}).some((f) => f.time === time) ||
        Object.values(note.right || {}).some((f) => f.time === time)
    );

    if (timeExists) {
      alert("Time already exists. Select a different time or update.");
      return;
    }

    songSequence.push(getDefaultNoteDefinition(time));

    clearEditor();
    renderSongNotes();
  });

  // Update Note
  deleteNoteBtn.addEventListener("click", () => {
    if (selectedNoteIndex === -1 || !selectedHand) {
      alert("Please select a note to delete.");
      return;
    }

    const currentNoteBlock = songSequence[selectedNoteIndex];

    // Ensure the selected hand and finger exist before trying to modify
    if (
      currentNoteBlock[selectedHand] &&
      currentNoteBlock[selectedHand][selectedFinger]
    ) {
      currentNoteBlock[selectedHand][selectedFinger].note = null; // Set the specific note to null (rest)
    }

    // Function to check if a hand has any active notes
    const hasActiveNotes = (handObj) => {
      if (!handObj) return false;
      // Check if any finger within the hand has a non-null note
      return Object.values(handObj).some(
        (fingerNote) => fingerNote && fingerNote.note !== null
      );
    };

    // After setting the note to null, check the selected hand specifically
    if (!hasActiveNotes(currentNoteBlock[selectedHand])) {
      // If the selected hand is now completely empty, remove its entry from the note block
      delete currentNoteBlock[selectedHand]; // This makes currentNoteBlock.left or currentNoteBlock.right undefined
    }

    // Now, check if the ENTIRE time block is empty (both hands are gone or have no active notes)
    if (!currentNoteBlock.left && !currentNoteBlock.right) {
      songSequence.splice(selectedNoteIndex, 1);
      setSelectedNoteIndex(-1); // Reset selected index as the block is removed
    }

    clearEditor(); // This will re-render notes and reset the editor inputs
    songSequence.sort((a, b) => a.time - b.time); // Ensure correct order
  });

  updateNoteBtn.addEventListener("click", () => {
    if (selectedNoteIndex === -1 || !selectedHand || !selectedFinger) {
      alert("Please select a note to update.");
      return;
    }

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

    const currentBlock = songSequence[selectedNoteIndex];
    const currentFingerNote = currentBlock[selectedHand][selectedFinger];

    if (newTime === currentFingerNote.time) {
      // Update the properties directly
      currentBlock[selectedHand][selectedFinger] = {
        time: newTime,
        ...noteObj,
      };
    } else {
      // Check for time conflict in the main sequence array
      const conflict = songSequence.find(
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
      songSequence.splice(selectedNoteIndex, 1);
      songSequence.splice(selectedNoteIndex, 0, moved);
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
      sequence: songSequence,
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
    songSequence.length = 0;
    clearEditor();
  });

  clearAllNotesBtn.addEventListener("click", () => {
    clearEditor();
  });
}
