import React, { useState, useEffect } from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/profile-img.png"
import quotes from "./quotes";

import "./style.scss";

const WelcomeComp = () => {
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    setRandomQuote(randomQuote);
  };

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              {/* <img src={profileImg} alt="" className="img-fluid" /> */}
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="8">
              <div className="pt-4">
                <Row>
                  <Col xs="8">
                    <h5 className="font-size-18">팀 구성</h5>
                    <p className="text-muted mb-0">
                      <span className="fe-bg">AI 개발 : 2명</span>
                    </p>
                    <p className="text-muted mb-0">
                    <span className="be-bg">백엔드 개발 : 3명</span>
                    </p>
                    <p className="text-muted mb-0">
                      <span className="ai-bg" >프론트엔드 개발 : 2명</span>
                    </p>
                  </Col>
                  <Col xs="2"></Col>
                  <Col xs="6">
                    <h3></h3>
                    <h5 className="font-size-15">개발기간</h5>
                    <p className="text-muted mb-0">2023.06 ~ 2023.07</p>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Link
                    to=""
                    className="btn btn-primary  btn-sm"
                  >
                    팀 소개 <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
