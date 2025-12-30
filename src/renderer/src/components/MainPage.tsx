import "./styles/main_page.css"
import ReactMarkdown from "react-markdown";





export default function MainPage(){


  return (
    <div id={"main-page"}>
      <header id={"main-header"}>
        <p id={"main-header-md"}>Markdown</p>
        <p id={"main-header-filename"}></p>
        <p id={"main-header-preview"}>Preview</p>
      </header>
      <main id={"main-main"}>
        <div id={"main-md"}>
          <div id={"main-md-rows"}></div>
          <div id={"main-md-text"}>
            <div id={"main-md-light"}></div>
            <textarea id={"main-md-raw"}/>
          </div>
        </div>
        <hr id={"main-hr"}/>
        <div id={"main-preview"}>
          <div id={"main-preview-block"}>
            <ReactMarkdown></ReactMarkdown>
          </div>
        </div>
      </main>
      <footer id={"main-footer"}>
        <div id={"main-footer-buttons"}></div>
      </footer>
    </div>
  )
}
