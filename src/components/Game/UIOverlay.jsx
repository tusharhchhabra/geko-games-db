import React, { useState, useEffect } from "react";
import Link from "next/link";

const UIOverlay = ({ score }) => {
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [clock, setClock] = useState(68000);

  useEffect(() => {
    if (clock > 0) {
      const timer = setInterval(() => {
        setClock((prevClock) => prevClock - 1000);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [clock]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialMessage(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const timeOrLoseMessage = () => {
    if (clock <= 0) {
      return "You Lose!";
    }
    const minutes = Math.floor(clock / 60000);
    const seconds = ((clock % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed top-24 inset-x-0 mx-auto flex flex-col items-center z-50">
      {showInitialMessage && (
        <div className="flex flex-col items-center space-y-4 mb-4">
          <div className="w-max p-4 bg-green-500 text-white rounded-md shadow-md">
            <div className="text-xl font-bold">
              The pond has been attacked by 🐞BUGS🐞 Whack them all before
              Larry finds out!
            </div>
          </div>
          <div className=" p-4 absolute top-0">
            <img
              src="../assets/controls.png"
              alt="controls"
              className="w-[1300px] h-[700px]"
            />
          </div>
        </div>
      )}

      {score < 500 && clock > 0 ? (
        <div className="w-max p-4 bg-black bg-opacity-70 text-white rounded-md shadow-md">
          <div className="text-xl font-bold"> Bugs Whacked: {score}</div>
          <div className="flex justify-center font-bold text-xl">
            Time left: <span className="text-red-500">{timeOrLoseMessage()}</span>
          </div>
        </div>
      ) : clock <= 0 ? (
        <>
        <div className="w-max p-4 bg-black bg-opacity-70 text-white rounded-md shadow-md">
          <div className="text-xl font-bold">{timeOrLoseMessage()} </div>
        </div>
        <div className="w-max mt-4 p-4 bg-violet-500 text-black rounded-md shadow-md">
          <Link href="/">
            <div className="text-xl font-bold underline">Back to Homepage</div>
          </Link>
        </div>
      </>
      ) : (
        <>
          <div className="w-max mb-4 p-4 bg-black bg-opacity-70 text-white rounded-md shadow-md">
            <div className="text-xl font-bold"> You Win! </div>
          </div>
          <div className="w-max p-4 text-black rounded-md shadow-md bg-violet-500">
            <Link href="/">
              <div className="text-xl font-bold underline">
                Back to Homepage
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UIOverlay;
