from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException


def custom_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        if response.status_code == 405:
            response.data["message"] = "Invalid request method."
        elif response.status_code == 401:
            response.data[
                "message"
            ] = "You have to be logged in to access this resource!"
        else:
            response.data["message"] = response.data["detail"]
        del response.data["detail"]
    return response


class InvalidLoginException(APIException):
    status_code = "403"
    default_detail = "Login failed. Invalid username, password or role"
    default_code = "login_failed"

class ExceededRequestLimitException(APIException):
    status_code = "400"
    default_detail = "You can only make 1 removal request per day."
    default_code = "exceed_request"

class InvalidRequestException(APIException):
    status_code = "400"
    default_detail = "The request is invalid."
    default_code = "invalid_request"


class CannotAssignException(APIException):
    status_code = "400"
    default_detail = "Assignment failed. Please ensure that the exam ID is correct and patient has approved the exam"
    default_code = "assignment_failed"


class AlreadyAssignedException(APIException):
    status_code = "400"
    default_detail = "Assignment failed. The exam has already been assigned"
    default_code = "already_assigned"


class SMTPException(APIException):
    status_code = "503"
    default_detail = "An error occurred on our end, please try again later."
    default_code = "backend_error"


class NoDeviceException(APIException):
    status_code = "404"
    default_detail = "You do not have a registered device."
    default_code = "no_device"


class NoSessionException(APIException):
    status_code = "404"
    default_detail = "You have no assigned session."
    default_code = "no_session"


class InvalidExamException(APIException):
    status_code = "400"
    default_detail = "Submission failed. Please check examination details again."
    default_code = "invalid_exam_submission"
