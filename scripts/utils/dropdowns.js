export default function initDropdownMenus() {
  const anchors = document.querySelectorAll("[anchor]");
  const targets = document.querySelectorAll("[target]");

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    const target = targets[i];

    if (!anchor || !target) break;

    anchor.style.anchorName = `--anchor-${i}`;
    target.style.positionAnchor = `--anchor-${i}`;

    target.classList.add("hidden");

    anchor.addEventListener("click", () => {
      target.classList.toggle("hidden");
    });

    /* Click outside handler */
    document.addEventListener("click", (event) => {
      const withinBoundaries =
        event.composedPath().includes(anchor) || event.composedPath().includes(target);

      if (!withinBoundaries) target.classList.add("hidden");
    });
  }
}
