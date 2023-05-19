import dynamic from "next/dynamic";
import { useRouter} from 'next/router';
const DualMeet = dynamic(()=> import('../Components/DualMeet'),{ssr:false});
const MeetingLink=()=>{
const router=useRouter();
const meetId=router.query.meetId;
return <DualMeet join={true} meetId={meetId}/>
}
export default MeetingLink;