import { useEffect, useRef } from 'react'
import './App.css'
import avatar from './assets/anuj_image.jpeg'

function App() {
  const sectionsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      number: '01',
      title: 'Heliix – Federated Social Platform',
      description:
        'Privacy-first distributed social network inspired by ActivityPub with federation, inbox/outbox, timelines, mutual connections, multi-instance backend architecture.',
      tags: ['ActivityPub', 'Federation', 'Backend', 'Distributed'],
      link: 'https://github.com/federated-social-network/fsn-backend',
      liveLink: 'https://heliix.live',
      pinned: true,
    },
    {
      number: '02',
      title: 'ACtimize – Smart AC Cost Optimizer',
      description:
        'Predicts AC electricity cost using ML and gives AI-powered energy-saving recommendations.',
      tags: ['ML', 'Python', 'AI', 'Energy'],
      link: 'https://github.com/a-anuj/ACtimize',
    },
    {
      number: '03',
      title: 'Customer Churn Prediction System',
      description:
        'Predicts telecom customer churn probability with retention suggestions using ML + LLM.',
      tags: ['ML', 'LLM', 'Python', 'Telecom'],
      link: 'https://github.com/a-anuj/customer-churn-prediction',
    },
    {
      number: '04',
      title: 'Traffic Volume Forecasting',
      description:
        'Time-series forecasting project comparing ARIMA with Temporal Fusion Transformers using dashboards.',
      tags: ['TFT', 'ARIMA', 'Time-Series', 'Dashboard'],
      link: 'https://github.com/a-anuj/tft-traffic-volume-analysis',
    },
    {
      number: '05',
      title: 'ScrapeMate',
      description:
        'AI-powered website reader using RAG that answers questions from any webpage URL.',
      tags: ['RAG', 'AI', 'NLP', 'Python'],
      link: 'https://github.com/a-anuj/ScrapeMate',
    },
    {
      number: '06',
      title: 'GrowSmart',
      description:
        'Smart urban farming platform with plant monitoring, AI suggestions, community tools, and dashboard.',
      tags: ['AI', 'IoT', 'Full-Stack', 'Dashboard'],
      link: 'https://github.com/a-anuj',
    },
    {
      number: '07',
      title: 'FlashFeedAgent',
      description:
        'WhatsApp news assistant using Agentic RAG workflows to deliver summarized news.',
      tags: ['Agentic RAG', 'WhatsApp', 'AI', 'NLP'],
      link: 'https://github.com/a-anuj/flashFeedAgent',
      pinned: true,
    },
    {
      number: '08',
      title: 'Seekr',
      description:
        'Fedora/Linux utility tool packaged for COPR, focused on system usability and automation.',
      tags: ['Python', 'Linux', 'COPR', 'CLI'],
      link: 'https://github.com/a-anuj/seekr',
      liveLink: 'https://copr.fedorainfracloud.org/coprs/a-anuj/seekr/',
      pinned: true,
    },
    {
      number: '09',
      title: 'Clinical Policy Intelligence Copilot',
      description:
        'RAG-based enterprise HealthTech system for querying SOPs, policies, accreditation docs.',
      tags: ['RAG', 'HealthTech', 'Enterprise', 'AI'],
      link: 'https://github.com/a-anuj',
    },
    {
      number: '10',
      title: 'Flask Blog App',
      description:
        'Full-stack blog platform using Flask with authentication and CRUD features.',
      tags: ['Flask', 'Python', 'Full-Stack', 'Auth'],
      link: 'https://github.com/a-anuj/flask-projects',
    },
    {
      number: '11',
      title: 'FastAPI Social Media API',
      description:
        'REST API backend for social platform features like posts, users, auth.',
      tags: ['FastAPI', 'REST', 'Python', 'Auth'],
      link: 'https://github.com/a-anuj/fastapi-app',
    },
    {
      number: '12',
      title: 'Django E-Commerce Website',
      description:
        'E-commerce platform built with Django + Tailwind with catalog and transactions.',
      tags: ['Django', 'Tailwind', 'E-Commerce', 'Python'],
      link: 'https://github.com/a-anuj',
    },
  ]

  const skills = [
    {
      category: 'Languages',
      items: ['Python', 'Java', 'JavaScript', 'C/C++'],
    },
    {
      category: 'Database',
      items: ['MySQL', 'PostgreSQL'],
    },
    {
      category: 'Fullstack Frameworks',
      items: ['Flask', 'FastAPI', 'Vue.js'],
    },
    {
      category: 'GenAI/ML Tools',
      items: ['LangChain', 'Hugging Face', 'LangGraph', 'scikit-learn', 'TensorFlow'],
    },
    {
      category: 'Version Control/DevOps',
      items: ['Git', 'GitHub', 'Docker'],
    },
    {
      category: 'Operating Systems',
      items: ['Linux (Ubuntu, Fedora)', 'Windows'],
    },
  ]

  return (
    <>
      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <div className="navbar-logo">A.</div>
        <ul className="navbar-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">
              <span className="gold">Anuj</span>
            </h1>
            <p className="hero-tagline">
              Computer Science undergraduate with hands-on experience in full-stack development, AI/ML, and backend engineering.
Skilled in FastAPI, Flask, and modern AI/ML tools, with experience building scalable applications and intelligent systems.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn-primary">View Work →</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>
          </div>
          <div className="hero-image">
            <img src={avatar} alt="Anuj — Developer" className="hero-avatar" />
          </div>
        </div>
      </section>

      {/* About */}
      <div className="about-bg">
      <section className="section fade-in" id="about">
        <p className="section-label"></p>
        <h2 className="section-title">A bit about me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a Computer Science undergraduate from India who enjoys building practical software that solves real-world problems. My experience spans full-stack development, from crafting responsive frontends with modern frameworks to developing scalable backend systems using Python and FastAPI.
I’m also deeply interested in AI and machine learning, and I enjoy turning ideas into working products through hands-on projects and hackathons. Beyond coding, I spend time exploring Linux environments, experimenting with new technologies, and refining clean, user-focused interfaces.
I value simplicity, continuous learning, and building technology with purpose.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Projects Built</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">19+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Curiosity</div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Experience */}
      <section className="section fade-in" id="experience">
        <p className="section-label">Experience</p>
        <h2 className="section-title">Where I've worked</h2>
        <div className="experience-card">
          <div className="experience-header">
            <div>
              <h3 className="experience-role">Python AI Developer Intern</h3>
              <p className="experience-company">Avyant Technologies</p>
            </div>
            <span className="experience-date">Jan 2026 – Apr 2026</span>
          </div>
          <ul className="experience-list">
            <li>Developed computer vision models for <strong>theft detection, fire/spark detection, and license plate recognition</strong> for CCTV-based surveillance systems.</li>
            <li>Implemented image-based detection pipelines using Python to process CCTV snapshots, enabling automated event detection with improved accuracy and reduced false positives.</li>
          </ul>
        </div>
      </section>

      {/* Skills */}
      <div className="skills-bg">
        <section className="section fade-in" id="skills">
          <p className="section-label">Skills</p>
          <h2 className="section-title">What I work with</h2>
          <div className="skills-grid">
            {skills.map((group) => (
              <div className="skill-category" key={group.category}>
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Projects */}
      <section className="section fade-in" id="projects">
        <p className="section-label">Projects</p>
        <h2 className="section-title">Selected work</h2>
        <div className="projects-grid">
          {[...projects.filter(p => p.pinned), ...projects.filter(p => !p.pinned)].map((project) => (
            <div className="project-card" key={project.number}>
              {project.pinned && <svg className="pin-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>}
              <div className="project-number">{project.number}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span className="project-tag" key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                  GitHub →
                </a>
                {project.liveLink && (
                  <a href={project.liveLink} className="project-link" target="_blank" rel="noopener noreferrer">
                    Live ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <div className="achievements-bg">
      <section className="section fade-in" id="achievements">
        <p className="section-label">Achievements</p>
        <h2 className="section-title">Highlights</h2>
        <div className="achievements-list">
          <div className="achievement-item">
            <span className="achievement-icon"></span>
            <p>Won <strong>Build2Break</strong>, a <strong>24-hour hackathon</strong> by <strong>IDEA Club, Amrita</strong> at <strong>Anokha</strong>, in the <strong>MedTech domain</strong>, for delivering an end-to-end technical solution.</p>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon"></span>
            <p>Honourable Mention at <strong>Codeathon, Thiran 2025</strong> among 250+ teams for developing the <strong>GrowSmart</strong>, an <strong>AI-powered urban farming</strong> project.</p>
          </div>
        </div>
      </section>
      </div>

      {/* Certifications */}
      <section className="section fade-in" id="certifications">
        <p className="section-label">Certifications</p>
        <h2 className="section-title">Credentials</h2>
        <div className="certifications-list">
          <div className="certification-item">
            <span className="certification-dot"></span>
            <p>Machine Learning Specialization — <strong>Stanford University</strong> (Coursera)</p>
          </div>
          <div className="certification-item">
            <span className="certification-dot"></span>
            <p>LangChain for LLM Application Development — <strong>DeepLearning.AI</strong></p>
          </div>
          <div className="certification-item">
            <span className="certification-dot"></span>
            <p>AI Agents in LangGraph — <strong>DeepLearning.AI</strong></p>
          </div>
        </div>
      </section>

      {/* Education */}
      <div className="education-bg">
      <section className="section fade-in" id="education">
        <p className="section-label">Education</p>
        <h2 className="section-title">Academic background</h2>
        <div className="education-grid">
          <div className="education-card">
            <div className="experience-header">
              <div>
                <h3 className="experience-role">Amrita University</h3>
                <p className="experience-company">Bachelor of Technology in Computer Science and Engineering</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="experience-date">Expected Jul 2027</span>
                <p className="education-score">GPA: 8.75/10</p>
              </div>
            </div>
          </div>
          <div className="education-card">
            <div className="experience-header">
              <div>
                <h3 className="experience-role">P.A. International School — Class XII</h3>
                <p className="experience-company">Central Board of Secondary Education (CBSE)</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="experience-date">2023</span>
                <p className="education-score">Percentage: 89%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Contact */}
      <section className="section fade-in" id="contact">
        <p className="section-label">Contact</p>
        <h2 className="section-title">Let's connect</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p>
              I'm always open to discussing new projects, creative ideas,
              or opportunities to be part of something meaningful.
              Feel free to reach out.
            </p>
            <div className="contact-links">
              <a href="mailto:anujamirthalingam1@gmail.com" className="contact-link-item">
                <span className="contact-link-icon">✉</span>
                anujamirthalingam1@gmail.com
              </a>
              <a href="https://github.com/a-anuj" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <span className="contact-link-icon">⌘</span>
                github.com/a-anuj
              </a>
              <a href="https://www.linkedin.com/in/anuj-a-8060bb291/" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <span className="contact-link-icon">◆</span>
                LinkedIn
              </a>
            </div>
            <a href="mailto:anujamirthalingam1@gmail.com" className="btn-primary" style={{ marginTop: '32px', display: 'inline-flex' }}>
              Send Message →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          © 2026 <span className="gold">Anuj</span> — Built with care.
        </p>
      </footer>
    </>
  )
}

export default App
