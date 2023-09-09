import React from "react"
import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap"
import { Link } from "react-router-dom"

import chatgpt from "../../assets/images/product/chatgpt.jpg"
import ApexRadial from "./ApexRadial";
import chatgpticon from "./chaticon1.png"
const SocialSource = () => {
  
  

  return (
    <React.Fragment>
      {" "}
      <style>
      white-space: nowrap
      </style>
      <Card>
        <CardBody>  
          <Row className='chat-with-background'>
            <Row>
              <Col sm='1'></Col>
              <Col sm='6'>
              <span style={{fontFamily: "NanumGothic-ExtraBold"}}>
                <p></p>
                <p style={{fontSize: 40,color: "#6799FF" , marginLeft:'20%'}}>ChatGPT,</p>
                <p style={{fontSize: 40,color: "#00D8FF" , marginLeft:'20%'}}>GROW 코칭 모델</p>
                <h5 style={{marginLeft:'20%'}}>과 함께하는 </h5>
                <p style={{fontSize: 60,color: "#6799FF" , marginLeft:'20%'}}>리더 코칭 훈련</p>
                
              </span>
              </Col>
              <Col sm='4'>
              <p></p>
              <img src={chatgpticon} style={{width:'80%',height:'90%'}}/>
              </Col>
            </Row>
            <Row>
          <Col sm='2'></Col>
          <Col sm='4'>
          <Link to="/Form-Advanced">
          <Button style={{width: '100%'}}>이동하기</Button>
          </Link>
          </Col>

          <p></p>
          </Row>
          </Row>


        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default SocialSource
