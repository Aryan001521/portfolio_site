from django.shortcuts import render
from .models import Profile, Skill, Project, Experience

def home(request):
    profile = Profile.objects.first()
    skills = Skill.objects.all()
    projects = Project.objects.all()
    experience = Experience.objects.all()
    return render(request, "home.html", {
        "profile": profile,
        "skills": skills,
        "projects": projects,
        "experience": experience,
    })