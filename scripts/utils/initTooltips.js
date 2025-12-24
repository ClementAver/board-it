export default function initTooltips() {
  const describeds = document.querySelectorAll(':has(+ [role="tooltip"])');
  const tooltips = document.querySelectorAll('[role="tooltip"]');

  for (let i = 0; i < describeds.length; i++) {
    const described = describeds[i];
    const tooltip = tooltips[i];

    if (!described || !tooltip) break;

    /* Useless, as the popover API handles it for us, kept as a reminder. */
    // described.style.anchorName = `--tooltip-anchor-${i}`;
    // tooltip.style.positionAnchor = `--tooltip-anchor-${i}`;

    tooltip.id = `tooltip-${i}`;
    tooltip.popover = "hint";

    described.setAttribute("aria-describedby", [tooltip.id]);
    described.interestForElement = tooltip;
  }
}
