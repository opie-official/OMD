import "./styles/title_bar.css"
import icon from "../../../../resources/icon.png"
import {ReactNode} from "react";

import wrap from "../../../../resources/title-bar-swap.svg"
import resize from "../../../../resources/title-bar-resize.svg"
import close from "../../../../resources/title-bar-close.svg"


interface Props{
  children: ReactNode;
  onclick: () => void;

}

function Button(props: Props){

  return (
    <button className={"titlebar-button"} onClick={props.onclick}>{props.children}</button>
  )
}




export default function TitleBar(){


  return(
    <div id={"titlebar"}>
      <div id={"titlebar-logo"}>
        <img src={icon} />
        <p id={"titlebar-logo-p"}>OMD</p>
      </div>
      <div id={"titlebar-buttons"}>
        {
          <>
            <Button onclick={()=>window.api.t_wrap()}><img src={wrap}/></Button>
            <Button onclick={()=>window.api.t_resize()}><img src={resize}/></Button>
            <Button onclick={()=>window.api.t_close()}><img src={close}/></Button>
          </>
        }
      </div>
    </div>
  )
}
