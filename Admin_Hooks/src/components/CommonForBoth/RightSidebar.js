import React from "react";
import PropTypes from "prop-types";
import { Row, Col, FormGroup } from "reactstrap";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutMode,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarThemeImage,
  changeSidebarType,
  changePreloader,
  changeTopbarTheme,
  showRightSidebarAction,
} from "../../store/actions";

//SimpleBar
import SimpleBar from "simplebar-react";

import { Link } from "react-router-dom";

import "../../components/CommonForBoth/rightbar.scss";

//Import images
import bgimg1 from "../../assets/images/sidebar/img1.jpg";
import bgimg2 from "../../assets/images/sidebar/img2.jpg";
import bgimg3 from "../../assets/images/sidebar/img3.jpg";
import bgimg4 from "../../assets/images/sidebar/img5.png";
import bgimg5 from "../../assets/images/sidebar/img5.png";
import layout1 from "../../assets/images/layouts/layout-1.jpg";
import layout2 from "../../assets/images/layouts/layout-2.jpg";
import layout3 from "../../assets/images/layouts/layout-3.jpg";

//constants
import {
  layoutTypes,
  layoutModeTypes,
  layoutWidthTypes,
  topBarThemeTypes,
  leftBarThemeImageTypes,
  leftSidebarTypes,
  leftSideBarThemeTypes,
} from "../../constants/layout";

const RightSidebar = props => {
  return (
    <React.Fragment>
     <div className="right-bar" id="right-bar">
      <SimpleBar style={{ height: "900px" }}>
        <div data-simplebar className="h-100">
          <div className="rightbar-title px-3 py-4">
            <Link
              to="#"
              onClick={e => {
                  e.preventDefault()
                  props.showRightSidebarAction(false)
                }}
              className="right-bar-toggle float-end"
            >
              <i className="mdi mdi-close noti-icon" />
            </Link>
            <h5 className="m-0">세팅</h5>
          </div>

          <hr className="my-0" />

          <div className="p-4">
            <hr className="mt-1" />
            <div className="radio-toolbar">
              <span className="mb-2 d-block">레이아웃 옵션</span>
              <input
                type="radio"
                id="radioLight"
                name="radioLight"
                value={layoutModeTypes.LIGHT}
                checked={props.layoutModeType === layoutModeTypes.LIGHT}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeLayoutMode(e.target.value);
                  }
                }}
              />
              <label className="me-1" htmlFor="radioLight">라이트</label>
              <input
                type="radio"
                id="radioDark"
                name="radioDark"
                value={layoutModeTypes.DARK}
                checked={props.layoutModeType === layoutModeTypes.DARK}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeLayoutMode(e.target.value);
                  }
                }}
              />
              <label htmlFor="radioDark">다크</label>
            </div>

            <hr className="mt-1" />


            <div className="radio-toolbar">
              <span className="mb-2 d-block" id="radio-title">
                상단바 옵션
              </span>
              <input
                type="radio"
                id="radioThemeLight"
                name="radioTheme"
                value={topBarThemeTypes.LIGHT}
                checked={props.topbarTheme === topBarThemeTypes.LIGHT}
                onChange={e => {
                  if (e.target.checked) { 
                    props.changeTopbarTheme(e.target.value);
                  }
                }}
              />
              <label className="me-1" htmlFor="radioThemeLight">라이트</label>
              <input
                type="radio"
                id="radioThemeDark"
                name="radioTheme"
                value={topBarThemeTypes.DARK}
                checked={props.topbarTheme === topBarThemeTypes.DARK}
                onChange={e => {
                  if (e.target.checked) {
                    props.changeTopbarTheme(e.target.value);
                  }
                }}
              />
              <label className="me-1" htmlFor="radioThemeDark">다크</label>
              {props.layoutType === "vertical" ? null : (
                <>
                  <input
                    type="radio"
                    id="radioThemeColored"
                    name="radioTheme"
                    value={topBarThemeTypes.COLORED}
                    checked={props.topbarTheme === topBarThemeTypes.COLORED}
                    onChange={e => {
                      if (e.target.checked) {
                        props.changeTopbarTheme(e.target.value);
                      }
                    }}
                  />
                  <label className="me-1" htmlFor="radioThemeColored">Colored</label>{" "}
                </>
              )}
            </div>

            {props.layoutType === "vertical" ? (
              <React.Fragment>
                

                <hr className="mt-1" />

                <div className="radio-toolbar coloropt-radio">
                  <span className="mb-2 d-block" id="radio-title">
                    사이드바 옵션
                  </span>
                  <Row>
                    <Col>

                    <input
                        type="radio"
                        id="leftsidebarThemedark"
                        name="leftsidebarTheme"
                        value={leftSideBarThemeTypes.DARK}
                        checked={props.leftSideBarTheme === leftSideBarThemeTypes.DARK}
                        onChange={e => {
                          if (e.target.checked) {
                            props.changeSidebarTheme(e.target.value);
                          }
                        }}
                      />
                      <label
                        htmlFor="leftsidebarThemedark"
                        className={props.layoutModeType === "light" ? "bg-light rounded-circle wh-30 me-1" : "bg-dark rounded-circle wh-30 me-1"}
                      ></label>
                      <input
                        type="radio"
                        id="leftsidebarThemelight"
                        name="leftsidebarTheme"
                        value={leftSideBarThemeTypes.LIGHT}
                        checked={props.leftSideBarTheme === leftSideBarThemeTypes.LIGHT}
                        onChange={e => {
                          if (e.target.checked) {
                            props.changeSidebarTheme(e.target.value);
                          }
                        }}
                      />
                      <label
                        htmlFor="leftsidebarThemelight"
                        className={props.layoutModeType === "dark" ? "bg-light rounded-circle wh-30 me-1" : "bg-dark rounded-circle wh-30 me-1"}
                      ></label>

            
                    </Col>
                  </Row>
                  <Row>

                  </Row>
                </div>
                <hr className="mt-1" />
              </React.Fragment>
            ) : null}

          </div>
        </div>
      </SimpleBar>
      </div>
    </React.Fragment>
  );
};

RightSidebar.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changePreloader: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarThemeImage: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  isPreloader: PropTypes.any,
  layoutType: PropTypes.any,
  layoutModeType : PropTypes.any,
  changeLayoutMode : PropTypes.func,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarThemeImage: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  topbarTheme: PropTypes.any,
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return { ...state.Layout };
};

export default connect(mapStateToProps, {
  changeLayout,
  changeLayoutMode,
  changeSidebarTheme,
  changeSidebarThemeImage,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  changePreloader,
  showRightSidebarAction,
})(RightSidebar);
