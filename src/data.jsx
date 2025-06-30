import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaEnvelopeOpen,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaCogs,
} from "react-icons/fa";
import { FiFileText, FiExternalLink } from "react-icons/fi";
import { MdWorkHistory } from "react-icons/md";

import Work1 from "./assets/project-1.png";
import Work2 from "./assets/project-2.png";
import Work3 from "./assets/project-3.png";
import Work4 from "./assets/project-4.png";
import { getAge } from "./utils";

export const links = [
  {
    id: 1,
    name: "Home",
    icon: <FaHome className="nav__icon" />,
    path: "#home",
  },
  {
    id: 2,
    name: "About",
    icon: <FaUser className="nav__icon" />,
    path: "#about",
  },
  {
    id: 5,
    name: "Skills",
    icon: <FaCogs className="nav__icon" />,
    path: "#skills",
  },
  {
    id: 6,
    name: "Journey",
    icon: <MdWorkHistory className="nav__icon" />,
    path: "#journey",
  },
  {
    id: 3,
    name: "Portfolio",
    icon: <FaFolderOpen className="nav__icon" />,
    path: "#portfolio",
  },
  {
    id: 4,
    name: "Contact",
    icon: <FaEnvelopeOpen className="nav__icon" />,
    path: "#contact",
  },
];

export const personalInfo = [
  {
    id: 1,
    title: "First Name : ",
    description: "Udhayasooriyan",
  },

  {
    id: 2,
    title: "Last Name : ",
    description: "Kesavamurthy",
  },

  {
    id: 3,
    title: "Age : ",
    description: getAge(),
  },

  {
    id: 4,
    title: "Nationality : ",
    description: "Indian",
  },

  {
    id: 5,
    title: "Freelance : ",
    description: "Available",
  },

  {
    id: 6,
    title: "Location : ",
    description: "Chennai",
  },

  {
    id: 7,
    title: "Phone : ",
    description: "+91-7639718893",
  },

  {
    id: 8,
    title: "Email : ",
    description: "usraising@mail.com",
  },

  {
    id: 9,
    title: "LinkedIn : ",
    description: "Suriya-Kesavamurthy",
  },

  {
    id: 10,
    title: "Languages : ",
    description: "English, Tamil, Hindi, Malayalam",
  },
];

export const stats = [
  {
    id: 1,
    no: "2.5+",
    title: "Years of Experience  <br /> In MERN Stack",
  },
  {
    id: 2,
    no: "6+",
    title: "Years of Experience  <br /> In Non-IT Field",
  },
  {
    id: 3,
    no: "3+",
    title: " Awards <br /> Won",
  },
];

export const resume = [
  {
    id: 1,
    category: "education",
    icon: <FaGraduationCap />,
    year: "Apr 2023 - Sep 2023",
    title: "Full Stack Developer Program <span> Guvi </span>",
    desc: "Learning Full Stack Developer (MERN).",
  },
  {
    id: 6,
    category: "education",
    icon: <FaGraduationCap />,
    year: "Jun 2017 - May 2020",
    title: "Bachelor in Computer Application",
    desc: "Arunachal University of Studies",
  },
  {
    id: 9,
    category: "experience",
    icon: <FaBriefcase />,
    year: "Oct 2023 - Present",
    title: "Full Stack Developer (MERN)",
    desc: "Website Learners, Chennai",
  },
  {
    id: 2,
    category: "experience",
    icon: <FaBriefcase />,
    year: "Jan 2023 - Sep 2023",
    title: "MERN Stack Trainee <span> Guvi, Chennai </span>",
    desc: `Transitioning into IT with a focus on MERN Stack development, undergoing structured training through Guvi's
program while actively pursuing self-learning and hands-on practice to strengthen my skills.`,
  },
  {
    id: 3,
    category: "experience",
    icon: <FaBriefcase />,
    year: "Jan 2017 - Dec 2022",
    title: "Technical Admin <span> Imdaad.LLC, U.A.E </span>",
    desc: `I managed system updates in Maximo and SAP, and generated client-facing reports using MS Office tools.
Recognized for excellence with 'Employee of the Year' award from the client on two occasions.`,
  },

  {
    id: 7,
    category: "education",
    icon: <FaGraduationCap />,
    year: "Jun 2009 - May 2012",
    title: "Diploma in Electrical & Electronics <span> AVC College </span>",
    desc: "First Class with Distinction & 89% ",
  },
  {
    id: 8,
    category: "education",
    icon: <FaGraduationCap />,
    year: "2008-2009",
    title: "SSLC <span> Swami Vivekananda High School </span>",
    desc: "Scored 83% with Centum in Mathematics",
  },
];

export const skills = [
  {
    id: 1,
    title: "React JS",
    percentage: "90",
  },
  {
    id: 2,
    title: "JavaScript",
    percentage: "90",
  },
  {
    id: 3,
    title: "TypeScript",
    percentage: "80",
  },
  {
    id: 4,
    title: "NextJs",
    percentage: "70",
  },
  {
    id: 5,
    title: "NodeJs",
    percentage: "85",
  },
  {
    id: 6,
    title: "ExpressJs",
    percentage: "85",
  },
  {
    id: 7,
    title: "MongoDB",
    percentage: "85",
  },
  {
    id: 8,
    title: "MySql",
    percentage: "70",
  },
  {
    id: 9,
    title: "Redux & Toolkit",
    percentage: "85",
  },
  {
    id: 10,
    title: "HTML & CSS",
    percentage: "90",
  },

  {
    id: 11,
    title: "TailWind",
    percentage: "85",
  },
  {
    id: 12,
    title: "Shadcn",
    percentage: "80",
  },
  {
    id: 13,
    title: "MUI",
    percentage: "85",
  },
  {
    id: 14,
    title: "SASS",
    percentage: "80",
  },
  {
    id: 15,
    title: "Git",
    percentage: "85",
  },
  {
    id: 16,
    title: "PostMan",
    percentage: "85",
  },
  {
    id: 17,
    title: "AWS",
    percentage: "50",
  },
  {
    id: 18,
    title: "NestJs",
    percentage: "50",
  },
];

export const portfolio = [
  {
    id: 1,
    img: Work1,
    title: "Zen Dashboard",
    details: [
      {
        icon: <FiFileText />,
        title: "Description : ",
        desc: "Student dashboard for ZEN class, enabling students to attend classes, submit assignments, ask questions, and request leaves. Mentors can easily evaluate tasks using their login.",
      },
      {
        icon: <FiExternalLink />,
        title: "Code : ",
        desc: "https://github.com/Suriya-K7/Zen-class-student-dashboard-frontend",
      },
      {
        icon: <FiExternalLink />,
        title: "Preview : ",
        desc: "https://zen-class-student-dashboard.netlify.app/",
      },
      {
        icon: <FaCode />,
        title: "Tech Used : ",
        desc: "React, Nodejs, Chartjs, Formik, ExpressJs, Bootstrap, Axios, CSS, Toastify, MongoDB, Mongoose, Nodemailer, JWT, Bcrypt, Cors",
      },
    ],
  },
  {
    id: 2,
    img: Work2,
    title: "Inventory Management",
    details: [
      {
        icon: <FiFileText />,
        title: "Description : ",
        desc: "The inventory management app provides businesses with a streamlined solution to track, manage, and optimize their stock levels efficiently.",
      },
      {
        icon: <FiExternalLink />,
        title: "Code : ",
        desc: "https://github.com/Suriya-K7/Inventory-App-FE",
      },
      {
        icon: <FiExternalLink />,
        title: "Preview : ",
        desc: "https://inventory-app-sk7.netlify.app/",
      },
      {
        icon: <FaCode />,
        title: "Tech Used : ",
        desc: "React, Nodejs, Formik, ExpressJs, Axios, CSS, MongoDB, Mongoose, Nodemailer, JWT, Bcrypt, Cloudinary, RazerPay, Bootstrap, Chartjs, Cors, Emailjs, Dotenv",
      },
    ],
  },
  {
    id: 3,
    img: Work3,
    title: "ShareSpace",
    details: [
      {
        icon: <FiFileText />,
        title: "Description : ",
        desc: "ShareSpace app is a vibrant platform where you can capture and share your life's memorable moments through photos and stories. Stay connected with friends",
      },
      {
        icon: <FiExternalLink />,
        title: "Code : ",
        desc: "https://github.com/Suriya-K7/ShareSpace-FE",
      },
      {
        icon: <FiExternalLink />,
        title: "Preview : ",
        desc: "https://sharespace-sk7.netlify.app/",
      },
      {
        icon: <FaCode />,
        title: "Tech Used : ",
        desc: "React, Nodejs, formik, MUI, ExpressJs, Axios, CSS, MongoDB, Mongoose, Nodemailer, JWT, Bcrypt, Cloudinary, RazerPay, EmailJs, Dotenv",
      },
    ],
  },
  {
    id: 4,
    img: Work4,
    title: "Chat Buddy",
    details: [
      {
        icon: <FiFileText />,
        title: "Description : ",
        desc: "Chat Buddy app let Chat seamlessly with friends through text and photos with our user-friendly messaging app.",
      },
      {
        icon: <FiExternalLink />,
        title: "Code : ",
        desc: "https://github.com/Suriya-K7/Chat-App-FE",
      },
      {
        icon: <FiExternalLink />,
        title: "Preview : ",
        desc: "https://chat-app-suriya-k7.netlify.app/",
      },
      {
        icon: <FaCode />,
        title: "Tech Used : ",
        desc: "React, Nodejs, Formik, ExpressJs, Axios, CSS, MongoDB, Mongoose, Nodemailer, JWT, Bcrypt, Cloudinary, RazerPay, EmailJs, WebSocket, Cookie-parser, Dotenv",
      },
    ],
  },
];
