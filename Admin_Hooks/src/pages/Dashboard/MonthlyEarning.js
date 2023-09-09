import React from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import ApexRadial from "./ApexRadial";
import ApexRadial2 from "./ApexRadial2";
import ApexRadial3 from "./ApexRadial3";
import ReactApexChart from "react-apexcharts";
import { options } from "common/data/tasks";

const MonthlyEarning = () => {
  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>  
          
          <Row >
          <Col sm="1"></Col>
            <Col sm="2">
            <CardTitle className="mb-4">모델 성능</CardTitle>
              <p className="text-muted">
                <span className="text-success me-2">
                  {" "}
                  0.4473 <i className="mdi mdi-arrow-up"></i>{" "}
                </span>{" "}
                Loss
              </p>
              <p className="text-muted">
                <span className="text-success me-2">
                  {" "}
                  0.9293 <i className="mdi mdi-arrow-up"></i>{" "}
                </span>{" "}
                F1 Score
              </p>
              <p className="text-muted">
                <span className="text-success me-2">
                  {" "}
                  0.9307 <i className="mdi mdi-arrow-up"></i>{" "}
                </span>{" "}
                F1 score
              </p>
            </Col>
            <Col sm="3">
              <div className="mt-4 mt-sm-0">
                <ApexRadial dataColors='["--bs-primary"]' seta='101' />
              </div>
            </Col>
            <Col sm="3">
              <div className="mt-4 mt-sm-0">
                <ApexRadial2  dataColors='["--bs-info"]' />
              </div>
            </Col>
            <Col sm="3">
              <div className="mt-4 mt-sm-0">
                <ApexRadial3 dataColors='["--bs-dark"]' />
              </div>
            </Col>

          </Row>
          {/* <p className="text-muted mb-0">
            추가 설명을 남기고 싶다면? or 제거
          </p> */}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MonthlyEarning;
