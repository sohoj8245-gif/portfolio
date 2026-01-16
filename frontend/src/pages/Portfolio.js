import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Portfolio = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [hero, setHero] = useState({});
  const [about, setAbout] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const [heroRes, aboutRes, skillsRes, projectsRes, contactRes] = await Promise.all([
        axios.get(`${API}/portfolio/hero`),
        axios.get(`${API}/portfolio/about`),
        axios.get(`${API}/portfolio/skills`),
        axios.get(`${API}/portfolio/projects`),
        axios.get(`${API}/portfolio/contact`)
      ]);

      setHero(heroRes.data);
      setAbout(aboutRes.data);
      setSkills(skillsRes.data);
      setProjects(projectsRes.data);
      setContact(contactRes.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-xl">{t('Loading...', 'লোড হচ্ছে...')}</div>
      </div>
    );
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all flex items-center gap-2 shadow-lg"
        data-testid="language-toggle-btn"
      >
        <Globe size={20} />
        <span className="font-medium">{language === 'en' ? 'বাংলা' : 'English'}</span>
      </button>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20" data-testid="hero-section">
        <div className="max-w-4xl mx-auto text-center">
          {hero.image_url && (
            <img
              src={hero.image_url}
              alt={hero.name}
              className="w-40 h-40 rounded-full mx-auto mb-8 object-cover border-4 border-white/20 shadow-2xl"
              data-testid="hero-image"
            />
          )}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4" data-testid="hero-name">
            {hero.name || t('Your Name', 'আপনার নাম')}
          </h1>
          <p className="text-2xl md:text-3xl text-blue-400 mb-6" data-testid="hero-title">
            {hero.title || t('Full Stack Developer', 'ফুল স্ট্যাক ডেভেলপার')}
          </p>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-testid="hero-tagline">
            {hero.tagline || t('Building amazing web and mobile applications', 'দুর্দান্ত ওয়েব এবং মোবাইল অ্যাপ্লিকেশন তৈরি করছি')}
          </p>
          {hero.resume_url && (
            <a
              href={hero.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg"
              data-testid="resume-link"
            >
              {t('Download Resume', 'রিজিউম ডাউনলোড করুন')}
            </a>
          )}
        </div>
      </section>

      {/* About Section */}
      {(about.text_en || about.text_bn) && (
        <section className="py-20 px-4" data-testid="about-section">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              {t('About Me', 'আমার সম্পর্কে')}
            </h2>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
              <p className="text-lg text-gray-300 leading-relaxed" data-testid="about-text">
                {language === 'en' ? about.text_en : about.text_bn}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-20 px-4 bg-black/20" data-testid="skills-section">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              {t('Skills & Expertise', 'দক্ষতা এবং অভিজ্ঞতা')}
            </h2>
            <div className="space-y-8">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                  <h3 className="text-2xl font-semibold text-blue-400 mb-4">{category}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-all"
                        data-testid={`skill-${skill.id}`}
                      >
                        <p className="text-white font-medium">{skill.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-20 px-4" data-testid="projects-section">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              {t('Featured Projects', 'বৈশিষ্ট্যযুক্ত প্রকল্পসমূহ')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl hover:transform hover:scale-105 transition-all"
                  data-testid={`project-${project.id}`}
                >
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4">
                      {language === 'en' ? project.description_en : project.description_bn}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                          data-testid={`project-link-${project.id}`}
                        >
                          {t('View Project', 'প্রকল্প দেখুন')} →
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-300"
                          data-testid={`github-link-${project.id}`}
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {contact.email && (
        <section className="py-20 px-4 bg-black/20" data-testid="contact-section">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              {t('Get In Touch', 'যোগাযোগ করুন')}
            </h2>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
              <div className="space-y-4 text-gray-300">
                <p className="text-xl" data-testid="contact-email">
                  <span className="text-blue-400">{t('Email', 'ইমেইল')}:</span> {contact.email}
                </p>
                {contact.phone && (
                  <p className="text-xl" data-testid="contact-phone">
                    <span className="text-blue-400">{t('Phone', 'ফোন')}:</span> {contact.phone}
                  </p>
                )}
                {contact.location && (
                  <p className="text-xl" data-testid="contact-location">
                    <span className="text-blue-400">{t('Location', 'অবস্থান')}:</span> {contact.location}
                  </p>
                )}
                <div className="flex justify-center gap-6 mt-6">
                  {contact.github && (
                    <a
                      href={contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 transition-colors"
                      data-testid="contact-github"
                    >
                      GitHub
                    </a>
                  )}
                  {contact.linkedin && (
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 transition-colors"
                      data-testid="contact-linkedin"
                    >
                      LinkedIn
                    </a>
                  )}
                  {contact.twitter && (
                    <a
                      href={contact.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 transition-colors"
                      data-testid="contact-twitter"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} {hero.name || t('Portfolio', 'পোর্টফোলিও')}. {t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}</p>
      </footer>
    </div>
  );
};

export default Portfolio;