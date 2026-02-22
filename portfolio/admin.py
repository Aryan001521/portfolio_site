from django.contrib import admin
from .models import Profile, Skill, Project, Experience

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "headline", "email")

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "is_featured", "created_at")
    list_filter = ("is_featured",)
    search_fields = ("title", "tech_stack")

admin.site.register(Skill)
admin.site.register(Experience)