import aivlelogo from "../../assets/images/aivle2.png";

const chats = [
  {
    id: 1,
    roomId: 1,
    status: "online",
    name: "홍길동",
    image: aivlelogo,
    Age: 25,
    sex: "mail",
    job: "programmer",
    description: "과장",
    situation:"rollplaying"
  },
  {
    id: 2,
    roomId: 2,
    status: "online",
    name: "아무개",
    image: aivlelogo,
    Age: 25,
    sex: "femail",
    job: "designer",
    description: "과장",
    situation:"rollplaying"
  },
]

const groups = [
  { id: 1, name: "GROW 모델 질문" },
]

const contacts = [
  {
    category: "A",
    child: [
      { id: 1, name: "Adam Miller" },
      { id: 2, name: "Alfonso Fisher" },
    ],
  },
  {
    category: "B",
    child: [{ id: 1, name: "Bonnie Harney" }],
  },
]

const messages = [
  {
    id: 1,
    roomId: 1,
    sender: "ChatGPT",
    message: "TEST중입니다",
    time: "10:06",
  },
  {
    id: 2,
    roomId: 2,
    sender: "ChatGPT",
    message: "대답 2",
    time: "10:06",
    
  },
  {
    id: 1,
    roomId: 2,
    sender: "ChatGPT",
    message: "대답 3",
    time: "10:06",
  },
];

export { chats, messages, contacts, groups }
