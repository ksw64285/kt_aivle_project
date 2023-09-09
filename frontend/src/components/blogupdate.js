import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom'

const BlogUpdate = ({ match, history }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('')
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    fetchBlog(id);
  },[id]);
  let {authTokens} = useContext(AuthContext)

  const fetchBlog = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/board/${id}/edit`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization' : 'Bearer ' + String(authTokens.access)
        },

      });
      const { title, body, type } = response.data.data;
      setTitle(title);
      setBody(body);
      setType(type);
    } catch (error) {
      console.log(error);
    }
  };

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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('type', type);
    if (file) {
      formData.append('file', file);
    }

    try {
      let response = await axios.post(`http://localhost:8000/board/${id}/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization' : 'Bearer ' + String(authTokens.access)
        },
      });
      if(response.status === 201 || response.status === 200){
        navigate(`/board/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Edit Blog</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default BlogUpdate;