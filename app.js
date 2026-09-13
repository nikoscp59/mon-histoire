const videos = [
  {
    id: 1,
    title: "Écoute mon histoire",
    description: "Le premier film — mon parcours, raconté de mon point de vue.",
    date: "2026-09-13",
    duration: "29:00",
    video: "https://www.youtube.com/watch?v=YYlGniMTArw",
    poster: ""
  }
];

const grid = document.getElementById("video-grid");
const search = document.getElementById("search");
const empty = document.getElementById("empty");

function render(list) {
  if (!grid) return;

  grid.innerHTML = list.map(v => `
    <a class="card" href="./watch.html?id=${v.id}">
      <div class="thumb">
        <span>▶</span>
        <small>FILM ${String(v.id).padStart(2,"0")}</small>
      </div>
      <div class="card-body">
        <h3>${escapeHtml(v.title)}</h3>
        <p>${escapeHtml(v.description)}</p>
        <span class="meta">${v.date} · ${v.duration}</span>
      </div>
    </a>
  `).join("");

  empty.hidden = list.length !== 0;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, c => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  }[c]));
}

render(videos);

if (search) {
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();

    render(videos.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q)
    ));
  });
}
