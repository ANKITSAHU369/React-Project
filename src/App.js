import React,{useState} from 'react';
import Body from './Components/Body';
import Navbar from './Components/Navbar';


function App(){
    const [view, setView] = useState('orders')
    const [isLoggedIn, setisLoggedIn] = useState(window.localStorage.getItem('loginStatus') === 'true')
    return(
        <div id="main" style={{display:'flex', flexDirection:'column'}}>
          <Navbar setView={setView} isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>
          <Body view={view} isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}/>
        </div>
    );
  
}

export default App;