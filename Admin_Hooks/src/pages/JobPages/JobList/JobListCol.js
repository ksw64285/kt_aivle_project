import React from 'react';
import { Badge } from 'reactstrap';

const JobNo = (cell) => {
    return cell.value ? cell.value : ''
};

const JobTitle = (cell) => {
    return cell.value ? cell.value : "";
};

const CompanyName = (cell) => {
    return cell.value ? cell.value : "";
};

const Location = (cell) => {
    return cell.value ? cell.value : "";
};

const Experience = (cell) => {
    return cell.value ? cell.value : "";
};

const Position = (cell) => {
    return cell.value ? cell.value : "";
};

const Type = (cell) => {
    switch (cell.value) {
        case "서비스 문의":
            return <Badge className="badge-soft-success">서비스 문의</Badge>
        case "오류 문의":
            return <Badge className="badge-soft-danger">오류 문의</Badge>
        case "건의 사항":
            return <Badge className="badge-soft-info">건의 사항</Badge>
        case "기타 문의":
            return <Badge className="badge-soft-warning">기타 문의</Badge>
    };   
};

const PostedDate = ({ value }) => {
    return <span>{value}</span>;
};

const LastDate = (cell) => {
    return cell.value ? cell.value : "";
};

const Status = (cell) => {
    switch(cell.value) {
        case "Active":
            return <Badge className="bg-success">Active</Badge>
        case "New":
            return <Badge className="bg-info">New</Badge>
        case "Close":
            return <Badge className="bg-danger">Close</Badge>
    }
};


export { JobNo, JobTitle, CompanyName, Location, Experience, Position, Type, PostedDate, LastDate, Status };