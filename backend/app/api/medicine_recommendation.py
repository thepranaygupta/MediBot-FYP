import logging
import os
import pickle
import cv2
import urllib.request
import numpy as np

from fastapi import APIRouter

log = logging.getLogger(__name__)
router = APIRouter()

@router.post('/recommend_medicine')
async def recommend(req):
    print("req", req)
    THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
    my_file = os.path.join(THIS_FOLDER, 'medicine_recommendation.pkl')

    with open(my_file, "rb") as f:
        model = pickle.load(f)

    query = req.strip().lower()  # Convert the single symptom to a list
    query = query.split()
    print("query", query)
    df_to_pickle, recommend_medicines_by_symptoms_to_pickle, print_data_to_pickle, predict_med_to_pickle = model.values()
    recommended_medicines = model.predict_med(query)
    print(recommended_medicines)
    return {
        'recommended_medicines': recommended_medicines
    }