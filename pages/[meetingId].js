import dynamic from "next/dynamic";
const DualMeet = dynamic(()=> import('./Components/DualMeet'),{ssr:false});
const MeetingLink=()=><DualMeet/>
export default MeetingLink;