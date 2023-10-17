from bardapi import BardCookies
import requests as req
import json
import os
import re
import logging

def image_to_text(img_url):
    print('run image_to_text')
    prompt = """
    한국어 기반으로 작성해주세요. 
    사진속 물건을 팔려고하는데 아래 특성을 이해해서 괄호안의 키를 가진 JSON형식으로 출력해주고 설명은 최대한 길고 자세히 문장 사이에 줄 바꿈되게 작성해줘.
    상품명(product_name), 제목(title), 설명(desc), 대분류(major_category), 중분류(middle_category), 소분류(small_category)"
    """

    prompt_old = '''
        사진속 물건을 팔려고하는데 아래키를 가진 JSON형식으로 출력해줘
        상품명(product_name), 제목(title), 설명(description), 대분류(major_category), 중분류(middle_category), 소분류(small_category)
    '''

    res = None

    try:
        cookie_dict = {
            "__Secure-1PSID": os.getenv('BARD_API_SECURE_KEY_1PSID'),
            "__Secure-1PSIDCC": os.getenv('BARD_API_SECURE_KEY_1PSIDCC'),
            "__Secure-1PSIDTS": os.getenv('BARD_API_SECURE_KEY_1PSIDTS')
        }

        image = req.get(img_url).content

        bard = BardCookies(cookie_dict=cookie_dict)

        res = bard.ask_about_image(prompt, image)

    except: return False

    print(res['content'])

    matches = re.findall(r'\{(.+?)\}', res['content'], re.DOTALL)
    matches = matches[0].strip()

    res_dict = {}

    try:
        # parsed_json = json.loads('{' + matches + '}')

        pattern = r'"(.*?)": "(.*?)"'

        matches = re.findall(pattern, matches, re.DOTALL)

        res_dict = {key: value for key, value in matches}
        # res_dict = {key: value.replace('\n', ' ') for key, value in matches}

    except: return False

    print(res_dict)

    return res_dict

def prompt(prompt, img_url, keys):
    print('run prompt...')

    res = None

    try:
        cookie_dict = {
            "__Secure-1PSID": keys['KEY_1PSID'],
            "__Secure-1PSIDCC": keys['KEY_1PSIDCC'],
            "__Secure-1PSIDTS": keys['KEY_1PSIDTS']
        }

        image = req.get(img_url).content

        bard = BardCookies(cookie_dict=cookie_dict)

        res = bard.ask_about_image(prompt, image)

    except: return False

    print(res['content'])
    matches = re.findall(r'\{(.+?)\}', res['content'], re.DOTALL)
    matches = matches[0].strip()

    parsed_json = {}

    try:
        parsed_json = json.loads('{' + matches + '}')

    except: return False

    return parsed_json




