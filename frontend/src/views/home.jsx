import React, { useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const Home = () => {
  let [notes, setNotes] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)
  useEffect(() => {
      getNotes()
  }, [])

  let getNotes = async() => {
    let response = await fetch('http://127.0.0.1:8000/userapp/notes/',{
    method:'GET',
    headers:{
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer ' + String(authTokens.access)
            },
            credentials: 'include',
    })
    let data = await response.json()

    if(response.status === 200){
      setNotes(data)
    }else if(
      response.statusText === 'Unauthorized'
    ){
      logoutUser()
    }
  }
  
  return (
    <div>
        <p>You are logged to the home page!</p>

        <ul>
          {notes.map(note => (
              <li key={note.id}>{note.body}</li>
          ))}
        </ul>
    </div>
  )}

export default Home
