import { useState } from 'react';

function App() {
  const backendURL = process.env.VITE_BACKEND_URL || 'http://localhost:3000';
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
    <main className='flex flex-col items-center justify-center min-h-screen space-y-20'>
      <div className='flex flex-row gap-4 mt-6'>
        <input type='file' accept='image/png, image/jpeg' onChange={handleFileChange} className='' />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => setImage(null)}>
          Clear
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <img className='w-[250px] h-auto' src={image || 'https://via.placeholder.com/600x600'} alt='preview' />
    </main>
  );
}

export default App;
