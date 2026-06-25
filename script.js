// Γιαγιά vs Κατσαρίδα — score kept in the browser (localStorage).
const KEY = "giagia-vs-roach";

const els = {
  giagia: document.getElementById("score-giagia"),
  roach: document.getElementById("score-roach"),
  tagline: document.getElementById("tagline"),
  toast: document.getElementById("toast"),
};

const TAGLINES = [
  "Tap + every time Γιαγιά squashes one. 🩴",
  "Another one bites the dust. 💥",
  "Η Γιαγιά is on a rampage! 🔥",
  "The kitchen is HER octagon. 👑",
  "They keep coming back... 🪳",
];

let score = load();
let toastTimer = null;

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && typeof saved.giagia === "number" && typeof saved.roach === "number") {
      return saved;
    }
  } catch (e) { /* ignore corrupt data */ }
  return { giagia: 0, roach: 0 };
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(score));
}

function render(bumped) {
  els.giagia.textContent = score.giagia;
  els.roach.textContent = score.roach;
  if (bumped) {
    const node = els[bumped];
    node.classList.remove("bump");
    void node.offsetWidth; // restart animation
    node.classList.add("bump");
  }
}

function setTagline(side, delta) {
  if (side === "giagia" && delta > 0) {
    els.tagline.textContent = TAGLINES[Math.floor(Math.random() * TAGLINES.length)];
  } else if (side === "roach" && delta > 0) {
    els.tagline.textContent = "Uh oh — a cockroach scored a takedown. 😱";
  }
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const side = btn.dataset.side;
    const delta = Number(btn.dataset.delta);
    score[side] = Math.max(0, score[side] + delta);
    save(); // keep the running tally safe on every tap
    render(side);
    setTagline(side, delta);
  });
});

document.getElementById("save").addEventListener("click", () => {
  save();
  els.toast.hidden = false;
  // restart the fade-in animation on repeat taps
  els.toast.style.animation = "none";
  void els.toast.offsetWidth;
  els.toast.style.animation = "";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { els.toast.hidden = true; }, 6000);
});

render();
