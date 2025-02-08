from django.urls import path
from medicalstoreapp import views
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import user_login, UserRegister, MedicineDeleteView,ChangePasswordView,medicine_list



urlpatterns = [
    path('login/', user_login.as_view(), name='user-login'), 
    path('register/', UserRegister.as_view(), name='register'),  
    path('User/', views.get_users, name='get_users'),
    path('medicine/', views.medicine_view, name='medicine_list_create'), 
    path('medicine/add/', views.add_medicine, name='add_medicine'), 
    path('medicine/categories/', views.get_categories, name='get_categories'),
    path('cart/', views.cart_view, name='cart_view'),
    path("medicine/<int:pk>/", views.MedicineUpdateView.as_view(), name="medicine-update"),
    path('medicines/<int:id>/', MedicineDeleteView.as_view(), name='delete_medicine'),
    path('cart/add/<int:medicine_id>/<int:user_id>', views.add_to_cart, name='add_to_cart'),
    path('cart/remove/<int:cart_id>/<int:user_id>', views.remove_from_cart, name='remove_from_cart'),
    path('api/medicine/', medicine_list, name='medicine-list'),
    path('medicine/<int:id>/', MedicineDeleteView.as_view(), name='delete_medicine'),
    path('changepassword/', ChangePasswordView.as_view(), name='changepassword'),
    path('api/medicines/', views.get_medicines, name='get_medicines'),
    path("create_order/", views.create_order, name="create_order"),
    path('payment_details/', views.payment_details, name='payment_details'),
    path("cart/upload_prescription/<int:cart_id>/", views.UploadPrescriptionView.as_view(), name="upload_prescription"),
    path("update_payment_status/", views.update_payment_status, name="update_payment_status"),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)





   

