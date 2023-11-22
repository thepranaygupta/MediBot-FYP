import logging
import os
import pickle
import cv2

from fastapi import APIRouter


log = logging.getLogger(__name__)
router = APIRouter()


@router.post('/predict_tumour')
async def predict():

    THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
    my_file = os.path.join(THIS_FOLDER, 'brain_tumour_pickle.pkl')

    with open(my_file, "rb") as f:
        model = pickle.load(f)

    # Pass the image.
    img = cv2.imread(
        'C:/Users/kkous/Desktop/brain-tumor-detection/brain_tumor/Testing/pituitary_tumor/image.jpg', 0)
    img1 = cv2.resize(img, (200, 200))
    img1 = img1.reshape(1, -1)/255

    prediction = model.predict(img1)
    prediction = prediction.tolist()

    print(prediction)

    return {
        'prediction': prediction
    }
