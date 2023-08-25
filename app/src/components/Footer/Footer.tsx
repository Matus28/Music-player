import styles from "./Footer.module.scss";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = (): JSX.Element => {
  return (
    <div className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.icons}>
          <a
            href="https://www.linkedin.com/in/mat%C3%BA%C5%A1-tatarko-a71111164/"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/Matus28" target="_blank">
            <FaGithub />
          </a>
        </div>
        <div className={styles.author}>
          <p>© 2023 Matus. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
