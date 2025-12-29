import electronLogo from './assets/electron.svg'
import "./assets/base.css"
import React, {useState} from "react";
import TitleBar from "@renderer/components/TitleBar";
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')


  const [text, setText] = useState<string>("")

  return (
    <>
      <TitleBar/>
      <header></header>
      <main id={"main"}>
        <div id-={"text"}>
          <textarea id={"text-text"} onInput={(e) => setText(e.currentTarget.value)}/>
        </div>
        <div id={"text-md"}>
          <div id={"text-md-parser"}>
            <ReactMarkdown
              remarkPlugins={[remarkBreaks, remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >{text}</ReactMarkdown>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
