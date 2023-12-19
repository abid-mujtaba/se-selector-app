/*
 * Module for playing audio files.
 */

export { playAudio };

import { log } from './logging';

// Flag for stopping audios from running over each other
// If an audio is playing, trying to play another one will be a no-op
let fAudioRunning = false;


async function playAudio(url: string): Promise<HTMLAudioElement> {
    if (! fAudioRunning) {
        fAudioRunning = true;

        const audio = new Audio(url);

        audio.addEventListener("canplaythrough", (event) => {
            audio.play();
        });

        return new Promise<HTMLAudioElement>((resolve) => {
            audio.addEventListener("ended", (event) => {
                fAudioRunning = false;

                return resolve(audio);
            });
        });
    }
    else {
        log(`Audio is already playing. Skipping: ${url}`);
    }
}
