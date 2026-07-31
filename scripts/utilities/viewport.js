function viewportQuarter(el) {
  const { left, right, top, bottom } = el.getBoundingClientRect();
  const { vpW, vpH } = { vpW: window.innerWidth, vpH: window.innerHeight };

  return { isLeftSide: left < vpW - right, isTopSide: top < vpH - bottom };
}

function placeTooltip(tooltip) {
  tooltip.style.visibility = 'hidden';

  tooltip.style.bottom = 'unset';
  tooltip.style.left = 'unset';
  tooltip.style.maxHeight = 'unset';
  tooltip.style.maxWidth = 'unset';
  tooltip.style.position = 'fixed';
  tooltip.style.right = 'unset';
  tooltip.style.top = 'unset';

  const { vpW, vpH } = { vpW: window.innerWidth, vpH: window.innerHeight };
  const { left: anL, right: anR, top: anT, bottom: anB } = anchor.getBoundingClientRect();
  const { isLeftSide, isTopSide } = viewportQuarter(anchor);
  const { width: ttW } = tooltip.getBoundingClientRect();

  if (isTopSide) {
    tooltip.style.top = px(anB);
    const maxH = vpH - anB;
    tooltip.style.maxHeight = px(maxH - vpMargin);
  } else {
    tooltip.style.bottom = px(vpH - anT);
    const maxH = anT;
    tooltip.style.maxHeight = px(maxH - vpMargin);
  }

  if (isLeftSide) {
    const ttIsOverflowingAnchor = vpW - (ttW + vpMargin) < anR;

    if (ttIsOverflowingAnchor) {
      tooltip.style.right = px(vpMargin);
      tooltip.style.maxWidth = px(vpW - vpMargin * 2);
    } else {
      tooltip.style.left = px(anR);
      tooltip.style.maxWidth = px(vpW - anR - vpMargin);
    }
  } else {
    const ttIsOverflowingAnchor = ttW + vpMargin > anL;

    if (ttIsOverflowingAnchor) {
      tooltip.style.left = px(vpMargin);
      tooltip.style.maxWidth = px(vpW - vpMargin * 2);
    } else {
      tooltip.style.right = px(vpW - anL);
      tooltip.style.maxWidth = px(anL - vpMargin);
    }
  }
  element.style.visibility = 'visible';
}

function placeDropdown(target, anchor, viewportMargin = 0) {
  const { isTopSide } = viewportQuarter(anchor);
  const anchorRect = anchor.getBoundingClientRect();
  const vpH = window.innerHeight;

  target.style.position = 'fixed';
  target.style.maxHeight = 'unset';
  target.style.top = 'unset';
  target.style.right = 'unset';
  target.style.bottom = 'unset';
  target.style.left = anchorRect.left + 'px';
  target.style.width = anchorRect.width + 'px';

  if (isTopSide) {
    target.style.top = anchorRect.bottom + 'px';
    const maxH = vpH - anchorRect.bottom;
    target.style.maxHeight = maxH - viewportMargin + 'px';

    target.classList.remove('dropdown-above');
    target.classList.add('dropdown-below');
  } else {
    target.style.bottom = vpH - anchorRect.top + 'px';
    const maxH = anchorRect.top;
    target.style.maxHeight = maxH - viewportMargin + 'px';

    target.classList.remove('dropdown-below');
    target.classList.add('dropdown-above');
  }
}

function createRecursiveIntersectionWatcher(
  target,
  { onEnter = () => {}, onLeave = () => {}, threshold = 0, axis = 'both' } = {},
) {
  let observers = [];
  let visibleMap = new Map();
  let wasFullyVisible = null;

  function isVisible(entry) {
    const { intersectionRect, boundingClientRect } = entry;

    if (axis === 'x') {
      return intersectionRect.width >= boundingClientRect.width * threshold;
    }
    if (axis === 'y') {
      return intersectionRect.height >= boundingClientRect.height * threshold;
    }
    return entry.isIntersecting;
  }

  function updateState() {
    const fullyVisible = [...visibleMap.values()].every((v) => v);

    if (fullyVisible && wasFullyVisible === false) {
      onEnter();
    } else if (!fullyVisible && wasFullyVisible === true) {
      onLeave();
    }

    wasFullyVisible = fullyVisible;
  }

  function start() {
    if (!target || observers.length) return;

    const parents = getScrollableParents(target);
    visibleMap = new Map(parents.map((p) => [p, true]));

    observers = parents.map((parent) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibleMap.set(parent, isVisible(entry));
            updateState();
          });
        },
        { root: parent, threshold },
      );
      obs.observe(target);
      return obs;
    });
  }

  function stop() {
    observers.forEach((o) => o.disconnect());
    observers = [];
    visibleMap.clear();
    wasFullyVisible = null;
  }

  return { start, stop };
}

function getScrollableParents(el) {
  const parents = [];
  let parent = el.parentElement;

  while (parent) {
    const style = getComputedStyle(parent);
    const overflowX = style.overflowX;
    const overflowY = style.overflowY;

    if (
      overflowX === 'auto' ||
      overflowX === 'scroll' ||
      overflowY === 'auto' ||
      overflowY === 'scroll'
    ) {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}

export {
  viewportQuarter,
  placeTooltip,
  placeDropdown,
  getScrollableParents,
  createRecursiveIntersectionWatcher,
};
