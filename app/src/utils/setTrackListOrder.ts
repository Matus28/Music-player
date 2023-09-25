import { Song } from "./types";

export const setTrackListOrder = (
  trackList: Song[],
  isShuffle: boolean
): Song[] => {
  let order: number[] = [...Array(trackList.length).keys()].map(
    (element) => element
  );

  if (isShuffle) {
    order.sort((a: number, b: number) => {
      return Math.random() - 0.5;
    });
  }

  return order.map((songIndex: number) => trackList[songIndex]);
};
