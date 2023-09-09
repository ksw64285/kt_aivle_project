import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import axios from 'axios'
import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { getOrders as onGetOrders } from "store/actions";

import { latestTransaction } from "../../common/data/dashboard";
import useAxios from '../../routes/useAxios'
let api = useAxios()
import {
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod,
} from "./LatestTranactionCol";

import TableContainer from "../../components/Common/TableContainer";

const LatestTranaction = props => {
  
  const [Blogs, setBlogs] = useState([]);
    // 기존 문의 목록을 가져오는 비동기 함수 호출
  useEffect(() => {
    fetchExistingJobs(); // 함수 호출
  },[]); 

  const fetchExistingJobs = async () => {
      try {
        const response = await api.get("/board/blog");
        console.log(response.data)
        const blogs = response.data; // 기존 문의 목록 데이터
        setBlogs(blogs); // 기존 문의 목록 상태 업데이트
      } catch (error) {
        console.log(error)
        console.log("기존 문의 목록을 가져오는데 실패했습니다:", error);
      }
    };
  
  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "orderId",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <OrderId {...cellProps} />;
        },
      },
      {
        Header: "Title",
        accessor: "billingName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <BillingName {...cellProps} />;
        },
      },
      {
        Header: "Type",
        accessor: "orderdate",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Date {...cellProps} />;
        },
      },
      {
        Header: "date",
        accessor: "total",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Total {...cellProps} />;
        },
      },
    ],
    []
  );


  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">1:1문의</div>
          <TableContainer
            columns={columns}
            data={Blogs}
            isGlobalFilter={false}
            isAddOptions={false}
            customPageSize={6}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

export default withRouter(LatestTranaction);
