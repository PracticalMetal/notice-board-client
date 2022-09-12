import styles from "./styles.module.css";
import axios from "axios";
import { useState } from "react";
import {useLocation} from 'react-router-dom';

// import logo from './logo.png'

function Display() {

    const location = useLocation();

    
    if(location.state){
        const displayPath="./img/"+location.state.paths;
        localStorage.setItem('localPath',displayPath);
    }
    
    // console.log(setPath);
    
    
    const [url, setURL] = useState("");
    axios.get('https://iit-notice-board-backend.herokuapp.com/api/get/displayimage')
    .then((response)=>{
        if(response){
            
            
            const displayPath="./img/"+response.data.photo;
            localStorage.setItem('localPath',displayPath);
        }
        else{
            console.log("No response!")
        }
    })
    .catch(()=>{
        console.log("No active image!")
    })

    const setPath=localStorage.getItem('localPath')

    return (

        <div>
            {location && <div><img className={styles.displayimg} src={setPath}></img></div>}
        </div>
    )
}

export default Display;