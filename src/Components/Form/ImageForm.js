import styles from "./ImageForm.module.css";
import { useState } from "react";

function ImageForm({src, handleChange}){
    
    let imageToUse;
    
    if(src){
        imageToUse = src;
    }else{
        imageToUse="https://www.seekpng.com/png/full/356-3562377_personal-user.png"
    }

    return(
        <div className={styles.imageContainer}>
            <img className={styles.userImage} src={imageToUse} />
            <input id="image-file" type="file" accept="image/jpeg, image/png" onChange={handleChange}></input>
        </div>

    )
}


export default ImageForm;