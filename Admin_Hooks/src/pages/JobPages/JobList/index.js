import React, { useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../../components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment"; // 날짜
import axios from "axios";
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import useAxios from '../../../routes/useAxios'
import {
    addNewJobList as onAddNewJobList,
} from "store/actions";
//import { fetchBlogRequest, fetchBlogSuccess, fetchBlogFailure } from "../../../store/jobs/actions";
import {
    JobNo, JobTitle, CompanyName, Type, PostedDate
} from "./JobListCol";
//import blogReducer from "../../../store/jobs/reducer";
let api = useAxios()
//redux
import { useSelector, useDispatch } from "react-redux";

import {
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    FormFeedback,
    Label,
    Card,
    CardBody,
    Spinner,
} from "reactstrap";

function JobList() {

    //meta title
    document.title = "1:1 문의하기";
    //const blogs = useSelector(state => state.blogReducer.blogs);
    const [modal, setModal] = useState(false);
    const [job, setJob] = useState(null);
    const [no, setNo] = useState(1); // no 값을 관리하는 변수
    const dispatch = useDispatch();
    const [stat, setStat] = useState(false);
    const [file, setFile] = useState(null);
    useEffect(() => {
        if (stat){
            console.log("진실입니다!!!")
            fetchExistingJobs();
            setStat(false)
        }
        fetchExistingJobs(); // 함수 호출
      }, []);  
    const [Blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false); // get 스피너
    const [deleteLoading, setDeleteLoading] = useState(false); // delete 스피너
    const [postLoading, setPostLoading] = useState(false); // post 스피너

    // 기존 문의 목록을 가져오는 비동기 함수 호출
    const fetchExistingJobs = async () => {
        setLoading(true); // 스피너 시작
        try {
          const response = await api.get("/board/blog");
          console.log(response.data)
          const blogs = response.data; // 기존 문의 목록 데이터

          setTimeout(() => {
            setBlogs(blogs); // 기존 문의 목록 상태 업데이트
            setLoading(false); // 스피너 종료
          }, 500);
        } catch (error) {
            setLoading(false); // 스피너 종료
            console.log("기존 문의 목록을 가져오는데 실패했습니다:", error);
            window.alert("기존 문의 목록을 가져오는데 실패했습니다")
        }
      };
      const update = () => {
        setStat(true);
        fetchExistingJobs();
      }
    
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      
      const handleDelete = (id) => {
        setDeleteLoading(true); // 스피너 시작
        // 삭제 작업을 처리하는 코드를 여기에 작성하세요.
        // 예를 들어, 해당 데이터의 ID를 서버에 보내서 삭제 요청을 처리할 수 있습니다.
        // 서버로 데이터를 삭제하는 요청을 보내는 예시:
        api.delete(`/board/delete/${id}`)
          .then((response) => {
            console.log("삭제 요청이 성공적으로 전송되었습니다.");
            
            setTimeout(() => {
                // 삭제 작업 완료 후 필요한 동작 수행
                setDeleteLoading(false); // 스피너 끝     
                fetchExistingJobs();
            }, 500);
          })
          .catch((error) => {
            console.log("삭제 요청 중 에러가 발생했습니다:", error);
            window.alert("삭제 요청 중 에러가 발생했습니다")
            setDeleteLoading(false); // 스피너 끝
          });
      };
    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: { // 폼의 초기 값
            jobId: (job && job.jobId) || '',
            jobTitle: (job && job.jobTitle) || '',
            companyName: (job && job.companyName) || '',
            type: (job && job.type) || '서비스 문의',
        },

        validationSchema: Yup.object({
            jobTitle: Yup.string().required("제목을 입력해주세요"),
            companyName: Yup.string().required("문의내용을 입력해주세요"),
        }),
        onSubmit: (values) => {
            setPostLoading(true); // 스피너 시작
            console.log("values: ",values);
            console.log(file)
            const newJobList = {
                'title': values["jobTitle"],
                'body': values["companyName"],
                'file': file, // 첨부파일 추가
                'type': values["type"],
            };
            console.log("newJobList: ", newJobList);
            // 백엔드 엔드포인트 URL

            api.post('/board/create/', newJobList).then((response) => {
                // 요청 성공 시 실행할 코드
                console.log("요청이 성공적으로 전송되었습니다.");
                console.log("응답 데이터:", response.status);

                setTimeout(() => {
                    validation.resetForm();
                    fetchExistingJobs()
                    setFile(null)
                    setPostLoading(false); // 스피너 끝
                }, 100);
            })
            .catch((error) => {
                // 요청 실패 시 실행할 코드
                console.log("요청 전송 중 에러가 발생했습니다:", error);
                console.log(error);
                window.alert("요청 전송 중 에러가 발생했습니다")
                setPostLoading(false); // 스피너 끝
            });
            // save new Job
            dispatch(onAddNewJobList(newJobList));
            console.log(dispatch(fetchBlogSuccess()))
            validation.resetForm();
            setNo(no + 1); // no 값을 1 증가시킨다
            toggle();
            
        },
    });
    
    const { jobs } = useSelector((state) => ({
        jobs: state.JobReducer.jobs || [],
    }));
    //const [blog, setBlogs] = useState([])
    useEffect(() => {
    //dispatch(fetchBlogSuccess)
    //dispatch(fetchBlogFailure)
    //dispatch(fetchBlogRequest)
    }, [dispatch, jobs, ]);
    //dispatch(fetchBlogSuccess());
    const toggle = () => {
        if (modal) {
            setModal(false);
            setJob(null);
        } else {
            setModal(true);
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'no',
                disableFilters: true,
                Cell: (cellProps) => {
                    return <JobNo {...cellProps} />;
                }
            },
            {
                Header: '제목',
                accessor: 'jobTitle',
                disableFilters: true,
                Cell: (cellProps) => {
                    return <JobTitle {...cellProps} />;
                }
            },
            {
                Header: '문의유형',
                accessor: 'type',
                disableFilters: true,
                Cell: (cellProps) => {
                    return <Type {...cellProps} />;
                }
            },
            // {
            //     Header: '등록일',
            //     accessor: 'postedDate',
            //     disableFilters: true,
            //     Cell: (cellProps) => {
            //         const { value } = cellProps;
            //         const formattedDate = moment().format("YYYY.MM.DD"); // 현재 날짜로

            //         return <PostedDate {...cellProps} value={formattedDate} />; // 수정된 postedDate 값을 전달
            //     }
            // },
        ],
        []
    );

    // 첨부파일
    const [selectedFiles, setselectedFiles] = useState([]);

    // 선택된 첨부파일의 미리보기 기능
    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: formatBytes(file.size),
            })
        )
        setselectedFiles(files)
    }

    const resetAttachments = () => {
        setselectedFiles([]);
      };
    
      const handleNewBtn = () => {
        resetAttachments();
        setModal(true);
      };
    
    /**
     * Formats the size
     */
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }    

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="HOME" breadcrumbItem="1:1 문의하기" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody className="border-bottom">
                                    <div className="d-flex align-items-center">
                                        <h5 className="mb-0 card-title flex-grow-1">1:1문의 목록</h5>
                                        <div className="flex-shrink-0">
                                        <Link to="" onClick={(e) => { e.preventDefault(); handleNewBtn(); }} className="btn btn-primary me-1">+New {">"}</Link>                                           
                                        </div>
                                    </div>
                                </CardBody>
                                <CardBody>
                                    {loading || deleteLoading ? (
                                        <div className="text-center">
                                        <Spinner className="ms-2" color="info" />
                                        </div>
                                    ):(
                                    <TableContainer
                                        columns={columns}
                                        data={Blogs}
                                        isGlobalFilter={true}
                                        isAddOptions={false}
                                        isJobListGlobalFilter={true}
                                        customPageSize={10}
                                        handleDelete={(jobId) => handleDelete(jobId)}
                                        update={update}
                                    />
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle} tag="h4">
                            1:1 문의
                        </ModalHeader>
                        <ModalBody>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                            >
                                <Row>
                                    <Col className="col-12">
                                        <div className="mb-3">
                                            <Label className="form-label">제목</Label>
                                            <Input
                                                name="jobTitle"
                                                type="text"
                                                placeholder="제목을 입력해주세요"
                                                validate={{
                                                    required: { value: true },
                                                }}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.jobTitle || ""}
                                                invalid={
                                                    validation.touched.jobTitle && validation.errors.jobTitle ? true : false
                                                }
                                            />
                                            {validation.touched.jobTitle && validation.errors.jobTitle ? (
                                                <FormFeedback type="invalid">{validation.errors.jobTitle}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label">내용</Label>
                                            <textarea
                                                name="companyName"
                                                className={`form-control ${validation.touched.companyName && validation.errors.companyName ? 'is-invalid' : ''}`}
                                                placeholder="내용을 입력해주세요"
                                                style={{ minHeight: "200px" }}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.companyName || ""}
                                                
                                            />
                                            {validation.touched.companyName && validation.errors.companyName ? (
                                                <FormFeedback type="invalid">{validation.errors.companyName}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3">
                                            <Label className="form-label">문의유형</Label>
                                            <Input
                                                name="type"
                                                type="select"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={
                                                    validation.values.type || ""
                                                }
                                                invalid={
                                                    validation.touched.type && validation.errors.type
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <option>서비스 문의</option>
                                                <option>오류 문의</option>
                                                <option>건의 사항</option>
                                                <option>기타 문의</option>

                                            </Input>
                                            {validation.touched.type && validation.errors.type ? (
                                                <FormFeedback type="invalid">{validation.errors.type}</FormFeedback>
                                            ) : null}
                                        </div>
                                        <div className="mb-3"> {/* 첨부파일 */}
                                            <div>
                                                <div className="dz-message needsclick mt-2">
                                                <Input
                                                className="form-control"
                                                name="files"
                                                type="file" id="formFile"
                                                //onChange={(e) => {handleAcceptedFiles([...e.target.files]);
                                                //handleFileChange(e.target.files);}}
                                                onChange={handleFileChange}
                                                
                                                 />
                                                </div>
                                            </div>
                                            {/* 첨부파일 미리보기 */}
                                            <div className="dropzone-previews mt-3" id="file-previews">
                                                {selectedFiles.map((f, i) => {
                                                    return (
                                                    <Card
                                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                        key={i + "-file"}
                                                    >
                                                        <div className="p-2">
                                                        <Row className="align-items-center">
                                                            <Col className="col-auto">
                                                            <img
                                                                data-dz-thumbnail=""
                                                                height="80"
                                                                className="avatar-sm rounded bg-light"
                                                                alt={f.name}
                                                                src={f.preview}
                                                            />
                                                            </Col>
                                                            <Col>
                                                            <Link
                                                                to="#"
                                                                className="text-muted font-weight-bold"
                                                            >
                                                                {f.name}
                                                            </Link>
                                                            <p className="mb-0">
                                                                <strong>{f.formattedSize}</strong>
                                                            </p>
                                                            </Col>
                                                        </Row>
                                                        </div>
                                                    </Card>
                                                    )
                                                })}
                                            </div>
                                        </div> {/* 첨부파일 끝 */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    {postLoading ? (
                                        <div className="text-center">
                                        <Spinner className="ms-2" color="info" />
                                        </div>
                                    ):(
                                        <div className="text-end">
                                            <button
                                                type="submit"
                                                className="btn btn-success save-user"
                                                onClick={toggle}
                                            >
                                                확인
                                            </button>
                                        </div>
                                    )}
                                    </Col>
                                </Row>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </React.Fragment>
    );
}

export default JobList;