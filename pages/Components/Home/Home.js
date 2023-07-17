import NavigationBar from './NavigationBar';
import BrandFootage from './BrandFootage'
import Banner from './Banner';
import Image from 'next/image';

export default function Home() {
    const ImageStyle={
      position:'relative',
      float:'right',
      paddingRight:'5%'
    }
    return (<>
              <NavigationBar/>
              <BrandFootage/>
              <Image src="/meeting.png" alt="Group meeting!" height={500} width={700} style={ImageStyle}/>
              <Banner/>
              <hr style={{marginTop:'20%'}}/>
      </>)
  }
  