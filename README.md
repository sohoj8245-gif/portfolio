# 🚀 Professional Portfolio Website

Ekta modern, bilingual (Bangla/English) portfolio website with full admin panel for content management.

## ✨ Features

### Frontend (Public View)
- 🌐 **Bilingual Support**: Bangla ⇄ English language toggle
- 🎨 **Modern Design**: Gradient backgrounds, glassmorphism effects
- 📱 **Fully Responsive**: Mobile, tablet, desktop optimized
- ⚡ **Fast Loading**: Optimized React 19 components
- 🎯 **Sections**:
  - Hero section with profile image
  - About section (bilingual)
  - Skills grouped by category
  - Projects showcase with tech stack
  - Contact information with social links

### Admin Panel
- 🔐 **Secure Login**: JWT-based authentication
- ✏️ **Full Content Management**:
  - Hero section customization
  - About text (English & Bangla)
  - Skills management (add/edit/delete)
  - Projects management (add/edit/delete)
  - Contact information
- 💾 **Auto-save**: Changes saved immediately
- 🎨 **User-friendly Interface**: Clean, intuitive design

## 🛠️ Tech Stack

### Frontend
- **React 19** (latest)
- **React Router v7** for routing
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons
- **Context API** for state management

### Backend
- **FastAPI** (Python)
- **MongoDB** with Motor (async driver)
- **JWT** authentication
- **Bcrypt** for password hashing
- **CORS** enabled

## 🚀 Getting Started

### 1. Services Running
All services are managed by supervisor:
```bash
sudo supervisorctl status
```

### 2. Access the Website

**Public Portfolio:**
```
http://localhost:3000
```

**Admin Login:**
```
http://localhost:3000/admin/login
Username: admin
Password: admin123
```

**Admin Panel:**
```
http://localhost:3000/admin
```

### 3. Customize Your Portfolio

1. Login to admin panel
2. Navigate through tabs:
   - **Hero**: Your name, title, tagline, profile image
   - **About**: Your story in English & Bangla
   - **Skills**: Add your technical skills by category
   - **Projects**: Showcase your work with descriptions
   - **Contact**: Email, phone, social media links

## 📝 Admin Credentials

**Default Login:**
- Username: `admin`
- Password: `admin123`

⚠️ **Important**: Change the password after first login for security!

To change admin password, you can reset it by running:
```bash
python /app/scripts/setup_admin.py
```

## 🎨 Customization Tips

### Adding Profile Image
1. Upload your image to a hosting service (Imgur, Cloudinary, etc.)
2. Copy the image URL
3. In Admin Panel → Hero → Paste in "Image URL"

### Adding Projects
1. Go to Admin Panel → Projects
2. Click "Add Project"
3. Fill in:
   - Title
   - Description (both English & Bangla)
   - Tech Stack (comma-separated: React, Laravel, MongoDB)
   - Image URL (optional)
   - Project URL (optional)
   - GitHub URL (optional)

### Skills Categories
- Frontend
- Backend
- Mobile
- DevOps
- Database
- Other

## 🔧 API Endpoints

### Public Endpoints
```
GET  /api/portfolio/hero       - Get hero section
GET  /api/portfolio/about      - Get about section
GET  /api/portfolio/skills     - Get all skills
GET  /api/portfolio/projects   - Get all projects
GET  /api/portfolio/contact    - Get contact info
```

### Admin Endpoints (Require Authentication)
```
POST /api/admin/setup          - Initial admin setup
POST /api/admin/login          - Admin login
PUT  /api/portfolio/hero       - Update hero section
PUT  /api/portfolio/about      - Update about section
POST /api/portfolio/skills     - Add skill
PUT  /api/portfolio/skills/:id - Update skill
DEL  /api/portfolio/skills/:id - Delete skill
POST /api/portfolio/projects   - Add project
PUT  /api/portfolio/projects/:id - Update project
DEL  /api/portfolio/projects/:id - Delete project
PUT  /api/portfolio/contact    - Update contact info
```

## 🌐 Language Toggle

The language toggle button is fixed in the top-right corner. It automatically:
- Switches between English and Bangla
- Saves preference in localStorage
- Persists across page reloads

## 🐛 Troubleshooting

### Services not running
```bash
sudo supervisorctl restart all
```

### Backend errors
```bash
tail -n 50 /var/log/supervisor/backend.*.log
```

### Frontend errors
```bash
tail -n 50 /var/log/supervisor/frontend.*.log
```

### Reset sample data
```bash
python /app/scripts/setup_admin.py
```

## 📦 Project Structure

```
/app/
├── backend/
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main app component
│   │   ├── contexts/
│   │   │   ├── LanguageContext.js  # Language management
│   │   │   └── AuthContext.js      # Authentication
│   │   └── pages/
│   │       ├── Portfolio.js        # Public portfolio
│   │       ├── AdminLogin.js       # Admin login
│   │       └── AdminPanel.js       # Admin dashboard
│   ├── package.json          # Node dependencies
│   └── .env                  # Frontend env variables
└── scripts/
    └── setup_admin.py        # Admin setup script
```

## 🎯 Next Steps

1. ✅ Login to admin panel
2. ✅ Customize hero section with your details
3. ✅ Write your about section (both languages)
4. ✅ Add your skills
5. ✅ Add your projects
6. ✅ Update contact information
7. ✅ Test language toggle
8. ✅ Share your portfolio URL!

## 💡 Tips

- Use high-quality images (at least 400x300 for projects)
- Keep descriptions concise and impactful
- Update regularly with new projects
- Use consistent formatting in tech stacks
- Test both English and Bangla versions

## 🤝 Support

For any issues or questions:
1. Check logs in `/var/log/supervisor/`
2. Verify services are running
3. Check MongoDB connection
4. Ensure all environment variables are set

---

**Built with ❤️ using React 19, FastAPI & MongoDB**

Enjoy your new portfolio website! 🎉
