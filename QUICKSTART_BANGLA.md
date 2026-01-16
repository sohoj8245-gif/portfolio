# 🎯 দ্রুত শুরু করার গাইড (Quick Start Guide)

## ✅ আপনার Portfolio Website প্রস্তুত!

### 📍 এখন কি করবেন?

#### ১. Portfolio দেখুন
আপনার ব্রাউজারে যান:
```
http://localhost:3000
```

এখানে আপনি দেখবেন:
- আপনার Hero Section
- About Section (বাংলা/English)
- Skills
- Projects
- Contact Information

**Language Toggle**: উপরের ডান কোণায় ক্লিক করে বাংলা ⇄ English পরিবর্তন করুন


#### ২. Admin Panel এ Login করুন
```
URL: http://localhost:3000/admin/login

Username: admin
Password: admin123
```

#### ৩. আপনার Content Customize করুন

Admin Panel এ ৫টি Tab আছে:

**🎨 Hero Tab:**
- আপনার নাম লিখুন
- Title লিখুন (যেমন: "Full Stack Developer")
- Tagline লিখুন
- Profile Image URL দিন
- Resume URL দিন (optional)
- "Save Hero" ক্লিক করুন

**📝 About Tab:**
- English Text বক্সে আপনার সম্পর্কে লিখুন
- Bangla Text বক্সে একই কথা বাংলায় লিখুন
- "Save About" ক্লিক করুন

**💪 Skills Tab:**
- "Add Skill" ক্লিক করুন
- Skill এর নাম লিখুন (যেমন: React, Laravel, Flutter)
- Category সিলেক্ট করুন
- আপনার সব skills যোগ করুন
- আপনার দেখানো sample skills গুলো রয়েছে:
  - React (Frontend)
  - Laravel (Backend)
  - Flutter (Mobile)
  - Java (Mobile)
  - Python (Backend)
  - FastAPI (Backend)
  - Docker (DevOps)
  - AWS (DevOps)

**🚀 Projects Tab:**
- "Add Project" ক্লিক করুন
- Project Title লিখুন
- Description English এ লিখুন
- Description Bangla তে লিখুন
- Tech Stack লিখুন (comma দিয়ে আলাদা করুন: React, Laravel, MongoDB)
- Image URL দিন (optional)
- Project URL দিন (optional)
- GitHub URL দিন (optional)
- সব project যোগ করুন

**📞 Contact Tab:**
- Email address দিন
- Phone number দিন
- Location দিন (যেমন: Dhaka, Bangladesh)
- GitHub URL দিন
- LinkedIn URL দিন
- Twitter URL দিন
- "Save Contact" ক্লিক করুন


### 🖼️ Image কোথায় পাবেন?

**Option 1: Placeholder (Test করার জন্য)**
```
https://via.placeholder.com/200
https://via.placeholder.com/400x300
```

**Option 2: Free Image Hosting**
- [Imgur](https://imgur.com) - সহজ, free
- [Cloudinary](https://cloudinary.com) - professional
- আপনার GitHub থেকেও image link করতে পারেন


### 🎨 Tips & Tricks

**ভালো Profile Image:**
- Professional দেখতে হবে
- Clear এবং high quality
- Size: কমপক্ষে 200x200 pixels

**ভালো Project Description:**
- সংক্ষিপ্ত এবং স্পষ্ট
- কি সমস্যা solve করেছে বলুন
- কি technology ব্যবহার করেছেন উল্লেখ করুন

**Skills Organization:**
- Frontend: React, Vue, Angular, HTML, CSS, JavaScript
- Backend: Laravel, Python, FastAPI, Node.js, PHP
- Mobile: Flutter, React Native, Java, Kotlin
- DevOps: Docker, AWS, Azure, CI/CD, Linux
- Database: MongoDB, MySQL, PostgreSQL, Redis


### 🔄 Language Toggle কিভাবে কাজ করে?

1. Portfolio page এর top-right corner এ button আছে
2. ক্লিক করলে Bangla ⇄ English switch হবে
3. আপনার preference localStorage এ save হয়
4. পরের বার visit করলে same language show করবে


### 🛠️ সমস্যা হলে কি করবেন?

**Services check করুন:**
```bash
sudo supervisorctl status
```

**Services restart করুন:**
```bash
sudo supervisorctl restart all
```

**Backend logs দেখুন:**
```bash
tail -n 50 /var/log/supervisor/backend.*.log
```

**Frontend logs দেখুন:**
```bash
tail -n 50 /var/log/supervisor/frontend.*.log
```

**Admin password reset করুন:**
```bash
python /app/scripts/setup_admin.py
```


### 📱 Mobile এ কেমন দেখাবে?

আপনার portfolio fully responsive:
- ✅ Mobile phones
- ✅ Tablets
- ✅ Desktops
- ✅ Large screens

সব device এ perfectly কাজ করবে!


### 🎯 Checklist: এগুলো করে ফেলুন

- [ ] Admin panel এ login করেছি
- [ ] Hero section এ আমার নাম এবং title দিয়েছি
- [ ] About section এ বাংলা ও English উভয়ে লিখেছি
- [ ] কমপক্ষে ৫টি skills যোগ করেছি
- [ ] কমপক্ষে ২টি projects যোগ করেছি
- [ ] Contact information দিয়েছি
- [ ] Language toggle test করেছি
- [ ] Mobile view check করেছি
- [ ] সব links working কিনা verify করেছি


### 🌟 Next Level করতে চান?

1. **Real projects যোগ করুন** আপনার GitHub থেকে
2. **Professional photos** ব্যবহার করুন
3. **Detailed descriptions** লিখুন
4. **Live project links** দিন
5. **Regular update** করুন নতুন projects দিয়ে


### 💡 Pro Tips

**SEO Friendly:**
- Clear titles ব্যবহার করুন
- Descriptive text লিখুন
- Alt text দিন images এ

**Professional Look:**
- Consistent formatting রাখুন
- Grammar check করুন
- Regular update করুন

**Performance:**
- Optimized images ব্যবহার করুন
- External links verify করুন
- Fast loading ensure করুন


---

## 🎉 শুভকামনা!

আপনার Portfolio Website এখন সম্পূর্ণ প্রস্তুত। এখন customize করুন এবং বিশ্বের সাথে share করুন!

**Questions?** README.md file দেখুন সম্পূর্ণ documentation এর জন্য।

---

**Made with ❤️ for Bangladeshi Developers**
