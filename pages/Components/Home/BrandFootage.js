import styles from "./BrandFootage.module.css";
export default ()=>(
      <video  autoPlay className={styles.footage} muted>
          <source src="Presenting.mp4" type="video/mp4" ></source>
           Your Browser does not support video tag.
      </video>
);