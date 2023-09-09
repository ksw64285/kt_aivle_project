import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';


const BlogCreate = ( ) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('')

  let {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (file) {
      formData.append('file', file);
    }
    formData.append('type', type);

    try {
      let response = await axios.post('http://localhost:8000/board/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization' : 'Bearer ' + String(authTokens.access)
        },

      });

      if(response.status === 201 || response.status===200){
        console.log(response.status)
        navigate('/board/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <br />
        <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
        <br />
        <br />
        <label htmlFor="type">Type:</label>
        <br />
        <select id="type" name="type" value={type} onChange={handleTypeChange}>
          <option value="">Select Type</option>
          <option value="서비스 문의">서비스 문의</option>
          <option value="오류 문의">오류 문의</option>
          <option value="건의 사항">건의사항</option>
          <option value="기타 문의">기타 문의</option>
        </select>
        <br />
        <br />
        <label htmlFor="body">Body:</label>
        <br />
        <textarea id="body" name="body" value={body} onChange={handleBodyChange} />
        <br />
        <br />
        <label htmlFor="file">File:</label>
        <br />
        <input type="file" id="file" name="file" onChange={handleFileChange} />
        <br />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
   );
  };
  
  export default BlogCreate;