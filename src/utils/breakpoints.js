export function getTableSize(screens) {
  if (screens.xl || screens.xxl) return 'large';
  if (screens.md || screens.lg) return 'middle';
  if (screens.xs || screens.sm) return 'small';
}

export function getMiddleAndLargeSize(screens) {
  if (screens.lg || screens.xl || screens.xxl) return 'large';
  return 'middle';
}
