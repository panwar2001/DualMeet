'use client'
// import {  useState } from 'react';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loader from '../Loader/Loader';
import {useToken, LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { RequestCookiesAdapter } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
const DualMeet=()=>{
  // const { data: session, status } = useSession();
  // const userImage=session?.user?session.user.image:'/person.svg';
  const router=useRouter();
  // const [names,setNames]=useState([router.query.name]);
  const room = router.query.meetId;
  const token = useToken(process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT, room, {
    userInfo: {
      identity: 'user',
      name: router.query.name,
    },
  });

  if (token === "") {
    return <Loader/>
  }

  return (
    
    <LiveKitRoom
      serverUrl={process.env.NEXT_PUBLIC_LK_SERVER_URL}
      token={token}
      connect={true}
      video={true}
      audio={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}

export default DualMeet;