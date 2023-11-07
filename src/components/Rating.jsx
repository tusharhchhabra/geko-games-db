import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Rating({ count }) {
  return (
    <div class="flex items-baseline">
      <FontAwesomeIcon
        icon={faStar}
        className="text-yellow-400 drop-shadow-[0_0_1px_rgba(255,255,210,0.2)]"
      />
      <p class="ml-2">{count}</p>
    </div>
  );
}

export default Rating;
