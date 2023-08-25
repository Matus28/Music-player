import * as React from "react";
import Logo from "../components/Logo/Logo";
import { CurrentlyPlaying } from "../components/CurrentlyPlaying/CurrentlyPlaying";
import { PlaylistList } from "../components/Playlist/PlaylistList";
import { Playlist, Song } from "../utils/types";
import { TrackList } from "../components/Track/TrackList";
import { setTrackListOrder } from "../utils/setTrackListOrder";
import { ControlPanel } from "../components/ControlPanel/ControlPanel";
import { useTrackList } from "../hooks/useTrackList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLibrary } from "../hooks/useLibrary";
import { processData } from "../utils/processData";
import { Container } from "../components/Container/Container";
import { NavBar } from "../components/NavBar/NavBar";
import styles from "./Home.module.scss";
import Footer from "../components/Footer/Footer";

const Home = (): JSX.Element => {
  const { state: userValue } = useAuthContext();

  const [playlists, setPlaylists] = React.useState<Playlist[]>([]);
  // const [trackList, setTracklist] = React.useState<Song[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = React.useState<Playlist | null>(
    null
  );
  const [currentTrackList, setCurrentTrackList] = React.useState<Song[]>([]);
  const [currentSong, setCurrentSong] = React.useState<Song | null>(null);
  const [duration, setDuration] = React.useState<number>(0);
  const [position, setPosition] = React.useState<number>(0);
  const [songIndex, setSongIndex] = React.useState<number>(0);
  const [isShuffle, setIsShuffle] = React.useState<boolean>(false);
  const [tracksOrder, setTracksOrder] = React.useState<number[]>([]);
  const [triggerEnd, setTriggerEnd] = React.useState<boolean>(false);

  const musicPlayer = React.useRef<HTMLAudioElement | null>(null);

  const libraryQuery = useLibrary(userValue);

  const trackQuery = useTrackList(userValue);

  React.useEffect(() => {
    if (libraryQuery.data && libraryQuery.data?.playlists.length > 0) {
      const allPlaylists = processData.getPlaylists(
        libraryQuery.data.playlists
      );
      setPlaylists(allPlaylists);
      if (!currentPlaylist) {
        setCurrentPlaylist(allPlaylists[0]);
      } else {
        setCurrentTrackList(
          processData.getTrackList(
            trackQuery.data ?? [],
            currentPlaylist.playlistId,
            libraryQuery.data?.playlists ?? []
          )
        );
      }
    }
  }, [libraryQuery.data]);

  React.useEffect(() => {
    if (trackQuery.data && trackQuery.data.length > 0) {
      setCurrentTrackList(trackQuery.data);
    }
  }, [trackQuery.data]);

  React.useEffect(() => {
    if (currentTrackList) {
      const newTracksOrder = setTrackListOrder(
        currentTrackList.length,
        isShuffle
      );
      setTracksOrder(newTracksOrder);
      setCurrentSong(currentTrackList[newTracksOrder[0]]);
    }
  }, [currentTrackList, isShuffle]);

  const handleSelectPlaylist = (playlistId: number): void => {
    const filteredPlaylist = playlists?.filter(
      (playlist: Playlist) => playlist.playlistId === playlistId
    )[0];
    setCurrentPlaylist(filteredPlaylist ?? null);
    setCurrentTrackList(
      processData.getTrackList(
        trackQuery.data ?? [],
        filteredPlaylist.playlistId,
        libraryQuery.data?.playlists ?? []
      )
    );
  };

  const handleRemoveSong = (formData: { songId: number }): void => {
    const updatePlaylist = currentTrackList.filter(
      (track: Song) => track.songId !== formData.songId
    );
    if (currentTrackList) {
      setCurrentTrackList(updatePlaylist);
    }
  };

  const handleSelectSong = (songId: number): void => {
    const filteredTrackList = currentTrackList?.filter(
      (song: Song) => song.songId === songId
    )[0];
    // To secure that tracksOrder will not set the selected (current) song again
    currentTrackList.forEach((track: Song, index: number) => {
      if (track.songId === songId) {
        tracksOrder.forEach((trackOrder: number, ind: number) => {
          if (index === trackOrder) {
            setSongIndex(ind);
          }
        });
      }
    });

    setCurrentSong(filteredTrackList ?? currentTrackList[0]);
    console.log(`Current Song: ${filteredTrackList}`);
  };

  const handleNext = (): void => {
    const newIndex = songIndex >= tracksOrder.length - 1 ? 0 : songIndex + 1;
    setSongIndex(newIndex);
    setCurrentSong(currentTrackList[tracksOrder[newIndex]]);
    musicPlayer.current?.src
      ? (musicPlayer.current.src =
          currentTrackList[tracksOrder[newIndex]].songUrl)
      : null;
    if (songIndex === tracksOrder.length - 1) {
      setTriggerEnd((prev: boolean) => !prev);
    }
  };

  const handleToggleShuffle = (): void => {
    setIsShuffle((prev: boolean) => !prev);
  };

  return (
    <Container>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.musicPlayer}>
          <div className={styles.leftPanel}>
            <Logo size="regular" />
            <PlaylistList
              playlists={playlists}
              selectedPlaylist={currentPlaylist}
              onSelect={handleSelectPlaylist}
            />
          </div>
          <div className={styles.rightPanel}>
            <CurrentlyPlaying currentSong={currentSong} playlists={playlists} />
            <TrackList
              data={currentTrackList}
              playlistTitle={currentPlaylist?.playlistName ?? ""}
              playlistId={currentPlaylist?.playlistId ?? -1}
              selectedSong={currentSong}
              onSelect={handleSelectSong}
              onRemoveSong={handleRemoveSong}
            />
          </div>
          <div className={styles.bottomPanel}>
            <ControlPanel
              musicPlayer={musicPlayer}
              currentTrackList={currentTrackList ?? []}
              currentSong={currentSong}
              songIndex={songIndex}
              ended={triggerEnd}
              duration={duration}
              position={position}
              isShuffle={isShuffle}
              onSetSongIndex={setSongIndex}
              onSetCurrentSong={setCurrentSong}
              onSetTriggerEnd={setTriggerEnd}
              onSetDuration={setDuration}
              onSetPosition={setPosition}
              onHandleNext={handleNext}
              onShuffleHandle={handleToggleShuffle}
            />
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Home;
