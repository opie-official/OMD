import electronLogo from './assets/electron.svg'
import "./assets/base.css"
import "./assets/main.css"
import "./assets/md.css"
import React, {useEffect, useState} from "react";
import TitleBar from "@renderer/components/TitleBar";
import StartPage from "@renderer/components/StartPage";
import MainPage from "@renderer/components/MainPage";


function App(): React.JSX.Element {


    const [cur, setCur] = useState<0 | 1>(0);
    const [file, setFile] = useState("")
    const [text, setText] = useState("")
    const [saved, setSaved] = useState(true);

    function saveFile() {
        if (!saved) {
            window.api.file_save(text, file);
            setSaved(true);
        }
    }

    async function newFile() {
        const res = await window.api.file_create();
        setFile(res);
        setText("");
    }

    async function openFile(){
        const path = await window.api.file_open();
        console.log(`path ${path}`)
        if (path[0].length > 0) {
            setFile(path[0]);
            setCur(1);
            setText(path[1]);
        }
    }

    function close(){
        saveFile();
        setText("");
        setFile("");
        setCur(0);
    }

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            console.log(e.key, e.ctrlKey)
            if (e.ctrlKey && "sS".includes(e.key)) {
                console.log('saved')
                e.preventDefault()
                saveFile();
            }else{
                console.log("not saved")
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)

    }, [saved])



    return (
        <>
            <TitleBar close={close} openFile={openFile} newFile={newFile} saved={saved} text={text} save={saveFile} setCur={setCur} cur={cur}/>
            {cur == 0 ?
                <StartPage setText={setText} setCur={setCur} setFile={setFile}/> :
                <MainPage setSaved={setSaved} saved={saved} file={file} text={text} setText={setText}/>
            }
        </>
    )
}

export default App
