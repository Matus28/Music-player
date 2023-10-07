import * as React from "react";
import Logo from "../components/Logo/Logo";
import Footer from "../components/Footer/Footer";
import { CurrentlyPlaying } from "../components/CurrentlyPlaying/CurrentlyPlaying";
import { PlaylistList } from "../components/Playlist/PlaylistList";
import { Playlist, Song } from "../utils/types";
import { TrackList } from "../components/Track/TrackList";
import { useTrackList } from "../hooks/useTrackList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLibrary } from "../hooks/useLibrary";
import { processData } from "../utils/processData";
import { Container } from "../components/Container/Container";
import { NavBar } from "../components/NavBar/NavBar";
import { checkFavoritePlaylist } from "../utils/checkFavoritePlaylist";
import { setTrackListOrder } from "../utils/setTrackListOrder";
import styles from "./Mobile.module.scss";
import { ControlPanel } from "../components/ControlPanel/ControlPanel";
import { DeviceContext } from "../context/DeviceContext";
import { TabNavigation } from "../components/TabNavigation/TabNavigation";
import { ActiveTabContext } from "../context/ActiveTabContext";

const Mobile = (): JSX.Element => {
  const { state: userValue } = useAuthContext();

  const isMobile = React.useContext(DeviceContext);

  const tabContext = React.useContext(ActiveTabContext);

  const [playlists, setPlaylists] = React.useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = React.useState<Playlist | null>(
    null
  );
  const [currentTrackList, setCurrentTrackList] = React.useState<Song[]>([]);
  const [playingTrackList, setPlayingTrackList] = React.useState<Song[]>([]);
  const [playingPlaylistIndex, setPlayingPlaylistIndex] = React.useState<
    number | null
  >(null);
  const [playingSongIndex, setPlayingSongIndex] = React.useState<number | null>(
    null
  );
  const [isShuffle, setIsShuffle] = React.useState<boolean>(false);
  const [triggerEnd, setTriggerEnd] = React.useState<boolean>(false);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

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
        const currentTrackListVar = processData.getTrackList(
          trackQuery.data ?? [],
          allPlaylists[0].playlistId,
          libraryQuery.data?.playlists ?? []
        );
        setCurrentTrackList(currentTrackListVar);
        setPlayingTrackList(currentTrackListVar);
      } else if (currentPlaylist) {
        const currentTrackListVar = processData.getTrackList(
          trackQuery.data ?? [],
          currentPlaylist.playlistId,
          libraryQuery.data?.playlists ?? []
        );
        setCurrentTrackList(currentTrackListVar);
      }
    }
  }, [libraryQuery.data]);

  React.useEffect(() => {
    if (trackQuery.data && trackQuery.data.length > 0) {
      setCurrentPlaylist(playlists[0]);
      setCurrentTrackList(trackQuery.data);
    }
  }, [trackQuery.data]);

  React.useEffect(() => {
    if (currentPlaylist) {
      setCurrentTrackList(
        processData.getTrackList(
          trackQuery.data ?? [],
          currentPlaylist?.playlistId,
          libraryQuery.data?.playlists ?? []
        )
      );
    }
  }, []);

  React.useEffect(() => {
    createPlayingTrackListOrder();
  }, [isShuffle]);

  const createPlayingTrackListOrder = (orderIndex: number = 0): void => {
    const newPlayingTrackList = setTrackListOrder(currentTrackList, isShuffle);
    setPlayingTrackList(newPlayingTrackList);
    if (playingSongIndex !== null) {
      setPlayingSongIndex(orderIndex);
    }
  };

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

  const handleSelectSong = (orderIndex: number, playlistId: number): void => {
    setPlayingPlaylistIndex(playlistId);
    setPlayingTrackList(currentTrackList);
    setPlayingSongIndex(orderIndex);
    if (playingPlaylistIndex !== playlistId) {
      createPlayingTrackListOrder(orderIndex);
    }
  };

  const handleNext = (): void => {
    if (playingSongIndex === null) {
      return;
    }
    const newIndex =
      playingSongIndex >= playingTrackList.length - 1
        ? 0
        : playingSongIndex + 1;
    setPlayingSongIndex(newIndex);
    musicPlayer.current?.src
      ? (musicPlayer.current.src = playingTrackList[newIndex].songUrl)
      : null;
    if (playingSongIndex === playingTrackList.length - 1) {
      setTriggerEnd((prev: boolean) => !prev);
    }
  };

  const handlePrevious = (): void => {
    if (!playingSongIndex) {
      return;
    }
    let newIndex: number = playingSongIndex;
    if (
      !isPlaying ||
      (isPlaying &&
        musicPlayer.current?.currentTime !== undefined &&
        musicPlayer.current?.currentTime < 5)
    ) {
      newIndex = playingSongIndex <= 0 ? 0 : playingSongIndex - 1;
    }
    setPlayingSongIndex(newIndex);
    musicPlayer.current?.src
      ? (musicPlayer.current.src = playingTrackList[newIndex].songUrl)
      : null;
    isPlaying ? musicPlayer.current?.play() : handleToggleIsPlaying();
  };

  const handleToggleShuffle = (): void => {
    setIsShuffle((prev: boolean) => !prev);
  };

  const handleToggleIsPlaying = (): void => {
    setIsPlaying((prev: boolean) => !prev);
  };

  return (
    <Container>
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.musicPlayer}>
          <div
            className={`${styles.leftPanel} ${
              isMobile && tabContext?.activeTab === "Playlists"
                ? styles.active
                : ""
            }`}
          >
            {!isMobile && <Logo size="regular" />}
            <PlaylistList
              playlists={playlists}
              selectedPlaylist={currentPlaylist}
              onSelect={handleSelectPlaylist}
            />
          </div>
          <div
            className={`${styles.rightPanel} ${
              isMobile &&
              (tabContext?.activeTab === "Current Song" ||
                tabContext?.activeTab === "Tracklist")
                ? styles.active
                : ""
            }`}
          >
            <div
              className={`${styles.up} ${
                isMobile && tabContext?.activeTab === "Current Song"
                  ? styles.active
                  : ""
              }`}
            >
              <CurrentlyPlaying
                currentSong={playingTrackList[playingSongIndex ?? -1]}
                playlists={playlists}
                isFavorite={checkFavoritePlaylist(
                  playingTrackList[playingSongIndex ?? -1],
                  libraryQuery.data
                )}
              />
            </div>
            <div
              className={`${styles.down} ${
                isMobile && tabContext?.activeTab === "Tracklist"
                  ? styles.active
                  : ""
              }`}
            >
              {currentPlaylist && (
                <TrackList
                  data={currentTrackList}
                  playlist={currentPlaylist}
                  playlists={playlists}
                  selectedSong={playingTrackList[playingSongIndex ?? -1]}
                  playingPlaylistId={playingPlaylistIndex}
                  isPlaying={isPlaying}
                  onSelect={handleSelectSong}
                />
              )}
            </div>
          </div>
          {isMobile && <TabNavigation />}
          <div className={styles.bottomPanel}>
            <ControlPanel
              musicPlayer={musicPlayer}
              playingTrackList={playingTrackList ?? []}
              playingSongIndex={playingSongIndex}
              ended={triggerEnd}
              isShuffle={isShuffle}
              isPlaying={isPlaying}
              onSetTriggerEnd={setTriggerEnd}
              onHandleNext={handleNext}
              onHandlePrevious={handlePrevious}
              onShuffleHandle={handleToggleShuffle}
              onSetIsPlaying={handleToggleIsPlaying}
            />
          </div>
        </div>
      </div>
      {!isMobile && <Footer />}
    </Container>
  );
};

export default Mobile;
