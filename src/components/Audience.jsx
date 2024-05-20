import React, { useEffect, useState } from "react";
import { config } from "../common/rtc-config";
import { RemoteUser, useJoin } from "agora-rtc-react";

const Audience = ({ rtc__client }) => {
  const [uid, setUid] = useState(String(Math.floor(Math.random() * 10000)));
  const [remoteUser, setRemoteUser] = useState();
  const [participants, setParticipants] = useState(0);
  //   useJoin(
  //     {
  //       appid: config.APP_ID,
  //       channel: "main",
  //       token: config.token,
  //     },
  //     true
  //   );

  const init = async () => {
    await rtc__client?.join(config.APP_ID, "main", config.token, uid);

    rtc__client.on("user-published", async (user, mediaType) => {
      await rtc__client.subscribe(user, mediaType);
      if (mediaType === "video") {
        setRemoteUser(user);
      }
    });
    rtc__client.on("user-joined", async (user) => {
      setParticipants((prev) => prev + 1);
    });
    rtc__client.on("user-left", async (user) => {
      setParticipants((prev) => prev - 1);
    });
  };

  useEffect(() => {
    init();

    return () => {
      rtc__client.leave();
    };
  }, []);

  return (
    <div>
      <h3>Audience Screen</h3>
      <div>
        {!remoteUser ? (
          <span>Creator's video is not on</span>
        ) : (
          <div className="remote-video">
            <RemoteUser user={remoteUser} playVideo={true} playAudio={false} />
          </div>
        )}
      </div>
      <div className="participants-count">
        <span>Participants: {participants}</span>
      </div>
    </div>
  );
};

export default Audience;
