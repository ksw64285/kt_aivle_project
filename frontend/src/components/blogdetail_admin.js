import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const BlogDetail = ({ match }) => {
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  

  let {authTokens} = useContext(AuthContext)

  useEffect(() => {
    console.log(id)
    fetchBlog(id);
  }, [id]);

  const fetchBlog = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/board/${id}/`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization' : 'Bearer ' + String(authTokens.access)
        },

      });
      setBlog(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };



  const handleDownload = async () => {
    if (blog && blog.id) {
      try {
        const downloadUrl = `http://localhost:8000/board/${blog.id}/download-file/`;
        const response = await axios.get(downloadUrl, {
          responseType: 'blob',
          headers: {
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        });
  
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
  
        // 파일명 추출
        const filename = blog.file.substring(blog.file.lastIndexOf('/') + 1);
  
        // 파일 다운로드
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // Internet Explorer 또는 Microsoft Edge
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          // 다른 브라우저
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          window.URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.log('Error during file download:', error);      
      }
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/board/${id}/add-comment/`,
        { comment },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        }
      );

      // 새로운 댓글이 추가된 후에 해당 블로그를 다시 불러옴
      fetchBlog(id);
      // 코멘트 입력 필드 초기화
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {blog ? (
        <div>
          <h1>{blog.title}</h1>
          <hr></hr>
          <p>{blog.type}</p>
          <p>{blog.body}</p>
          {blog.file && (
            <div>
              <h3>첨부파일:</h3>
              <button onClick={handleDownload}>{blog.file?.substring(blog.file.lastIndexOf('/') + 1)}</button> 
            </div>
          )}
          <hr></hr>
          <h3>Comment</h3>
          {blog.answer ? (
            <p>{ blog.answer }</p>
          ) : (
            <p>No comments yet.</p>
          )}
          <hr></hr>
          <h3>Add Comment:</h3>
          <input type="text" value={comment} onChange={handleCommentChange} />
          <button onClick={handleAddComment}>Add Comment</button>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetail;