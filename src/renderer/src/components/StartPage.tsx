import "./styles/start_page.css"
import {electronAPI} from "@electron-toolkit/preload";


interface Props {
    setCur: React.Dispatch<React.SetStateAction<0 | 1>>;
    setFile: React.Dispatch<React.SetStateAction<string>>;
    setText: React.Dispatch<React.SetStateAction<string>>;
}


export default function StartPage(props: Props) {

    async function handleNew() {
        const path = await window.api.file_create();
        console.log(`path ${path}`)
        if (path.length > 0) {
            props.setFile(path)
            props.setCur(1)
        }
    }

    async function handleOpen() {
        const path = await window.api.file_open();
        console.log(`path ${path}`)
        if (path.length > 0) {
            props.setFile(path[0]);
            props.setCur(1);
            props.setText(path[1]);
        }
    }


    return (
        <div id={"start-page"}>
            <div id={"start-page-img"}></div>
            <p id={"start-page-p"}>Welcome to OMD</p>
            <div id={"start-page-info"}>
                <div id={"start-page-buttons"}>
                    <button className={"start-button"} onClick={handleNew}>Create New</button>
                    <button className={"start-button"} onClick={handleOpen}>Open File</button>
                </div>
                <div id={"start-page-recent"}>

                </div>
            </div>
        </div>
    )
}
