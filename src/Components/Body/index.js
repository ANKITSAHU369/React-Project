import React from 'react'
import LoggedIn from '../LoggedIn';
import Login from '../Login';

function Body(props){
    const {view, isLoggedIn, setisLoggedIn} = props

    return(
        !isLoggedIn
        ?
        <Login setisLoggedIn={setisLoggedIn}/>
        :
        <LoggedIn view={view}/>
    )
}

export default Body;