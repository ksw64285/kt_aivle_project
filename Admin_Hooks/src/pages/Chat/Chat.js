import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { isEmpty, map } from "lodash";
import moment from "moment";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Spinner
} from "reactstrap";
import classnames from "classnames";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import avatar1 from "../../assets/images/aivle2.png";

import {
  addMessage as onAddMessage,
  getChats as onGetChats,
  getContacts as onGetContacts,
  getGroups as onGetGroups,
  getMessages as onGetMessages,
  getPersonalist as onGetPersonalist ,
  addGuide as onAddGuide,
} from "store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

const Chat = () => {

  //meta title
  document.title = "ChatGPT와 함께하는 리더 코칭훈련";

  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentURL = location.pathname + location.search;
  const params = {};
  for (let [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  const { chats, groups, contacts, messages, personalist, coachingmessage, guidemessage, chathistory } = useSelector(state => ({
    chats: state.chat.chats,
    groups: state.chat.groups,
    contacts: state.chat.contacts,
    messages: state.chat.messages,
    personalist: state.chat.personalist,
    coachingmessage: state.chat.coachingmessage,
    guidemessage: state.chat.guidemessage,
    chathistory: state.chat.chathistory,
  }));

  const reveredlist = [...personalist].reverse();

  const [messageBox, setMessageBox] = useState(null);
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(params.persona_id);
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: "You",
    isActive: true,
  });
  const [menu1, setMenu1] = useState(false);
  const [search_Menu, setsearch_Menu] = useState(false);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [other_Menu, setother_Menu] = useState(false);
  const [activeTab, setactiveTab] = useState("1");
  const [Chat_Box_Username, setChat_Box_Username] = useState("You");
  const [Chat_Box_UserAge, setChat_Box_UserAge] = useState("25");
  // eslint-disable-next-line no-unused-vars
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("");
  const [curMessage, setcurMessage] = useState("");
  const [loading, setLoading] = useState(false); // 스피너 상태

  useEffect(() => {
    // dispatch(onGetChats());
    // dispatch(onGetGroups());
    // dispatch(onGetContacts());
    dispatch(onGetMessages(currentRoomId));
    dispatch(onGetPersonalist());
  }, [onGetChats, onGetGroups, onGetContacts, onGetMessages, currentRoomId, onGetPersonalist]);

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages]);

  // const toggleNotification = () => {
  //   setnotification_Menu(!notification_Menu)
  // }

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  const toggleOther = () => {
    setother_Menu(!other_Menu);
  };

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  //Use For Chat Box
  const userChatOpen = ( roomId ) => {
    setCurrentRoomId(roomId);
    dispatch(onGetMessages(roomId));
  };

  //redux의 사용할 message변수 선언하고 상태변화 적용시키기
  const addMessageTRE = (personaId = 1) => {
    const message = curMessage;
    setcurMessage("");
    dispatch(onAddMessage(message));
  };

  const addMessage = (roomId, sender) => {
    setLoading(true); // 스피너 시작
    const message = {
      id: Math.floor(Math.random() * 100),
      roomId: roomId,
      sender: sender,
      message: curMessage,
      createdAt: new Date(),
    };
    setcurMessage("");
    dispatch(onAddMessage(message, params));
  };

  const addGuide = () => {
    setLoading(true); // 스피너 시작
    dispatch(onAddGuide(params));
    setTimeout(() => {
      setLoading(false); // 스피너 종료
    }, 3000);
  };

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  };

  const onKeyPress = e => {
    const { key, value } = e;
    if (key === "Enter") {
      setcurMessage(value);
      addMessage(currentRoomId, currentUser.name);
    }
  };

  //serach recent user
  const searchUsers = () => {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-user");
    filter = input.value.toUpperCase();
    ul = document.getElementById("recent-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };

  const [deleteMsg, setDeleteMsg] = useState("");
  const toggle_deleMsg = (ele) => {
    setDeleteMsg(!deleteMsg);
    ele.closest("li").remove();
  };

  const copyMsg = (ele) => {
    var copyText = ele.closest(".conversation-list").querySelector("p").innerHTML;
    navigator.clipboard.writeText(copyText);
  };

  //STT기능
  const startVoiceRecognition = () => {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setcurMessage(result);
    };
    recognition.start();
  };

  //TTS기능 - 메세지가 갱신될때 다시 불러와서 tts 자동재생 현재 tts 소리가 바뀌지 않고 이전 메세지가 재생되는 오류 발견
  const audioPlayerRef = useRef(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  // message가 변화 할때 마다 실행되는거 같음
  useEffect(() => {
    handleMessagesUpdate();
    return () => {
      // Clean up any resources or event listeners if necessary
      setIsFirstVisit(true);
    };
  }, [messages]);
  
  const playTTS = () => {
    audioPlayerRef.current.play();
  };
  
  const handleMessagesUpdate = async () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'ChatGPT') {
      setLoading(true); // 스피너 시작
      try {
        const response = await fetch('http://localhost:8000/media/tts.mp3');
        console.log('res')
        console.log(response)
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        // console.log('audio_url')
        // console.log(url)
        audioPlayerRef.current.src = url;
        // console.log('audioPlayerRef')
        // console.log(audioPlayerRef)
        // console.log('audioPlayerRef.current')
        // console.log(audioPlayerRef.current)
        audioPlayerRef.current.load();
  
        if (!isFirstVisit || activeTab === "1") {
          setTimeout(console.log('wait next voice'), 10);
          playTTS();
        }
  
        setTimeout(() => {
          setIsFirstVisit(false);
          setLoading(false); // 스피너 종료
        }, 500);
      
      } catch (error) {
        console.error('Failed to load and play new TTS file:', error);
        setLoading(false); // 스피너 종료
      }
    }
  };

  // 페르소나 설정이 안되있으면 페르소나 페이지로 이동
  // const navigate  = useNavigate();

  // useEffect(() => {
  //   const queryString = window.location.search;
  //   if (!queryString) {
  //     navigate('/Form-Advanced'); // 쿼리스트링이 없으면 "http://localhost:3000/Form-Advanced" 경로로 이동
  //   }
  // }, [navigate]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="chat-leftsidebar me-lg-4">
                  <div >
                    <div className="py-4 border-bottom">
                      <div className="d-flex">
                        <div className="align-self-center me-3">
                          <img
                            src={avatar1}
                            className="avatar-xs rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="font-size-15 mt-0 mb-1">
                            User Name
                          </h5>
                        </div>
                      </div>
                    </div>

                    <div className="chat-leftsidebar-nav">
                      <Nav pills justified>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggleTab("1");
                            }}
                          >
                            <i className="bx bx-chat font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Chat</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggleTab("2");
                            }}
                          >
                            <i className="bx bx-group font-size-20 d-sm-none" />
                            <span className="d-none d-sm-block">Guide</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab} className="py-4">
                        <TabPane tabId="1">
                          <div>
                            <h5 className="font-size-14 mb-3">Rollplaying List</h5>
                            <ul className="list-unstyled chat-list" id="recent-list">
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {map(reveredlist, persona => (
                                  <li
                                    key={persona.id}
                                    className={
                                      currentRoomId === persona.id
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <Link 
                                      to={currentURL}
                                      onClick={() => {
                                        toggleTab("3");
                                        /*
                                        userChatOpen(
                                          persona.id
                                        );
                                        */
                                      }}
                                    >
                                      <div className="d-flex">
                                        <div className="align-self-center me-3">

                                        </div>
                                        {persona.isImg ?
                                          <div className="avatar-xs align-self-center me-3">
                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                              {/* {chat.profile} */}
                                            </span>
                                          </div>
                                          :
                                          <div className="align-self-center me-3">
                                            <img
                                              src={avatar1}
                                              className="rounded-circle avatar-xs"
                                              alt=""
                                            />
                                          </div>
                                        }

                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-20 mb-1">
                                            가상페르소나
                                            {persona.id}
                                          </h5>
                                          <p className="text-truncate font-size-12 mb-0">
                                            직위 : {persona.grade}
                                          </p>
                                          <p className="text-truncate font-size-12 mb-0">
                                            직업 : {persona.job}
                                          </p>
                                          <p className="text-truncate font-size-12 mb-0">
                                            성별 : {persona.sex}
                                          </p>
                                          <p className="text-truncate font-size-12 mb-0">
                                            나이 : {persona.age}
                                          </p>
                                          <p className="text-truncate font-size-12 mb-0">
                                            상황 : {persona.situation}
                                          </p>
                                        </div>
                                        <div className="font-size-11">
                                          {/* {chat.time} */}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar>
                            </ul>
                            <Link to="/Form-Advanced">
                            <Button 
                              color="light"
                              className="btn btn-info waves-effect waves-light"
                            >
                            페르소나 추가하기
                            </Button>
                            </Link>
                          </div>
                        </TabPane>

                        <TabPane tabId="2">
                          <ul className="list-unstyled chat-list">
                            <PerfectScrollbar style={{ height: "410px" }}>
                              {groups &&
                                groups.map(group => (
                                  <li key={"test" + group.image}>
                                    <Link
                                      to="#"/*
                                      onClick={() => {
                                        userChatOpen(
                                          group.id,
                                          group.name,
                                          group.status,
                                          Math.floor(Math.random() * 100)
                                        );
                                      }}*/
                                    >
                                      <div className="d-flex align-items-center">
                                        <div className="avatar-xs me-3">
                                          <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                            {group.image}
                                          </span>
                                        </div>

                                        <div className="flex-grow-1">
                                          <h5 className="font-size-14 mb-0">
                                            {group.name}
                                          </h5>
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                            </PerfectScrollbar>
                          </ul>
                        </TabPane>
                        <TabPane tabId="3">
                          <div>
                            <h5 className="font-size-14 mb-3">Rollplaying List</h5>
                            <ul className="list-unstyled chat-list" id="recent-list">
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {map(reveredlist, persona => (
                                  <li
                                    key={persona.id}
                                    className={
                                      currentRoomId === persona.id
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <Link 
                                      to={currentURL}
                                      onClick={() => {
                                        toggleTab("3");
                                        userChatOpen(
                                          persona.id
                                        );
                                      }}
                                    >
                                      <div className="d-flex">
                                        <div className="align-self-center me-3">

                                        </div>
                                        {persona.isImg ?
                                          <div className="avatar-xs align-self-center me-3">
                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                              {/* {chat.profile} */}
                                            </span>
                                          </div>
                                          :
                                          <div className="align-self-center me-3">
                                            <img
                                              // src={chat.image}
                                              className="rounded-circle avatar-xs"
                                              alt=""
                                            />
                                          </div>
                                        }

                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-20 mb-1">
                                            가상페르소나
                                            {persona.id}
                                          </h5>
                                          <p className="text-truncate font-size-12 mb-0">
                                            직위 : {persona.grade}
                                          </p>
                                          <p className="text-truncate font-size-12 mb-0">
                                            직업 : {persona.job}
                                          </p>
                                          <p className="text-truncate font-size-12 mb-0">
                                            성별 : {persona.sex}
                                          </p>
                                          <p className="text-truncate font-size-12 mb-0">
                                            나이 : {persona.age}
                                          </p>
                                          <p className="text-truncate font-size-12 mb-0">
                                            상황 : {persona.situation}
                                          </p>
                                        </div>
                                        <div className="font-size-11">
                                          {/* {chat.time} */}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar>
                            </ul>
                            <Link to="/Form-Advanced">
                            <Button 
                              color="light"
                              className="btn btn-info waves-effect waves-light"
                            >
                            페르소나 추가하기
                            </Button>
                            </Link>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </div>
                <div className="w-100 user-chat">
                  <Card>
                    <div className="p-4 border-bottom ">
                      <Row>
                        <Col md="4" xs="9">
                          <h5 className="font-size-15 mb-1">
                            {Chat_Box_Username}
                          </h5>
                        </Col>
                        <Col md="8" xs="3">
                          <ul className="list-inline user-chat-nav text-end mb-0">

                            <li className="list-inline-item">
                              <Dropdown
                                isOpen={other_Menu}
                                toggle={toggleOther}                                
                              >
                                <DropdownToggle className="btn nav-btn" tag="a">
                                  <i className="bx bx-dots-horizontal-rounded" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem href="#">
                                    Save
                                  </DropdownItem>
                                  <DropdownItem href="#">
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>

                    <div>
                      <div className="chat-conversation p-3">
                        <ul className="list-unstyled">
                          <PerfectScrollbar
                            style={{ height: "470px" }}
                            containerRef={ref => setMessageBox(ref)}
                          >
                            <li>
                              <div className="chat-day-title">
                                <span className="title">Today</span>
                              </div>
                            </li>
                            { (activeTab === "1") && messages &&
                              map(messages, message => (
                                <li
                                  key={"test_k" + message.id}
                                  className={
                                    message.sender === currentUser.name
                                      ? "right"
                                      : ""
                                  }
                                >
                                  <div className="conversation-list">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        href="#"
                                        tag="a" className="dropdown-toggle"
                                      >
                                        <i className="bx bx-dots-vertical-rounded" />
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem onClick={(e) => copyMsg(e.target)} href="#">
                                          Copy
                                        </DropdownItem>
                                        <DropdownItem href="#">
                                          Save
                                        </DropdownItem>
                                        <DropdownItem onClick={(e) => toggle_deleMsg(e.target)} href="#">
                                          Delete
                                        </DropdownItem>
                                        
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        {message.sender}
                                      </div>
                                      <p>{message.message}</p>
                                    </div>
                                      <div>
                                        {/*
                                          message.sender === currentUser.name
                                            ? <p>{coachingmessage}</p>
                                            : null
                                         */}
                                      </div>
                                  </div>
                                </li>
                              ))}

                            {(activeTab === "2") && guidemessage &&
                              map(guidemessage, message => (
                                <li
                                  key={"test_k" + message.id}
                                  className={
                                    message.sender === currentUser.name
                                      ? "right"
                                      : ""
                                  }
                                >
                                  <div className="conversation-list">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        href="#"
                                        tag="a" className="dropdown-toggle"
                                      >
                                        <i className="bx bx-dots-vertical-rounded" />
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem onClick={(e) => copyMsg(e.target)} href="#">
                                          Copy
                                        </DropdownItem>
                                        {/* <DropdownItem href="#">
                                          Save
                                        </DropdownItem>
                                        <DropdownItem onClick={(e) => toggle_deleMsg(e.target)} href="#">
                                          Delete
                                        </DropdownItem> */}
                                        
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        {message.sender}
                                      </div>
                                      <p>{message.message}</p>
                                    </div>
                                  </div>
                                </li>
                              ))}

                            {(activeTab === "3") && chathistory &&
                              chathistory
                              .filter(message => {
                                return message.persona_id === currentRoomId;
                              })
                              .map( message => (
                                  <li
                                    key={"test_k" + message.id}
                                    className={
                                      message.sender === currentUser.name
                                        ? "right"
                                        : ""
                                    }
                                  >
                                    <div className="conversation-list">
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          href="#"
                                          tag="a" className="dropdown-toggle"
                                        >
                                          <i className="bx bx-dots-vertical-rounded" />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem onClick={(e) => copyMsg(e.target)} href="#">
                                            Copy
                                          </DropdownItem>
                                          {/* <DropdownItem href="#">
                                            Save
                                          </DropdownItem>
                                          <DropdownItem onClick={(e) => toggle_deleMsg(e.target)} href="#">
                                            Delete
                                          </DropdownItem> */}
                                          
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                      <div className="ctext-wrap">
                                        <div className="conversation-name">
                                          {message.sender}
                                        </div>
                                        <p>{message.message}</p>
                                      </div>
                                    </div>
                                  </li>
                                
                              ))}
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
                        <Row>
                          <Col>
                           {(activeTab === "1")&&(
                            <div className="position-relative">
                            <input
                              type="text"
                              value={curMessage}
                              onKeyPress={onKeyPress}
                              onChange={e => setcurMessage(e.target.value)}
                              className="form-control chat-input"
                              placeholder="Enter Message..."
                            />
                            <div className="chat-input-links">
                              <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                <Link to={currentURL} onClick={startVoiceRecognition}>
                                    <i
                                      className="bx bx-microphone"
                                      id="Filetooltip"
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="Filetooltip"
                                    >
                                      음성으로 말하기
                                    </UncontrolledTooltip>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                           )}
                            
                          </Col>
                          <Col className="col-auto">
                            {loading ? (
                              <div className="text-center">
                              <Spinner className="ms-2" color="info" />
                              </div>
                            ):(
                              <>
                              {(activeTab === "1") && (
                                <Button
                                type="button"
                                color="primary"
                                onClick={() =>
                                  addMessage(currentRoomId, currentUser.name)
                                }
                                className="btn btn-primary btn-rounded chat-send w-md "
                              >
                                <span className="d-none d-sm-inline-block me-2">
                                  Send
                                </span>{" "}
                                <i className="mdi mdi-send" />
                              </Button>
                              )}
                              {(activeTab === "2") && (
                                <Button
                                type="button"
                                color="primary"
                                onClick={addGuide}
                                className="btn btn-primary btn-rounded chat-send w-md "
                              >
                                <span className="d-none d-sm-inline-block me-2">
                                  Generate
                                </span>{" "}
                                <i className="mdi mdi-send" />
                              </Button>
                              )}
                            </>
                            )}
                          </Col>
                          {(activeTab === "1") && <p style={{fontSize: 20,  color: "#E01010" , marginLeft:'1%', marginTop:'1%'}}>{coachingmessage}</p>}
                        </Row>
                      </div>
                      <div>  <audio ref={audioPlayerRef} /> </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        
      </div>
    </React.Fragment>
  );
};

Chat.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetContacts: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
};

export default Chat;
