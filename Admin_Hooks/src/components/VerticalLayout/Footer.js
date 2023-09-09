import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{year}-{month}-{day} © AIVLE.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                설계 및 개발 by AIVLE 15조
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
