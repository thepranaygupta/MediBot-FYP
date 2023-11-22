from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from files.app.api import brain_tumour_prediction

app = FastAPI(
    title='Brain Tumor Detection',
    description='Final Year Project',
    version='0.1',
    docs_url='/',
)

app.include_router(brain_tumour_prediction.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

if __name__ == '__main__':
    uvicorn.run(app)

# uvicorn files.app.main:app --reload --workers 1 --host 0.0.0.0 --port 8000
