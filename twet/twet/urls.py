
from django.contrib import admin
from django.urls import path , include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from tweets.views import UserRegistrationAPIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('tweets/', include('tweets.urls')),
    path('api/tweets/', include('tweets.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', UserRegistrationAPIView.as_view(), name='user_registration'),

]