import { DUCK_SPEED, MAP_HEIGHT, MAP_WIDTH } from "./constants";
import { mapBounds } from "./mapBounds";

const isWithinMovementBoundaries = (x, y) => {
  return !mapBounds[y] ? true : !mapBounds[y].includes(x);
};

const movePlayer = (keys, player) => {
  let playerMoved = false;
  const absPlayerX = Math.round(player.duck.x + MAP_WIDTH / 2);
  const absPlayerY = Math.round(player.duck.y + MAP_HEIGHT / 2);

  if (
    keys.includes('ArrowUp') &&
    isWithinMovementBoundaries(Math.round(player.duck.x), Math.round(player.duck.y - DUCK_SPEED))
  ) {
    playerMoved = true;
    player.duck.y = Math.round(player.duck.y - DUCK_SPEED);
  }

  if (
    keys.includes('ArrowDown') &&
    isWithinMovementBoundaries(Math.round(player.duck.x), Math.round(player.duck.y + DUCK_SPEED))
  ) {
   
    playerMoved = true;
    player.duck.y = Math.round(player.duck.y + DUCK_SPEED);
  }

  if (
    keys.includes('ArrowLeft') &&
    isWithinMovementBoundaries(Math.round(player.duck.x - DUCK_SPEED), Math.round(player.duck.y))
  ) {
   
    playerMoved = true;
    player.duck.x = Math.round(player.duck.x - DUCK_SPEED);
    player.duck.flipX = true;
    player.bat.flipX = true;
  }

  if (
    keys.includes('ArrowRight') &&
    isWithinMovementBoundaries(Math.round(player.duck.x + DUCK_SPEED), Math.round(player.duck.y))
  ) {
   
    playerMoved = true;
    player.duck.x = Math.round(player.duck.x + DUCK_SPEED);
    player.duck.flipX = false;
    player.bat.flipX = false;
  }

  return playerMoved;
};

export default movePlayer;
