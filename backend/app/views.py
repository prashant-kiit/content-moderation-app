from django.http import JsonResponse

def modertateUsingGrok(request):
    content = request.GET.get('content')
    return JsonResponse({"message": f"Content under examination: {content}!"}, status=200)