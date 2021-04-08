export function setClass(position) {
  let className = '';

  if ([0, 1, 2].includes(position)) {
    className += ' no-border-top';
  }
  if ([2, 5, 8].includes(position)) {
    className += ' no-border-right';
  }
  if ([6, 7, 8].includes(position)) {
    className += ' no-border-bottom';
  }
  if ([0, 3, 6].includes(position)) {
    className += ' no-border-left';
  }

  return className;
}