import "./Header.css";

const Header = (props: { albumCover?: string }): JSX.Element => {
  return (
    <div className="music-player-header">
      <img
        src="../../../public/img/MusicPlayer.png"
        alt="Logo of music player"
      />
    </div>
  );
};

export default Header;
