from django.contrib import admin
from django.utils.html import format_html
from .models import Profile, Skill, Project, Experience


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "avatar_preview")

    def avatar_preview(self, obj):
        url = ""
        if obj.avatar:
            url = obj.avatar.url
        elif obj.avatar_url:
            url = obj.avatar_url
        if url:
            return format_html('<img src="{}" style="height:38px;width:38px;border-radius:50%;object-fit:cover;" />', url)
        return "-"
    avatar_preview.short_description = "Avatar"


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "level", "order")
    list_editable = ("level", "order")
    search_fields = ("name",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "is_featured", "order")
    list_editable = ("is_featured", "order")
    search_fields = ("title", "tech_stack")


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "org", "start", "end", "order")
    list_editable = ("order",)
    search_fields = ("role", "org")