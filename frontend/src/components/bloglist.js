import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // 페이지당 보여줄 개수
  const [totalPages, setTotalPages] = useState(null); // Added total pages state
  let {authTokens} = useContext(AuthContext)
  
  useEffect(() => {
    fetchBlogs();
  }, [currentPage, perPage]); 

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/board/blog/', {
        params: {
          page: currentPage,
          per_page: perPage, // 페이지당 보여줄 개수를 쿼리 매개변수로 전달
        },
        headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization' : 'Bearer ' + String(authTokens.access)
        }
      });
      console.log(response.data)
      setBlogs(response.data.results);
      setTotalPages(response.data.total_pages); // Set total pages from response
      console.log(response.data.total_pages)
    } catch (error) {
      console.log(error);
    }
  };

  const checkAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/board/is_admin/', { 
      headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization' : 'Bearer ' + String(authTokens.access)
        }
      });
      setIsAdmin(response.data.is_admin);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkAdmin();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
  };

  console.log(isAdmin)
  console.log(totalPages)
  return (
    <div>
      <h1>Blog List</h1>
      <label htmlFor="perPage">개수 선택:</label>
      <select id="perPage" value={perPage} onChange={handlePerPageChange}>
        <option value={10}>10개씩 보기</option>
        <option value={20}>20개씩 보기</option>
        <option value={30}>30개씩 보기</option>
      </select>
      <br></br>
      <Link to="/board/create">게시글 작성</Link><br></br>
      <ul>
      {blogs ? blogs.map((d) => (
          <li key={d.id}>
            id: {d.id}<br />
            {isAdmin ? (
              <Link to={`/board/${d.id}/admin`}>Title: {d.title}</Link>
            ) : (
              <Link to={`/board/${d.id}`}>Title: {d.title}</Link>
            )}
            <br />
            created_at: {d.created_at}
          </li>
        )) : <p>There are no blogs! make your blog</p>}
      </ul>
      <div className="page-numbers">
        {/* 페이지 숫자 표시 및 이동 링크 생성 */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            style={{
              padding: '8px 12px',
              margin: '4px',
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogList;