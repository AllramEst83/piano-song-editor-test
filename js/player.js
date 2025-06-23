// player.js
import { initAudio } from "./audio.js";
import { currentSongSequence, noteDurations } from "./notes-and-keys.js";
import { bpmSlider, playBtn } from "./ui.js";

export let isPlaying = false;

/**
 * Starts playback of the current song sequence using Tone.js.
 *
 * This function:
 * - Sets the tempo using the user-defined BPM.
 * - Schedules each note in the sequence using Tone.Transport, accounting for musical timing.
 * - Highlights the playing note visually in the UI.
 * - Automatically stops playback after the final note finishes.
 *
 * ---
 * Each item in `currentSongSequence` should be structured as:
 * {
 *   time: Number,           // Beat position (in quarter notes) of the event (e.g. 0, 1, 2.5)
 *   left: NoteObj | null,   // Note for the left hand (or null for rest)
 *   right: NoteObj | null   // Note for the right hand (or null for rest)
 * }
 *
 * A `NoteObj` is:
 * {
 *   note: String,           // e.g., "C4", "F#3"
 *   type: String,           // Musical duration, e.g., "quarter", "4n", "8n.", etc. (mapped from noteDurations)
 *   pauseBefore: String,    // Musical time (e.g., "8n", "2n.", "4t") — how long to wait *before* playing this note
 *   pauseAfter: String      // Musical time — how long to wait *after* the note for end-of-playback calculation
 * }
 *
 * ❗ Both `pauseBefore` and `pauseAfter` are musical time strings only (not seconds or raw numbers).
 *
 * Example:
 * {
 *   time: 3,
 *   left: {
 *     note: "C3",
 *     type: "half",
 *     pauseBefore: "2n",   // wait a half note before triggering
 *     pauseAfter: "4n."    // linger a dotted quarter after
 *   },
 *   right: null
 * }
 */

export async function startPlayback() {
  if (currentSongSequence.length === 0) {
    alert("No notes to play. Please add some notes first.");
    return;
  }

  const { synth } = await initAudio();
  const bpm = parseInt(bpmSlider.value, 10) || 120;
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.cancel();

  const fingers = ["finger1", "finger2", "finger3", "finger4", "finger5"];

  currentSongSequence.forEach((measure, measureIndex) => {
    ["right", "left"].forEach((hand) => {
      fingers.forEach((finger) => {
        const noteObj = measure[hand]?.[finger];
        if (!noteObj) return;

        const duration = noteDurations[noteObj.type] || "4n";
        const noteLength = Tone.Time(duration).toSeconds();
        const pauseBefore = Tone.Time(
          noteDurations[noteObj.pauseBefore] || noteObj.pauseBefore || "0"
        ).toSeconds();

        const timeBase = Tone.Time(noteObj.time || 0).toSeconds();
        const noteTime = timeBase + pauseBefore;

        Tone.Transport.scheduleOnce((t) => {
          synth.triggerAttackRelease(noteObj.note, duration, t);

          const container = document.querySelector(
            `.note-item[data-index="${measureIndex}-${hand}-${finger}"]`
          );
          if (container) {
            container.classList.add("playing");
            // container.scrollIntoView({
            //   behavior: "smooth",
            //   block: "center",
            //   inline: "nearest",
            // });

            setTimeout(
              () => container.classList.remove("playing"),
              noteLength * 2000
            );
          }
        }, noteTime);
      });
    });
  });

  // Calculate when to stop
  let latestEndTime = 0;

  currentSongSequence.forEach((measure) => {
    ["right", "left"].forEach((hand) => {
      fingers.forEach((finger) => {
        const note = measure[hand]?.[finger];
        if (!note) return;

        const timeBase = Tone.Time(note.time || 0).toSeconds();
        const pauseBefore = Tone.Time(
          noteDurations[note.pauseBefore] || note.pauseBefore || "0"
        ).toSeconds();
        const pauseAfter = Tone.Time(
          noteDurations[note.pauseAfter] || note.pauseAfter || "0"
        ).toSeconds();
        const duration = Tone.Time(
          noteDurations[note.type] || "4n"
        ).toSeconds();

        const noteEnd = timeBase + pauseBefore + duration + pauseAfter;
        if (noteEnd > latestEndTime) latestEndTime = noteEnd;
      });
    });
  });

  Tone.Transport.scheduleOnce(() => {
    stopPlayback();
  }, latestEndTime + 0.2);

  Tone.Transport.start();
  isPlaying = true;
  playBtn.textContent = "⏹️ Stop";
}

export function stopPlayback() {
  Tone.Transport.stop();
  Tone.Transport.cancel();
  isPlaying = false;
  playBtn.textContent = "▶️ Play Song";
}

function getEndTime(note) {
  if (!note) return 0;
  const duration = noteDurations[note.type] || "4n";
  const durSec = Tone.Time(duration).toSeconds();

  const noteTypeBefore = noteDurations[note.pauseBefore] || "4n";
  const noteTypeAfter = noteDurations[note.pauseAfter] || "4n";

  const after = Tone.Time(noteTypeAfter).toSeconds();
  const before = Tone.Time(noteTypeBefore).toSeconds();

  return durSec + after + before;
}
