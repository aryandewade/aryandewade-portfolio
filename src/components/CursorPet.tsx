import { useEffect, useRef } from "react";

type Direction = keyof typeof SPRITE_DATA;

const SPRITE_DATA = {
  Left: { size: [32, 28], frames: [[129, 64], [128, 99]] },
  Right: { size: [32, 28], frames: [[95, 0], [96, 33]] },
  Up: { size: [32, 32], frames: [[32, 64], [32, 96]] },
  Down: { size: [32, 32], frames: [[193, 96], [224, 63]] },
  TopLeft: { size: [32, 32], frames: [[34, 0], [33, 30]] },
  TopRight: { size: [32, 32], frames: [[0, 64], [0, 96]] },
  BottomLeft: { size: [32, 32], frames: [[160, 96], [128, 96]] },
  BottomRight: { size: [32, 32], frames: [[160, 33], [162, 62]] },
} as const;

const STOP_DISTANCE = 48;
const PET_SPEED = 3.75;

function getDirection(angle: number): Direction {
  if (angle > -22.5 && angle <= 22.5) return "Right";
  if (angle > 22.5 && angle <= 67.5) return "BottomRight";
  if (angle > 67.5 && angle <= 112.5) return "Down";
  if (angle > 112.5 && angle <= 157.5) return "BottomLeft";
  if (angle > 157.5 || angle <= -157.5) return "Left";
  if (angle > -157.5 && angle <= -112.5) return "TopLeft";
  if (angle > -112.5 && angle <= -67.5) return "Up";
  return "TopRight";
}

export default function CursorPet() {
  const petRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pet = petRef.current;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (!pet || isCoarse) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let petX = mouseX;
    let petY = mouseY;
    let direction: Direction = "Right";
    let frameIndex = 0;
    let lastFrameTime = 0;
    let idleSince = performance.now();
    let animationFrame = 0;

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const update = (timestamp: number) => {
      const dx = mouseX - petX;
      const dy = mouseY - petY;
      const distance = Math.hypot(dx, dy);
      const isMoving = distance > STOP_DISTANCE;

      if (isMoving) {
        const step = Math.min(PET_SPEED, distance - STOP_DISTANCE);
        petX += (dx / distance) * step;
        petY += (dy / distance) * step;
        direction = getDirection(Math.atan2(dy, dx) * (180 / Math.PI));
        idleSince = timestamp;
      }

      if (timestamp - lastFrameTime > 125) {
        lastFrameTime = timestamp;
        const data = SPRITE_DATA[direction];
        let frameWidth = 32;
        let frameHeight = 32;
        let spriteX = 96;
        let spriteY = 96;

        if (isMoving) {
          [spriteX, spriteY] = data.frames[frameIndex % 2];
          frameWidth = data.size[0];
          frameHeight = data.size[1];
          frameIndex += 1;
        } else if (timestamp - idleSince >= 2000) {
          const idleFrame = Math.floor((timestamp - idleSince - 2000) / 200) % 2;
          spriteX = 64;
          spriteY = idleFrame === 0 ? 0 : 32;
        }

        pet.style.width = `${frameWidth}px`;
        pet.style.height = `${frameHeight}px`;
        pet.style.backgroundPosition = `-${spriteX}px -${spriteY}px`;
        pet.style.left = `${petX}px`;
        pet.style.top = `${petY}px`;
      }

      animationFrame = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animationFrame = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div className="cursor-pet" ref={petRef} aria-hidden="true" />;
}
