import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Checkbox } from 'antd';
import '../../assets/scss/modal.scss';

import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import withRouter from "components/Common/withRouter";
import Modal from "../../components/Common/modal";
import "react-datepicker/dist/react-datepicker.css";
// action
import { registerUser, apiError } from "../../store/actions";
import Agree from "./agree"
import Personal_agree from "./personal_agree"
import "./register.scss"
//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/aivle.png";
import logoImg from "../../assets/images/logo.svg";
import { components } from "react-select";

const Register = props => {

  //meta title
  document.title = "ChatGPT와 함께하는 리더 코칭훈련";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: '',
      email: '',
      password1: '',
      password2:'',
      gender:'',
      date_of_birth:'',
      belong:'',
      grade:'',
    },
    
    validationSchema: Yup.object({
      name: Yup.string().required("이름을 입력해 주세요."),
      email: Yup.string()
      .matches(/^[^@\s]+@[^\s]+\.[^@\s]+$/,'이메일 형식에 맞지 않습니다.')
      .required("이메일을 입력해주세요."),

      password1: Yup.string()
      .matches(
        /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
        '비밀번호를 8~16자로 영문 대소문자, 숫자, 특수기호를 조합해서 사용하세요. ')
      .required("비밀번호를 입력해주세요."),
      password2: Yup.string().oneOf([Yup.ref('password1'), null], '비밀번호가 다릅니다.')
      .required('비밀번호를 한번 더 입력해 주세요.'),
  
      gender: Yup.string().required("성별을 선택해주세요"),
      date_of_birth: Yup.string().required("년-월-일 형식으로 생일을 입력해 주세요."),
      belong: Yup.string().required("소속을 선택해주세요"),
      grade: Yup.string().required("직급을 선택해주세요")
    }),
    
    onSubmit: (values) => {
      dispatch(registerUser(values, props.router.navigate));
      scrollToTop();
    }
  });
 
  const [checkList, setCheckList] = useState(['noway']);

  const handleCheck = useCallback((e) => {
    const { name, checked } = e.target;
    setCheckList((prevCheckList) => {
      if (checked) {
        return [...prevCheckList, name];
      } else {
        return prevCheckList.filter((el) => el !== name);
      }
    });
  }, []);

  const checkAll = useCallback((e) => {
    const { checked } = e.target;
    if (checked) {
      setCheckList(['terms', 'privacy']);
    } else {
      setCheckList([]);
    }
  }, []);


  const [modalOpen, setModalOpen] = useState(false);
  const [permodalOpen, setperModalOpen] = useState(false);
  
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const peropenModal = () => {
    setperModalOpen(true);
  };
  const percloseModal = () => {
    setperModalOpen(false);
  };
  // 회원가입시 성공한지 안한지 확인하도록 scroll up해줌
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));

  useEffect(() => {
    dispatch(apiError(""));
  }, []);
  
  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">회원 가입</h5>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">사용자 이름</Label>
                        <Input
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="이름을 입력해주세요."
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={
                            validation.touched.name && validation.errors.name ? true : false
                          }
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="이메일을 입력해주세요."
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">비밀번호</Label>
                        <Input
                          name="password1"
                          type="password"
                          placeholder="비밀번호를 입력해주세요."
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password1 || ""}
                          invalid={
                            validation.touched.password1 && validation.errors.password1 ? true : false
                          }
                        />
                        {validation.touched.password1 && validation.errors.password1 ? (
                          <FormFeedback type="invalid">{validation.errors.password1}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">비밀번호 확인</Label>
                        <Input
                          name="password2"
                          type="password"
                          placeholder="비밀번호를 입력해주세요."
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password2 || ""}
                          invalid={
                            validation.touched.password2 && validation.errors.password2 ? true : false
                          }
                        />
                        {validation.touched.password2 && validation.errors.password2 ? (
                          <FormFeedback type="invalid">{validation.errors.password2}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">성별</Label>
                        <select
                            name="gender"
                            type="text"
                            value={validation.values.gender || ""}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            style={{ display: "block" }}
                          >
                            <option value="2" label="성별을 선택해주세요." />
                            <option value="0" label="여자" />
                            <option value="1" label="남자" />
                          </select>
                          {validation.touched.gender && validation.errors.gender ? (
                          <FormFeedback type="invalid">{validation.errors.gender}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">생년월일</Label>
                        <DatePicker 
                          selected={validation.values.date_of_birth || ""}
                          format="yyyy-MM-dd"
                          className="form-control"
                          name="date_of_birth"
                          id="date_of_birth"
                          placeholderText="년-월-일 형식으로 생일을 입력해 주세요."
                          onChange={date_of_birth => validation.setFieldValue('date_of_birth', date_of_birth)}
                          onBlur={validation.handleBlur}
                        />
                        {validation.touched.date_of_birth && validation.errors.date_of_birth ? (
                          <FormFeedback type="invalid">{validation.errors.date_of_birth}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">소속</Label>
                        <Input
                          id="belong"
                          name="belong"
                          className="form-control"
                          placeholder="소속을 입력해주세요."
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.belong || ""}
                          invalid={
                            validation.touched.belong && validation.errors.belong ? true : false
                          }
                        />
                        {validation.touched.belong && validation.errors.belong ? (
                          <FormFeedback type="invalid">{validation.errors.belong}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">직급</Label>
                        <Input
                          id="grade"
                          name="grade"
                          className="form-control"
                          placeholder="직급을 입력해주세요."
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.grade || ""}
                          invalid={
                            validation.touched.grade && validation.errors.grade ? true : false
                          }
                        />
                        {validation.touched.grade && validation.errors.grade ? (
                          <FormFeedback type="invalid">{validation.errors.grade}</FormFeedback>
                        ) : null}
                      </div>
                      <div>
                            
                              <input
                                type="checkbox"
                                name="checkAll"
                                onChange={checkAll}
                                checked={checkList.length === 2}
                                />아래 내용에 모두 동의합니다.
                            
                        <hr/>
                        <div className="agree_container">
                          
                            <input
                                type="checkbox"
                                name="terms"
                                onChange={(e) => handleCheck(e)}
                                checked={checkList.includes('terms')}
                              />[필수] 이용약관 동의
                          
  
                          <div>
                            <Link className="showMore" onClick={openModal}>    상세보기</Link>
                            <Modal open={modalOpen} close={closeModal} header="이용약관 동의">
                                <main> {props.children} </main>
                                <Agree />
                            </Modal>      
                          </div>
                        </div>
                        <div className="agree_container">
                            <input
                              type="checkbox"
                              name="privacy"
                              onChange={(e) => handleCheck(e)}
                              checked={checkList.includes('privacy')}
                              />[필수] 개인정보 수집 이용 동의   
                            <div >
                              <Link className="showMore" onClick={peropenModal}>상세보기</Link>
                              <Modal open={permodalOpen} close={percloseModal} header="개인 정보 수집 이용 동의">
                                  <main> {props.children} </main>
                                  <Personal_agree />
                              </Modal> 
                            </div>
                              
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          name="registerbutton"
                          className="btn btn-primary btn-block "
                          type="submit"
                          disabled={checkList.length === 2 ? false: true}
                          // onClick={scrollToTop}
                        >
                          회원가입
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                이미 아이디가 있으십니까?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    로그인
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} KT AIVLE AI트랙 15조{" "}
                  <i className="mdi mdi-heart text-danger" />
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Register);

Register.propTypes = {
  history: PropTypes.object,
};