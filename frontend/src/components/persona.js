import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from  'react-router-dom' 
import axios from 'axios'


const Persona = () => {
  let { authTokens } = useContext(AuthContext)
  let navigate = useNavigate()
  const prePersona = async (e) =>{
    e.preventDefault()
    try {
      let response = await axios.post('http://localhost:8000/chat/persona', 
        {"age": e.target.age.value, 
          'sex':e.target.sex.value, 
          'job':e.target.job.value,
          'grade':e.target.grade.value,
          'situation':e.target.situation.value,
          'subject':e.target.subject.value,
          },
          {
              headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' + String(authTokens.access)
              },
          });
          console.log(response)
          navigate(response.data.redirect_url)
      } catch (error) {
          console.error(error.response.data);     // NOTE - use "error.response.data` (not "error")
      }

      
    }
    return (
      <div>
          <form onSubmit={prePersona}>
              <label htmlFor="age">Age:</label>
              <select name="age" id="age" required>
                  <option value="">Select Age</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
              </select>
              <br />
              <label htmlFor="sex">Sex:</label>
              <input type="radio" name="sex" id="sex-male" value="male" required />
              <label htmlFor="sex-male">Male</label>
              <input type="radio" name="sex" id="sex-female" value="female" required />
              <label htmlFor="sex-female">Female</label>
              <br />
              <label htmlFor="job">Job:</label>
              <input type="text" name="job" id="job" required />
              <br />
              <label htmlFor="grade">Grade:</label>
              <input type="text" name="grade" id="grade" required />
              <br />
              <label htmlFor="situation">Situation:</label>
              <textarea name="situation" id="situation" rows="4" required></textarea>
              <br />
              <label htmlFor="subject">Subject:</label>
              <input type="text" name="subject" id="subject" required />
              <br />
              <input type="hidden" name="persona_id" id="persona-id" value="" />
              <input type="submit" value="Submit" />
          </form>
          </div>
    )
  
  
}

export default Persona
