import avatar1 from "../../assets/images/users/avatar-1.jpg"
import avatar2 from "../../assets/images/users/avatar-2.jpg"
import avatar3 from "../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../assets/images/users/avatar-4.jpg"
import avatar5 from "../../assets/images/users/avatar-5.jpg"
import avatar6 from "../../assets/images/users/avatar-6.jpg"
import avatar7 from "../../assets/images/users/avatar-7.jpg"

const users = [
  {
    id: 1,
    img: avatar1,
    name: "장해찬",
    // designation: "인사말?",
    color: "primary",
    email: "david@skote.com",
    projects: "125",
    tags: ["조장", "BE"],
  },
  {
    id: 2,
    img: avatar2,
    name: "오동혁",
    // designation: "인사말?",
    color: "primary",
    email: "frank@skote.com",
    projects: "132",
    tags: ["조원", "BE"],
  },
  {
    id: 3,
    img: avatar3,
    name: "윤태후",
    // designation: "인사말?",
    color: "primary",
    email: "Rafael@skote.com",
    projects: "1112",
    tags: ["조원", "BE"],
  },
  {
    id: 4,
    img: avatar4,
    name: "박찬혁",
    // designation: "인사말?",
    color: "success",
    email: "mark@skote.com",
    projects: "121",
    tags: ["조원", "AI"],
  },
  {
    id: 5,
    img: avatar5,
    name: "주영환",
    // designation: "인사말?",
    color: "success",
    email: "minnie@skote.com",
    projects: "145",
    tags: ["조원", "AI"],
  },
  {
    id: 6,
    img: avatar6,
    name: "송재형",
    // designation: "인사말?",
    color: "info",
    email: "shirley@skote.com",
    projects: "136",
    tags: ["조원", "FE"],
  },
  {
    id: 7,
    img: avatar7,
    name: "김승우",
    // designation: "인사말?",
    color: "info",
    email: "john@skote.com",
    projects: "125",
    tags: ["조원", "FE"],
  },
]
const userProfile = {
  id: 1,
  name: "Cynthia Price",
  designation: "UI/UX Designer",
  img: avatar1,
  projectCount: 125,
  revenue: 1245,
  personalDetail:
    "Hi I'm Cynthia Price,has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.",
  phone: "(123) 123 1234",
  email: "cynthiaskote@gmail.com",
  location: "California, United States",
  experiences: [
    {
      id: 1,
      iconClass: "bx-server",
      link: "#",
      designation: "Back end Developer",
      timeDuration: "2016 - 19",
    },
    {
      id: 2,
      iconClass: "bx-code",
      link: "#",
      designation: "Front end Developer",
      timeDuration: "2013 - 16",
    },
    {
      id: 3,
      iconClass: "bx-edit",
      link: "#",
      designation: "UI /UX Designer",
      timeDuration: "2011 - 13",
    },
  ],
  projects: [
    {
      id: 1,
      name: "Skote admin UI",
      startDate: "2 Sep, 2019",
      deadline: "20 Oct, 2019",
      budget: "$506",
    },
    {
      id: 2,
      name: "Skote admin Logo",
      startDate: "1 Sep, 2019",
      deadline: "2 Sep, 2019",
      budget: "$94",
    },
    {
      id: 3,
      name: "Redesign - Landing page",
      startDate: "21 Sep, 2019",
      deadline: "29 Sep, 2019",
      budget: "$156",
    },
    {
      id: 4,
      name: "App Landing UI",
      startDate: "29 Sep, 2019",
      deadline: "04 Oct, 2019",
      budget: "$122",
    },
    {
      id: 5,
      name: "Blog Template",
      startDate: "05 Oct, 2019",
      deadline: "16 Oct, 2019",
      budget: "$164",
    },
    {
      id: 6,
      name: "Redesign - Multipurpose Landing",
      startDate: "17 Oct, 2019",
      deadline: "05 Nov, 2019",
      budget: "$192",
    },
    {
      id: 7,
      name: "Logo Branding",
      startDate: "04 Nov, 2019",
      deadline: "05 Nov, 2019",
      budget: "$94",
    },
  ],
}

export { users, userProfile }