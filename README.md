# MediBot-FYP
Medibot is an AI-powered health assistant designed to provide personalized healthcare support. Using advanced algorithms, it offers users tailored medical advice, tracks their health metrics, and schedules appointments with healthcare professionals.

## Installation
1. Clone the repository
```bash
git clone https://github.com/thepranaygupta/MediBot-FYP.git
```
2. Change the directory
```bash
cd MediBot-FYP
```

### Backend
3. Change the directory to backend
```bash
cd backend
```

4. Install the dependencies
```bash
pip install -r requirements.txt
```

5. Run the server
```bash
uvicorn app.main:app --reload --workers 1 --host 0.0.0.0 --port 8000
```

### Frontend
6. Change the directory to frontend
```bash
cd ../frontend
```

7. Install the dependencies
```bash
npm install
```

8. Run the server
```bash
npm run dev
```
