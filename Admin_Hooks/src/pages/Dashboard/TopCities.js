import React from "react"
import { Card, CardBody, CardTitle, Progress } from "reactstrap"

const TopCities = () => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">팀 소개</CardTitle>
          <div className="text-center">
            <div className="mb-4">
              <i className="bx bx-check-circle text-primary display-4" />
            </div>
            <h3>4반 15조</h3>
          </div>

          <div className="table-responsive mt-4">
            <table className="table align-middle table-nowrap">
              <tbody>
                <tr>
                  <td style={{ width: "33%" , textAlign : "center" }}>
                    <p className="mb-0" >FRONT-END</p>
                  </td>
                  <td style={{ width: "33.3%" ,textAlign : "center"}}>
                    <p className="mb-0" >2 명</p>
                  </td>
                  <td style={{ width: "33.3%" ,textAlign : "center"}}>
                    <p className="mb-0" > 김승우 송재형 </p>
                  </td>
                </tr>
                <tr>
                <td style={{ width: "33%" , textAlign : "center" }}>
                    <p className="mb-0" >BACK-END</p>
                  </td>
                  <td style={{ width: "33.3%" ,textAlign : "center"}}>
                  <p className="mb-0">3 명</p>
                  </td>
                  <td style={{ width: "33.3%" ,textAlign : "center"}}>
                    <p className="mb-0" > 오동혁 윤태후 장해찬 </p>
                  </td>
                </tr>
                <tr>
                <td style={{ width: "33%" , textAlign : "center" }}>
                    <p className="mb-0" >AI</p>
                  </td>
                  <td style={{ width: "33.3%" ,textAlign : "center"}}>
                    <p className="mb-0" > 2 명 </p>
                  </td>
                  <td style={{ width: "33.3%" ,textAlign : "center"}}>
                    <p className="mb-0" > 박찬혁 주영환 </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default TopCities
