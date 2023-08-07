'use client'
import { useRouter } from 'next/router';
import {
  LiveKitRoom,
  useToken,
  VideoConference,
  formatChatMessageLinks,
} from '@livekit/components-react';
import { LogLevel } from 'livekit-client';
import { DebugMode } from './Debug';
import "@livekit/components-styles";


const DualMeet= () => {
  const router = useRouter();
  const name  = router.query.name;
  const roomName=router.query.meetId;
  return (
    <>
      <div data-lk-theme="default" style={{ height: '100vh' }}>
          <ActiveRoom
            roomName={roomName}
            username={name}
            onLeave={() => {
              router.push('/');
            }}
          ></ActiveRoom>
      </div>
    </>
  );
};



const ActiveRoom = ({ roomName, onLeave, username }) => {
  const token = useToken(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT, roomName, {
    userInfo: {
      identity: username,
      name: username,
    },
  });

  return (
        <LiveKitRoom
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LK_SERVER_URL}
          video={false}
          audio={false}
          onDisconnected={onLeave}
        >
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
          <DebugMode logLevel={LogLevel.info} />
        </LiveKitRoom>
  );
};

export default DualMeet;