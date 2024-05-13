from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from .api import brain_tumour_prediction, medicine_recommendation

app = FastAPI(
    title='MediBot',
    description='A medical assistant',
    version='0.2',
    docs_url='/',
)

app.include_router(brain_tumour_prediction.router)
app.include_router(medicine_recommendation.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

if __name__ == '__main__':
    uvicorn.run(app)

# uvicorn app.main:app --reload --workers 1 --host 0.0.0.0 --port 8000
