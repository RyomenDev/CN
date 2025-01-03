const HomePageData = {
  header: {
    appName: "CodeNetra",
    welcome:
      "Welcome to our platform where we deliver the best courses, features,and services tailored to your needs.",
    url: "https://www.exin.com/app/uploads/2022/05/Data-Protection-and-security-hero-header-1024x576.jpg",
  },
  hero: {
    title: "Empower Your Learning Journey",
    subtitle:
      "Explore courses, book interviews, and build your career with us.",
    buttonText: "Get Started",
    image:
      "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg",
  },
  features: [
    {
      title: "Expert-Led Courses",
      description:
        "Access a wide range of courses taught by industry experts. Learn at your own pace and boost your skills.",
      icon: "📚",
    },
    {
      title: "Interview Booking System",
      description:
        "Schedule mock interviews with experienced professionals to enhance your confidence and performance.",
      icon: "📅",
    },
    {
      title: "Career Guidance",
      description:
        "Receive personalized career advice and actionable insights to achieve your goals.",
      icon: "💼",
    },
  ],
  courses: [
    {
      id: 1,
      name: "Full-Stack Web Development",
      description: "Master the MERN stack and build dynamic web applications.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6cR2WnN_lmPNmnvMdPowM2JvcGp67Q3rEIw&s",
      link: "/courses/fullstack",
    },
    {
      id: 2,
      name: "Data Structures & Algorithms",
      description:
        "Learn DSA with practical problem-solving techniques and prepare for technical interviews.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNkRItepgfhWVn6FSURPCcop2tZNhcb_M4uA&s",
      link: "/courses/dsa",
    },
    {
      id: 3,
      name: "Machine Learning Basics",
      description:
        "Understand the foundations of machine learning with hands-on projects.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFq3NZ0f1Hu5sXQ2sA5Uz9c1xXDugsZU3osQ&s",
      link: "/courses/ml",
    },
  ],
  testimonials: [
    {
      name: "John Doe",
      feedback:
        "This platform helped me secure my dream job! The courses are excellent, and the mock interviews were invaluable.",
      avatar:
        "https://media.istockphoto.com/id/508956644/photo/pretty-colombian-woman.jpg?s=612x612&w=0&k=20&c=jEwTCMKSpjYsaSfiFIlifYneUpczureQFl8o543_ZjE=",
    },
    {
      name: "Jane Smith",
      feedback:
        "The career guidance sessions provided me with clarity and actionable steps to achieve my goals.",
      avatar:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg",
    },
  ],
  cta: {
    title: "Join Our Learning Community",
    description:
      "Sign up today to access all features and take the first step towards your dream career.",
    buttonText: "Sign Up Now",
    link: "/signup",
  },
};

export default HomePageData;
