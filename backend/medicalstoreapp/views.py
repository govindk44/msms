from rest_framework import  status
from rest_framework.response import Response
import razorpay
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from .models import Customer, Medicine, Booking,Cart,Category, Order,PaymentDetails,Prescription
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView  
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.hashers import check_password,make_password
from .serializers import (
    MedicineSerializer,
    BookingSerializer,
    CartSerializer,
    CategorySerializer,
    OrderSerializer,
    PaymentDetailsSerializer,
    UserRegisterSerializer, MyTokenObtainPairSerializer)


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# Add new medicine
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_medicine(request):
    request_data = request.data
    serializer = MedicineSerializer(data=request_data)
    if serializer.is_valid():
        serializer.save()
        return Response("Medicine added successfully!", status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



####
@api_view(['GET'])
def medicine_view(request):
    if request.method == 'GET':
        medicine_items = Medicine.objects.all()  
        return Response({"data":MedicineSerializer(medicine_items, many=True).data})


####
class MedicineUpdateView(APIView):
    def patch(self, request, pk):
        medicine = Medicine.objects.get(pk=pk)
        stock_quantity = request.data.get("stock_quantity")
        if stock_quantity is not None:
            medicine.stock_quantity = stock_quantity
            medicine.save()
            return Response({"message": "Stock quantity updated successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)


#delete the medicine for list 
class MedicineDeleteView(APIView):
     def delete(self, request, id):
        record = get_object_or_404(Medicine, id=id)
        record.delete()
        return Response({"message": "Medicine Deleted Successfully"}, status=status.HTTP_200_OK)
     
#####
@api_view(['GET'])
def medicine_list(request):
    medicines = Medicine.objects.all()  
    serializer = MedicineSerializer(medicines, many=True) 
    return Response(serializer.data)

#####
class user_login(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#####
class UserRegister(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()  
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

####
def get_users(request):
    users = User.objects.filter(is_staff=False).values('first_name', 'last_name', 'username', 'email', 'date_joined')
    return JsonResponse(list(users), safe=False)


#####
@api_view(['POST'])
def add_to_cart(request, medicine_id, user_id):
    if request.method == 'POST':
        try:
            medicine = Medicine.objects.get(id=medicine_id)
        except Medicine.DoesNotExist:
            return Response({"error": "Medicine not found"}, status=status.HTTP_404_NOT_FOUND)
        cart_item, created = Cart.objects.get_or_create(medicine=medicine, user_id=user_id)
        if not created:
            cart_item.quantity += 1  
        else:
            cart_item.quantity = 1  
        cart_item.save()
        return Response({
            "message": "Added to cart",
            "cart_item": {
                "id": cart_item.id,
                "medicine": cart_item.medicine.id,
                "quantity": cart_item.quantity
            }
        }, status=status.HTTP_201_CREATED)


# #changepassword
class ChangePasswordView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        current_password = request.data.get('current_password')
        new_password = request.data.get('change_password')
        confirm_password = request.data.get('confirm_password')
        user = User.objects.filter(id=user_id).first()
        if user and check_password(current_password, user.password):
            if new_password == confirm_password:
                user.password = make_password(new_password)
                user.save()
                return Response({"success": "Password changed successfully"}, status=status.HTTP_200_OK)
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "User not found or current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)
    

#####
def get_medicines(request):
    search_term = request.GET.get('search', '') 
    if search_term:
        medicines = Medicine.objects.filter(name__icontains=search_term)  
    else:
        medicines = Medicine.objects.all()  
    medicine_list = list(medicines.values())
    return JsonResponse(medicine_list, safe=False)


######
@api_view(['POST'])
def cart_view(request):
    cart_items = Cart.objects.filter(user__id=request.data.get('user_id'))  
    total_price = sum(item.medicine.price * item.quantity for item in cart_items)  
    return Response({
        'cart_items': CartSerializer(cart_items, many=True).data, 
        'total_price': total_price,
    })

#####
@api_view(['POST'])
def remove_from_cart(request, cart_id, user_id):
    cart_items = Cart.objects.filter(id=cart_id, user_id=user_id)
    cart_items.delete()
    return JsonResponse({"success": True, "message": "Item removed from cart"})


#####
@api_view(['POST'])
def create_order(request):
    user_id = request.data.get('user_id')
    cart_items = Cart.objects.filter(user_id=user_id)
    total_price = float(sum(item.medicine.price * item.quantity for item in cart_items))
    client = razorpay.Client(auth=("rzp_test_a6hVvFHJbT9SAO", "kbBhQAZsfvLGhTt0KrcvKo55"))
    order = client.order.create({
                "amount": int(total_price*100),  
                "currency": "INR",
                "receipt": "receipt_#1",
                "payment_capture": 1,  
            })
    Order.objects.create(user_id=user_id, amount=total_price,razorpay_order_id=order.get('id'))
    return JsonResponse({'message': 'Order booked', 'order': order}, safe=False)


#####
@api_view(['GET', 'POST'])
def payment_details(request):
    if request.method == 'POST':
        try:
            data = request.data
            razorpay_payment_id = data.get('razorpay_payment_id')
            razorpay_order_id = data.get('razorpay_order_id')
            razorpay_signature = data.get('razorpay_signature')
            amount = data.get('amount')
            if not (razorpay_payment_id and razorpay_order_id and razorpay_signature and amount):
                return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)
            payment = PaymentDetails.objects.create(
                razorpay_payment_id=razorpay_payment_id,
                razorpay_order_id=razorpay_order_id,
                razorpay_signature=razorpay_signature,
                amount=amount / 100,  
                status=data.get("status", "Pending")  
            )
            payment_serializer = PaymentDetailsSerializer(payment)
            return Response({"paymentDetails": payment_serializer.data}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'GET':
        try:
            payment_details = PaymentDetails.objects.all()
            return_data = []    
            for payment_detail in payment_details:
                return_data.append({
                    "razorpay_payment_id": payment_detail.razorpay_payment_id,
                    "razorpay_order_id": payment_detail.razorpay_order_id,
                    "amount": payment_detail.amount,
                    "created_at": payment_detail.created_at,
                    "user": Order.objects.get(razorpay_order_id=payment_detail.razorpay_order_id).user.username,
                    "status": payment_detail.status  
                })
            Cart.objects.all().delete()
            return Response({"paymentDetails": return_data})
        except PaymentDetails.DoesNotExist:
            return Response({"error": "No payment details found."}, status=status.HTTP_404_NOT_FOUND)


###
@csrf_exempt
def update_payment_status(request):
    if request.method == "PATCH":
        try:
            data = json.loads(request.body)
            order_id = data.get("razorpay_order_id")
            status = data.get("status")
            if not order_id or not status:
                return JsonResponse({"error": "Missing required fields"}, status=400)
            payment = PaymentDetails.objects.filter(razorpay_order_id=order_id).first()
            if payment:
                payment.status = status
                payment.save()
                return JsonResponse({"message": "Payment status updated successfully"}, status=200)
            else:
                return JsonResponse({"error": "Payment record not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)


#####
class UploadPrescriptionView(APIView):
    def post(self, request, cart_id):
        cart_item = Cart.objects.filter(id=cart_id).first()
        if not cart_item:
            return Response({"error": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)
        file = request.FILES.get("prescription")
        if not file:
            return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)
        Prescription.objects.create(user=cart_item.user, prescription_file=file)
        return Response({"message": "Prescription uploaded successfully."}, status=status.HTTP_201_CREATED)
