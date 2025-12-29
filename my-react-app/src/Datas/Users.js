const users = [
  {
    id: 1,
    name: "Aisha Rahman",
    email: "aisha.rahman1@example.com",
    bio: "Frontend developer and UI/UX enthusiast.",
    profile: {
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      location: "Kochi, India",
      hobbies: ["design", "coding", "reading"],
    },
    starCount: 4.8,
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "Git"]
  },
  {
    id: 2,
    name: "Zain Malik",
    email: "zain.malik2@example.com",
    bio: "Fullstack developer building helpful tools.",
    profile: {
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      location: "Mumbai, India",
      hobbies: ["music", "gaming", "tech blogs"],
    },
    starCount: 4.5,
    skills: ["JavaScript", "React", "Redux", "Node.js", "REST APIs", "Git"]
  },
  {
    id: 3,
    name: "Hana Ali",
    email: "hana.ali3@example.com",
    bio: "Aspiring ML engineer and data lover.",
    profile: {
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      location: "Bangalore, India",
      hobbies: ["AI", "baking", "traveling"],
    },
    starCount: 4.9,
    skills: ["Python", "JavaScript", "React", "Data Analysis", "Machine Learning"]
  },
  {
    id: 4,
    name: "Rohit Sharma",
    email: "rohit.sharma4@example.com",
    bio: "DevOps automation specialist and cloud advocate.",
    profile: {
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      location: "Hyderabad, India",
      hobbies: ["cloud", "cricket", "movies"],
    },
    starCount: 4.3,
    skills: ["Git", "Docker", "CI/CD", "Node.js", "React", "Cloud Computing"]
  },
  {
    id: 5,
    name: "Sara Thomas",
    email: "sara.thomas5@example.com",
    bio: "UX researcher passionate about human-centered design.",
    profile: {
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      location: "Chennai, India",
      hobbies: ["photography", "sketching", "hiking"],
    },
    starCount: 4.7,
    skills: ["HTML", "CSS", "UX Design", "React", "User Research"]
  },
  {
    id: 6,
    name: "Arjun Nair",
    email: "arjun.nair6@example.com",
    bio: "Backend developer specializing in APIs.",
    profile: {
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      location: "Thiruvananthapuram, India",
      hobbies: ["writing", "backend", "biking"],
    },
    starCount: 4.4,
    skills: ["Node.js", "Express", "MongoDB", "APIs", "Git"]
  },
  {
    id: 7,
    name: "Meena George",
    email: "meena.george7@example.com",
    bio: "Product designer who loves minimal interfaces.",
    profile: {
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      location: "Kozhikode, India",
      hobbies: ["design", "art", "cycling"],
    },
    starCount: 4.6,
    skills: ["Sketch", "Figma", "UX Design", "HTML", "CSS"]
  },
  {
    id: 8,
    name: "Imran Khan",
    email: "imran.khan8@example.com",
    bio: "Mobile developer focused on React Native.",
    profile: {
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      location: "Pune, India",
      hobbies: ["mobile apps", "football", "reading"],
    },
    starCount: 4.2,
    skills: ["JavaScript", "React Native", "APIs", "UI Design"]
  },
  {
    id: 9,
    name: "Nitya Menon",
    email: "nitya.menon9@example.com",
    bio: "Data analyst and visualization expert.",
    profile: {
      image: "https://randomuser.me/api/portraits/women/9.jpg",
      location: "Ahmedabad, India",
      hobbies: ["data", "charts", "travel"],
    },
    starCount: 4.9,
    skills: ["Python", "SQL", "Data Visualization", "Tableau"]
  },
  {
    id: 10,
    name: "Karan Patel",
    email: "karan.patel10@example.com",
    bio: "QA engineer ensuring bug-free software.",
    profile: {
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      location: "Surat, India",
      hobbies: ["testing", "cricket", "chess"],
    },
    starCount: 4.1,
    skills: ["Testing", "Selenium", "Jest", "Automation"]
  },
  {
    id: 11,
    name: "Leena Singh",
    email: "leena.singh11@example.com",
    bio: "Frontend developer with a love for animations.",
    profile: {
      image: "https://randomuser.me/api/portraits/women/11.jpg",
      location: "Jaipur, India",
      hobbies: ["css animations", "travel", "yoga"],
    },
    starCount: 4.5,
    skills: ["HTML", "CSS", "JavaScript", "React", "Animations"]
  },
  {
    id: 12,
    name: "Vikram Desai",
    email: "vikram.desai12@example.com",
    bio: "Cloud engineer and infrastructure guru.",
    profile: {
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      location: "Gurgaon, India",
      hobbies: ["cloud", "running", "gaming"],
    },
    starCount: 4.3,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"]
  },
  {
    id: 13,
    name: "Anjali Rao",
    email: "anjali.rao13@example.com",
    bio: "Fullstack developer with a passion for React.",
    profile: {
      image: "https://randomuser.me/api/portraits/women/13.jpg",
      location: "Noida, India",
      hobbies: ["coding", "blogs", "reading"],
    },
    starCount: 4.7,
    skills: ["React", "Node.js", "JavaScript", "CSS", "Git"]
  },
  {
    id: 14,
    name: "Devendra Singh",
    email: "devendra.singh14@example.com",
    bio: "Security engineer focused on web app safety.",
    profile: {
      image: "https://randomuser.me/api/portraits/men/14.jpg",
      location: "Lucknow, India",
      hobbies: ["security", "puzzles", "reading"],
    },
    starCount: 4.2,
    skills: ["Security", "Pen Testing", "Node.js", "React"]
  },
  {
    id: 15,
    name: "Priya Nair",
    email: "priya.nair15@example.com",
    bio: "Content strategist and blogger.",
    profile: {
      image: "https://randomuser.me/api/portraits/women/15.jpg",
      location: "Ernakulam, India",
      hobbies: ["writing", "reading", "travel"],
    },
    starCount: 4.8,
    skills: ["Writing", "SEO", "Content Strategy", "CSS"]
  },
  {
    id: 16,
    name: "Rahul Kapoor",
    email: "rahul.kapoor16@example.com",
    bio: "Game developer and graphics lover.",
    profile: {
      image: "https://randomuser.me/api/portraits/men/16.jpg",
      location: "Bhopal, India",
      hobbies: ["gaming", "graphics", "coding"],
    },
    starCount: 4.0,
    skills: ["C++", "Unity", "Graphics", "JavaScript"]
  },
  {
    id: 17,
    name: "Sneha Patil",
    email: "sneha.patil17@example.com",
    bio: "Mobile UX designer and researcher.",
    profile: {
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      location: "Pimpri, India",
      hobbies: ["research", "sketching", "travel"],
    },
    starCount: 4.6,
    skills: ["UX Design", "Figma", "User Research", "HTML", "CSS"]
  },
  {
    id: 18,
    name: "Amit Joshi",
    email: "amit.joshi18@example.com",
    bio: "AI enthusiast and robotics tinkerer.",
    profile: {
      image: "https://randomuser.me/api/portraits/men/18.jpg",
      location: "Indore, India",
      hobbies: ["AI", "robotics", "reading"],
    },
    starCount: 4.5,
    skills: ["Python", "Machine Learning", "AI", "Robotics"]
  },
  {
    id: 19,
    name: "Shreya Gupta",
    email: "shreya.gupta19@example.com",
    bio: "Blockchain developer exploring Web3.",
    profile: {
      image: "https://randomuser.me/api/portraits/women/19.jpg",
      location: "Varanasi, India",
      hobbies: ["blockchain", "crypto", "reading"],
    },
    starCount: 4.4,
    skills: ["Blockchain", "Solidity", "Web3.js", "JavaScript"]
  },
  {
    id: 20,
    name: "Manish Verma",
    email: "manish.verma20@example.com",
    bio: "Software architect and mentor.",
    profile: {
      image: "https://randomuser.me/api/portraits/men/20.jpg",
      location: "Lucknow, India",
      hobbies: ["mentoring", "architecture", "tech talks"],
    },
    starCount: 4.9,
    skills: ["Architecture", "React", "Node.js", "System Design"]
  }
];

export default users;
