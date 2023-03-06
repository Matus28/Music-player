export const setTrackListOrder = (
  songsNumber: number,
  isShuffle: boolean
): number[] => {
  let result: number[] = [...Array(songsNumber).keys()].map(
    (element) => element
  );

  if (isShuffle) {
    result.sort((a: number, b: number) => {
      return Math.random() - 0.5;
    });
  }

  return result;
};
