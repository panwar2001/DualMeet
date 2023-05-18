import dynamic from "next/dynamic";
const DualMeet = dynamic(()=> import('../Components/DualMeet'),{ssr:false});
const MeetingLink=()=><DualMeet join={false}/>
export default MeetingLink;