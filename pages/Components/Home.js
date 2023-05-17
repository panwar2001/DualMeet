import Header from './Header'
import BrandFootage from './BrandFootage'
import Banner from './Banner';
import Image from 'next/image';

export default function Home() {
    return (
      <>
              <Header isAuth={true}/>
              <BrandFootage/>
              <Image src="/meeting.png" alt="Group meeting!" height={500} width={700} style={{position:'relative',float:'right',paddingRight:'5%'}}/>
              <Banner/>
              <hr style={{marginTop:'20%'}}/>
      </>
    )
  }
  