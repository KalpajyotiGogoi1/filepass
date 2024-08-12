import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Download from "./pages/Download";
import Upload from "./pages/Upload";

function App() {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "send" element = {<Upload/>}/>
        <Route path = "recive" element = {<Download/>}/>
      </Routes>
    </div>
  )
}

export default App;


