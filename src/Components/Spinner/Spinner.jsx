import React, { useEffect, useRef, useState } from 'react';
import './Spinner.css';

const MAX_SOFTBALLS = 10;
const SOFTBALL_SIZE = 80;

function randomVelocity() {
  // Random dx, dy between -3 and 3 but not 0
  let dx = (Math.random() * 4 + 1) * (Math.random() < 0.5 ? -1 : 1);
  let dy = (Math.random() * 4 + 1) * (Math.random() < 0.5 ? -1 : 1);
  return { dx, dy };
}

const Spinner = () => {
  const containerRef = useRef(null);

  // State for all softballs: [{x, y, dx, dy, id}]
  const [softballs, setSoftballs] = useState(() => [
    { x: 100, y: 100, ...randomVelocity(), id: Date.now() },
  ]);

  // Using a ref for positions to avoid re-renders each frame
  const softballsRef = useRef(softballs);
  softballsRef.current = softballs;

  useEffect(() => {
    let animationFrameId;

    const updatePositions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let hitWall = false;
      let newSoftballs = [];

      const updatedSoftballs = softballsRef.current.map((ball) => {
        let { x, y, dx, dy, id } = ball;

        // Check walls, reverse direction if hitting edge
        if (x + dx > screenWidth - SOFTBALL_SIZE || x + dx < 0) {
          dx = -dx;
          hitWall = true;
        }
        if (y + dy > screenHeight - SOFTBALL_SIZE || y + dy < 0) {
          dy = -dy;
          hitWall = true;
        }

        x += dx;
        y += dy;

        return { x, y, dx, dy, id };
      });

      // If any ball hit a wall and we haven't reached max, add a new one
      if (hitWall && softballsRef.current.length < MAX_SOFTBALLS) {
        // Spawn new ball at random position with random velocity
        const newBall = {
          x: Math.random() * (screenWidth - SOFTBALL_SIZE),
          y: Math.random() * (screenHeight - SOFTBALL_SIZE),
          ...randomVelocity(),
          id: Date.now() + Math.random(),
        };
        newSoftballs.push(newBall);
      }

      if (newSoftballs.length > 0) {
        setSoftballs([...updatedSoftballs, ...newSoftballs]);
      } else {
        // Just update positions
        setSoftballs(updatedSoftballs);
      }

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      {softballs.map(({ x, y, id }) => (
        <div
          key={id}
          className="softball-spinner-container"
          style={{ left: x, top: y, position: 'absolute' }}
        >
          <div className="softball-spinner">
            {[...Array(9)].map((_, i) => (
              <div key={`left-${id}-${i}`} className={`stitch stitch-left-${i + 1}`}></div>
            ))}
            {[...Array(9)].map((_, i) => (
              <div key={`right-${id}-${i}`} className={`stitch stitch-right-${i + 1}`}></div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Spinner;
