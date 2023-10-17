# Create a .env file in the root directory and write the key values below.
# ENV_TEST_KEY = CELLO_BMC_TREK_CANYON_CANNONDALE_YETI_SANTACRUZ_SCOTT_MERIDA

from app.utils.tools import test_env
from fastapi import APIRouter, Request

router = APIRouter()

@router.get('/')
async def root(): return {'/': test_env()}

@router.post('/')
async def root(): return {'/': test_env()}

@router.get('/test_param')
async def test_param(p: int = 1024): return p

@router.post('/test_json')
async def test_json(req:Request): return await req.json()

