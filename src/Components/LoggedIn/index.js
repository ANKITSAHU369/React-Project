import React from 'react'
import Main from '../Main';

function LoggedIn(props){
    const {view} = props
    return(
          <div style={{display:'flex', flexDirection:'row'}}>
                <Main view={view}/>
          </div>
    )

}

export default LoggedIn;