import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import {
  DUCK_HEIGHT,
  DUCK_WIDTH,
  MAP_WIDTH,
  MAP_HEIGHT,
  DUCK_SPEED,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  BAT_HEIGHT,
  BAT_WIDTH,
  PLAYER_BAT_HEIGHT,
  PLAYER_BAT_WIDTH,
} from "@/helpers/Game/constants";
import movePlayer from "@/helpers/Game/movement";
import { animateBatSwinging, animateSwimming } from "@/helpers/Game/animation";
import UIOverlay from "@/components/Game/UIOverlay";
import { bugBounds } from "@/helpers/Game/bugBounds";

let player = {};
let pressedKeys = [];
let bugs = {};

const GameComponent = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1600,
      height: 846,
      parent: "phaser-game",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image("map", "../assets/map.png", {
        frameWidth: MAP_WIDTH,
        frameHeight: MAP_HEIGHT,
      });
      this.load.spritesheet("duck", "../assets/duck.png", {
        frameWidth: DUCK_WIDTH,
        frameHeight: DUCK_HEIGHT,
      });

      this.load.spritesheet("bat", "../assets/batSwing.png", {
        frameWidth: BAT_WIDTH,
        frameHeight: BAT_HEIGHT,
      });

      this.load.image("bug", "../assets/bug.png", {
        frameWidth: 50,
        frameHeight: 50,
      });
    }

    function create() {
      // Create Map
      const map = this.add.image(0, 0, "map").setOrigin(0, 0);

      // Create Duck
      player.duck = this.add.sprite(760, 440, "duck");
      player.duck.displayWidth = PLAYER_WIDTH;
      player.duck.displayHeight = PLAYER_HEIGHT;

      // Create Bat
      player.bat = this.add.sprite(30, 40, "bat");
      player.bat.setVisible(false);
      player.bat.displayWidth = PLAYER_BAT_WIDTH;
      player.bat.displayHeight = PLAYER_BAT_HEIGHT;
      this.physics.world.enable(player.bat);

      bugs.bug = this.physics.add.group({
        key: "bug",
        repeat: 50,
        setXY: { x: 500, y: 600, stepX: 70, stepY: 45 },
      });

      function placeBugsWithinBounds(bugs, bugBounds, bugCount = 500) {
        let placedCount = 0;
        const rows = Object.keys(bugBounds);

        while (placedCount < bugCount) {
          const randomRowIndex = Phaser.Math.Between(0, rows.length - 1);
          const y = parseInt(rows[randomRowIndex], 10);
          const randomRow = bugBounds[rows[randomRowIndex]];
          const randomXIndex = Phaser.Math.Between(0, randomRow.length - 1);
          const x = randomRow[randomXIndex];
          const bug = bugs.bug.create(x, y, "bug");
          bug.setDisplaySize(55, 30);
          placedCount++;
        }
      }

      placeBugsWithinBounds(bugs, bugBounds);

      bugs.bug.children.iterate(function (bug) {
        bug.setDisplaySize(55, 30);
      });

      this.physics.add.overlap(
        player.bat,
        bugs.bug,
        function (bat, bug) {
          if (bat.visible) {
            bug.destroy();
            setScore((currentScore) => currentScore + 1);
          }
        },
        null,
        this
      );

      const swingBat = function () {
        this.player.bat.setVisible(true);
        this.player.bat.play("batSwing");
        this.time.delayedCall(
          500,
          () => {
            this.player.bat.setVisible(false);
          },
          [],
          this
        );
      };

      // Create Swim Animation
      player.swim = this.anims.create({
        key: "swimming",
        frames: this.anims.generateFrameNumbers("duck"),
        frameRate: 15,
        repeat: -1,
      });

      // Create Bat Swing Animation
      player.batSwing = this.anims.create({
        key: "batSwing",
        frames: this.anims.generateFrameNumbers("bat"),
        frameRate: 25,
        repeat: 1,
      });

      // Create Keyboard Inputs
      this.input.keyboard.on("keydown", function (event) {
        switch (event.code) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "KeyW":
          case "KeyR":
            if (!pressedKeys.includes(event.code)) {
              pressedKeys.push(event.code);
            }
            if (event.code === "KeyW") {
              player.bat.setVisible(true);
            }
            break;
          default:
            break;
        }
      });

      this.input.keyboard.on("keyup", function (event) {
        switch (event.code) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "KeyW":
            pressedKeys = pressedKeys.filter((key) => key !== event.code);
            if (event.code === "KeyW") {
              player.bat.setVisible(false);
            }
            break;
          default:
            break;
        }
      });

      if (
        this.input.keyboard.checkDown(this.input.keyboard.addKey("KeyW"), 500)
      ) {
        swingBat.call(this);
      }
    }

    function update() {
      // Config
      this.cameras.main.centerOn(player.duck.x, player.duck.y);
      this.cameras.main.zoom = 3.5;

      // // Update Duck/Bat Position
      const playerMoved = movePlayer(pressedKeys, player);
      if (playerMoved) {
        player.movedLastFrame = true;
      } else {
        if (player.movedLastFrame) {
        }
        player.movedLastFrame = false;
      }

      // Animate Duck/Bat
      const duckSwimming = animateSwimming(pressedKeys, player.duck);
      if (duckSwimming) {
        player.swimmingLastFrame = true;
      } else {
        if (player.swimmingLastFrame) {
        }
        player.swimmingLastFrame = false;
      }

      animateBatSwinging(pressedKeys, player.bat);

      const batOffsetX = player.duck.flipX ? -28 : 28;
      player.bat.setPosition(player.duck.x + batOffsetX, player.duck.y - 11);
    }

    // Clean up
    return () => {
      game.destroy();
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div id="phaser-game" style={{ width: "100%", height: "100%" }}></div>
      <UIOverlay score={score} />
    </div>
  );
};

export default GameComponent;
