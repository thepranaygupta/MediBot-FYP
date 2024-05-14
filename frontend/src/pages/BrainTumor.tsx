import { useState } from 'react';
import { Button } from '../components/ui/button';
import toast from 'react-hot-toast';
import { cloudinaryConfig } from '../config/cloudinary';
import React from 'react';

export default function BrainTumor() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [image, setImage] = useState<File | null>(null);
  const [showPrediction, setShowPrediction] = useState<boolean>(false);
  const [isTumour, setIsTumour] = useState<boolean>(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    // store the image path in state
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
  }

  async function handleSubmit() {
    try {
      const formData = new FormData();
      formData.append('file', image!);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      let data = '';
      const toastId = toast.loading('Predicting Tumour...');
      await fetch(cloudinaryConfig.uploadURL, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          data = res.secure_url;
          console.log(data, 'uploaded to cloudinary');

          fetch(`${backendURL}/predict_tumour?img=${data}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              toast.dismiss(toastId);
              toast.success('Prediction Successful!');
              console.log(data);
              setIsTumour(data.prediction[0] === 1);
              setShowPrediction(true);
            })
            .catch((err) => {
              toast.error('Something went wrong!');
              console.log(err);
            });
        })
        .catch((err) => {
          toast.error('Something went wrong!');
          console.log(err);
        });
    } catch (err) {
      toast.error('Something went wrong!');
      console.log(err);
    }
  }
  return (
    <>
      <main className='flex flex-col items-center justify-center min-h-[80vh] space-y-10 my-6 max-w-[1200px] mx-auto'>
        {image ? (
          <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-2xl font-bold'>Selected Image</h1>
            <img
              className='object-contain w-[250px] h-[250px] rounded-xl'
              src={URL.createObjectURL(image)}
              alt='Selected Image'
            />
          </div>
        ) : (
          <div
            className='flex flex-col items-center justify-center space-y-4 w-1/2 text-center border-2 border-gray-300 rounded-xl p-4 border-dashed'
            onClick={() => {
              if (typeof window === 'undefined') return;
              const el = document.getElementById('selectImage');
              if (el) el.click();
            }}>
            <h1 className='text-4xl font-bold'>Brain Tumour Detection</h1>
            <p className='text-xl font-semibold'>
              Upload an MRI scan of a brain and the model will predict whether a tumour is present or not.
            </p>
          </div>
        )}
        <div className='flex flex-col w-1/3 gap-4 items-center'>
          <Button
            className='w-2/3'
            onClick={() => {
              if (typeof window === 'undefined') return;
              const el = document.getElementById('selectImage');
              if (el) el.click();
            }}>
            {image ? 'Change Image' : 'Select Image'}
          </Button>
          <input
            name='image'
            id='selectImage'
            type='file'
            accept='image/png, image/jpeg'
            onChange={handleFileChange}
            hidden
          />

          {image ? (
            <div className='flex justify-center flex-row gap-4'>
              <Button onClick={() => setImage(null)}>Clear</Button>
              <Button onClick={handleSubmit}>Submit</Button>{' '}
            </div>
          ) : null}
        </div>

        {showPrediction ? (
          <div>
            {image ? (
              <div className='flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold'>Prediction</h1>
                <p
                  className={`text-xl font-semibold
              ${isTumour ? 'text-red-500' : 'text-green-500'}`}>
                  {isTumour ? 'Tumour Detected' : 'No Tumour Detected'}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </main>
    </>
  );
}
