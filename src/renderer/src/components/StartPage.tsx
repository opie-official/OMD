import "./styles/start_page.css"


interface Props{
  setCur: React.Dispatch<React.SetStateAction<0 | 1>>;
}


export default function StartPage(props: Props) {

  function handleNew(){}



  return (
    <div id={"start-page"}>
      <div id={"start-page-img"}></div>
      <p id={"start-page-p"}>Welcome to OMD</p>
      <div id={"start-page-info"}>
        <div id={"start-page-buttons"}>
          <button className={"start-button"} onClick={handleNew}>Create New</button>
          <button className={"start-button"}>Open File</button>
        </div>
        <div id={"start-page-recent"}>

        </div>
      </div>
    </div>
  )
}
