import './App.css'
import {Route, Routes} from "react-router";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<>1</>} />
            <Route path="/1" element={<>2</>} />
        </Routes>
    </>
  )
}

export default App
