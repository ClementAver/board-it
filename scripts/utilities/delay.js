export default function delay(nodes, { property = "transition", delay = 300, initialDelay = 0 } = {}) {
  let count = initialDelay;

  nodes.forEach((node) => {
    node.style[`${property}Delay`] = `${count}ms`;
    count += delay;
  });
}
