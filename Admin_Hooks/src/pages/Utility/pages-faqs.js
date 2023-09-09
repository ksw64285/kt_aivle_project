import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const PagesFaqs = () => {

  //meta title
  document.title = "GROW 모델 소개";
  
  const [activeTab, setactiveTab] = useState("1");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}

          <div className="checkout-tabs">
            <Row>
              <Col lg="2">
                <Nav className="flex-column" pills>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        setactiveTab("1");
                      }}
                    >
                      <i className="bx bx-question-mark d-block check-nav-icon mt-4 mb-2" />
                      <p style={{fontSize:20}} className="font-weight-bold mb-4">GROW 모델</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        setactiveTab("2");
                      }}
                    >
                      <i className="mdi mdi-alpha-g-circle-outline d-block check-nav-icon mt-4 mb-2" />
                      <p style={{fontSize:20}} className="font-weight-bold mb-4">Goal</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        setactiveTab("3");
                      }}
                    >
                      <i className="mdi mdi-alpha-r-circle-outline d-block check-nav-icon mt-4 mb-2" />
                      <p style={{fontSize:20}} className="font-weight-bold mb-4">Reality</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "4" })}
                      onClick={() => {
                        setactiveTab("4");
                      }}
                    >
                      <i className="mdi mdi-alpha-o-circle-outline d-block check-nav-icon mt-4 mb-2" />
                      <p style={{fontSize:20}} className="font-weight-bold mb-4">Options</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "5" })}
                      onClick={() => {
                        setactiveTab("5");
                      }}
                    >
                      <i className="mdi mdi-alpha-w-circle-outline d-block check-nav-icon mt-4 mb-2" />
                      <p style={{fontSize:20}} className="font-weight-bold mb-4">Will</p>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
              <Col lg="10">
                <Card>
                  <CardBody>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <CardTitle style={{fontSize:35, textAlign:"center"}} className="mb-5">
                          GROW 모델
                        </CardTitle>
                            <br></br>
                              <h5 className="font-size-30">GROW 코칭 모델은 코칭과 목표 설정 대화에서 널리 사용되는 구조화된 코칭 모델입니다.</h5>
                              <h5 className="font-size-30">개인이나 팀이 목표를 명확히 하고 현재 상황을 이해하며 가능한 옵션을 탐색하고 전진하기 위한 계획을 수립하는 데 도움을 줍니다.</h5>
                            <br></br>
                            <br></br>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <br></br>
                            <br></br>
                          <ul>
                            <li><h5 className="font-size-30">Goal : 코칭은 목표를 설정하는 것에서 시작됩니다. 성과 목표, 개발 목표, 해결해야 할 문제, 결정등은 코칭 세션의 목표가 될 수 있습니다.</h5></li>
                            <br></br>
                            <li><h5 className="font-size-30">Reality : 현재 상황 및 상황의 규모를 인식하는 데 도움이 됩니다. 이 단계에서는 피코치자가 질문에 대해 생각하고 답변을 반영하도록 해야합니다.</h5></li>
                            <br></br>
                            <li><h5 className="font-size-30">Option : 피코치자가 목표를 달성하기 위해 무엇을 할 수 있는지 생각할 수 있게 합니다.</h5></li>
                            <br></br>
                            <li><h5 className="font-size-30">Will : 코치는 헌신을 확인하고 피코치자가 다음 단계에 대한 명확한 실행 계획을 수립하도록 돕습니다.</h5></li>
                          </ul>
                        <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>

                      </TabPane>
                      <TabPane tabId="2" >
                        <CardTitle style={{fontSize:35, textAlign:"center"}} className="mb-5">
                            Goal
                        </CardTitle>
                        <br></br>
                        <h5 className="font-size-30">코칭은 목표를 설정하는 것에서 시작됩니다. 성과 목표, 개발 목표, 해결해야 할 문제, 결정등은 코칭 세션의 목표가 될 수 있습니다.</h5>
                        <br></br>
                        <br></br>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <br></br>
                        <br></br>
                        

                        <div className="faq-box d-flex mb-4">
                        </div>
                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              당신이 정말로 원하는 것은 무엇입니까?
                            </h5>
                          </div>
                        </div>
                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              당신은 무엇을 성취하고 싶습니까?
                            </h5>
                          </div>
                        </div>
                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">이 목표 달성을 희망하는 이유는 무엇입니까?</h5>
                          </div>
                        </div>
                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              어떤 결과를 얻으려고 합니까?
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              어떤 결과가 이상적일까요?
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              이 목표 달성을 희망하는 이유는 무엇입니까?
                            </h5>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          </div>

                        </div>
                        
                      </TabPane>
                      <TabPane tabId="3">
                        <CardTitle style={{fontSize:35, textAlign:"center"}} className="mb-5">
                            Reality
                        </CardTitle>
                        <br></br>
                        <h5 className="font-size-30">현재 상황 및 상황의 규모를 인식하는 데 도움이 됩니다. 이 단계에서는 피코치자가 질문에 대해 생각하고 답변을 반영하도록 해야합니다.</h5>
                        <br></br>
                        <br></br>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <br></br>
                        <br></br>

                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              이미 목표를 향한 발걸음을 내디뎠습니까?
                            </h5>
                          </div>
                        </div>
                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              당신이 한 일을 어떻게 설명하시겠습니까?
                            </h5>
                          </div>
                        </div>

                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">지금까지 성공에 기여한 것은 무엇입니까?</h5>
                          </div>
                        </div>
                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              당신에게 요구되는 것은 무엇입니까?
                            </h5>
                          </div>
                        </div>

                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              과연 무슨 일이 있었던 것 같습니까?
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              당신을 멈추게 하는 것이 무엇이라고 생각합니까?
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              1에서 10까지의 척도로, 당신은 어디에 있습니까?
                            </h5>
                            <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          </div>
                        </div>
                      </TabPane>
                      <TabPane tabId="4">
                        <CardTitle style={{fontSize:35, textAlign:"center"}} className="mb-5">
                            Option
                        </CardTitle>
                        <br></br>
                        <h5 className="font-size-30">피코치자가 목표를 달성하기 위해 무엇을 할 수 있는지 생각할 수 있게 합니다.</h5>
                        <br></br>
                        <br></br>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <br></br>
                        <br></br>

                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              다음에 해야 할 일은 무엇이라고 생각합니까?
                            </h5>
                          </div>
                        </div>
                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              첫 번째 단계는 무엇입니까?
                            </h5>
                          </div>
                        </div>

                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">다른 무엇을 할 수 있습니까?</h5>
                          </div>
                        </div>
                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              아무것도 하지 않았다면 어떻게 되었을까요?
                            </h5>
                          </div>
                        </div>

                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              당신에게 가장 어려운 부분은 무엇입니까?
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              당신은 무엇을 다르게 할 수 있습니까?
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              다른 무엇을 할 수 있나요?
                            </h5>
                            <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          </div>
                        </div>
                      </TabPane>
                      <TabPane tabId="5">
                        <CardTitle style={{fontSize:35, textAlign:"center"}} className="mb-5">
                            Will
                        </CardTitle>
                        <br></br>
                        <h5 className="font-size-30">코치는 헌신을 확인하고 피코치자가 다음 단계에 대한 명확한 실행 계획을 수립하도록 돕습니다.</h5>
                        <br></br>
                        <br></br>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <br></br>
                        <br></br>

                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              어떻게 해야 할까요?
                            </h5>
                          </div>
                        </div>
                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              지금 당장 해야 할 일은 무엇이라고 생각합니까?
                            </h5>
                          </div>
                        </div>

                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">성공을 가로막는 장애물은 무엇입니까?</h5>
                          </div>
                        </div>
                        <div className="faq-box d-flex mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              또 할 수 있는 일이 있나요?
                            </h5>
                          </div>
                        </div>

                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              이번 주에 의미가 있을 수 있는 세 가지 조치는 무엇입니까?
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              이를 달성하기 위해 나 또는 다른 사람들에게 필요한 것은 무엇입니까?
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex faq-box mb-4">
                          <div className="flex-shrink-0 me-3 faq-icon">
                            <i className="bx bx-help-circle font-size-20 text-success" />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-30">
                              성공했는지 어떻게 알 수 있습니까?
                            </h5>
                            <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          <h1>　</h1>
                          </div>
                        </div>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PagesFaqs;
