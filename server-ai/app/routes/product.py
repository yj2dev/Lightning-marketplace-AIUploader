from app.schemas.product import ProductInfo
from app.utils.tools import test_env
from app.utils.bard import image_to_text, prompt
from fastapi import APIRouter, Request
from pydantic import BaseModel

router = APIRouter(prefix="/api/product-ai")

@router.get('/')
async def root(): return {"/api/product": test_env()}

@router.post('/info')
async def get_product_info(product: ProductInfo):
    res = image_to_text(product['imgUrl'])
    return res

@router.post('/info/prompt-tuning')
async def get_product_info(req:Request):
    data = await req.json()
    print('prompt >> ', data['prompt'])
    res = prompt(data['prompt'], data['imgUrl'], data['keys'])

    return res




