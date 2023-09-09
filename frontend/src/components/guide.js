import React, {useContext, useState} from 'react'
import AuthContext from '../context/AuthContext';
import axios from 'axios'

const Guide = () => {
    let [message, setmessage] = useState('')
    let {authTokens} = useContext(AuthContext)
    let [persona, setpersona] = useState([])
    
    const guideSubmit = async(e) => {
        e.preventDefault()
        if(message.trim() !== ''){
            try{
                const response = await axios.post('http://localhost:8000/chat/guide', {
                    message: message,
                    age : persona.age,
                    sex : persona.sex,
                    job : persona.job,
                    grade : persona.grade,
                    situation: persona.situation,
                    subject: persona.subject,
                }, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization' : 'Bearer ' + String(authTokens.access)
                    },
                  });

                console.log(response)

            }catch (error){
                if(error.request){
                    console.error(error.request);
                }else if(
                    error.response
                ){
                console.error(error.response.data); 
                    // NOTE - use "error.response.data` (not "error")
                }
            }
        }
    }

  return (
    <div>
        <form id="guide-form">
            <input type="text" value={message} onChange={(e) => setmessage(e.target.value)} placeholder="Type your message..."/>
            <button onClick={guideSubmit}>Send</button>
        </form>
    </div>
  )

}

export default Guide
