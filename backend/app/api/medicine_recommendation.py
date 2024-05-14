from fastapi import APIRouter
import numpy as np  # linear algebra
import pandas as pd  # data processing, CSV file I/O (e.g. pd.read_csv)
import logging
import os
import pickle
import urllib.request
import json
# ---------------------------------------------------------------------------
## LOADING FILES ##
# ---------------------------------------------------------------------------

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
df = pd.read_csv(
    'F:\\MediBot-FYP\\backend\\Medicine Recommender\\Dataset\\Medicine_Details.csv')


my_file1 = os.path.join(THIS_FOLDER, 'cosine_sim_combined.pkl')
my_file2 = os.path.join(THIS_FOLDER, 'tfidf_matrix_combined.pkl')
my_file3 = os.path.join(THIS_FOLDER, 'tfidf_vectorizer.pkl')
my_file4 = os.path.join(THIS_FOLDER, 'cosine_similarity.pkl')

with open(my_file1, "rb") as f:
    cosine_sim_combined = pickle.load(f)

with open(my_file2, "rb") as f:
    tfidf_matrix_combined = pickle.load(f)

with open(my_file3, "rb") as f:
    tfidf_vectorizer = pickle.load(f)

with open(my_file4, "rb") as f:
    cosine_similarity = pickle.load(f)


# ---------------------------------------------------------------------------

clean_df = df.drop_duplicates()

tfidf_matrix_uses = tfidf_vectorizer.fit_transform(
    clean_df['Uses'].astype(str))
tfidf_matrix_composition = tfidf_vectorizer.fit_transform(
    clean_df['Composition'].astype(str))
tfidf_matrix_side_effects = tfidf_vectorizer.fit_transform(
    clean_df['Side_effects'].astype(str))

# Ensure all matrices have the same number of rows
min_rows = min(
    tfidf_matrix_uses.shape[0], tfidf_matrix_composition.shape[0], tfidf_matrix_side_effects.shape[0])

# Trim matrices to have the same number of rows
tfidf_matrix_uses = tfidf_matrix_uses[:min_rows]
tfidf_matrix_composition = tfidf_matrix_composition[:min_rows]
tfidf_matrix_side_effects = tfidf_matrix_side_effects[:min_rows]
tfidf_matrix = tfidf_vectorizer.fit_transform(clean_df['Uses'])


def recommend_medicines_by_symptoms(symptoms, tfidf_vectorizer, tfidf_matrix, clean_df):
    # Create a string from the given symptoms
    symptom_str = ' '.join(symptoms)

    # Transform the symptom string using the TF-IDF vectorizer
    symptom_vector = tfidf_vectorizer.transform([symptom_str])

    # Calculate cosine similarity between the symptom vector and all medicine vectors
    sim_scores = cosine_similarity(tfidf_matrix_uses, symptom_vector)

    # Get indices of top similar medicines
    sim_scores = sim_scores.flatten()
    similar_indices = sim_scores.argsort()[::-1][:4]  # Top 4 similar medicines

    # Check if there are any similar medicines found
    if sim_scores.max() == 0:
        return None
    else:
        # Get recommended medicine names
        recommended_medicines = clean_df.iloc[similar_indices]['Medicine_Name'].tolist(
        )

        return recommended_medicines


def print_data(recommended_medicines):
    medicines_info = []
    i = 0
    for each_med in recommended_medicines:
        i += 1
        medicine_info = {
            "Medicine": i,
            "Medicine_Name": each_med,
            "Medicine_Uses": df.loc[df['Medicine_Name'] == each_med, 'Uses'].values[0],
            "Medicine_Side_Effects": df.loc[df['Medicine_Name'] == each_med, 'Side_effects'].values[0],
            "Medicine_URL": df.loc[df['Medicine_Name'] == each_med, 'Image_URL'].values[0]
        }
        medicines_info.append(medicine_info)
    for med_info in medicines_info:
        print("Medicine:", med_info["Medicine"])
        print("Medicine Name:", med_info["Medicine_Name"])
        print("Medicine Uses:", med_info["Medicine_Uses"])
        print("Medicine Side-Effects:", med_info["Medicine_Side_Effects"])
        print("Medicine Image URL:", med_info["Medicine_URL"])
    return medicines_info


# ---------------------------------------------------------------------------------------------------------------


log = logging.getLogger(__name__)
router = APIRouter()


@router.post('/recommend_medicine')
async def recommend(req):
    print("req", req)

    query = req.strip().lower()  # Convert the single symptom to a list
    query = query.split()
    print("query", query)
    recommended_medicines = recommend_medicines_by_symptoms(
        query, tfidf_vectorizer, tfidf_matrix, clean_df)
    print(recommended_medicines)
    return print_data(recommended_medicines)


def print_data(recommended_medicines):
    medicines_info = []
    for each_med in recommended_medicines:
        medicine_info = {
            "Medicine_Name": each_med,
            "Medicine_Uses": df.loc[df['Medicine_Name'] == each_med, 'Uses'].values[0],
            "Medicine_Side_Effects": df.loc[df['Medicine_Name'] == each_med, 'Side_effects'].values[0],
            "Medicine_URL": df.loc[df['Medicine_Name'] == each_med, 'Image_URL'].values[0]
        }
        medicines_info.append(medicine_info)
    # for med_info in medicines_info:
    #     print("Medicine Name:", med_info["Medicine_Name"])
    #     print("Medicine Uses:", med_info["Medicine_Uses"])
    #     print("Medicine Side-Effects:", med_info["Medicine_Side_Effects"])
    #     print("Medicine Image URL:", med_info["Medicine_URL"])
    # medicines = json.dumps(medicines_info)
    # print(medicines)
    return medicines_info
