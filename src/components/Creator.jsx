import React, { useEffect, useState } from "react";
import { LocalUser } from "agora-rtc-react";
import { config, useMicrophoneAndCameraTracks } from "../common/rtc-config";

const Creator = ({ rtc__client }) => {
  const [joined, setJoined] = useState(false);
  const [tracksReady, setTracksReady] = useState(false);
  const [tracks, setTracks] = useState();
  const [uid, setUid] = useState(String(Math.floor(Math.random() * 10000)));
  const [participants, setParticipants] = useState(0);

  const init = async () => {
    await rtc__client?.join(config.APP_ID, "main", config.token, uid);

    const __tracks = await useMicrophoneAndCameraTracks();

    setTracks(__tracks);

    rtc__client.on("user-joined", (user) => {
      console.log("New user joined");
      setParticipants((prev) => prev + 1);
    });
    rtc__client.on("user-left", (user) => {
      console.log("User left");
      setParticipants((prev) => prev - 1);
    });

    await rtc__client.publish(__tracks);
  };

  useEffect(() => {
    init();

    return () => {
      rtc__client.leave();
      if (tracks) {
        tracks[1].stop();
        tracks[1].close();
        tracks[0].stop();
        tracks[0].close();
      }
    };
  }, []);

  return (
    <div className="">
      <h3>Creator Screen</h3>
      <div className="local-camera">
        {tracks && tracks[1] && !tracks[1].muted ? (
          <LocalUser
            videoTrack={tracks && tracks[1]}
            playVideo={true}
            cameraOn={true}
            className={`h-full w-full`}
          />
        ) : (
          <div className="bg-black flex justify-center items-center w-full h-full">
            Camera is not on
          </div>
        )}
      </div>
      <div className="participants-count">
        <span>Participants: {participants}</span>
      </div>
    </div>
  );
};

export default Creator;
