import styles from "./styles.module.css";
import {useLocation} from 'react-router-dom';

function View() {

    const location = useLocation();
    
    const displayPath="./img/"+location.state.paths;
    
    
    

    return (

        <div>
            {location && <div><img className={styles.displayimg} src={displayPath}></img></div>}

        </div>
    )
}

export default View;