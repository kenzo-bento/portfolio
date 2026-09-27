/* ============================================================
   Page-to-page navigation
   Four pages snap one at a time. The four nav buttons jump to
   a page and darken for the page you're on. Pages may be taller
   than the viewport (mobile), so positions are measured per scroll.
   ============================================================ */
(function () {
  "use strict";

  const container = document.getElementById("pages");
  const pages = Array.from(container.querySelectorAll(".page"));
  const btns = Array.from(document.querySelectorAll(".nav-btn"));
  const nav = document.getElementById("page-nav");
  if (!pages.length || !btns.length) return;

  let current = 0;
  let programmatic = false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* mobile / coarse pointers get proximity snap so free scrolling
     never fights the finger; desktop keeps mandatory snap */
  const coarse = window.matchMedia("(pointer: coarse), (max-width: 720px)");
  function applySnap() {
    container.style.scrollSnapType = coarse.matches ? "y proximity" : "";
  }
  applySnap();
  if (coarse.addEventListener) coarse.addEventListener("change", applySnap);

  /* top of page i, in container scroll coordinates — measured fresh
     each call because page heights change with the viewport */
  function pageTop(i) {
    return pages[i].getBoundingClientRect().top
         - container.getBoundingClientRect().top
         + container.scrollTop;
  }

  function scrollToPage(i) {
    i = Math.max(0, Math.min(pages.length - 1, i));
    current = i;
    paint();
    programmatic = true;
    container.scrollTo({ top: pageTop(i), behavior: reduceMotion.matches ? "auto" : "smooth" });
    clearTimeout(scrollToPage._t);
    scrollToPage._t = setTimeout(() => { programmatic = false; }, 800);
  }

  function paint() {
    btns.forEach((b, i) => {
      const active = i === current;
      b.classList.toggle("is-active", active);
      if (active) b.setAttribute("aria-current", "true");
      else b.removeAttribute("aria-current");
    });
  }

  /* nav clicks — target comes from data-target, order is the fallback */
  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const byId = document.getElementById(btn.dataset.target);
      scrollToPage(byId ? pages.indexOf(byId) : i);
    });
  });

  /* which page is centered in the viewport right now */
  function currentPage() {
    const mid = container.scrollTop + container.clientHeight / 2;
    let best = 0;
    for (let i = 0; i < pages.length; i++) {
      if (pageTop(i) <= mid) best = i;
    }
    return best;
  }

  let ticking = false;
  container.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (!programmatic) {
        const idx = currentPage();
        if (idx !== current) {
          current = idx;
          paint();
        }
      }
      ticking = false;
    });
  }, { passive: true });

  /* keep the active button honest after the OS settles a rubber-band
     scroll (iOS) or a snap correction */
  container.addEventListener("scrollend", () => {
    const idx = currentPage();
    if (idx !== current) { current = idx; paint(); }
  });

  /* keyboard: one page per press */
  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); scrollToPage(current + 1); }
    else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); scrollToPage(current - 1); }
    else if (e.key === "Home") { e.preventDefault(); scrollToPage(0); }
    else if (e.key === "End") { e.preventDefault(); scrollToPage(pages.length - 1); }
  });

  /* if the floating nav would sit on top of page content (short,
     very wide phones), fold it into an unobtrusive dot */
  const CONTENT_SEL = "img, figure, video, h1, h2, h3, p, ul, a";

  function checkNavOverlap() {
    if (!nav) return;
    if (!coarse.matches) { document.body.classList.remove("nav-overlap"); return; }
    const page = pages[current];
    if (!page) return;
    const nr = nav.getBoundingClientRect();
    const overlaps = Array.from(page.querySelectorAll(CONTENT_SEL)).some((el) => {
      const r = el.getBoundingClientRect();
      return r.left < nr.right && r.right > nr.left
          && r.top < nr.bottom && r.bottom > nr.top;
    });
    document.body.classList.toggle("nav-overlap", overlaps);
  }

  /* tapping the folded dot expands the nav for a moment */
  if (nav) {
    nav.addEventListener("pointerdown", () => {
      document.body.classList.remove("nav-overlap");
      clearTimeout(checkNavOverlap._t);
      checkNavOverlap._t = setTimeout(checkNavOverlap, 1200);
    });
  }
  window.addEventListener("resize", checkNavOverlap);
  window.addEventListener("load", checkNavOverlap);
  container.addEventListener("scroll", () => requestAnimationFrame(checkNavOverlap), { passive: true });
  checkNavOverlap();

  paint();
})();
