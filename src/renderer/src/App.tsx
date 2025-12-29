import electronLogo from './assets/electron.svg'
import "./assets/base.css"
import "./assets/main.css"
import "./assets/md.css"
import React, {useEffect, useState} from "react";
import TitleBar from "@renderer/components/TitleBar";
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')


  const [text, setText] = useState<string>("")
  const [width, setWidth] = useState(0);
  const [bgWidth, setBgWidth] = useState(0);

  const [isMoving, setIsMoving] = useState<boolean>(false);


  useEffect(() => {
    const sz = document.body.offsetWidth;
    setWidth(sz / 2);
    setBgWidth(sz);
  }, []);

  // function startMove(){
  //   console.log("start")
  //   setIsMoving(true);
  // }
  //
  // function stopMove(){
  //   console.log("end")
  //  setIsMoving(false);
  // }
  //
  // function move(e: React.MouseEvent<HTMLHRElement, MouseEvent>){
  //   console.log("move")
  //   setWidth(prev=>{
  //     let res = prev;
  //
  //     res+=e.clientX
  //
  //
  //     return res;
  //   })
  // }



  return (
    <>
      <TitleBar/>
      <header id={"header"}></header>
      <main id={"main"}>
        <div id={"text"} style={{width: `${width}%`}}>
          <textarea id={"text-text"} onInput={(e) => setText(e.currentTarget.value)}/>
        </div>
        <hr id={"del"} /*onMouseDownCapture={startMove} onMouseUp={stopMove} onMouseMove={(e)=> isMoving && move(e)}*/ />
        <div id={"text-md"} style={{width: `${bgWidth - width}%`}}>
          <div id={"text-md-parser"}>
            <ReactMarkdown
              remarkPlugins={[remarkBreaks, remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}

              components={
                {
                  code: (e) => {
                    return (
                      <div className={"md-code"}>
                      <pre>
                        <code>{e.children}</code>
                      </pre>
                      </div>
                    )
                  },
                  h1: (e) => {
                    return <h1 className={"md-h1"}>{e.children}</h1>
                  },
                  h2: (e) => {
                    return <h2 className={"md-h2"}>{e.children}</h2>
                  },
                  h3: (e) => {
                    return <h3 className={"md-h3"}>{e.children}</h3>
                  },
                  h4: (e) => {
                    return <h4 className={"md-h4"}>{e.children}</h4>
                  },
                  h5: (e) => {
                    return <h5 className={"md-h5"}>{e.children}</h5>
                  },
                  h6: (e) => {
                    return <h6 className={"md-h6"}>{e.children}</h6>
                  },
                  blockquote: (e) => {
                    const children = e.node?.children ?? [];
                    for (const i of children) {
                      if (i.type == "element" && i.tagName == "blockquote") {
                        return (
                          <div className={"md-quote2"}>
                            {e.children}
                          </div>
                        )
                      }
                    }
                    return <div className={"md-quote"}>{e.children}</div>
                  },
                  hr: (e) => {
                    return <hr className={"md-hr"}/>
                  },
                  ul: (e) => {
                    return <ul className={"md-ul"}>
                      {e.children}
                    </ul>
                  }


                }
              }

            >{text}</ReactMarkdown>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
