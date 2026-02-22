// =========================
// Mobile navbar toggle
// =========================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle?.addEventListener("click", () => navLinks?.classList.toggle("open"));

document.querySelectorAll(".nav-link").forEach(a => {
  a.addEventListener("click", () => navLinks?.classList.remove("open"));
});

// =========================
// Active section highlight
// =========================
const sections = ["home","projects","skills","experience","contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navMap = new Map();
document.querySelectorAll(".nav-link").forEach(a => {
  const t = a.getAttribute("data-target");
  if (t) navMap.set(t, a);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute("id");
      document.querySelectorAll(".nav-link").forEach(x => x.classList.remove("active"));
      navMap.get(id)?.classList.add("active");
    }
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

sections.forEach(s => observer.observe(s));

// =========================
// Search + Filter + Modal
// =========================
const search = document.getElementById("projectSearch");
const filter = document.getElementById("techFilter");
const cards = document.querySelectorAll(".project-card");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const mTitle = document.getElementById("mTitle");
const mTagline = document.getElementById("mTagline");
const mDesc = document.getElementById("mDesc");
const mTech = document.getElementById("mTech");
const mLive = document.getElementById("mLive");
const mGit = document.getElementById("mGit");

function applyFilters() {
  const q = (search?.value || "").toLowerCase().trim();
  const tech = (filter?.value || "").toLowerCase().trim();

  cards.forEach(c => {
    const title = c.dataset.title || "";
    const stack = c.dataset.tech || "";
    const okQ = !q || title.includes(q) || stack.includes(q);
    const okT = !tech || stack.includes(tech);
    c.style.display = (okQ && okT) ? "" : "none";
  });
}

// Build unique tech options
if (filter) {
  const techSet = new Set();
  cards.forEach(c => {
    (c.dataset.tech || "")
      .split(",")
      .map(x => x.trim())
      .filter(Boolean)
      .forEach(t => techSet.add(t));
  });
  [...techSet].sort().forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    filter.appendChild(opt);
  });
}

search?.addEventListener("input", applyFilters);
filter?.addEventListener("change", applyFilters);

// Modal open
cards.forEach(c => {
  c.addEventListener("click", () => {
    mTitle.textContent = c.querySelector("h4,h3")?.textContent || "Project";
    mTagline.textContent = c.dataset.tagline || "";
    mDesc.textContent = c.dataset.desc || "";
    mTech.textContent = c.dataset.tech || "";

    const live = c.dataset.live || "";
    const git = c.dataset.github || "";

    if (live) { mLive.href = live; mLive.style.display = "inline-block"; }
    else { mLive.style.display = "none"; }

    if (git) { mGit.href = git; mGit.style.display = "inline-block"; }
    else { mGit.style.display = "none"; }

    modal.classList.remove("hidden");
  });
});

function hideModal(){ modal.classList.add("hidden"); }
closeModal?.addEventListener("click", hideModal);
modal?.addEventListener("click", (e) => { if (e.target === modal) hideModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") hideModal(); });

// =========================
// Copy Email + Toast
// =========================
const toast = document.getElementById("toast");
let toastTimer = null;

function showToast(msg){
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 1400);
}

async function copyEmailFrom(btn){
  const email = btn?.dataset?.email;
  if (!email) return;
  try{
    await navigator.clipboard.writeText(email);
    showToast("Email copied ✅");
  }catch{
    const ta = document.createElement("textarea");
    ta.value = email;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("Email copied ✅");
  }
}

document.getElementById("copyEmailBtn")?.addEventListener("click", (e)=> copyEmailFrom(e.currentTarget));
document.getElementById("copyEmailBtn2")?.addEventListener("click", (e)=> copyEmailFrom(e.currentTarget));