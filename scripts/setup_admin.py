#!/usr/bin/env python3
"""
Setup script to create initial admin and sample portfolio data
Run: python /app/scripts/setup_admin.py
"""
import requests
import json

BACKEND_URL = "http://localhost:8001"
API = f"{BACKEND_URL}/api"

def setup_admin():
    """Create admin user"""
    print("Setting up admin...")
    try:
        response = requests.post(
            f"{API}/admin/setup",
            json={"username": "admin", "password": "admin123"}
        )
        if response.status_code == 200:
            print("✅ Admin created successfully!")
            print("   Username: admin")
            print("   Password: admin123")
            print("   Please change password after first login!")
        else:
            print(f"⚠️  Admin setup: {response.json().get('detail', 'Already exists')}")
    except Exception as e:
        print(f"❌ Error setting up admin: {e}")

def setup_sample_data():
    """Create sample portfolio data"""
    print("\nSetting up sample portfolio data...")
    
    # Login first to get token
    try:
        login_response = requests.post(
            f"{API}/admin/login",
            json={"username": "admin", "password": "admin123"}
        )
        if login_response.status_code != 200:
            print("❌ Could not login. Please setup admin first.")
            return
        
        token = login_response.json()["token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        # Hero Section
        hero_data = {
            "name": "Your Name",
            "title": "Full Stack Developer",
            "tagline": "Building amazing web and mobile applications with modern technologies",
            "image_url": "https://via.placeholder.com/200",
            "resume_url": ""
        }
        requests.put(f"{API}/portfolio/hero", json=hero_data, headers=headers)
        print("✅ Hero section created")
        
        # About Section
        about_data = {
            "text_en": "I am a passionate Full Stack Developer with expertise in web and mobile application development. I love creating efficient, scalable, and user-friendly solutions.",
            "text_bn": "আমি একজন উৎসাহী ফুল স্ট্যাক ডেভেলপার যার ওয়েব এবং মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্টে দক্ষতা রয়েছে। আমি দক্ষ, স্কেলেবল এবং ব্যবহারকারী-বান্ধব সমাধান তৈরি করতে ভালোবাসি।"
        }
        requests.put(f"{API}/portfolio/about", json=about_data, headers=headers)
        print("✅ About section created")
        
        # Skills
        skills = [
            {"name": "React", "category": "Frontend"},
            {"name": "Laravel", "category": "Backend"},
            {"name": "Flutter", "category": "Mobile"},
            {"name": "Java", "category": "Mobile"},
            {"name": "Python", "category": "Backend"},
            {"name": "FastAPI", "category": "Backend"},
            {"name": "Docker", "category": "DevOps"},
            {"name": "AWS", "category": "DevOps"},
        ]
        for skill in skills:
            requests.post(f"{API}/portfolio/skills", json=skill, headers=headers)
        print(f"✅ {len(skills)} skills added")
        
        # Projects
        projects = [
            {
                "title": "E-commerce Platform",
                "description_en": "A full-featured e-commerce platform with payment integration",
                "description_bn": "পেমেন্ট ইন্টিগ্রেশন সহ একটি সম্পূর্ণ ই-কমার্স প্ল্যাটফর্ম",
                "tech_stack": ["React", "Laravel", "MySQL"],
                "image_url": "https://via.placeholder.com/400x300",
                "project_url": "",
                "github_url": "",
                "order": 0
            },
            {
                "title": "Mobile Chat App",
                "description_en": "Real-time chat application with Flutter",
                "description_bn": "ফ্লাটার দিয়ে রিয়েল-টাইম চ্যাট অ্যাপ্লিকেশন",
                "tech_stack": ["Flutter", "Firebase", "Dart"],
                "image_url": "https://via.placeholder.com/400x300",
                "project_url": "",
                "github_url": "",
                "order": 1
            }
        ]
        for project in projects:
            requests.post(f"{API}/portfolio/projects", json=project, headers=headers)
        print(f"✅ {len(projects)} projects added")
        
        # Contact
        contact_data = {
            "email": "your.email@example.com",
            "phone": "+880 1234567890",
            "location": "Dhaka, Bangladesh",
            "github": "https://github.com/yourusername",
            "linkedin": "https://linkedin.com/in/yourusername",
            "twitter": "https://twitter.com/yourusername"
        }
        requests.put(f"{API}/portfolio/contact", json=contact_data, headers=headers)
        print("✅ Contact info created")
        
        print("\n✨ Sample portfolio data setup complete!")
        print("\n📝 Next Steps:")
        print("1. Go to http://localhost:3000 to view your portfolio")
        print("2. Go to http://localhost:3000/admin/login to login")
        print("3. Use username: admin, password: admin123")
        print("4. Customize your portfolio from the admin panel!")
        
    except Exception as e:
        print(f"❌ Error setting up sample data: {e}")

if __name__ == "__main__":
    print("🚀 Portfolio Website Setup\n")
    setup_admin()
    setup_sample_data()
