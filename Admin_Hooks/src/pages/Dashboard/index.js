import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";

import classNames from "classnames";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

// 명언 import
import quotes from "./quotes.js";

//import action
import { getChartsData as onGetChartsData } from "../../store/actions";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";

const Dashboard = props => {
  const [modal, setmodal] = useState(false);

  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData
  }));

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ];

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSubscribemodal(true);
  //   }, 2000);
  // }, []);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

  useEffect(() => {
    setPeriodData(chartsData);
  }, [chartsData]);

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
    dispatch(onGetChartsData(pType));
  };

  const dispatch = useDispatch();
  //useEffect(() => {
  //  dispatch(onGetChartsData("yearly"));
  //}, [dispatch]);

  // 명언 출력을 위한 부분
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    setRandomQuote(randomQuote);
  };

  //meta title
  document.title = "ChatGPT와 함께하는 리더 코칭훈련";

  return (
    <React.Fragment>
    <div className="page-content">
      <Container fluid>
        <Row>     
        <SocialSource/>
        </Row>

        <Row>
          <Col xl="12">
            <ActivityComp/>
          </Col>
        </Row>
        <Row>
        <Col xl="12">
          <div className="card-with-background">
              <CardBody>
                <h4 className="card-title mb-4">오늘의 명언</h4>
                <p className="text-center">{randomQuote}</p>
              </CardBody>
            </div>                
          </Col>
        </Row>

        <Row>
          <Col xl="12">
          {/*<WelcomeComp />*/}
            <MonthlyEarning />
          </Col>
        </Row>
        <Row>

          <Col xl="6">
            <TopCities />
          </Col>
          <Col xl="6">
            <LatestTranaction/>
          </Col>
        </Row>
      </Container>
    </div>


  </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
