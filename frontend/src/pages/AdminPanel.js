import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LogOut, Save, Plus, Trash2, Edit } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPanel = () => {
  const { logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('hero');
  const [hero, setHero] = useState({});
  const [about, setAbout] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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
      showMessage('Error loading data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveHero = async () => {
    try {
      await axios.put(`${API}/portfolio/hero`, hero);
      showMessage(t('Hero section updated!', 'হিরো সেকশন আপডেট হয়েছে!'));
    } catch (error) {
      showMessage(t('Error updating hero section', 'হিরো সেকশন আপডেট এরর'), 'error');
    }
  };

  const saveAbout = async () => {
    try {
      await axios.put(`${API}/portfolio/about`, about);
      showMessage(t('About section updated!', 'আবাউট সেকশন আপডেট হয়েছে!'));
    } catch (error) {
      showMessage(t('Error updating about section', 'আবাউট সেকশন আপডেট এরর'), 'error');
    }
  };

  const addSkill = async () => {
    const newSkill = { name: '', category: 'Frontend', icon: '' };
    try {
      const res = await axios.post(`${API}/portfolio/skills`, newSkill);
      setSkills([...skills, { ...newSkill, id: res.data.id }]);
      showMessage(t('Skill added!', 'স্কিল যুক্ত হয়েছে!'));
    } catch (error) {
      showMessage(t('Error adding skill', 'স্কিল যুক্ত করতে এরর'), 'error');
    }
  };

  const updateSkill = async (skillId, updatedSkill) => {
    try {
      await axios.put(`${API}/portfolio/skills/${skillId}`, updatedSkill);
      setSkills(skills.map(s => s.id === skillId ? updatedSkill : s));
      showMessage(t('Skill updated!', 'স্কিল আপডেট হয়েছে!'));
    } catch (error) {
      showMessage(t('Error updating skill', 'স্কিল আপডেট এরর'), 'error');
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      await axios.delete(`${API}/portfolio/skills/${skillId}`);
      setSkills(skills.filter(s => s.id !== skillId));
      showMessage(t('Skill deleted!', 'স্কিল ডিলিট হয়েছে!'));
    } catch (error) {
      showMessage(t('Error deleting skill', 'স্কিল ডিলিট এরর'), 'error');
    }
  };

  const addProject = async () => {
    const newProject = {
      title: '',
      description_en: '',
      description_bn: '',
      tech_stack: [],
      image_url: '',
      project_url: '',
      github_url: '',
      order: projects.length
    };
    try {
      const res = await axios.post(`${API}/portfolio/projects`, newProject);
      setProjects([...projects, { ...newProject, id: res.data.id }]);
      showMessage(t('Project added!', 'প্রজেক্ট যুক্ত হয়েছে!'));
    } catch (error) {
      showMessage(t('Error adding project', 'প্রজেক্ট যুক্ত করতে এরর'), 'error');
    }
  };

  const updateProject = async (projectId, updatedProject) => {
    try {
      await axios.put(`${API}/portfolio/projects/${projectId}`, updatedProject);
      setProjects(projects.map(p => p.id === projectId ? updatedProject : p));
      showMessage(t('Project updated!', 'প্রজেক্ট আপডেট হয়েছে!'));
    } catch (error) {
      showMessage(t('Error updating project', 'প্রজেক্ট আপডেট এরর'), 'error');
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`${API}/portfolio/projects/${projectId}`);
      setProjects(projects.filter(p => p.id !== projectId));
      showMessage(t('Project deleted!', 'প্রজেক্ট ডিলিট হয়েছে!'));
    } catch (error) {
      showMessage(t('Error deleting project', 'প্রজেক্ট ডিলিট এরর'), 'error');
    }
  };

  const saveContact = async () => {
    try {
      await axios.put(`${API}/portfolio/contact`, contact);
      showMessage(t('Contact info updated!', 'কনটাক্ট ইনফো আপডেট হয়েছে!'));
    } catch (error) {
      showMessage(t('Error updating contact info', 'কনটাক্ট ইনফো আপডেট এরর'), 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl">{t('Loading...', 'লোড হচ্ছে...')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">{t('Admin Panel', 'অ্যাডমিন প্যানেল')}</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            data-testid="logout-btn"
          >
            <LogOut size={20} />
            <span>{t('Logout', 'লগআউট')}</span>
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-green-500 text-white text-center py-3 px-4" data-testid="success-message">
          {message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {['hero', 'about', 'skills', 'projects', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
              data-testid={`tab-${tab}`}
            >
              {t(tab, tab)}
            </button>
          ))}
        </div>

        {/* Hero Tab */}
        {activeTab === 'hero' && (
          <div className="bg-slate-800 rounded-xl p-6" data-testid="hero-form">
            <h2 className="text-xl font-semibold text-white mb-4">{t('Hero Section', 'হিরো সেকশন')}</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t('Name', 'নাম')}
                value={hero.name || ''}
                onChange={(e) => setHero({ ...hero, name: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="hero-name-input"
              />
              <input
                type="text"
                placeholder={t('Title', 'টাইটেল')}
                value={hero.title || ''}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="hero-title-input"
              />
              <input
                type="text"
                placeholder={t('Tagline', 'ট্যাগলাইন')}
                value={hero.tagline || ''}
                onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="hero-tagline-input"
              />
              <input
                type="text"
                placeholder={t('Image URL', 'ইমেজ URL')}
                value={hero.image_url || ''}
                onChange={(e) => setHero({ ...hero, image_url: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="hero-image-input"
              />
              <input
                type="text"
                placeholder={t('Resume URL (optional)', 'রিজিউম URL (ঐচ্ছিক)')}
                value={hero.resume_url || ''}
                onChange={(e) => setHero({ ...hero, resume_url: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="hero-resume-input"
              />
              <button
                onClick={saveHero}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                data-testid="save-hero-btn"
              >
                <Save size={20} />
                <span>{t('Save Hero', 'হিরো সেভ করুন')}</span>
              </button>
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="bg-slate-800 rounded-xl p-6" data-testid="about-form">
            <h2 className="text-xl font-semibold text-white mb-4">{t('About Section', 'আবাউট সেকশন')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">{t('English Text', 'ইংরেজি টেক্সট')}</label>
                <textarea
                  value={about.text_en || ''}
                  onChange={(e) => setAbout({ ...about, text_en: e.target.value })}
                  rows="6"
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-testid="about-en-input"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">{t('Bangla Text', 'বাংলা টেক্সট')}</label>
                <textarea
                  value={about.text_bn || ''}
                  onChange={(e) => setAbout({ ...about, text_bn: e.target.value })}
                  rows="6"
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-testid="about-bn-input"
                />
              </div>
              <button
                onClick={saveAbout}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                data-testid="save-about-btn"
              >
                <Save size={20} />
                <span>{t('Save About', 'আবাউট সেভ করুন')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="bg-slate-800 rounded-xl p-6" data-testid="skills-form">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">{t('Skills', 'স্কিলস')}</h2>
              <button
                onClick={addSkill}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                data-testid="add-skill-btn"
              >
                <Plus size={20} />
                <span>{t('Add Skill', 'স্কিল যুক্ত করুন')}</span>
              </button>
            </div>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-slate-700 p-4 rounded-lg" data-testid={`skill-item-${skill.id}`}>
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder={t('Skill Name', 'স্কিল নাম')}
                      value={skill.name}
                      onChange={(e) => {
                        const updated = { ...skill, name: e.target.value };
                        updateSkill(skill.id, updated);
                      }}
                      className="bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={skill.category}
                      onChange={(e) => {
                        const updated = { ...skill, category: e.target.value };
                        updateSkill(skill.id, updated);
                      }}
                      className="bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Frontend</option>
                      <option>Backend</option>
                      <option>Mobile</option>
                      <option>DevOps</option>
                      <option>Database</option>
                      <option>Other</option>
                    </select>
                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                      data-testid={`delete-skill-${skill.id}`}
                    >
                      <Trash2 size={18} />
                      <span>{t('Delete', 'ডিলিট')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-slate-800 rounded-xl p-6" data-testid="projects-form">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">{t('Projects', 'প্রজেক্টস')}</h2>
              <button
                onClick={addProject}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                data-testid="add-project-btn"
              >
                <Plus size={20} />
                <span>{t('Add Project', 'প্রজেক্ট যুক্ত করুন')}</span>
              </button>
            </div>
            <div className="space-y-6">
              {projects.map((project, idx) => (
                <div key={project.id} className="bg-slate-700 p-4 rounded-lg" data-testid={`project-item-${project.id}`}>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder={t('Project Title', 'প্রজেক্ট টাইটেল')}
                      value={project.title}
                      onChange={(e) => {
                        const updated = { ...project, title: e.target.value };
                        updateProject(project.id, updated);
                      }}
                      className="w-full bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder={t('Description (English)', 'বর্ণনা (ইংরেজি)')}
                      value={project.description_en}
                      onChange={(e) => {
                        const updated = { ...project, description_en: e.target.value };
                        updateProject(project.id, updated);
                      }}
                      rows="2"
                      className="w-full bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder={t('Description (Bangla)', 'বর্ণনা (বাংলা)')}
                      value={project.description_bn}
                      onChange={(e) => {
                        const updated = { ...project, description_bn: e.target.value };
                        updateProject(project.id, updated);
                      }}
                      rows="2"
                      className="w-full bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder={t('Tech Stack (comma separated)', 'টেক স্ট্যাক (কমা দিয়ে আলাদা)')}
                      value={Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : ''}
                      onChange={(e) => {
                        const updated = { ...project, tech_stack: e.target.value.split(',').map(t => t.trim()) };
                        updateProject(project.id, updated);
                      }}
                      className="w-full bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder={t('Image URL', 'ইমেজ URL')}
                        value={project.image_url || ''}
                        onChange={(e) => {
                          const updated = { ...project, image_url: e.target.value };
                          updateProject(project.id, updated);
                        }}
                        className="bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder={t('Project URL', 'প্রজেক্ট URL')}
                        value={project.project_url || ''}
                        onChange={(e) => {
                          const updated = { ...project, project_url: e.target.value };
                          updateProject(project.id, updated);
                        }}
                        className="bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder={t('GitHub URL', 'GitHub URL')}
                        value={project.github_url || ''}
                        onChange={(e) => {
                          const updated = { ...project, github_url: e.target.value };
                          updateProject(project.id, updated);
                        }}
                        className="bg-slate-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                      data-testid={`delete-project-${project.id}`}
                    >
                      <Trash2 size={18} />
                      <span>{t('Delete Project', 'প্রজেক্ট ডিলিট করুন')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="bg-slate-800 rounded-xl p-6" data-testid="contact-form">
            <h2 className="text-xl font-semibold text-white mb-4">{t('Contact Information', 'যোগাযোগের তথ্য')}</h2>
            <div className="space-y-4">
              <input
                type="email"
                placeholder={t('Email', 'ইমেইল')}
                value={contact.email || ''}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="contact-email-input"
              />
              <input
                type="text"
                placeholder={t('Phone', 'ফোন')}
                value={contact.phone || ''}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="contact-phone-input"
              />
              <input
                type="text"
                placeholder={t('Location', 'অবস্থান')}
                value={contact.location || ''}
                onChange={(e) => setContact({ ...contact, location: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="contact-location-input"
              />
              <input
                type="text"
                placeholder="GitHub URL"
                value={contact.github || ''}
                onChange={(e) => setContact({ ...contact, github: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="contact-github-input"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={contact.linkedin || ''}
                onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="contact-linkedin-input"
              />
              <input
                type="text"
                placeholder="Twitter URL"
                value={contact.twitter || ''}
                onChange={(e) => setContact({ ...contact, twitter: e.target.value })}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="contact-twitter-input"
              />
              <button
                onClick={saveContact}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                data-testid="save-contact-btn"
              >
                <Save size={20} />
                <span>{t('Save Contact', 'কনটাক্ট সেভ করুন')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;