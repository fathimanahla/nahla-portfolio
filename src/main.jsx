import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function Icon({ name, size = 18 }) {
  const paths = {
    arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    down: <><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
    github: <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></>,
    code: <><path d="m8 17-5-5 5-5m8 0 5 5-5 5m-2-13-4 16" /></>,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}

const projects = [
  {
    number: "01",
    title: "CampusVision AI",
    category: "COMPUTER VISION",
    description:
      "A campus-surveillance prototype using YOLO for object detection and zone-based monitoring.",
    tags: ["Python", "YOLO", "OpenCV"],
    link: "https://github.com/fathimanahla/CampusVision-AI",
  },
  {
    number: "02",
    title: "Customer Complaint Classification",
    category: "NLP / MACHINE LEARNING",
    description:
      "A text-classification system exploring complaint categories and automated ticket routing.",
    tags: ["Python", "NLP", "Machine Learning"],
    link: "https://github.com/fathimanahla/Customer-Complaint-Classification-and-Ticket-Routing-System",
  },
  {
    number: "03",
    title: "LeafGuard",
    category: "AI / AGRICULTURE",
    description:
      "An AI project exploring plant-leaf analysis and technology-assisted agricultural support.",
    tags: ["Python", "AI", "Computer Vision"],
    link: "https://github.com/fathimanahla/leafguard",
  },
  {
    number: "04",
    title: "Multi-Client Chat System",
    category: "SOFTWARE / NETWORKING",
    description:
      "A messaging project exploring communication between multiple connected clients.",
    tags: ["Python", "Networking", "Software"],
    link: "https://github.com/fathimanahla/Multi-client-chat-system",
  },
  {
    number: "05",
    title: "TrackX",
    category: "SOFTWARE PROJECT",
    description:
      "A project in my development journey. The public repository is not available yet.",
    tags: ["Development", "Problem solving"],
    link: null,
  },
];

const skills = [
  "Python",
  "C",
  "C++",
  "Java",
  "Machine Learning",
  "YOLO",
  "Computer Vision",
  "NLP",
  "OpenCV",
  "Git & GitHub",
  "Power BI",
  "Tableau",
  "Excel",
];

const navigation = [
  ["home", "Home"],
  ["about", "About"],
  ["projects", "Projects"],
  ["experience", "Journey"],
  ["contact", "Contact"],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navigation
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function handlePortraitMove(event) {
    const visual = event.currentTarget;
    const rect = visual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const portrait = visual.querySelector(".hero-portrait");

    if (portrait) {
      portrait.style.animation = "none";
      portrait.style.transform =
        `perspective(900px) rotateY(${x * 20}deg) rotateX(${-y * 16}deg) translateY(-5px) scale(1.035)`;
    }
  }

  function resetPortrait(event) {
    const portrait = event.currentTarget.querySelector(".hero-portrait");

    if (portrait) {
      portrait.style.transform = "";
      portrait.style.animation = "";
    }
  }

  return (
    <div className="portfolio">
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <a
          className="brand"
          href="#home"
          onClick={() => setMenuOpen(false)}
          aria-label="Nahla home"
        >
          <span className="brand-mark">N.</span>
          <span className="brand-name">NAHLA FATIMA</span>
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={22} />
        </button>

        <nav
          className={`nav-links ${menuOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link ${activeSection === id ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}

          <a className="nav-contact" href="mailto:fathimanahla@gmail.com">
            LET'S TALK <Icon name="arrow" size={14} />
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              AI & ML ENGINEERING STUDENT
            </div>

            <p className="hero-pretitle">Curious mind. Practical builder.</p>

            <h1>
              Hello, I'm
              <br />
              <span className="hero-name">Nahla</span>
              <span className="hero-period">.</span>
            </h1>

            <p className="hero-description">
              I explore the space between artificial intelligence and
              real-world problems — turning ideas into projects, one experiment
              at a time.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                EXPLORE MY WORK <Icon name="arrow" size={16} />
              </a>

              <a className="button button-quiet" href="#about">
                A LITTLE ABOUT ME <Icon name="down" size={15} />
              </a>
            </div>

            <div className="hero-socials">
              <a
                href="https://github.com/fathimanahla"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Icon name="github" size={19} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size={19} />
              </a>

              <a href="mailto:fathimanahla@gmail.com" aria-label="Email">
                <Icon name="mail" size={19} />
              </a>

              <span className="social-caption">
                A FEW CORNERS OF THE INTERNET
              </span>
            </div>
          </div>

          {/* SMALL PORTRAIT WITH 3D TILT */}
          <div
            className="hero-visual"
            aria-label="Portrait of Nahla"
            onMouseMove={handlePortraitMove}
            onMouseLeave={resetPortrait}
          >
            <span className="visual-index">
              FIG. 01 — A WORK IN PROGRESS
            </span>

            <div className="portrait-glow" />
            <div className="portrait-orbit orbit-one" />
            <div className="portrait-orbit orbit-two" />

            <span className="portrait-label label-top">
              ✳ LEARN / BUILD / REPEAT
            </span>

            <img
              className="hero-portrait"
              src="/nahla-3d.png"
              alt="Nahla — AI and Machine Learning engineering student"
              draggable="false"
              onError={(event) => {
                console.error(
                  "Portrait not found. Check public/nahla-3d.png"
                );
                event.currentTarget.style.visibility = "hidden";
              }}
            />

            <span className="portrait-label label-bottom">
              <span className="status-dot" />
              BASED IN INDIA · AI / ML
            </span>

            <span className="visual-footer">
              THOUGHTFULLY IN PROGRESS
            </span>
          </div>

          <a className="scroll-cue" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <Icon name="down" size={16} />
          </a>
        </section>

        {/* INTERESTS */}
        <section className="intro-strip" aria-label="Areas of interest">
          <span>ARTIFICIAL INTELLIGENCE</span>
          <span className="strip-star">✳</span>
          <span>COMPUTER VISION</span>
          <span className="strip-star">✳</span>
          <span>CONTINUOUS LEARNING</span>
          <span className="strip-star">✳</span>
          <span>BUILDING WITH PURPOSE</span>
        </section>

        {/* ABOUT */}
        <section className="content-section section-shell" id="about">
          <div className="section-heading">
            <span className="section-number">01 / ABOUT</span>
            <h2>
              A little about
              <br />
              <span>the person behind the code.</span>
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-lead">
              <span className="red-asterisk">✳</span>
              <p>
                I'm an AI & ML engineering student who enjoys understanding
                how technology works — and finding ways to make it useful.
              </p>
            </div>

            <div className="about-detail">
              <p>
                From experimenting with object detection to exploring text
                classification, I'm building my skills through hands-on
                projects and continuous practice.
              </p>

              <p>
                I'm still learning, still asking questions, and still finding
                ways to turn what I learn into something meaningful.
              </p>

              <a className="text-link" href="#contact">
                GET TO KNOW ME <Icon name="arrow" size={15} />
              </a>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">08.57</span>
              <span className="stat-label">CURRENT CGPA</span>
            </div>

            <div className="stat-item">
              <span className="stat-value">AI/ML</span>
              <span className="stat-label">FIELD OF STUDY</span>
            </div>

            <div className="stat-item">
              <span className="stat-value">2027</span>
              <span className="stat-label">EXPECTED GRADUATION</span>
            </div>

            <div className="stat-item">
              <span className="stat-value">∞</span>
              <span className="stat-label">THINGS TO LEARN</span>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="projects-section" id="projects">
          <div className="section-shell">
            <div className="section-heading projects-heading">
              <span className="section-number">02 / SELECTED WORK</span>
              <h2>
                Made with curiosity.
                <br />
                <span>Improved by doing.</span>
              </h2>

              <p className="section-intro">
                A selection of projects I've worked on while learning to build
                practical software and AI solutions.
              </p>
            </div>

            <div className="project-list">
              {projects.map((project) => (
                <article className="project-row" key={project.number}>
                  <span className="project-number">{project.number}</span>

                  <div className="project-main">
                    <span className="project-category">
                      {project.category}
                    </span>

                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="project-action">
                    {project.link ? (
                      <a
                        className="project-link"
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} repository`}
                      >
                        <Icon name="arrow" size={20} />
                      </a>
                    ) : (
                      <span className="repo-unavailable">
                        REPOSITORY
                        <br />
                        NOT AVAILABLE
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="projects-bottom">
              <span>EVERY PROJECT STARTS WITH A QUESTION.</span>

              <a
                className="text-link"
                href="https://github.com/fathimanahla"
                target="_blank"
                rel="noreferrer"
              >
                MORE ON GITHUB <Icon name="arrow" size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* EDUCATION AND SKILLS */}
        <section className="content-section section-shell" id="experience">
          <div className="section-heading">
            <span className="section-number">03 / EDUCATION & SKILLS</span>
            <h2>
              Learning is
              <br />
              <span>part of the process.</span>
            </h2>
          </div>

          <div className="experience-grid">
            <div className="education-column">
              <span className="subsection-label">EDUCATION</span>

              <article className="education-card">
                <span className="education-date">2023 — 2027</span>
                <h3>B.E. Artificial Intelligence & Machine Learning</h3>
                <p>P.A. College of Engineering, Mangalore</p>
                <span className="education-note">CGPA: 8.57</span>
              </article>

              <article className="education-card">
                <span className="education-date">2020 — 2022</span>
                <h3>Pre-University — Science</h3>
                <p>Kunil Higher Secondary School Muttam</p>
                <span className="education-note">97.6%</span>
              </article>

              <article className="education-card">
                <span className="education-date">2020</span>
                <h3>SSLC — CBSE</h3>
                <p>Kuni Education Trust</p>
                <span className="education-note">88.8%</span>
              </article>
            </div>

            <div className="skills-column">
              <span className="subsection-label">
                TOOLS & TECHNOLOGIES
              </span>

              <p className="skills-description">
                Tools I'm learning and using across my coursework and projects.
              </p>

              <div className="skills-cloud">
                {skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>

              <div className="learning-note">
                <div className="learning-icon">
                  <Icon name="code" size={22} />
                </div>

                <div>
                  <h3>Always in learning mode.</h3>
                  <p>
                    My focus is on strengthening fundamentals, building real
                    projects, and becoming a better problem solver.
                  </p>
                </div>
              </div>

              <div className="certification-note">
                <span className="red-asterisk">✳</span>

                <div>
                  <strong>OTHER HIGHLIGHTS</strong>
                  <p>
                    IEEE member · Google Cloud Computing Foundation ·
                    Hackathon participation · PAETRIX × Hack Summit 2026
                    volunteer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact-section" id="contact">
          <div className="section-shell contact-shell">
            <div className="contact-topline">
              <span className="section-number">04 / CONTACT</span>
              <span>THE NEXT CHAPTER STARTS SOMEWHERE.</span>
            </div>

            <div className="contact-grid">
              <div className="contact-copy">
                <span className="contact-kicker">
                  HAVE SOMETHING IN MIND?
                </span>

                <h2>
                  Let's make
                  <br />
                  <span>something matter.</span>
                </h2>

                <p>
                  Open to internships, collaborative projects, and
                  opportunities to learn from people building interesting
                  things.
                </p>

                <a
                  className="button button-primary contact-button"
                  href="mailto:fathimanahla@gmail.com"
                >
                  SAY HELLO <Icon name="arrow" size={17} />
                </a>
              </div>

              <div className="contact-visual">
                <div className="contact-orbit" />
                <span className="contact-side-note">
                  A WORK IN PROGRESS — ALWAYS.
                </span>
                <span className="contact-star">✳</span>
                <span className="contact-monogram">N.</span>
              </div>
            </div>

            <div className="contact-links">
              <a href="mailto:fathimanahla@gmail.com">
                <Icon name="mail" size={17} /> EMAIL
              </a>

              <a
                href="https://github.com/fathimanahla"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="github" size={17} /> GITHUB
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="linkedin" size={17} /> LINKEDIN
              </a>
            </div>

            <footer className="site-footer">
              <a href="#home" className="footer-brand">N.</a>
              <span>DESIGNED WITH INTENTION. BUILT WHILE LEARNING.</span>

              <a href="#home" className="back-to-top">
                BACK TO TOP <Icon name="arrow" size={14} />
              </a>

              <span className="copyright">© 2026 NAHLA</span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
