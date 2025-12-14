export default function initAnchors() {
  const anchors = document.querySelectorAll("[data-anchor]");
  const targets = document.querySelectorAll("[data-target]");

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    const target = targets[i];

    if (!anchor || !target) break;

    anchor.style.anchorName = `--anchor-${i}`;
    target.style.positionAnchor = `--anchor-${i}`;
  }
}
