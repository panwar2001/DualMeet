import NavigationBar from './NavigationBar';
import BrandFootage from './BrandFootage'
import JoinMeeting from './JoinMeeting';
import Image from 'next/image';
import styles from './Home.module.css';

export default ()=><>
              <NavigationBar/>
              <BrandFootage/>
              <Image src="/meeting.png" alt="Group meeting!" height={500} width={700} className={styles.ImageStyle}/>
              <JoinMeeting/>
              </>  