import { useRef,useState } from "react"
import axios from "axios";
import { youtube_parser } from "./utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faInstagram, faTwitter  } from '@fortawesome/free-solid-svg-icons'
function App() {

  const inputUrlRef=useRef();
  const [UrlResult, setUrlResult] = useState(null);
  const handleSubmit=(e)=>{
    e.preventDefault();
    const youTubeID=youtube_parser(inputUrlRef.current.value);
    console.log(youTubeID);

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {id: youTubeID}
    }

    axios(options)
      .then(res=>setUrlResult(res.data.link))
      .catch(err=>console.log(err))
    inputUrlRef.current.value="";
  }

  return (
    
    <div className="app">
      <div className="logo">Youtube 2 MP3</div>
      <section className="content">
        <h1 className="content_title">
          Youtube Video to MP3 Convertor
        </h1>
        <p className="content_description">
          This is simple youtube video to mp3 convertor.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder="Paste youtube url link here..." type="text" className="form_input" />
          <button type="submit" className="form_button">Submit</button>
        </form>
      {UrlResult? <a target="_blank"  rel="noreferrer" href={UrlResult} 
      className="download_btn">Download Mp3</a>:''}
        
      </section>
      <span className="bottom_bar">
        <div>Made by Ojas </div>
        
        </span>
    </div>

  )
}

export default App
