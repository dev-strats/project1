from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cities', views.cities, name='cities'),
    # path('rolling_futures', views.rolling_futures, name='rolling_futures'),
    path('rolling_future/<str:start_date>/<str:end_date>', views.rolling_futures, name='rolling_futures')
]