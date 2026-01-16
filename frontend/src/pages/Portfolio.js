import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Globe, Moon, Sun, Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Portfolio = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl font-semibold"
        >
          {t('Loading...', 'লোড হচ্ছে...')}
        </motion.div>
      </div>
    );
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Fixed Control Buttons */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`backdrop-blur-md px-4 py-2 rounded-full hover:shadow-lg transition-all flex items-center gap-2 ${
            theme === 'dark'
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-slate-900/10 text-slate-900 hover:bg-slate-900/20'
          }`}
          data-testid="theme-toggle-btn"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium">{theme === 'dark' ? t('Light', 'লাইট') : t('Dark', 'ডার্ক')}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLanguage}
          className={`backdrop-blur-md px-4 py-2 rounded-full hover:shadow-lg transition-all flex items-center gap-2 ${
            theme === 'dark'
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-slate-900/10 text-slate-900 hover:bg-slate-900/20'
          }`}
          data-testid="language-toggle-btn"
        >
          <Globe size={20} />
          <span className="font-medium">{language === 'en' ? 'বাংলা' : 'English'}</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20" data-testid="hero-section">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {hero.image_url && (
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                src={hero.image_url}
                alt={hero.name}
                className={`w-48 h-48 rounded-full mx-auto mb-8 object-cover border-4 shadow-2xl ${
                  theme === 'dark' ? 'border-purple-500/50' : 'border-purple-400'
                }`}
                data-testid="hero-image"
              />
            )}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
              theme === 'dark'
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'
            }`}
            data-testid="hero-name"
          >
            {hero.name || t('Your Name', 'আপনার নাম')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-2xl md:text-4xl font-semibold mb-6 ${
              theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
            }`}
            data-testid="hero-title"
          >
            {hero.title || t('Full Stack Developer', 'ফুল স্ট্যাক ডেভেলপার')}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
            data-testid="hero-tagline"
          >
            {hero.tagline || t('Building amazing web and mobile applications', 'দুর্দান্ত ওয়েব এবং মোবাইল অ্যাপ্লিকেশন তৈরি করছি')}
          </motion.p>
          
          {hero.resume_url && (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              href={hero.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all"
              data-testid="resume-link"
            >
              <Download size={24} />
              {t('Download Resume', 'রিজিউম ডাউনলোড করুন')}
            </motion.a>
          )}
        </div>
      </section>

      {/* About Section */}
      {(about.text_en || about.text_bn) && (
        <section className={`py-24 px-4 ${
          theme === 'dark' ? 'bg-black/20' : 'bg-white/40'
        }`} data-testid="about-section">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-5xl font-bold mb-12 text-center ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t('About Me', 'আমার সম্পর্কে')}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className={`backdrop-blur-md rounded-3xl p-10 shadow-2xl border ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/60 border-gray-200'
              }`}
            >
              <p className={`text-xl leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`} data-testid="about-text">
                {language === 'en' ? about.text_en : about.text_bn}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-24 px-4" data-testid="skills-section">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-5xl font-bold mb-16 text-center ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t('Skills & Expertise', 'দক্ষতা এবং অভিজ্ঞতা')}
            </motion.h2>
            <div className="space-y-10">
              {Object.entries(groupedSkills).map(([category, categorySkills], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`backdrop-blur-md rounded-3xl p-8 shadow-xl border ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/60 border-gray-200'
                  }`}
                >
                  <h3 className={`text-3xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-700'
                  }`}>{category}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categorySkills.map((skill, skillIdx) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: skillIdx * 0.05 }}
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        className={`rounded-xl p-5 text-center cursor-pointer shadow-lg ${
                          theme === 'dark'
                            ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30'
                            : 'bg-gradient-to-br from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200'
                        } transition-all`}
                        data-testid={`skill-${skill.id}`}
                      >
                        <p className={`font-bold text-lg ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{skill.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className={`py-24 px-4 ${
          theme === 'dark' ? 'bg-black/20' : 'bg-white/40'
        }`} data-testid="projects-section">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-5xl font-bold mb-16 text-center ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t('Featured Projects', 'বৈশিষ্ট্যযুক্ত প্রকল্পসমূহ')}
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border group ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 hover:border-purple-500/50'
                      : 'bg-white/80 border-gray-200 hover:border-purple-400'
                  } transition-all cursor-pointer`}
                  data-testid={`project-${project.id}`}
                >
                  {project.image_url && (
                    <div className="relative overflow-hidden h-56">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                        theme === 'dark'
                          ? 'bg-gradient-to-t from-purple-900/80 to-transparent'
                          : 'bg-gradient-to-t from-purple-500/60 to-transparent'
                      }`} />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className={`text-3xl font-bold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{project.title}</h3>
                    <p className={`text-lg mb-6 leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {language === 'en' ? project.description_en : project.description_bn}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack.map((tech, techIdx) => (
                        <motion.span
                          key={techIdx}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: techIdx * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            theme === 'dark'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.project_url && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 font-semibold ${
                            theme === 'dark'
                              ? 'text-blue-400 hover:text-blue-300'
                              : 'text-blue-600 hover:text-blue-500'
                          } transition-colors`}
                          data-testid={`project-link-${project.id}`}
                        >
                          {t('View Project', 'প্রকল্প দেখুন')}
                          <ExternalLink size={18} />
                        </motion.a>
                      )}
                      {project.github_url && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 font-semibold ${
                            theme === 'dark'
                              ? 'text-gray-400 hover:text-gray-300'
                              : 'text-gray-600 hover:text-gray-500'
                          } transition-colors`}
                          data-testid={`github-link-${project.id}`}
                        >
                          <Github size={18} />
                          GitHub
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {contact.email && (
        <section className="py-24 px-4" data-testid="contact-section">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-5xl font-bold mb-16 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t('Get In Touch', 'যোগাযোগ করুন')}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className={`backdrop-blur-md rounded-3xl p-10 shadow-2xl border ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/60 border-gray-200'
              }`}
            >
              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center gap-4"
                >
                  <Mail className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={24} />
                  <p className={`text-xl ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`} data-testid="contact-email">
                    {contact.email}
                  </p>
                </motion.div>
                {contact.phone && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-center gap-4"
                  >
                    <Phone className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={24} />
                    <p className={`text-xl ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`} data-testid="contact-phone">
                      {contact.phone}
                    </p>
                  </motion.div>
                )}
                {contact.location && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-center gap-4"
                  >
                    <MapPin className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={24} />
                    <p className={`text-xl ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`} data-testid="contact-location">
                      {contact.location}
                    </p>
                  </motion.div>
                )}
                <div className="flex justify-center gap-6 mt-8 pt-6 border-t ${
                  theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }">
                  {contact.github && (
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      href={contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full ${
                        theme === 'dark'
                          ? 'bg-white/10 hover:bg-white/20 text-white'
                          : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900'
                      } transition-all`}
                      data-testid="contact-github"
                    >
                      <Github size={28} />
                    </motion.a>
                  )}
                  {contact.linkedin && (
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full ${
                        theme === 'dark'
                          ? 'bg-white/10 hover:bg-white/20 text-white'
                          : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900'
                      } transition-all`}
                      data-testid="contact-linkedin"
                    >
                      <Linkedin size={28} />
                    </motion.a>
                  )}
                  {contact.twitter && (
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      href={contact.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full ${
                        theme === 'dark'
                          ? 'bg-white/10 hover:bg-white/20 text-white'
                          : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900'
                      } transition-all`}
                      data-testid="contact-twitter"
                    >
                      <Twitter size={28} />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`py-8 text-center border-t ${
          theme === 'dark'
            ? 'text-gray-400 border-white/10'
            : 'text-gray-600 border-gray-200'
        }`}
      >
        <p className="text-lg">&copy; {new Date().getFullYear()} {hero.name || t('Portfolio', 'পোর্টফোলিও')}. {t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}</p>
      </motion.footer>
    </div>
  );
};

export default Portfolio;