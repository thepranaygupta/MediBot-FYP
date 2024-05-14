import { Button } from '@/components/ui/button';
import CustomCard from '@/components/ui/custom_card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function MedicineRecommendation() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendation, setShowRecommendation] = useState<boolean>(false);

  async function handleSubmit() {
    try {
      if (!symptoms) {
        toast.error('Please enter symptoms!');
        return;
      }
      setLoading(true);
      const toastId = toast.loading('Getting Medicine Recommendation...');
      const response = await fetch(`${backendURL}/recommend_medicine?req=${symptoms}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setRecommendations(data);
      toast.dismiss(toastId);
      setShowRecommendation(true);
      toast.success('Medicine Recommendation Successful!');
    } catch (err) {
      toast.error('Something went wrong!');
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className='flex flex-col items-center'>
        <div className='grid w-1/2 gap-2 mx-auto my-6'>
          <Label htmlFor='symptoms'>Symptoms</Label>
          <Textarea
            placeholder='Type your symptoms here'
            id='symptoms'
            name='symptoms'
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            disabled={loading}
          />
          <Button onClick={handleSubmit} disabled={loading}>
            Get Medicine Recommendation
          </Button>
        </div>
        {recommendations.length == 0 && showRecommendation ? (
          <>
            <div className='text-center text-2xl font-bold mt-4'>No Data Found</div>
          </>
        ) : (
          <div className='grid gap-4 grid-cols-1 mx-4 my-6'>
            {recommendations.map((recommendation, index) => (
              <CustomCard key={index} recommendation={recommendation} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
