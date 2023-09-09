import React, { useState } from "react";
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row } from "reactstrap";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { SketchPicker } from "react-color";
import ColorPicker from "@vtaits/react-color-picker";
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import FormImage from "../../assets/images/smile.png"

import axios from "axios";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from "react-router-dom";
import accessToken from "helpers/jwt-token-access/accessToken";
import useAxios from '../../routes/useAxios'
let api = useAxios()

import { useSelector, useDispatch } from "react-redux";
import { initMessages } from '../../store/actions';

const animatedComponents = makeAnimated();

const Offsymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2
      }}
    >
      {" "}
      No
    </div>
  );
};

const palette = {
  skyblue1: '#EBF7FF'
}

const OnSymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2
      }}
    >
      {" "}
      Yes
    </div>
  );
};

const SquareSwitch1 = () => {
  return (
    <div
      style={{
        borderRadius: "0px",
        borderRadius: "4px",
        marginRight: "7px"
      }}
    >
      {" "}
      No
    </div>
  );
};

const SquareSwitch2 = () => {
  return (
    <div
      style={{
        borderRadius: "4px",
        marginRight: "7px"
      }}
    >
      {" "}
      Yes
    </div>
  );
};

const optionGroup = [
  {
    label: "sex",
    options: [
      { label: "남자", value: "mail" },
      { label: "여자", value: "femail" },
    ]
  },
];

const optionGroup1 = [
  {
    label: "직군",
    options: [
      { label: "B2C", value: "B2C" },
      { label: "네트워크", value: "네트워크" },
      { label: "B2B", value: "B2B" },
      { label: "R&D", value: "R&D" },
      { label: "사업", value: "사업" },
      { label: "지원", value: "지원" },
    ]
  },
];

const optionGroup2 = [
  {
    label: "직급",
    options: [
      { label: "사원", value: "사원" },
      { label: "대리", value: "대리" },
      { label: "과장", value: "과장" },
      { label: "차장", value: "차장" },
      { label: "부장", value: "부장" },
    ]
  },
];

const FormAdvanced = () => {

  //meta title
  document.title = "ChatGPT와 함께하는 리더 코칭훈련"

  const navigate = useNavigate();
  const [sq1, setsq1] = useState(true);
  const [sq2, setsq2] = useState(true);
  const [sq3, setsq3] = useState(true);
  const [color, setcolor] = useState("red");
  const [colorRgb, setcolorRgb] = useState("red");
  const [colorCust, setcolorCust] = useState("red");
  const [colorHor, setcolorHor] = useState("#fffff");
  const [colorRGBA, setcolorRGBA] = useState("rgba(0, 194, 255, 0.78)");
  const [display_RGBA, setdisplay_RGBA] = useState(false);

  //** Datepicker Method */
  const [date, setDate] = useState("");
  const [fromate_date, setFromatDate] = useState("");
  const [current_month, setMonth] = useState("");
  const [current_month_short, setMonthShort] = useState("");
  const [current_day, setDay] = useState("");
  const [current_day_short, setDayShort] = useState("");
  const [current_day_min, setDayMin] = useState("");
  const [pick_date, setPickDate] = useState("");

  const [disbadge, setdisbadge] = useState(true);
  const [disthresh, setdisthresh] = useState(false);
  const [placementbadge, setplacementbadge] = useState(false);
  const [textcount, settextcount] = useState(0);
  const [optioncount, setoptioncount] = useState(0);
  const [placementcount, setplacementcount] = useState(0);
  const [threshhold, setthreshhold] = useState(0);
  const [threshholdcount, setthreshholdcount] = useState(0);
  const [disDefault, setdisDefault] = useState(0);
  const [textareabadge, settextareabadge] = useState(0);
  const [simple_color, setsimple_color] = useState(0);
  const [simple_color1, setsimple_color1] = useState(0);
  const [simple_color2, setsimple_color2] = useState(0);

  const [switch1, setswitch1] = useState(true);
  const [switch2, setswitch2] = useState(true);
  const [switch3, setswitch3] = useState(true);
  const [switch4, setswitch4] = useState(true);
  const [switch5, setswitch5] = useState(true);
  const [switch6, setswitch6] = useState(true);
  const [switch7, setswitch7] = useState(true);
  const [switch8, setswitch8] = useState(true);
  const [switch9, setswitch9] = useState(true);

  const [data_attr, setdata_attr] = useState(30);
  const [postfix, setpostfix] = useState(20);
  const [withpostfix, setwithpostfix] = useState(20);
  const [empty_val, setempty_val] = useState(0);
  const [not_attr, setnot_attr] = useState(15);
  const [explicit_val, setexplicit_val] = useState(33);

  const max_len = 25;

  const [selectedGroup, setselectedGroup] = useState(null);
  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedMulti1, setselectedMulti1] = useState(null);
  const [selectedMulti2, setselectedMulti2] = useState(null);
  const [selectedMulti3, setselectedMulti3] = useState(null);

  const onDrag = c1 => {
    setcolor(c1);
  };
  const onDragRgb = c1 => {
    setcolorRgb(c1);
  };
  const onDragCust = c1 => {
    setcolorCust(c1);
  };
  const handleHor = color => {
    setcolorHor(color.hex);
  };

  function handleRGBA() {
    setdisplay_RGBA(!display_RGBA);
  }

  const onSwatchHover_RGBA = color => {
    const format =
      "rgba(" +
      color.rgb.r +
      "," +
      color.rgb.g +
      "," +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    setcolorRGBA(format);
  };

  function threshholdchange(event) {
    const count = event.target.value.length;
    const remain_val = max_len - 20;

    if (remain_val <= count) {
      setdisthresh(true);
    } else {
      setdisthresh(false);
    }
    setthreshholdcount(event.target.value.length);
  }

  function threshholdDefault(event) {
    const count = event.target.value.length;
    if (count > 0) {
      setdisDefault(true);
    } else {
      setdisDefault(false);
    }
    setthreshhold(event.target.value.length);
  }

  function optionchange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      setdisbadge(true);
    } else {
      setdisbadge(false);
    }
    setoptioncount(event.target.value.length);
  }

  function placementchange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      setplacementbadge(true);
    } else {
      setplacementbadge(false);
    }
    setplacementcount(event.target.value.length);
  }

  function textareachange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    settextcount(event.target.value.length);
  }

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup);
  }

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

  function handleMulti1(selectedMulti1) {
    setselectedMulti1(selectedMulti1);
  }

  function handleMulti2(selectedMulti2) {
    setselectedMulti2(selectedMulti2);
  }

  function handleMulti3(selectedMulti3) {
    setselectedMulti3(selectedMulti3);
  }

  // const move_chat = async() =>{
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/chat"></Route>
  //       </Routes>
  //     </BrowserRouter>
  //   )
  // }

  const dispatch = useDispatch();

  const chatlist_init = async() =>{
    let name = document.getElementById('name').value;
    let sex = document.getElementById('sex').innerText;
    let description = document.getElementById('description').innerText;
    let age = document.getElementById('age').value;
    let job = document.getElementById('job').innerText;
    let situation = document.getElementById('situation').value;

    const obj = JSON.parse(localStorage.getItem("authUser"));
    //let authToken =  obj.accessToken;
    console.log(typeof(age))
    console.log(typeof(sex))
    console.log(typeof(job))
    console.log(typeof(description))

    console.log(typeof(situation))
    console.log(typeof(name))
    try {
      const response = await api.post('/chat/persona', {
          "age": age, 
          'sex':sex, 
          'job':job,
          'grade':description,
          'situation':situation,
          'subject':name
          },);
          console.log(response);
          dispatch(initMessages());
          navigate(response.data.redirect_url);
        // request, context
        
    } catch (error) {
      console.error(error);
        //console.error(error.response.data);     // NOTE - use "error.response.data` (not "error")
    }
  }

  /*
    get date Method
  **/
  const getDateMethod = () => {
    setDate(new Date());
  };
  const getDateFormateMethod = () => {
    let today = new Date();
    const dd = today.getDate().toString();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const fromate_date = (today = dd + "/" + mm + "/" + yyyy);
    setFromatDate(fromate_date);
  };
  const getMonthMethod = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const d = new Date();
    const current_month = months[d.getMonth()];
    setMonth(current_month);
  };

  const getMonthShortMethod = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const d = new Date();
    const current_month_short = months[d.getMonth()];
    setMonthShort(current_month_short);
  };

  const getDayMethod = () => {
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const d = new Date();
    const current_day = day[d.getDay()];
    setDay(current_day);
  };

  const getDayShort = () => {
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const d = new Date();
    const current_day_short = day[d.getDay()];
    setDayShort(current_day_short);
  };

  const getDayMin = () => {
    const day = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const d = new Date();
    const current_day_min = day[d.getDay()];
    setDayMin(current_day_min);
  };

  const picks = () => {
    setPickDate(new Date());
  };

  const resentValue = () => {
    setPickDate(" ");
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container style={{marginTop:10,borderRadius:50}} fluid={true}>
          <Row >
          <Col lg="5">
            <img style={{marginTop:"20%" , marginLeft:"30%"}}src={FormImage}></img>
            <h2 style={{marginLeft:"31%"}}>상대의 페르소나를 </h2>
            <h2 style={{marginLeft:"36%"}}>입력해주세요</h2>
          </Col>
            <Col lg="5">
              <Card style={{marginTop:'5%', marginLeft:"2%", width:"100%" , height:"100%" , borderRadius:50}} >
                <CardBody >
                  <form>
                    <Row>
                      <Col lg="6">
                      <div className="mb-3">
                          <Label style={{marginTop:'6%',fontSize:20,fontFamily:"NanumGothic-ExtraBold"}}>성별</Label>
                          <Select
                            value={selectedGroup}
                            onChange={() => {
                              handleSelectGroup();
                            }}
                            options={optionGroup}
                            className="select2-selection"
                            id = "sex"
                            placeholder=""
                          />
                          </div>
                        {/*<div className="btn-group" role="group">
                          <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" defaultChecked />
                          <Label 
                          style={{backgroundColor:"skyblue",}}
                          className="btn btn-outline-secondary" 
                          htmlFor="btnradio4" 
                          onChange={() => {
                            setselectedGroup("남자")
                            }}>남자
                          </Label>

                          <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" />
                          <Label style={{backgroundColor:"hotpink" }} className="btn btn-outline-secondary" htmlFor="btnradio5"
                          onChange={() => {
                            setselectedGroup("여자")
                            }}>여자</Label>
                          </div>*/}
                          

                        <div>
                          <Label style={{marginTop:'5%',fontSize:20,fontFamily:"NanumGothic-ExtraBold"}}>직군</Label>
                          <Select
                            value={selectedGroup}
                            onChange={() => {
                              handleSelectGroup();
                            }}
                            options={optionGroup1}
                            className="select2-selection"
                            id = "job"
                            placeholder=""
                          // isDisabled={true}
                          />
                        </div>
                      <Label style={{marginTop:'5%',fontSize:20,fontFamily:"NanumGothic-ExtraBold"}}>주제</Label>
                      <div className="col-md-12">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue=""
                        id = "name"
                        style={{width:'100%'}}
                      />
                    </div>

                        
                    </Col>
                    <Col lg="6">
                    <div className="mb-3">
                      <Label style={{marginTop:'6%',fontSize:20,fontFamily:"NanumGothic-ExtraBold"}}>나이</Label>
                      <InputGroup>
                        <div
                          className="input-group-append"
                          onClick={() => {
                            setdata_attr(data_attr - 1);
                          }}
                        >
                          <Button type="button" color="primary">
                            <i className="mdi mdi-minus" />
                          </Button>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          value={data_attr}
                          placeholder="number"
                          readOnly
                          id = "age"
                        />
                        <div
                          className="input-group-append"
                          onClick={() => {
                            setdata_attr(data_attr + 1);
                          }}
                        >
                          <Button type="button" color="primary">
                            <i className="mdi mdi-plus" />
                          </Button>
                        </div>

                      </InputGroup>
                      <div>
                          <Label style={{marginTop:'10%',fontSize:20,fontFamily:"NanumGothic-ExtraBold",width:"100%"}}>직급</Label>
                          <Select
                            value={selectedGroup}
                            onChange={() => {
                              handleSelectGroup();
                            }}
                            options={optionGroup2}
                            className="select2-selection"
                            id = "description"
                            placeholder=""
                          // isDisabled={true}
                          />
                        </div>
                    </div>
                    <Label style={{fontSize:20,fontFamily:"NanumGothic-ExtraBold"}}>상황</Label>
                      <div className="col-md-12">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue=""
                        id = "situation"
                        style={{width:'100%'}}
                      />
                    </div>

                    </Col>

                    <Button style={{marginLeft:"20%",marginTop:"30%",width:'60%'}}
                      className="btn btn-Link waves-effect"
                      onClick={() => {
                      chatlist_init()
                      }}
                    >
                    페르소나 등록하기
                    </Button>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="8"></Col>
            <Col sm="4">

            </Col>

          </Row>
        </Container>

      </div>
    </React.Fragment>
  );
};

export default FormAdvanced;