from backend.models import UserToken
from rest_framework.authentication import TokenAuthentication

# Register your models here.
class TokenAuth(TokenAuthentication):
    model = UserToken