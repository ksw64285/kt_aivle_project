import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment"; // 날짜
import useAxios from '../../routes/useAxios'
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input, CardBody, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label, Card, Spinner } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { Link } from 'react-router-dom';
import axios from 'axios'
import "./TableContainer.css";

// 스피너 스타일 추가
// const spinnerContainerStyle = {
//   position: "fixed",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   zIndex: "9999",
// };

let api = useAxios()
// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`문의유형을 검색해보세요.`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>

      </Col>

    </React.Fragment>
  );
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions,
  handleDelete,
  update,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태 추가

  const checkAdmin = async () => {
    try {
      const response = await api.get('http://localhost:8000/board/is_admin/');
      setIsAdmin(response.data.is_admin);
    } catch (error) {
      console.log(error);
    }
  };

  // 기존 정보를 수정 모달의 상태 값으로 하기 위함

  const [editedTitle, setEditedTitle] = useState("");
  const [editedType, setEditedType] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedFile, setEditedFile] = useState(null)
  const [file, setFile] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정모달창 isEditModalOpen
  const [editedData, setEditedData] = useState(null); // 수정된 데이터를 저장할 editedData
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false); // spinner 로딩 상태
  const [comment, setComment] = useState('')



  const handleEdit = () => {
    setEditedTitle(rowData.title);
    setEditedType(rowData.type);
    setEditedContent(rowData.body);
    setEditedFile(rowData.file)
    setIsEditModalOpen(true);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

const handleCommentChange = (event) => {
  setComment(e.target.value);
};
const handleAddComment = async () => {
  try {
    api.post(
      `http://localhost:8000/board/${rowData.id}/add-comment/`,
      { comment },
    );
    // 코멘트 입력 필드 초기화
    //setComment('');
    console.log("포스트 했어요")
    setModalIsOpen(false);
  } catch (error) {
    console.log(error);
  }
};

const Commentandfetch = ()=>{
  handleAddComment()
  setTimeout(() => {
    update();
  }, 1000);
}

const handleUpdateData = () => {
  const formData = new FormData();
  formData.append('title', editedTitle);
  formData.append('body', editedContent);
  if (file) {
    console.log("file: ", file)
    formData.append(`file`, file);
  };
  formData.append('type', editedType);
  console.log("formData: ", formData)
  api.post(`/board/${rowData.id}/update/`, formData
  )
  .then((response) => {
    console.log(response)
    console.log("수정 요청이 성공적으로 전송되었습니다.");
    //window.location.reload(); // 화면 새로고침   
    // 수정 작업 완료 후 필요한 동작 수행
  })
  .catch((error) => {
    console.log("수정 중 에러가 발생했습니다:", error);
  });
  // 모달 창 닫기
  //window.location.reload(); // 화면 새로고침 
  setIsEditModalOpen(false);
  setModalIsOpen(false)
};
// 파일 크기를 적절한 형식의 문자열로 변환하는 함수
function formatFileSize(size) {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
};

useEffect(() => {
  if (!isEditModalOpen) {
    setSelectedFiles([]);
  }
}, [isEditModalOpen]);

  

  const handleDownload = async () => {
    if (rowData && rowData.id) {
      try {
        console.log(rowData.file.path)
        const downloadUrl = `/board/${rowData.id}/download-file/`;
        const response = await api.get(downloadUrl, {responseType : 'blob'});
        console.log("다운로드 리스폰스: ",response)
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
  
        // 파일명 추출
        const filename = rowData.file.substring(rowData.file.lastIndexOf('/') + 1);
        
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
        window.alert("파일 다운로드에 실패하였습니다.")
      }
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rowData, setRowData] = useState(null);

  const handleRowClick = (row) => {
    // console.log(row); // 콘솔에 row 객체를 로깅
    setRowData(row);
    checkAdmin();
    setModalIsOpen(true);
  };
  const [stat, setStat] = useState(null)

  const UpdateStat = () =>{
    handleUpdateData();
    setTimeout(() => {
      update();
    }, 1000);
  }

  const handleDeleteAndCloseModal = (id) => {
    handleDelete(id); // 삭제 작업 실행
    setModalIsOpen(false); // Modal 창 닫기
  };
  
  return (
    <Fragment>
      <Row className="mb-2">
        <Col md={customPageSizeOptions ? 2 : 1}>
          <select
            className="form-select form-select-custom"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize} 개씩
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
        {/* {isAddOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )} */}
        {/* {isAddUserList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddCustList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded mb-2 me-2"
                onClick={handleCustomerClick}
              >
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )} */}
      </Row>

      <div className="table-responsive react-table table-no-vertical-lines">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th key={column.id}>
                    <div className="mb-2" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            const { id, title, created_at, type, body, file } = row.original; // 데이터에서 필요한 속성 추출
            return (
              <Fragment key={row.id}>
                <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original)}>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{id}</td> {/* id 출력 */}
                  <td>
                    {title} <br/> {moment(created_at).format("YYYY.MM.DD HH:mm")}
                  </td> {/* title과 created_at 출력 */}
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{type}</td>
                </tr>
              </Fragment>
            );
          })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>

      {rowData && (
        <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(false)}>
          <ModalHeader tag="h4">
            1:1 문의
          </ModalHeader>
          <ModalBody>
            <h5>{rowData.title}</h5>
            <hr className="separator" />
            <p>작성일자 : {moment(rowData.created_at).format("YYYY.MM.DD HH:mm:ss")}</p>
            <p>작성자: {rowData.user}</p>
            <p>문의유형 : {rowData.type}</p>
            <hr className="separator" />
            <h5>내용</h5>
            <p>{rowData.body}</p>
            <hr className="separator"/>
            {rowData.file && (
            <div>
              <h5>첨부파일</h5>
              <div>
                <button onClick={handleDownload}>
                  {rowData.file?.substring(rowData.file.lastIndexOf('/') + 1)}
                </button>
              </div>
            
            </div>
          )}
          {rowData.answer && (
            <div>
              <hr className="separator"/>
              <h5>댓글</h5>
              <p>{ rowData.answer }</p>
              </div>
            )}
            <hr className="separator"/>
            {isAdmin? (
              <div>
              <h5>댓글 작성</h5>
              <textarea
                onChange={handleCommentChange}
                placeholder="댓글을 입력하세요..."
                style={{ flex: 1, minHeight: "50px", width: "300px" }}
              />
              <Button color="primary" onClick={Commentandfetch} style={{ marginLeft:"10px", marginBottom: "45px" }}>
                전송
              </Button>
            </div>
            ): <p></p>}
          </ModalBody>
          <ModalFooter>
          <Button color="warning" onClick={handleEdit}>
          수정
          </Button>
            <Button color="danger" onClick={() => handleDeleteAndCloseModal(rowData.id)}>
              삭제
            </Button>
        </ModalFooter>
        

        </Modal>
      )}
      <Modal isOpen={isEditModalOpen} toggle={handleEdit}>
        <ModalHeader tag="h4">
          1:1 문의 수정
        </ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="inquiryTitle">제목</Label>
            <Input
              type="text"
              name="title"
              id="inquiryTitle"
              placeholder="제목을 입력하세요"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="inquiryType">문의 유형</Label>
            <Input
              type="select"
              name="type"
              id="inquiryType"
              value={editedType}
              onChange={(e) => setEditedType(e.target.value)}
            >
              <option value="기타문의">기타문의</option>
              <option value="결제문의">결제문의</option>
              <option value=" 오류신고">오류신고</option>
              <option value="서비스이용문의">서비스이용문의</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="inquiryContent">내용</Label>
            <Input
              type="textarea"
              name="content"
              id="inquiryContent"
              placeholder="내용을 입력하세요"
              style={{ minHeight: "200px" }}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
          <Label>첨부파일</Label>
            <Input
              className="form-control"
              name="file"
              type="file" id="formFile"
              //value={editedFile}
              onChange={handleFileChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {loading ? (
            <div className="spinner-container">
            <Spinner className="ms-2" color="info" />
            </div>
          ): (
          <Button color="primary" onClick={UpdateStat}>
            저장
          </Button>
          )}
          <Button color="secondary" onClick={() => setIsEditModalOpen(false)}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
