// editor.js
import { songSequence } from "./songs.js";
import { pianoKeys, noteDurations } from "./music-constants.js";
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
export let selectedFinger = null;

export function setSelectedNoteIndex(index) {
  selectedNoteIndex = index;
}

export function setSelectedHand(hand) {
  selectedHand = hand;
}

export function setSelectedFinger(finger) {
  selectedFinger = finger;
}

export function renderSongNotes() {
  // Clear all finger columns
  Object.values(rightHandSongNotesList).forEach((col) => (col.innerHTML = ""));
  Object.values(leftHandSongNotesList).forEach((col) => (col.innerHTML = ""));

  songSequence.forEach((noteObj, index) => {
    // Right hand fingers
    if (noteObj.right) {
      Object.entries(noteObj.right).forEach(([fingerKey, note]) => {
        const col = rightHandSongNotesList[fingerKey];
        if (!col) return;

        const el = document.createElement("div");
        el.className = "note-item text-sm text-gray-200";
        el.dataset.index = `${index}-right-${fingerKey}`;
        el.innerHTML = `
          <div class="text-center leading-tight">
            <div>${
              note?.note ?? '<span class="text-gray-400">(rest)</span>'
            }</div>
            <div class="text-xs text-gray-400">${note.type}</div>
            ${
              note?.pauseBefore || note?.pauseAfter
                ? `<div class="text-[11px] text-gray-400 mt-1 leading-none">
                    ${note?.pauseBefore ? `B:${note.pauseBefore}` : ""}
                    ${note?.pauseAfter ? `A:${note.pauseAfter}` : ""}
                  </div>`
                : ""
            }
          </div>
        `;

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
          // Should note at rest also have time?
          const singleNote = noteObj[selectedHand]?.[fingerKey];
          populateEditor(singleNote);
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
        el.innerHTML = `
          <div class="text-center leading-tight">
            <div>${
              note?.note ?? '<span class="text-gray-400">(rest)</span>'
            }</div>
            <div class="text-xs text-gray-400">${note.type}</div>
            ${
              note?.pauseBefore || note?.pauseAfter
                ? `<div class="text-[11px] text-gray-400 mt-1 leading-none">
                    ${note?.pauseBefore ? `B:${note.pauseBefore}` : ""}
                    ${note?.pauseAfter ? `A:${note.pauseAfter}` : ""}
                  </div>`
                : ""
            }
          </div>
        `;

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
          const singleNote = noteObj[selectedHand]?.[fingerKey];
          populateEditor(singleNote);
          renderSongNotes();
        });

        col.appendChild(el);
      });
    }
  });
}

export function populateEditor(noteObj = null) {
  timeInput.value = noteObj.time;

  const isRest = !noteObj?.note;
  restToggle.checked = isRest;
  noteInput.disabled = isRest;

  noteTypeInput.value =
    noteDurations[noteObj.type] ||
    noteObj.type ||
    noteTypeInput.options[0]?.value;
  pauseBeforeInput.value = noteDurations[noteObj.pauseBefore] ?? "";
  pauseAfterInput.value = noteDurations[noteObj.pauseAfter] ?? "";

  if (!isRest) {
    noteInput.value = noteObj.note || noteInput.options[0]?.value;
  }
}

export function clearEditor() {
  timeInput.value = songSequence.length;
  restToggle.checked = false;
  noteInput.selectedIndex = 0;
  noteTypeInput.selectedIndex = 0;
  pauseBeforeInput.value = "";
  pauseAfterInput.value = "";
  selectedNoteIndex = -1;
  selectedHand = null;
  selectedFinger = null;
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
  pauseBeforeInput.innerHTML = '<option value="">None</option>';
  pauseAfterInput.innerHTML = '<option value="">None</option>';
  Object.entries(noteDurations).forEach(([name, value]) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = name;

    noteTypeInput.appendChild(opt);
    pauseAfterInput.appendChild(opt.cloneNode(true));
    pauseBeforeInput.appendChild(opt.cloneNode(true));
  });
}
