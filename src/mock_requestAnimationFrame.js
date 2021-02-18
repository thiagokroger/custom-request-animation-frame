export const requestAnimationFrameMock = (callback, delay = 0) => {
  const time = new Date().getTime();
  const call = Math.max(0, 16 - (time - delay));

  const id = window.setTimeout(callback, call);

  return id;
};
