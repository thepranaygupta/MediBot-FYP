import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const backendURL = 'http://localhost:8000';
  const [image, setImage] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit() {
    console.log(image)
    try {
      fetch(`${backendURL}/predict_tumour`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert(data.message);
        })
        .catch((err) => {
          console.log(err);
          alert('Something went wrong!');
        });
    } catch (err) {
      console.log(err);
      alert('Something went wrong!');
    } finally {
      setImage(null);
    }
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen space-y-20 my-6 max-w-[1200px] mx-auto'>
      <img className='w-[250px] h-auto' src={image || 'https://via.placeholder.com/600x600'} alt='preview' />
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
  );
}

export default App;
