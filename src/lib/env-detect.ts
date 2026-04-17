export function isTouchOnly(win: Window = window): boolean {
  const touch = 'ontouchstart' in win;
  const fine = typeof win.matchMedia === 'function' && win.matchMedia('(pointer: fine)').matches;
  return touch && !fine;
}
