export default function initAnchors() {
  const anchors = document.querySelectorAll("[data-anchor]");
  const targets = document.querySelectorAll("[data-target]");

  Array.from(anchors).map((anchor, i) => {
    const target = targets[i];

    if (!target) return;

    anchor.style.anchorName = `--anchor-${i}`;
    target.style.positionAnchor = `--anchor-${i}`;
  });
}
