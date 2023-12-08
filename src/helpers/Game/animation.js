const animateSwimming = (keys, player) => {
  const swimmingKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (!player.anims.isPlaying && 
    keys.some(key => swimmingKeys.includes(key))) {
    player.play('swimming');
  } else if (player.anims.isPlaying && !keys.some(key => swimmingKeys.includes(key))) {
    player.stop('swimming');
}

};

const animateBatSwinging = (keys, player) => {
  if (!player.anims.isPlaying && (keys.includes('KeyW') || keys.includes('w'))) {
    player.play('batSwing');
  } else if (player.anims.isPlaying && !keys.includes('KeyW') && !keys.includes('w')) {
    player.stop();
  }
};


export {animateSwimming, animateBatSwinging};
