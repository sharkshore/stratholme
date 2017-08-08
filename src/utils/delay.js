export const delay = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout);
  });
};

export const cirle = (timeout) => {
  return new Promise((resolve, reject) => {
    setInterval(resolve, timeout);
  });
};
