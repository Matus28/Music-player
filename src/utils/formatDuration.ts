export const formatDuration = (value: number): string => {
  if (value <= 0) {
    return "0:00";
  }
  const minute = Math.floor(value / 60);
  const secondLeft = value - minute * 60;
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
};
