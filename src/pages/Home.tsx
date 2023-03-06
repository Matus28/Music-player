import * as React from "react";
import Header from "../components/Header/Header";
import { CurrentlyPlaying } from "../components/CurrentlyPlaying/CurrentlyPlaying";
import { PlaylistList } from "../components/Playlist/PlaylistList";
import { Playlist, Song } from "../utils/types";
import { TrackList } from "../components/Track/TrackList";
import { trackList } from "../components/ControlPanel/tracks";
import { playlistData } from "../components/Playlist/playlists";
import { setTrackListOrder } from "../utils/setTrackListOrder";
import { ControlPanel } from "../components/ControlPanel/ControlPanel";
import "./Home.css";

const Home = (): JSX.Element => {
  const [playlists, setPlaylists] = React.useState<Playlist[]>(playlistData);
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

  React.useEffect(() => {
    if (trackList) {
      const newTracksOrder = setTrackListOrder(trackList.length, isShuffle);
      setTracksOrder(newTracksOrder);
      setCurrentTrackList(trackList);
      setCurrentSong(trackList[newTracksOrder[0]]);
      console.log(newTracksOrder);
    }
    console.log(playlists);
  }, [playlists, trackList, isShuffle]);

  const handleSelectPlaylist = (playlistId: number): void => {
    const filteredPlaylist = playlists?.filter(
      (playlist: Playlist) => playlist.playlistId === playlistId
    )[0];
    setCurrentPlaylist(filteredPlaylist ?? null);
    console.log(`Playlist: ${filteredPlaylist?.playlistTitle}`);
  };

  const handleAddPlaylist = (formData: { playlistName: string }): void => {
    const newPlaylist = {
      playlistId: playlists.length + 1,
      playlistTitle: formData.playlistName,
      playlistAuthorId: "Matus",
      playlistIsDeletable: true,
    };
    if (playlists) {
      setPlaylists((prev: Playlist[]) => [...prev, newPlaylist]);
    }
  };

  const handleEditPlaylist = (formData: {
    playlistId: number;
    playlistName: string;
  }): void => {
    const newPlaylist = playlists.map((playlist: Playlist) => {
      if (playlist.playlistId === formData.playlistId) {
        playlist.playlistTitle = formData.playlistName;
      }
      return playlist;
    });
    if (playlists) {
      setPlaylists(newPlaylist);
    }
  };

  const handleRemovePlaylist = (formData: { playlistId: number }): void => {
    const newPlaylist = playlists.filter(
      (playlist: Playlist) => playlist.playlistId !== formData.playlistId
    );
    if (playlists) {
      setPlaylists(newPlaylist);
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
          currentTrackList[tracksOrder[newIndex]].songPath)
      : null;
    if (songIndex === tracksOrder.length - 1) {
      setTriggerEnd((prev: boolean) => !prev);
    }
  };

  const handleToggleShuffle = (): void => {
    setIsShuffle((prev: boolean) => !prev);
  };

  return (
    <div className="main-container">
      <div className="music-player">
        <div className="music-player-left-panel">
          <Header />
          <PlaylistList
            data={playlists}
            selectedPlaylist={currentPlaylist}
            onSelect={handleSelectPlaylist}
            onAddPlaylist={handleAddPlaylist}
            onEditPlaylist={handleEditPlaylist}
            onRemovePlaylist={handleRemovePlaylist}
          />
        </div>
        <div className="music-player-right-panel">
          <CurrentlyPlaying data={currentSong} />
          <TrackList
            data={currentTrackList ?? []}
            onSelect={handleSelectSong}
            selectedSong={currentSong}
          />
        </div>
        <div className="music-player-bottom-panel">
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
  );
};

export default Home;
