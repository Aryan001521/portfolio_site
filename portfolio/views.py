from django.shortcuts import render
from .models import Profile, Skill, Project, Experience

def home(request):
    profile = Profile.objects.first()
    skills = Skill.objects.all()
    featured = Project.objects.filter(is_featured=True).order_by("-created_at")
    projects = Project.objects.all().order_by("-created_at")
    exp = Experience.objects.all()

    return render(request, "home.html", {
        "profile": profile,
        "skills": skills,
        "featured": featured,
        "projects": projects,
        "exp": exp
    })