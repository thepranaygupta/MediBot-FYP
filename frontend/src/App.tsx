import { useState } from 'react';
import { Button } from './components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import { cloudinaryConfig } from './config/cloudinary';

function App() {
  const backendURL = 'http://localhost:8000';
  const [image, setImage] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    // store the image path in state
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
  }

  async function handleSubmit() {
    try {
      toast.loading('Uploading Image...');
      const formData = new FormData();
      formData.append('file', image!);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);
      let data = '';
      await fetch(cloudinaryConfig.uploadURL, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          toast.dismiss();
          toast.success('Image Uploaded!');
          toast.loading('Predicting Tumour...');
          data = res.secure_url;
          console.log(data, 'uploaded to cloudinary');

          fetch(`${backendURL}/predict_tumour`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: data }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              toast.success('Prediction Successful!');
            })
            .catch((err) => {
              console.log(err);
              alert('Something went wrong!');
            })
            .finally(() => {
              toast.dismiss();
            });
        })
        .catch((err) => {
          console.log(err);
          alert('Something went wrong!');
        });
    } catch (err) {
      toast.error('Something went wrong!');
      console.log(err);
    } finally {
      toast.dismiss();
      setImage(null);
    }
  }

  return (
    <>
      <main className='flex flex-col items-center justify-center min-h-screen space-y-20 my-6 max-w-[1200px] mx-auto'>
        <img
          className='w-[250px] h-auto'
          src={image ? URL.createObjectURL(image) : 'https://via.placeholder.com/600x600'}
          alt='preview'
        />
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
      </main>
      <Toaster />
    </>
  );
}

export default App;
