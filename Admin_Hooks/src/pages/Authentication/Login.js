import PropTypes from "prop-types";
import React from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, socialLogin } from "../../store/actions";

// import images
import profile from "assets/images/aivle.png";
import logo from "assets/images/logo.svg";

const signIn = () => {
  fetch('백엔드 주소', { 
    method: 'POST',
    body: JSON.stringify({
      email: id,
      password: pw,
    }),
  })
    .then(response => {
      if (response.message === 'SUCCESS') {
        window.localStorage.setItem('token',response.access_token);
        goToMain();
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    });
};

// const signIn = async (e ) => {
//   e.preventDefault()
//   let response = await fetch('http://127.0.0.1:8000/userapp/login/', {
//       method:'POST',
//       headers:{
//           'Content-Type' : 'application/json',
//       },
//       credentials: 'include',
//       body:JSON.stringify({"username": "", 'email':e.target.email.value, 'password':e.target.password.value}),

//   })
  
//   let data = await response.json()
  
//   console.log(jwt_decode(data.access))
  

//   if(response.status === 200){
//       setAuthTokens(data)
//       setUser(jwt_decode(data.access))
//       //access token을 browser에 저장 
//       localStorage.setItem('authTokens', JSON.stringify(data))
//       navigate('/')
//   }else{
//       alert('something went wrong!')
//   }
// }
const Login = props => {

  //meta title
  document.title = "ChatGPT와 함께하는 리더 코칭훈련";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email:  '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
      // .matches(regexPasswd, '비밀번호를 8~16자로 영문 대소문자, 숫자, 특수기호를 조합해서 사용하세요.')
      .required("Please Enter Your Email"),
      password: Yup.string()
      .max(16, "비밀번호는 최대 16자리입니다!")
      .required('비밀번호를 입력해주세요'),
    }),
    //여기서 받은 props은 이 페이지에 접근했을때 제공되는 관련 정보
    //컴포넌트에 전달되는 데이터를 전달하는 변수 또는 데이터
    //index.js에서 component에 접근할때 init으로 데이터 전달
    //
    onSubmit: (values) => {
      //action에 있는 loginUser가 dispatch
      dispatch(loginUser(values, props.router.navigate));
    }
  });

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));
  // Oauth
    const signIn = type => {
        dispatch(socialLogin(type, props.router.navigate));
    };

  //for facebook and google authentication
  const socialResponse = type => {
    signIn(type);
  };

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-secondary p-4">
                        <h5 className="text-secondary">KT AIVLE BIG PROJECT</h5>
                        <p>AI트랙 15조</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="logo-light-element">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                        <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">이메일</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="이메일을 입력해주세요"
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
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="비밀번호를 입력해주세요."
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          로그인 상태 유지
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          /*onClick={signIn}*/
                        >
                          로그인
                        </button>
                      </div>

                      {/* <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                          <Link
                              to="#"
                              className="social-list-item bg-primary text-white border-primary"
                              onClick={e => {
                                e.preventDefault();
                                socialResponse("facebook");
                              }}
                            >
                              <i className="mdi mdi-facebook" />
                            </Link>
                          </li>
                          <li className="list-inline-item">
                           <TwitterLogin
                              loginUrl={
                               "http://localhost:4000/api/v1/auth/twitter"
                             }
                             onSuccess={this.twitterResponse}
                             onFailure={this.onFailure}
                             requestTokenUrl={
                               "http://localhost:4000/api/v1/auth/twitter/revers"
                             }
                             showIcon={false}
                             tag={"div"}
                             
                               href=""
                               className="social-list-item bg-info text-white border-info"
                          
                                className="mdi mdi-twitter"/>
                              
                           </TwitterLogin>
                          </li>
                          <li className="list-inline-item">
                          <Link
                              to="#"
                              className="social-list-item bg-danger text-white border-danger"
                              onClick={e => {
                                e.preventDefault();
                                socialResponse("google");
                              }}
                            >
                              <i className="mdi mdi-google" />
                            </Link>
                          </li>
                        </ul>
                      </div> */}

                      {/* <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          비밀번호가 기억나지 않는다면?
                        </Link>
                      </div> */}
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                계정이 없으신가요?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    회원가입 하기{" "}
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

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
