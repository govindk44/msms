from django.contrib import admin
from .models import Medicine, Booking,Category,Cart,Order,PaymentDetails,Prescription



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name', 'description')  
    search_fields = ('category_name',)             
    list_filter = ('category_name',)               
    ordering = ('category_name',)               
    prepopulated_fields = {'category_name': ('description',)}


# @admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'medicine', 'quantity', 'added_on')


@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ('name','stock_quantity', 'category', 'created_on', 'updated_on')  
    list_filter = ('created_on', 'updated_on')  
    search_fields = ('name', 'brand', 'category')


admin.site.register(Prescription)


# @admin.register(Booking)
# class BookingAdmin(admin.ModelAdmin):
#     list_display = ('customer', 'product', 'booking_date')




@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "amount",  "created_at", "updated_at" ,"razorpay_order_id")


@admin.register(PaymentDetails)
class PaymentDetailsAdmin(admin.ModelAdmin):
    list_display = ("razorpay_payment_id", "razorpay_order_id", "amount", "created_at","status")

