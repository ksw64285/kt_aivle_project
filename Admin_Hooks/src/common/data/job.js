//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";

const jobs = [
    {
        id: 1,
        jobId: "1",        
        jobTitle: "제목1",
        companyName: "Themesbrand",
        type: "서비스 문의",
        postedDate: "02 June 2021",
    },
    {
        id: 2,
        jobId: "2",        
        jobTitle: "제목2",
        companyName: "Web Technology pvt.ltd",
        type: "오류 문의",
        postedDate: "15 June 2021",
    },
    {
        id: 3,
        jobId: "3",        
        jobTitle: "제목3",
        companyName: "Creative Agency",
        type: "서비스 문의",
        postedDate: "02 June 2021",
    },
    {
        id: 4,
        jobId: "4",        
        jobTitle: "제목4",
        companyName: "Web Technology pvt.ltd",
        type: "서비스 문의",
        postedDate: "02 June 2021",
    },
    {
        id: 5,
        jobId: "5",       
        jobTitle: "제목5",
        companyName: "Skote Technology pvt.Ltd",
        type: "오류 문의",
        postedDate: "02 June 2021",
    },
    {
        id: 6,
        jobId: "6",       
        jobTitle: "제목6",
        companyName: "New Technology pvt.ltd",
        type: "건의 사항",
        postedDate: "02 June 2021",
    },
    {
        id: 7,
        jobId: "7",       
        jobTitle: "제목7",
        companyName: "Web Technology pvt.ltd",
        type: "서비스 문의",
        postedDate: "02 June 2021",
    },
    {
        id: 8,
        jobId: "8",        
        jobTitle: "제목8",
        companyName: "Adobe Agency",
        type: "서비스 문의",
        postedDate: "02 June 2021",
    },
    {
        id: 9,
        jobId: "9",       
        jobTitle: "제목9",
        companyName: "Web Technology pvt.ltd",
        type: "오류 문의",
        postedDate: "02 June 2021",
    },
    {
        id: 10,
        jobId: "10",        
        jobTitle: "제목10",
        companyName: "Web Technology pvt.ltd",
        type: "기타 문의",
        postedDate: "02 June 2021",
    },
];

const jobListCandidate = [
    {
        id: 1,
        img: avatar1,
        name: "Steven Franklin",
        designation: "UI/UX Designer",
        location: "Louisiana",
        experience: "38",
        skills: ["Bootstrap", "HTML", "CSS"],
        type: "Full Time",
    },
    {
        id: 2,
        img: avatar2,
        name: "Dolores Minter",
        designation: "Assistant / Shope Keeper",
        location: "Hong-Kong",
        experience: "25",
        skills: ["Shope", "Assistant"],
        type: "Freelance",
    },
    {
        id: 3,
        img: avatar3,
        name: "Charles Brown",
        designation: "Web Designer",
        location: "Finlande",
        experience: "24",
        skills: ["Bootstrap", "HTML", "SASS"],
        type: "Part Time",
    },
    {
        id: 4,
        img: avatar4,
        name: "Bonnie Harney",
        designation: "Web Developer",
        location: "France",
        experience: "47",
        skills: ["MYSQL", "PHP", "Laravel"],
        type: "Internship",
    },
    {
        id: 5,
        img: avatar5,
        name: "Stephen Hadley",
        designation: "Graphic Designer",
        location: "Danemark",
        experience: "83",
        skills: ["Figma", "Adobe XD", "Sketch"],
        type: "Internship",
    },
    {
        id: 6,
        img: avatar6,
        name: "Henry Wells",
        designation: "Executive, HR Operations",
        location: "Danemark",
        experience: "65",
        skills: ["HR", "Executive", "Professional"],
        type: "Internship",
    },
    {
        id: 7,
        img: avatar7,
        name: "Adam Miller",
        designation: "Education Training",
        location: "Colombie",
        experience: "38",
        skills: ["Teaching", "React", "Training"],
        type: "Full Time",
    },
    {
        id: 8,
        img: avatar8,
        name: "Keith Gonzales",
        designation: "Product Manager",
        location: "Brazil",
        experience: "50",
        skills: ["Manager", "Business", "Product"],
        type: "Freelance",
    },
];

const jobApply = [
    {
        id: 10,
        no: 10,
        jobTitle: "Magento Developer",
        companyName: "Web Technology pvt.Ltd",
        type: "Internship",
        applyDate: "02 June 2021",
        status: "Active",
    },
    {
        id: 9,
        no: 9,
        jobTitle: "Magento Developer",
        companyName: "Adobe Agency",
        type: "Freelance",
        applyDate: "02 June 2021",
        status: "New",
    },
    {
        id: 8,
        no: 8,
        jobTitle: "Magento Developer",
        companyName: "Web Technology pvt.Ltd",
        type: "Full Time",
        applyDate: "02 June 2021",
        status: "Close",
    },
    {
        id: 7,
        no: 7,
        jobTitle: "Magento Developer",
        companyName: "Web Technology pvt.Ltd",
        type: "Part Time",
        applyDate: "25 June 2021",
        status: "Active",
    },
    {
        id: 6,
        no: 6,
        jobTitle: "Magento Developer",
        companyName: "Themesbrand",
        type: "Freelance",
        applyDate: "25 June 2021",
        status: "Close",
    },
    {
        id: 5,
        no: 5,
        jobTitle: "Product Sales Specialist",
        companyName: "New Technology pvt.Ltd",
        type: "Part Time",
        applyDate: "25 June 2021",
        status: "New",
    },
    {
        id: 4,
        no: 4,
        jobTitle: "HTML Developer",
        companyName: "Skote Technology pvt.Ltd",
        type: "Full Time",
        applyDate: "02 June 2021",
        status: "Active",
    },
    {
        id: 3,
        no: 3,
        jobTitle: "Magento Developer",
        companyName: "Web Technology pvt.Ltd",
        type: "Full Time",
        applyDate: "02 June 2021",
        status: "Close",
    },
    {
        id: 2,
        no: 2,
        jobTitle: "Apple School & College",
        companyName: "Themesbrand",
        type: "Part Time",
        applyDate: "15 June 2021",
        status: "New",
    },
    {
        id: 1,
        no: 1,
        jobTitle: "Magento Developer",
        companyName: "Creative Agency",
        type: "Full Time",
        applyDate: "02 June 2021",
        status: "Active",
    },
];
export { jobs, jobListCandidate, jobApply };