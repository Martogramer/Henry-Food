import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import LandingOk from './components/LandingOk/LandingOk';
import Homeson from './components/Homeson/Homeson';
import Postear from './components/Postear/Postear';
import Detalle from './components/Detalle/Detalle';
import './App.css';

/* function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
    </div>
  );
}

export default App;
 */


const App = () =>{
  return(
    <BrowserRouter>
      <div className="App">    
          <Routes>
            <Route path='/landingOk' element={<LandingOk/>}/>
            <Route path='/homeson' element={<Homeson/>}/>
            <Route path='/recipe' element={<Postear/>}/>
            <Route path='/recipe/:id' element={<Detalle/>}/>
          </Routes>      
      </div>    
    </BrowserRouter>

  )
};
export default App;