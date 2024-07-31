import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, X } from 'lucide-react';
import profile from "./profile.jpg";
const sections = ['EDUCATION', 'TECHNICAL SKILLS', 'PROJECTS', 'EXPERIENCE'];

const Modal = ({ isOpen, onClose, videoUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-5xl h-[90vh] flex flex-col"> {/* Added height and flex */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>
        <div className="flex-grow relative"> {/* Made this a relative container */}
          <iframe
            src={videoUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full" 
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('EDUCATION');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({ url: '', title: '' });
  const mainContentRef = useRef(null);

  const projects = [
    { 
      title: "Inbox Guardian: SMS Spam Filter", 
      description: "A smart SPAM filter for Android devices using logistic regression, Google's BERT LLM, keyword analysis, and phone number blacklisting.",
      tech: "Kotlin, Java, Python, Bert LLM, Android Studio, Realm DB",
      link: "https://github.com/Lopezm0908/SMS-filtering",
      videoUrl: "https://github.com/Lopezm0908/SMS-filtering/assets/158241209/9370c61f-fa78-4955-aba4-418992dd5b7c" // Replace with actual video URL
    },
    { 
      title: "Major Employment and Salary Analysis Dashboard", 
      description: "An interactive dashboard to analyze employment and salary data of different majors.",
      tech: "Python, Pandas, Dash, Plotly, SQL",
      link: "https://github.com/jeremiahwarinner/Major-Employment-and-Salary-Analysis-Dashboard",
      videoUrl: "https://github.com/jeremiahwarinner/Major-Employment-and-Salary-Analysis-Dashboard/assets/158241209/b6869c04-d212-466f-96ca-3c3aade7e3dd" // Replace with actual video URL
    },
    { 
      title: "Schedule Manager", 
      description: "An application to manage employee schedules, including adding and updating employee information, assigning shifts, and auto-generating schedules.",
      tech: "Python, SQLite3, pandas, Tkinter, Openpyxl",
      link: "https://github.com/jeremiahwarinner/Schedule-Manager/tree/main",
      videoUrl: "https://github.com/user-attachments/assets/479f2988-6db0-43a4-9402-e8a1702fb1da" // Replace with actual video URL
    }
  ];

  const experiences = [
    {
      title: "Full Stack Developer Intern",
      company: "Luday",
      location: "Gothenburg, SE",
      date: "July 2024 - Present",
      details: [
        "Designed front end components in Figma",
        "Built front-end components in Next.js",
        "Built REST APIs using Python and Flask",
        "Worked in an Agile Scrum environment"
      ]
    },
    {
      title: "Inventory Manager",
      company: "Chick-fil-a",
      location: "Pearland, TX",
      date: "November 2022 - May 2024",
      details: [
        "Maintained and utilized Excel sheets to monitor inventory levels",
        "Monitored sales trends to maintain optimal on-hand product levels",
        "Performed repairs on equipment including Henny Penny fryers",
        "Created and executed plans to improve sales, speed, and accuracy of operations"
      ]
    },
    {
      title: "Hiring Manager",
      company: "Rolling Dough Ltd",
      location: "Houston, TX",
      date: "January 2019 - November 2024",
      details: [
        "Maintained and utilized Excel sheets to track employee hours and sales metrics",
        "Automated several tasks such as schedule drafting using Python scripts",
        "Performed repairs and maintenance on office and store equipment",
        "Conducted interviews to evaluate prospective employees' communication skills",
        "Performed resume analysis to determine candidates' eligibility for different roles"
      ]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleScroll = () => {
      if (!mainContentRef.current) return;

      const scrollPosition = mainContentRef.current.scrollTop;
      const sectionElements = sections.map(section => document.getElementById(section));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const sectionElement = sectionElements[i];
        if (sectionElement && scrollPosition >= sectionElement.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    const currentMainContent = mainContentRef.current;
    if (currentMainContent) {
      currentMainContent.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentMainContent) {
        currentMainContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement && mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: sectionElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const openModal = (videoUrl, title) => {
    setCurrentVideo({ url: videoUrl, title: title });
    setModalOpen(true);
  };

  return (
    <div className="relative flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Mouse hover effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(128, 90, 213, 0.15), transparent 80%)`,
        }}
      />

      {/* Left Sidebar */}
      <div className="w-80 bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 overflow-y-auto z-20 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-purple-500">
          <img 
            src={profile}
            alt="Jeremiah Warinner" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-center">Jeremiah Warinner</h1>
        <h2 className="text-lg text-purple-400 mb-2">Computer Scientist | Developer </h2>
        <p className="text-sm text-gray-300 mb-6 text-center">"The only legitimate use of a computer is to play games." - Eugene Jarvis</p>
        
        {/* Section Navigation */}
        <ul className="space-y-2 w-full flex-grow">
          {sections.map((section) => (
            <li
              key={section}
              onClick={() => scrollToSection(section)}
              className={`cursor-pointer p-2 rounded transition-colors duration-200 ${
                activeSection === section ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {section}
            </li>
          ))}
        </ul>
        
        {/* Contact Icons */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="mailto:warinnerjeremiah@gmail.com" className="text-purple-400 hover:text-purple-300 cursor-pointer" title="Email">
            <Mail size={24} />
          </a>
          <a href="tel:409-944-5824" className="text-purple-400 hover:text-purple-300 cursor-pointer" title="Phone">
            <Phone size={24} />
          </a>
          <a href="https://www.linkedin.com/in/jeremiah-warinner-8b162821a/" className="text-purple-400 hover:text-purple-300 cursor-pointer" title="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/jeremiahwarinner" className="text-purple-400 hover:text-purple-300 cursor-pointer" title="GitHub">
            <Github size={24} />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={mainContentRef} className="flex-1 p-6 overflow-y-auto z-20">
        <div className="min-h-[calc(100vh+1000px)]">
          <section id="EDUCATION" className="mb-12 opacity-75 hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-2xl font-semibold mb-4">EDUCATION</h2>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 hover:bg-opacity-80">
              <p>
                <strong>Bachelor of Science in Computer Science</strong><br />
                University of Houston-Clear Lake, Houston TX<br />
                Graduation: August 2024
              </p>
            </div>
          </section>

          <section id="TECHNICAL SKILLS" className="mb-12 opacity-75 hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-2xl font-semibold mb-4">TECHNICAL SKILLS</h2>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 hover:bg-opacity-80">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Programming:</strong> Python, Java, Kotlin, SQL, HTML, CSS, JavaScript</li>
                <li><strong>Packages:</strong> Django, Pandas, Dash, Numpy, React, Next.js</li>
                <li><strong>OS:</strong> Linux, Windows</li>
                <li><strong>Tools:</strong> Github, Tableau, Excel, MySQL</li>
              </ul>
            </div>
          </section>

          <section id="PROJECTS" className="mb-12 opacity-75 hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-2xl font-semibold mb-4">PROJECTS</h2>
            <ul className="space-y-6">
              {projects.map((project, index) => (
                <li 
                  key={index} 
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 hover:bg-opacity-80 group cursor-pointer"
                  onClick={() => openModal(project.videoUrl, project.title)}
                >
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    {project.title}
                    <a href={project.link} className="ml-2 text-purple-400 hover:text-purple-300" onClick={(e) => e.stopPropagation()}>
                      <ExternalLink size={16} />
                    </a>
                  </h3>
                  <p className="text-gray-300 mb-2 group-hover:text-white transition-colors duration-300">{project.description}</p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-300"><strong>Technologies:</strong> {project.tech}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="EXPERIENCE" className="opacity-75 hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-2xl font-semibold mb-4">EXPERIENCE</h2>
            <ul className="space-y-6">
              {experiences.map((exp, index) => (
                <li key={index} className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 hover:bg-opacity-80 group">
                  <h3 className="text-lg font-medium mb-1">{exp.title}</h3>
                  <p className="text-sm text-gray-400 mb-2 group-hover:text-gray-200 transition-colors duration-300">{exp.company} | {exp.location} | {exp.date}</p>
                  <ul className="list-disc list-inside text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                    {exp.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        videoUrl={currentVideo.url}
        title={currentVideo.title}
      />
    </div>
  );
};

export default Portfolio;