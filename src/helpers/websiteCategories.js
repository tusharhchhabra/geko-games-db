import {
  faTwitch,
  faXTwitter,
  faFacebook,
  faWikipediaW,
  faInstagram,
  faYoutube,
  faSteam,
  faReddit,
  faItchIo,
  faDiscord,
  faAndroid,
  faAppStoreIos,
} from "@fortawesome/free-brands-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const websiteCategories = {
  1: { name: "Official" },
  2: {
    name: "Wikia",
    icon: (
      <FontAwesomeIcon className="fa-fw text-2xl xl:text-3xl" icon={faFire} />
    ),
  },
  3: {
    name: "Wikipedia",
    icon: (
      <FontAwesomeIcon
        className="fa-fw text-2xl xl:text-3xl"
        icon={faWikipediaW}
      />
    ),
  },
  4: {
    name: "Facebook",
    icon: (
      <FontAwesomeIcon
        className="fa-fw text-2xl xl:text-3xl"
        icon={faFacebook}
      />
    ),
  },
  5: {
    name: "X",
    icon: (
      <FontAwesomeIcon
        className="fa-fw text-2xl xl:text-3xl"
        icon={faXTwitter}
      />
    ),
  },
  6: {
    name: "Twitch",
    icon: (
      <FontAwesomeIcon className="fa-fw text-2xl xl:text-3xl" icon={faTwitch} />
    ),
  },
  8: {
    name: "Instagram",
    icon: (
      <FontAwesomeIcon
        className="fa-fw text-2xl xl:text-3xl"
        icon={faInstagram}
      />
    ),
  },
  9: {
    name: "Youtube",
    icon: (
      <FontAwesomeIcon
        className="fa-fw text-2xl xl:text-3xl"
        icon={faYoutube}
      />
    ),
  },
  10: {
    name: "iPhone",
    icon: (
      <FontAwesomeIcon
        className="fa-fw text-2xl xl:text-3xl"
        icon={faAppStoreIos}
      />
    ),
  },
  11: {
    name: "iPad",
    icon: (
      <FontAwesomeIcon
        className="fa-fw text-2xl xl:text-3xl"
        icon={faAppStoreIos}
      />
    ),
  },
  12: {
    name: "Android",
    icon: (
      <FontAwesomeIcon
        className="fa-fw text-2xl xl:text-3xl"
        icon={faAndroid}
      />
    ),
  },
  13: {
    name: "Steam",
    icon: (
      <FontAwesomeIcon className="fa-fw text-2xl xl:text-3xl" icon={faSteam} />
    ),
  },
  14: {
    name: "Reddit",
    icon: (
      <FontAwesomeIcon className="fa-fw text-2xl xl:text-3xl" icon={faReddit} />
    ),
  },
  15: {
    name: "Itch",
    icon: (
      <FontAwesomeIcon className="fa-fw text-2xl xl:text-3xl" icon={faItchIo} />
    ),
  },
  16: { name: "Epic" },
  17: { name: "GOG" },
  18: { name: "Discord", icon: <FontAwesomeIcon icon={faDiscord} /> },
};

export default websiteCategories;
