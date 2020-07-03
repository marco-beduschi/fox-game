export const TICK_RATE = 3000;
export const ICONS = ["fish", "poop", "weather"];
export const RAIN_CHANCE = 0.4;
export const SCENES = ["day", "rain"];
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 3;

// TODO:
// (ISSUE)
// If timers are the same the game won't work.
// For instance if getNextPoopTime is the same as celebratingTime
// it will celebrate but never poop, and it will die because the poop
// was neve cleaned.
export const getNextHungerTime = (clock) => {
  return Math.floor(Math.random() * 3) + 5 + clock;
};
export const getNextDieTime = (clock) => {
  return Math.floor(Math.random() * 2) + 12 + clock;
};
export const getNextPoopTime = (clock) => {
  return Math.floor(Math.random() * 2) + 8 + clock;
};

export const writeModal = (text = "") => {
  document.querySelector(
    ".modal"
  ).innerHTML = `<div class="modal-inner">${text}</div>`;
};
