from django.http import JsonResponse
from openai import OpenAI
from langchain_openai import ChatOpenAI
import random

def modertateUsingGrok(request):
    print("modertateUsingGrok")
    content = request.GET.get('content')

    if(not content):
        return JsonResponse({"error": "content not found"}, status=400)
    
    # client = OpenAI(
    #     api_key='xai-NcJE5y49Ch1injRQtv3zziUgKQuPITrrAofsW3qAtkLqb2TiqFK8PSWUBWNQtdMLvkxUxkmNWNtwmHUJ',
    #     base_url="https://api.x.ai/v1",
    # )
    
    # completion = client.chat.completions.create(
    #     model="grok-2-latest",
    #     messages=[
    #         {
    #             "role": "system",
    #             "content": """
    #                 You are a content moderator. 
    #                 You will be prompt with text content and your task is to determine if it is appropriate based on below criteria.
    #                 1. Presence of inappropriate language (profanity, slurs, etc.)
    #                 2. Potentially harmful content (violence, self-harm, etc.)
    #                 3. Misinformation or factually incorrect statements
    #                 4. Hate speech or discriminatory content
    #                 5. Adult or sexual content
    #                 6. Overall content safety rating (Safe, Questionable, or Unsafe)
                    
    #                 Your response should be a single word: 'approved' or 'rejected'.""",
    #         },
    #         {
    #             "role": "user",
    #             "content": f"{content}",
    #         },
    #     ],
    # )

    # result = completion.choices[0].message.content
    
    try:
        llm = ChatOpenAI(
            model="gpt-4o",
            temperature=0,
            max_tokens=None,
            timeout=None,
            max_retries=2,
            api_key="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")
        
        messages = [
            (
                "system",
                """You are a content moderator. 
                You will be prompted with text content and your task is to determine if it is appropriate based on below criteria.
                1. Presence of inappropriate language (profanity, slurs, etc.)
                2. Potentially harmful content (violence, self-harm, etc.)
                3. Misinformation or factually incorrect statements
                4. Hate speech or discriminatory content
                5. Adult or sexual content
                6. Overall content safety rating (Safe, Questionable, or Unsafe)
                
                Your response should be a single word: 'approved' or 'rejected'.""",
            ),
            ("human", f"{content}"),
        ]
        
        ai_msg = llm.invoke(messages)   
        print(ai_msg)    
        
        status = ai_msg.content.strip().lower()
        
        return JsonResponse({"content": f"{content}", "status": status}, status=200)
    
    except Exception as e:
        print(f"Error in content moderation: {str(e)}")
        return JsonResponse({"error": f"Error in content moderation: {str(e)}"}, status=500)


