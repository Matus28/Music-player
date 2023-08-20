import "./Cover.css";

export const Cover = (props: { path?: string }): JSX.Element => {
  return (
    <div className="music-player-header__cover">
      <img
        src={
          props.path ? props.path : "../../../public/img/music-placeholder.png"
        }
        alt="Currently playing song's album cover."
      />
    </div>
  );
};
