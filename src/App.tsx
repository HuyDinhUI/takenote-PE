import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from './routes/publicRoutes';
import { privateRoutes } from './routes/privateRoutes';

function App() {
  return (
    <Router>
      <div className='App'>
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
