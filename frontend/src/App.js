import { BrowserRouter , HashRouter} from 'react-router-dom';
import '../src/Styles/App.scss';
import '../src/Styles/pool.scss'
import '../src/Styles/HomePage.scss'
import '../src/Styles/flash.scss'

import Layout from './Pages/Layout';
import HomePage from './Pages/HomePage';
import NFP from './Pages/NFP';
import Pool from './Pages/pool';
import Flashloans from './Pages/Flashloans';

import {Route,Routes} from 'react-router-dom'
// import { useEffect, useRef } from 'react';


function App() {
  return (
    <div className="App">
      <HashRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}></Route>
          <Route path="pool" element={<Pool/>}></Route>
          <Route path="about" element={<HomePage/>}></Route>
          <Route path="flashloans" element={<Flashloans/>}></Route>
          <Route path='*' element={<NFP/>}></Route>
        </Route>
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
