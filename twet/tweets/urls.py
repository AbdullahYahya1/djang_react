from django.urls import path 
from .views import home
urlpatterns = [
    path('', home),
    path('<int:pk>', home)
]
