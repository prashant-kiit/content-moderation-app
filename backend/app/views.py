from django.http import JsonResponse
import os
from openai import OpenAI
import random

def modertateUsingGrok(request):
    print("modertateUsingGrok")
    content = request.GET.get('content')

    if(not content):
        return JsonResponse({"error": "content not found"}, status=400)
    
    client = OpenAI(
        api_key='xai-NcJE5y49Ch1injRQtv3zziUgKQuPITrrAofsW3qAtkLqb2TiqFK8PSWUBWNQtdMLvkxUxkmNWNtwmHUJ',
        base_url="https://api.x.ai/v1",
    )
    
    completion = client.chat.completions.create(
        model="grok-2-latest",
        messages=[
            {
                "role": "system",
                "content": """
                    You are a content moderator. 
                    You will be prompt with text content and your task is to determine if it is appropriate based on below criteria.
                    1. Presence of inappropriate language (profanity, slurs, etc.)
                    2. Potentially harmful content (violence, self-harm, etc.)
                    3. Misinformation or factually incorrect statements
                    4. Hate speech or discriminatory content
                    5. Adult or sexual content
                    6. Overall content safety rating (Safe, Questionable, or Unsafe)
                    
                    Your response should be a single word: 'approved' or 'rejected'.""",
            },
            {
                "role": "user",
                "content": f"{content}",
            },
        ],
    )

    result = completion.choices[0].message.content
    print(result)    

    status = "approved" if random.random() > 0.5 else "rejected"
    
    return JsonResponse({"content": f"{content}", "status": status}, status=200)


