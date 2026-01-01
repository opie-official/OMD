import "./styles/title_bar.css"
import icon from "../../../../resources/icon.png"
import {ReactNode, useState} from "react";

import wrap from "../../../../resources/title-bar-swap.svg"
import resize from "../../../../resources/title-bar-resize.svg"
import close from "../../../../resources/title-bar-close.svg"


import fx from "../../../../resources/fx.svg";
import play from "../../../../resources/play.svg";
import export_ from "../../../../resources/export.svg";

interface Props {
    children: ReactNode;
    onclick: () => void;

}

function Button(props: Props) {

    return (
        <button className={"titlebar-button"} onClick={props.onclick}>{props.children}</button>
    )
}

interface MenuButtonProps {
    title: string;
    menu: ReactNode
}

interface MenuPar {
    title: string;
    onClick: () => void;
}

interface MenuProps {
    params: MenuPar[]
}

function Menu(props: MenuProps) {


    return (<div className={"menu"}>
        {props.params.map((el, key) => {
            return <button key={key} onClick={el.onClick}>{el.title}</button>
        })}
    </div>)
}


function MenuButton(props: MenuButtonProps) {

    const [clicked, setClicked] = useState(false)
    return (
        <>
            <div className={"menu-button"} onClick={() => setClicked(prev => !prev)}>
                <p>{props.title}</p>
                {clicked && props.menu}
            </div>
        </>
    )
}


interface TitleProps {
    cur: 0 | 1;
    setCur: React.Dispatch<React.SetStateAction<0 | 1>>;
    save: () => void;
    text: string;
    saved: boolean;
    newFile: () => Promise<void>;
    openFile: () => Promise<void>;
    close:()=>void;
}


export default function TitleBar(props: TitleProps) {

    async function NewFile() {
        props.save();
        await props.newFile();

    }

    async function OpenFile() {
        props.save();
        await props.openFile();
    }

    const buttons: MenuButtonProps[] = [
        {
            title: "File",
            menu: <Menu params={[
                {
                    title: "Create New",
                    onClick: NewFile
                },
                {
                    title: "Open File",
                    onClick: OpenFile
                }, {
                    title: "Close File",
                    onClick: () => {
                    }
                }, {
                    title: "Close File",
                    onClick: () => props.close()
                }, {
                    title: "Exit",
                    onClick: () => {
                        props.save();
                        window.api.t_close();
                    }
                }, {
                    title: "Save File",
                    onClick: () => props.save()
                },]}/>
        },
        {
            title: "Edit",
            menu: <Menu params={[
                {
                    title: "Undo",
                    onClick: () => {
                    }
                }, {
                    title: "Redo",
                    onClick: () => {
                    }
                }, {
                    title: "Duplicate Line",
                    onClick: () => {
                    }
                },]}/>
        },
        {
            title: "Select",
            menu: <Menu params={[
                {
                    title: "Select all",
                    onClick: () => {
                    }
                },
                {
                    title: "Deselect",
                    onClick: () => {
                    }
                },
                {
                    title: "Cut",
                    onClick: () => {
                    }
                }, {
                    title: "Copy",
                    onClick: () => {
                    }
                }, {
                    title: "Copy Filepath",
                    onClick: () => {
                    }
                }, {
                    title: "Delete",
                    onClick: () => {
                    }
                },]}/>
        },
        {
            title: "Window",
            menu: <Menu params={[
                {
                    title: "",
                    onClick: () => {
                    }
                },]}/>
        },
        {
            title: "Help",
            menu: <Menu params={[
                {
                    title: "",
                    onClick: () => {
                    }
                },]}/>
        },

    ]

    return (
        <div id={"titlebar"}>
            <div id={"titlebar-logo"}>
                <img src={icon}/>
                <p id={"titlebar-logo-p"}>OMD</p>
            </div>
            {props.cur == 1 &&
                <>
                    <div id={"titlebar-menu"}>
                        {
                            buttons.map((el, key) => {
                                return <MenuButton {...el} key={key}/>
                            })
                        }
                    </div>
                    <div id={"titlebar-center"}>
                        <button className={"titlebar-center"}><img src={fx}/></button>
                        <button className={"titlebar-center"}><img src={play}/></button>
                        <button className={"titlebar-center"}><img src={export_}/></button>

                    </div>
                </>
            }
            <div id={"titlebar-buttons"}>
                {
                    <>
                        <Button onclick={() => window.api.t_wrap()}><img src={wrap}/></Button>
                        <Button onclick={() => window.api.t_resize()}><img src={resize}/></Button>
                        <Button onclick={() => window.api.t_close()}><img src={close}/></Button>
                    </>
                }
            </div>
        </div>
    )
}
