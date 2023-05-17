export default function BrandFootage(){
    const css={
        position:'relative',
        width:'100%',
        left:'0',
        top:'0'
    }
return <video  autoPlay  style={css} muted>
    <source src="video.mp4" type="video/mp4" ></source>
    Your Browser does not support video tag.
</video>
}