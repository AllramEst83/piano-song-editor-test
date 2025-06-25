// player.js
import { initAudio } from "./audio.js";
import { songSequence } from "./songs.js";
import { noteDurations } from "./music-constants.js";
import { bpmSlider, playBtn } from "./ui.js";

export let isPlaying = false;

export async function startPlayback() {
  if (songSequence.length === 0) {
    alert("No notes to play. Please add some notes first.");
    return;
  }

  const { synth } = await initAudio();
  const bpm = parseInt(bpmSlider.value, 10) || 120;
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.cancel();

  const fingers = ["finger1", "finger2", "finger3", "finger4", "finger5"];

  songSequence.forEach((measure, measureIndex) => {
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
          if (noteObj.note !== null) {
            // Only play note if it's not a rest
            synth.triggerAttackRelease(noteObj.note, duration, t);
          }

          const container = document.querySelector(
            `.note-item[data-index="${measureIndex}-${hand}-${finger}"]`
          );
          if (container) {
            // Only add 'playing' class if it's an actual note
            if (noteObj.note !== null) {
              container.classList.add("playing");
            }

            container.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });

            // Only remove 'playing' class if it was added (i.e., for actual notes)
            if (noteObj.note !== null) {
              setTimeout(
                () => container.classList.remove("playing"),
                noteLength * 2000
              );
            }
          }
        }, noteTime);
      });
    });
  });

  // Calculate when to stop
  let latestEndTime = 0;

  songSequence.forEach((measure) => {
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
