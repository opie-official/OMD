import "./styles/main_page.css"
import "../assets/md.css"
import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";
import CodeLight from "@renderer/components/CodeLight";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";


interface Props {
  file: string;
}


export default function MainPage(props: Props) {

  const [bgWidth, setBgWidth] = useState(0);
  const [width, setWidth] = useState(0);
  const [text, setText] = useState("")

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
            {splited[splited.length - 1]}
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
            <textarea id={"main-md-raw"} onInput={(e)=>setText(e.currentTarget.value)}/>
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
                h1:(e)=>{
                  return <h1 className={"md-h1"}>{e.children}</h1>
                },
                h2:(e)=>{
                  return <h1 className={"md-h2"}>{e.children}</h1>
                },
                h3:(e)=>{
                  return <h1 className={"md-h3"}>{e.children}</h1>
                },
                h4:(e)=>{
                  return <h1 className={"md-h4"}>{e.children}</h1>
                },
                h5:(e)=>{
                  return <h1 className={"md-h5"}>{e.children}</h1>
                },
                h6:(e)=>{
                  return <h1 className={"md-h6"}>{e.children}</h1>
                },
                blockquote: (e)=> {
                  return <div className={"md-quote"}>{e.children}</div>
                },
                br: (e)=>{
                  return <br/>
                },
                p:(e)=>{
                  return <p className={"md-p"}>{e.children}</p>
                }
              }}

            >{text}</ReactMarkdown>
          </div>
        </div>
      </main>
      <footer id={"main-footer"}>
        <div id={"main-footer-buttons"}></div>
      </footer>
    </div>
  )
}
