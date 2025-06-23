// ui.js
import { noteDurations, currentSongSequence } from "./notes-and-keys.js";
import { isPlaying, startPlayback, stopPlayback } from "./player.js";
import { clearEditor } from "./editor.js";
import { selectedNoteIndex, selectedHand } from "./editor.js";

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
    noteTypeInput.disabled = isRest;
    pauseBeforeInput.disabled = isRest;
    pauseAfterInput.disabled = isRest;

    if (isRest) {
      // Clear values when rest is selected
      noteInput.selectedIndex = 0;
      noteTypeInput.selectedIndex = 0;
      pauseBeforeInput.value = "4n";
      pauseAfterInput.value = "4n";
    }
  });
  // Add Note
  addNoteBtn.addEventListener("click", () => {
    const time = parseInt(timeInput.value);

    if (currentSongSequence.some((n) => n.time === time)) {
      alert("Time already exists. Select a different time or update.");
      return;
    }

    currentSongSequence.push({
      time,
      left: null,
      right: null,
    });

    clearEditor();
  });

  // Update Note
  deleteNoteBtn.addEventListener("click", () => {
    if (selectedNoteIndex === -1 || !selectedHand) return;

    const noteBlock = currentSongSequence[selectedNoteIndex];
    noteBlock[selectedHand] = null;

    if (!noteBlock.left && !noteBlock.right) {
      currentSongSequence.splice(selectedNoteIndex, 1);
      selectedNoteIndex = -1;
    }

    clearEditor();
    currentSongSequence.sort((a, b) => a.time - b.time);
  });

  updateNoteBtn.addEventListener("click", () => {
    if (selectedNoteIndex === -1 || !selectedHand) return;

    const newTime = parseFloat(timeInput.value);
    const noteObj = restToggle.checked
      ? null
      : {
          note: noteInput.value,
          type: noteNameFromValue[noteTypeInput.value] || noteTypeInput.value,
          pauseBefore: noteNameFromValue[pauseBeforeInput.value],
          pauseAfter: noteNameFromValue[pauseAfterInput.value],
        };

    const current = currentSongSequence[selectedNoteIndex];

    // If time hasn't changed, just update the note
    if (newTime === current.time) {
      current[selectedHand] = noteObj;
    } else {
      // Check if there's already a block at newTime
      const conflict = currentSongSequence.find(
        (n, i) => n.time === newTime && i !== selectedNoteIndex
      );
      if (conflict) {
        alert("A note block at that time already exists.");
        return;
      }

      // Move the note to new time
      const moved = { ...current };
      moved.time = newTime;
      moved[selectedHand] = noteObj;

      // Remove old block
      currentSongSequence.splice(selectedNoteIndex, 1);
      // Insert new block
      currentSongSequence.push(moved);
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
      sequence: currentSongSequence
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
    currentSongSequence.length = 0;
    clearEditor();
  });

  clearAllNotesBtn.addEventListener("click", () => {
    clearEditor();
  });
}
