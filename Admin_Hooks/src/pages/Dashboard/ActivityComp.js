import React from "react";

import { useTypewriter, Cursor } from "react-simple-typewriter";



import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import ApexRadial from "./ApexRadial";
import ApexRadial2 from "./ApexRadial2";
import ApexRadial3 from "./ApexRadial3";
import ReactApexChart from "react-apexcharts";
import { options } from "common/data/tasks";
import Gimage from "assets/images/g.png"
import Rimage from "assets/images/r.png"
import Oimage from "assets/images/o.png"
import Wimage from "assets/images/w.png"

import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from "reactstrap";
import { size } from "lodash";




const ActivityComp = () => {
  const [text] = useTypewriter({
    words: ['GROW 모델 ', 'Goal', 'Reality', 'Options','Will'],
    loop: 0,
    size: 50,
  })
  const [text2] = useTypewriter({
    words: ['목표 설정 및 문제 해결을 위한 코칭 모델 ', '구체적이고 측정가능하며 이룰 수 있는 목표를 찾도록 돕는다.', '스스로 자신의 수행력을 드러내고 그 증거까지 스스로 알게 한다', '스스로 미래에 다양한 방안에 대해 선택하도록 격려한다.','앞으로의 길, 의지 : 방안의 행동 계획 중 하나를 택하고 해오게한다.'],
    loop: 0,
    size: 50,
    deleteSpeed : 10
  })
  

  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>  
          <Row>
            <Col sm="1"></Col>
            <Col sm="8">
            <div>
              <img src={Gimage}/>
              <img src={Rimage}/>
              <img src={Oimage}/>
              <img src={Wimage}/>
            </div>
            </Col>
            <Col sm="3">
              <Row sm="10">
              <div className='App'>
                <h3>　</h3>
                <span style={{fontFamily: "BlackHanSans" , fontSize:40}}><p>{text}</p></span>
                <h3>　</h3>
                <span style={{fontFamily: "DoHyeon-Regular", fontSize:40}}><p>{text2}</p></span>
              </div>
              </Row>
              <Row sm="2">
              </Row>
            </Col>
          </Row>
          <Row>
            <Col sm='9'></Col>
            <Col sm='3'>
            <Link to="/pages-FAQS">
              <Button               
                block>
                GROW 모델에 대해서 알아보기
              </Button>
              </Link>
            </Col>

          </Row>

        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ActivityComp;
