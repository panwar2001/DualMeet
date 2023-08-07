'use client'
import { useRouter } from 'next/router';
import Loader from '../Loader/Loader';
import {useToken, LiveKitRoom, VideoConference,DisconnectButton} from "@livekit/components-react";
import "@livekit/components-styles";
const DualMeet=()=>{
  const router=useRouter();
  const token = useToken(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT, router.query.meetId, {
    userInfo: {
      identity: 'user',
      name: router.query.name,
    },
  }); 
  if (token === "") {
    return <Loader/>
  }
  return (
   <div data-lk-theme="default" style={{ height: '100vh' }}>
    <LiveKitRoom
      video={true}
      audio={true}
      connect={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LK_SERVER_URL}
    >
      <VideoConference />
     </LiveKitRoom>
  </div>
  );
}

export default DualMeet;