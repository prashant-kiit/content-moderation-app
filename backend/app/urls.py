from django.urls import path
from .views import modertateUsingGrok

urlpatterns = [
    path('grok', modertateUsingGrok, name='modertateUsingGrok'),
]