import openai
import os

def gpt3(prompt):
    openai.api_key = os.getenv('OPENAI_API_KEY')
    res = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": prompt}],
    temperature=1,
    max_tokens=3000,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    return res['choices'][0]['message']['content']

def gpt3k(prompt):
    openai.api_key = os.getenv('OPENAI_API_KEY')
    res = openai.ChatCompletion.create(
    model="gpt-3.5-turbo-16k",
    messages=[{"role": "user", "content": prompt}],
    temperature=1,
    max_tokens=3000,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    return res['choices'][0]['message']['content']

def gpt4(prompt):
    openai.api_key = os.getenv('OPENAI_API_KEY')
    res = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}],
    temperature=1,
    max_tokens=3000,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    return res['choices'][0]['message']['content']