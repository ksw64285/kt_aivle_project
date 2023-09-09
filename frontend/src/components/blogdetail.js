import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const BlogDetail = ({ match }) => {
  const [blog, setBlog] = useState(null);
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

  const handleEdit = () => {
    // 수정하기 버튼 클릭 시, 해당 블로그의 수정 페이지로 이동
    navigate(`/board/${id}/edit`);
    
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
  

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/board/delete/${id}/`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization' : 'Bearer ' + String(authTokens.access)
        },
      });
      console.log("Blog deleted successfully");
      navigate('/board'); // 삭제 후 목록으로 이동
    } catch (error) {
      console.log(error);
      console.log("Error occurred while deleting the blog.");
    }
  };

  console.log(authTokens.user);
  return (
    <div>
      {blog ? (
        <div>
          <button onClick={handleDelete}>Delete</button> {/* Delete 버튼 추가 */}
          <h1>{blog.title}</h1>
          <p>{blog.type}</p>
          <p>{blog.body}</p>
          {blog.file && (
            <div>
              <h3>첨부파일:</h3>
              <button onClick={handleDownload}>{blog.file?.substring(blog.file.lastIndexOf('/') + 1)}</button>            
              </div>
          )}
          <h3>Comments:</h3>
          {blog.answer ? (
            <p>{ blog.answer }</p>
          ) : (
            <p>No comments yet.</p>
          )}
          <button onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetail;