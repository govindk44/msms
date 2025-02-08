from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from .models import Category, Medicine,Cart,Customer, Booking,PaymentDetails,Order


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name']

class MedicineSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True
    )
    category_details = CategorySerializer(read_only=True, source="category")
    class Meta:
        model = Medicine
        fields = ['id', 'name', 'category', 'category_details', 'description', 'stock_quantity', 'price']

    def create(self, validated_data):
        category = validated_data.pop('category')
        medicine = Medicine.objects.create(category=category, **validated_data)
        return medicine


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'contact_no', 'registered_on']
        read_only_fields = ['id', 'registered_on']


class CartSerializer(serializers.ModelSerializer):
    medicine = MedicineSerializer() 

    class Meta:
        model = Cart
        fields = ['id', 'user_id', 'medicine', 'quantity', 'added_on']


class BookingSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer() 
    class Meta:
        model = Booking
        fields = ['id', 'customer', 'product', 'quantity', 'status', 'booking_date']


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                return Response({'detail': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.username
        if(user.is_staff):
            token['user_type'] = "admin"
        else:
            token['user_type'] = "user"

        return token



class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def create(self, validated_data):
        user_obj = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],   
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user_obj


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'amount', 'created_at', "razorpay_order_id"]


class PaymentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetails
        fields = '__all__'  
