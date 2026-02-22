from django.db import models
class Profile(models.Model):
    name = models.CharField(max_length=120)
    headline = models.CharField(max_length=200)
    bio = models.TextField()
    location = models.CharField(max_length=120, blank=True)
    email = models.EmailField()
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    resume_link = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Skill(models.Model):
    name = models.CharField(max_length=80)
    level = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=140)
    tagline = models.CharField(max_length=220)
    description = models.TextField()
    tech_stack = models.CharField(max_length=220)
    live_demo = models.URLField(blank=True)
    github_repo = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

class Experience(models.Model):
    role = models.CharField(max_length=120)
    org = models.CharField(max_length=140)
    start = models.CharField(max_length=40)
    end = models.CharField(max_length=40, blank=True)
    details = models.TextField()

    def __str__(self):
        return f"{self.role} @ {self.org}"