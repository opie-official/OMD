import "./styles/main_page.css"
import "../assets/md.css"
import ReactMarkdown from "react-markdown";
import {RefObject, useEffect, useRef, useState} from "react";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

import B from "../../../../resources/B.svg"
import I from "../../../../resources/I.svg"
import U from "../../../../resources/U.svg"
import S from "../../../../resources/s.svg"
import QUOTE from "../../../../resources/quote.svg"
import CODE from "../../../../resources/code.svg"
import UL from "../../../../resources/asterisk.svg"
import OL from "../../../../resources/ol.svg"
import TAB from "../../../../resources/table.svg"
import LINK from "../../../../resources/link.svg"
import IMAG from "../../../../resources/imag.svg"
import H from "../../../../resources/h.svg"


interface Props {
    file: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    setSaved: React.Dispatch<React.SetStateAction<boolean>>;
    saved: boolean;
}


export default function MainPage(props: Props) {

    const [bgWidth, setBgWidth] = useState(0);
    const [width, setWidth] = useState(0);

    const ref = useRef<HTMLTextAreaElement>(null);

    const {text, setText} = props;

    useEffect(() => {
        const sz = document.body.offsetWidth;
        setWidth(sz / 2);
        setBgWidth(sz);
    }, []);
    const splited = props.file.includes("/") ? props.file.split("/") : props.file.split("\\");
    return (
        <div id={"main-page"}>
            <header id={"main-header"}>
                <p id={"main-header-md"}>Markdown</p>
                <div id={"main-header-filename"}>
                    <p id={"main-header-filename-in"}>
                        {props.saved ? splited[splited.length - 1] : `${splited[splited.length - 1]}*`}
                    </p>
                </div>
                <p id={"main-header-preview"}>Preview</p>
            </header>
            <main id={"main-main"}>
                <div id={"main-md"} style={{
                    width: `${width}%`
                }}>
                    <div id={"main-md-rows"}></div>
                    <div id={"main-md-text"}>
                        {/*<div id={"main-md-light"}><CodeLight text={text}/></div>*/}
                        <textarea ref={ref} id={"main-md-raw"} value={text} onInput={(e) => {
                            setText(e.currentTarget.value);
                            props.setSaved(false)
                        }}/>
                    </div>
                </div>
                <hr id={"main-hr"}/>
                <div id={"main-preview"} style={{
                    width: `${bgWidth - width}%`
                }}>
                    <div id={"main-preview-block"}>
                        <ReactMarkdown
                            remarkPlugins={[remarkBreaks, remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            components={{
                                h1: (e) => {
                                    return <h1 className={"md-h1"}>{e.children}</h1>
                                },
                                h2: (e) => {
                                    return <h1 className={"md-h2"}>{e.children}</h1>
                                },
                                h3: (e) => {
                                    return <h1 className={"md-h3"}>{e.children}</h1>
                                },
                                h4: (e) => {
                                    return <h1 className={"md-h4"}>{e.children}</h1>
                                },
                                h5: (e) => {
                                    return <h1 className={"md-h5"}>{e.children}</h1>
                                },
                                h6: (e) => {
                                    return <h1 className={"md-h6"}>{e.children}</h1>
                                },
                                blockquote: (e) => {
                                    return <div className={"md-quote"}>{e.children}</div>
                                },
                                br: (e) => {
                                    return <br/>
                                },
                                p: (e) => {
                                    return <p className={"md-p"}>{e.children}</p>
                                },
                                code: (e) => {

                                    const match = /language-(\w+)/.exec(e.className || '')
                                    //@ts-ignore
                                    if (e.node?.type==="inlineCode") {
                                        return <div className={"md-code-inline"}>
                                            <code>
                                                {e.children}
                                            </code>
                                        </div>
                                    }
                                    return <div className={"md-code"}>
                                        <pre>
                                            <code data-lang={match ? match[1]:""}>
                                              {e.children}
                                            </code>
                                        </pre>
                                    </div>
                                }
                            }}

                        >{text}</ReactMarkdown>
                    </div>
                </div>
            </main>
            <footer id={"main-footer"}>
                <div id={"main-footer-buttons"}>
                    {footer_buttons.map((el, key) => {
                        return <FooterButton {...el} setText={setText} ref={ref} key={key}/>
                    })}
                </div>
            </footer>
        </div>
    )
}

interface FooterProps {
    src: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    start: string;
    end: string;
    ref: RefObject<HTMLTextAreaElement | null>;
}

const footer_buttons = [
    {
        src: B,
        start: "**",
        end: "**"
    },
    {
        src: I,
        start: "*",
        end: "*"
    },
    {
        src: U,
        start: "<u>",
        end: "</u>"
    },
    {
        src: S,
        start: "~~",
        end: "~~"
    },
    {
        src: QUOTE,
        start: "> ",
        end: "\n"
    },
    {
        src: CODE,
        start: "\n```\n",
        end: "\n```\n"
    },
    {
        src: UL,
        start: "* ",
        end: "\n"
    },
    {
        src: OL,
        start: "1. ",
        end: "\n"
    },
    {
        src: TAB,
        start: "|",
        end: ""
    },
    {
        src: LINK,
        start: "[](",
        end: ")"
    },
    {
        src: IMAG,
        start: "\n![](",
        end: ")\n"
    },
    {
        src: H,
        start: "# ",
        end: "\n"
    },

]


function FooterButton(props: FooterProps) {


    function fn() {

        const tg = props.ref.current;

        const _1 = tg?.selectionStart;
        const _2 = tg?.selectionEnd;
        const val = tg?.value;
        const parts = [val?.slice(0, _1), val?.slice(_1, _2), val?.slice(_2)];
        parts[1] = `${props.start}${parts[1]}${props.end ?? ""}`;

        props.setText(parts.join(""))


    }

    return (
        <button className={"footer-button"} onClick={fn}>
            <img src={props.src}/>
        </button>
    )
}
