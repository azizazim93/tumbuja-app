
const hurufList = ["ا","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"];

const hurufTebal = ["ص","ض","ط","ظ","ق","غ","ر","خ"];
const padanan = {
    fathah: { gesture: "✊", emojiTebal: "😮", emojiRingan: "😀", label: "Tumbuk ke atas" },
    kasrah: { gesture: "✊", emojiTebal: "😬", emojiRingan: "😬", label: "Tumbuk ke bawah" },
    dammah: { gesture: "👊", emojiTebal: "😗", emojiRingan: "😗", label: "Tumbuk ke depan" }
};

let selectedHuruf = null;
let selectedHarakat = null;

const hurufContainer = document.getElementById("huruf-container");
hurufList.forEach(huruf => {
    const btn = document.createElement("button");
    btn.innerText = huruf;
    btn.onclick = () => {
        selectedHuruf = huruf;
        document.querySelectorAll("#huruf-container button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        updateOutput();
    };
    hurufContainer.appendChild(btn);
});

document.querySelectorAll(".harakat-button").forEach(button => {
    button.addEventListener("click", () => {
        selectedHarakat = button.getAttribute("data-harakat");
        document.querySelectorAll(".harakat-button").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        updateOutput();
    });
});

function updateOutput() {
    if (!selectedHuruf || !selectedHarakat) return;

    const harakatSimbol = selectedHarakat === "fathah" ? "َ" : selectedHarakat === "kasrah" ? "ِ" : "ُ";
    const isTebal = hurufTebal.includes(selectedHuruf);
    const emoji = isTebal ? padanan[selectedHarakat].emojiTebal : padanan[selectedHarakat].emojiRingan;

    const hurufOutput = document.getElementById("output-huruf");
    hurufOutput.innerText = selectedHuruf + harakatSimbol;

    // Aktifkan animasi
    hurufOutput.classList.remove("animate-huruf");
    void hurufOutput.offsetWidth; // trik reflow supaya animasi ulang
    hurufOutput.classList.add("animate-huruf");

    const emojiOutput = document.getElementById("output-emoji");
    emojiOutput.innerText = emoji;

    emojiOutput.classList.remove("animate-emoji");
    void emojiOutput.offsetWidth;
    emojiOutput.classList.add("animate-emoji");

    document.getElementById("output-gesture").innerText = padanan[selectedHarakat].gesture;
    const gestureOutput = document.getElementById("output-gesture");
    gestureOutput.classList.remove("animate-gesture");
    void gestureOutput.offsetWidth; // untuk reset animasi
    gestureOutput.classList.add("animate-gesture");

    // Rotate gesture bila kasrah
    if (selectedHarakat === "kasrah") {
        gestureOutput.style.transform = "rotate(180deg)";
    } else {
        gestureOutput.style.transform = "rotate(0deg)";
    }

    document.getElementById("gesture-label").innerText = padanan[selectedHarakat].label;

    // Audio playback
    const audioId = `${selectedHuruf}_${selectedHarakat}`; // e.g. ش_fathah
    const audioPath = `https://cdn.glitch.global/YOUR-ASSET-ID/${audioId}.mp3`; // Replace YOUR-ASSET-ID manually
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.src = audioPath;
    audioPlayer.play().catch(err => console.log("Audio play skipped"));

}

// Kawal bunyi background music – ini letak di luar fungsi
const bgMusic = document.getElementById("bg-music");
if (bgMusic) {
    bgMusic.volume = 0.4; // 35% bunyi
}

window.addEventListener('click', () => {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic) {
    bgMusic.volume = 0.4;
    bgMusic.play().catch(err => console.log("Autoplay blocked:", err));
  }
}, { once: true });
