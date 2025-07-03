import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
function Message(){
    return(
        
        <div style={{border :"solid 4px navy",color:"navy",height:"500px",width:"600px",borderRadius:"10px"}}>
            <FontAwesomeIcon icon={faCircleCheck} style={{height:"200px",width:"200px",marginTop:"60px"}}/>
        <p className="mt-5">we have sent the credentials to your email address</p>
        <button style={{backgroundColor:"navy",borderRadius:"30px",width:"300px",height:"40px"}}>
            <a style={{color:"white", overflowY:"scroll" }}href="/">Go to Login page</a></button>
        </div>
    )
}
export default Message;