from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cities', views.cities, name='cities'),
    # path('rolling_futures', views.rolling_futures, name='rolling_futures'),
    path('rolling_future/<str:start_date>/<str:end_date>', views.rolling_futures, name='rolling_futures'),
    path('strategies',views.all_strategies, name='strategies'),
    path('strategies/<str:field>', views.all_strategies_field,name="strategies_field"),
    path('strategies/id/<str:id>', views.strategy_by_id,name="strategy_by_id"),
    path('strategies/type/<str:type>', views.strategy_type_params, name="strategy_type_params")
]