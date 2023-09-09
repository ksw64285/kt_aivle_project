import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import { Col, Container, Row } from "reactstrap";
import { map } from "lodash";
import { users } from "../../common/data/contacts";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

//Import Card
import CardContact from "./card-contact";


const ContactsGrid = () => {

  //meta title
  document.title = "팀 소개";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="HOME" breadcrumbItem="팀 소개" />

          <Row>
            {map(users, (user, key) => (
              <CardContact user={user} key={"_user_" + key} />
            ))}
          </Row>

          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-hourglass bx-spin me-2" />
                  by AIVLE 4반 15조
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ContactsGrid);
