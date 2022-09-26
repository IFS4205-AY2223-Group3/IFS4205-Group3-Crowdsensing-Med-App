from rest_framework.views import exception_handler

def custom_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        if response.status_code == 405:
            response.data['message'] = 'Invalid request method.'
        elif response.status_code == 401:
            response.data['message'] = 'Please login first!'
        else:
            response.data['message'] = response.data['detail']
        del response.data['detail']
    return response
