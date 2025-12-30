import electronLogo from './assets/electron.svg'
import "./assets/base.css"
import "./assets/main.css"
import "./assets/md.css"
import React, {useEffect, useState} from "react";
import TitleBar from "@renderer/components/TitleBar";
import StartPage from "@renderer/components/StartPage";
import MainPage from "@renderer/components/MainPage";


function App(): React.JSX.Element {


  const [cur, setCur]=useState<0|1>(0);


  return (
    <>
      <TitleBar/>
      {cur==0?<StartPage setCur={setCur}/> : <MainPage/>}
    </>
  )
}

export default App
