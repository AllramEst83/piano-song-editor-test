// editor.js
import {
  currentSongSequence,
  pianoKeys,
  noteDurations,
} from "./notes-and-keys.js";
import {
  noteInput,
  noteTypeInput,
  timeInput,
  restToggle,
  pauseBeforeInput,
  pauseAfterInput,
  rightHandSongNotesList,
  leftHandSongNotesList,
} from "./ui.js";

export let selectedNoteIndex = -1;
export let selectedHand = null;
let selectedFinger = null;
export function renderSongNotes() {
  // Clear all finger columns
  Object.values(rightHandSongNotesList).forEach((col) => (col.innerHTML = ""));
  Object.values(leftHandSongNotesList).forEach((col) => (col.innerHTML = ""));

  currentSongSequence.forEach((noteObj, index) => {
    // Right hand fingers
    if (noteObj.right) {
      Object.entries(noteObj.right).forEach(([fingerKey, note]) => {
        const col = rightHandSongNotesList[fingerKey];
        if (!col) return;

        const el = document.createElement("div");
        el.className = "note-item text-sm text-gray-200";
        el.dataset.index = `${index}-right-${fingerKey}`;
        el.innerHTML = note
          ? `<div class="text-center leading-tight">
              <div>${note.note}</div>
              <div class="text-xs text-gray-400">${note.type}</div>
            </div>`
          : `<div class="text-center text-gray-400">(rest)</div>`;

        if (
          selectedNoteIndex === index &&
          selectedHand === "right" &&
          selectedFinger === fingerKey
        ) {
          el.classList.add("selected");
        }

        el.addEventListener("click", () => {
          selectedNoteIndex = index;
          selectedHand = "right";
          selectedFinger = fingerKey;
          populateEditor(note.time, note);
          renderSongNotes();
        });

        col.appendChild(el);
      });
    }

    // Left hand fingers
    if (noteObj.left) {
      Object.entries(noteObj.left).forEach(([fingerKey, note]) => {
        const col = leftHandSongNotesList[fingerKey];
        if (!col) return;

        const el = document.createElement("div");
        el.className = "note-item text-sm text-gray-200";
        el.dataset.index = `${index}-left-${fingerKey}`;
        el.innerHTML = note
          ? `<div class="text-center leading-tight">
              <div>${note.note}</div>
              <div class="text-xs text-gray-400">${note.type}</div>
            </div>`
          : `<div class="text-center text-gray-400">(rest)</div>`;

        if (
          selectedNoteIndex === index &&
          selectedHand === "left" &&
          selectedFinger === fingerKey
        ) {
          el.classList.add("selected");
        }

        el.addEventListener("click", () => {
          selectedNoteIndex = index;
          selectedHand = "left";
          selectedFinger = fingerKey;
          populateEditor(note.time, note);
          renderSongNotes();
        });

        col.appendChild(el);
      });
    }
  });
}

export function populateEditor(_, noteObj = null) {
  const block = currentSongSequence[selectedNoteIndex];
  if (!block) return;

  timeInput.value = block.time;

  const isRest = !noteObj;
  restToggle.checked = isRest;

  noteInput.disabled = isRest;
  noteTypeInput.disabled = isRest;
  pauseBeforeInput.disabled = isRest;
  pauseAfterInput.disabled = isRest;

  if (!isRest) {
    noteInput.value = noteObj.note || noteInput.options[0]?.value;
    noteTypeInput.value =
      noteDurations[noteObj.type] ||
      noteObj.type ||
      noteTypeInput.options[0]?.value;
    pauseBeforeInput.value = noteDurations[noteObj.pauseBefore] ?? "4n";
    pauseAfterInput.value = noteDurations[noteObj.pauseAfter] ?? "4n";
  } else {
    noteInput.selectedIndex = 0;
    noteTypeInput.selectedIndex = 0;
    pauseBeforeInput.value = "4n";
    pauseAfterInput.value = "4n";
  }
}

export function clearEditor() {
  timeInput.value = currentSongSequence.length;
  restToggle.checked = false;
  noteInput.selectedIndex = 0;
  noteTypeInput.selectedIndex = 0;
  pauseBeforeInput.value = "4n";
  pauseAfterInput.value = "4n";
  selectedNoteIndex = -1;
  selectedHand = null;
  renderSongNotes();
}

export function renderNoteSelects() {
  noteInput.innerHTML = "";
  pianoKeys.forEach((key) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = key;
    noteInput.appendChild(opt);
  });

  noteTypeInput.innerHTML = "";
  Object.entries(noteDurations).forEach(([name, value]) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = name;

    noteTypeInput.appendChild(opt);
    pauseAfterInput.appendChild(opt.cloneNode(true));
    pauseBeforeInput.appendChild(opt.cloneNode(true));
  });
}
