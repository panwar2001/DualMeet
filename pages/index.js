import Head from 'next/head'
import { Inter, Roboto_Flex } from 'next/font/google'
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
const inter = Inter({ subsets: ['latin'] })
import { useSession } from 'next-auth/react';
import Loader from './Components/Loader/Loader';
export default function Index() {
  const {data:session,status}=useSession();
  if(status=='loading'){
    return <Loader/>
  }
  return (
    <>
      <Head>
        <title>DualMeet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0,user-scalable=0" />
        <link rel="icon" href="/cam.svg" />
      </Head>
      <main >
      {session?.user?(<Dashboard/>):(<Home/>)}
      </main>
    </>
  )
}
