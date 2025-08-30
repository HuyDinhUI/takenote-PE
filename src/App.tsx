
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from './routes/publicRoutes';
import { privateRoutes } from './routes/privateRoutes';
import { useEffect } from "react";

function App() {
   
  useEffect(()=>{
    if (localStorage.getItem('theme')){
      document.documentElement.classList.add(localStorage.getItem('theme') ?? 'light');
    }
  },[])

  return (
    <Router>
      <div className='App h-full w-full'>
        <Routes>
          {publicRoutes.map((route,idx) => (
            <Route key={idx} path={route.path} element={route.element}/>
          ))}
          {privateRoutes.map((route, idx)=>(
            <Route key = {idx} path={route.path} element={route.element}/>
          ))}
        </Routes>
      </div>
    </Router>
  )
}

export default App
