import React, { useState, useEffect } from "react";
import Link from "next/link";

const UIOverlay = ({ score }) => {
  const [showInitialMessage, setShowInitialMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-24 inset-x-0 mx-auto flex flex-col items-center z-50">
      {showInitialMessage && (
        <div className="flex flex-col items-center space-y-4 mb-4">
          <div className="w-max p-4 bg-green-500 text-white rounded-md shadow-md">
            <div className="text-xl font-bold">
              The pond has been attacked by BUGS! Hurry and clean them up before
              Larry finds out!
            </div>
          </div>
          <div className=" p-4 absolute top-0">
            <img src="../assets/controls.png" alt="controls" className="w-[1300px] h-[700px]"/>
          </div>
        </div>
      )}

      {score < 500 ? (
        <div className="w-max p-4 bg-black bg-opacity-70 text-white rounded-md shadow-md">
          <div className="text-xl font-bold"> Bugs Whacked: {score}</div>
        </div>
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
