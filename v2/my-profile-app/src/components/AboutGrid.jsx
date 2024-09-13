import React, { useState } from 'react';

const sections = ['EDUCATION', 'TECHNICAL SKILLS','CERTIFICATIONS', 'EXPERIENCE'];

const AboutGrid = ({ aboutMe, openAboutModal }) => {
  const [activeSection, setActiveSection] = useState(null);

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
        "Built Microservices according to CLEAN architecture guidelines",
        "Worked in an Agile SCRUM environment"
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

  return (
    <div className="bg-gray-900 text-gray-300 p-6">
      <div className="space-y-8">
        {sections.map((section) => (
          <section
            key={section}
            id={section}
            className={`transition-all duration-300 ${
              activeSection === section ? 'opacity-100' : 'opacity-75'
            }`}
            onMouseEnter={() => setActiveSection(section)}
            onMouseLeave={() => setActiveSection(null)}
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-300">{section}</h2>
            <div className={`bg-gray-800 p-4 rounded-lg shadow-sm transition-all duration-300 ${
              activeSection === section ? 'border-l-4 border-purple-500 pl-5' : ''
            }`}>
              {section === 'EDUCATION' && (
                <p className="text-gray-300">
                  <strong className="text-purple-300">Bachelor of Science in Computer Science</strong><br />
                  University of Houston-Clear Lake, Houston TX<br />
                  Graduation: August 2024
                </p>
              )}
              {section === 'CERTIFICATIONS' && (
                <p className="text-gray-300">
                <strong className="text-purple-300">Foundations of Site Reliability Engineering</strong><br />
                Mthree, Houston TX<br />
                Issued: July 2024
              </p>
              )}

              {section === 'TECHNICAL SKILLS' && (
                <ul className="space-y-2 text-gray-300">
                  <li><strong className="text-purple-300">Programming:</strong> Python, Kotlin, SQL, HTML, CSS, JavaScript, GraphQL, PromQL, Yaml</li>
                  <li><strong className="text-purple-300">Packages:</strong> Flask, Pandas, Dash, Numpy, React, Next.js</li>
                  <li><strong className="text-purple-300">OS:</strong> Linux, Windows</li>
                  <li><strong className="text-purple-300">Tools:</strong> Github, Tableau, Excel, MySQL, Grafana, Prometheus, Kubernetes, Jenkins</li>
                </ul>
              )}

              {section === 'EXPERIENCE' && (
                <ul className="space-y-6">
                  {experiences.map((exp, index) => (
                    <li key={index} className="bg-gray-700 p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium mb-1 text-purple-300">{exp.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{exp.company} | {exp.location} | {exp.date}</p>
                      <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                        {exp.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}

            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AboutGrid;