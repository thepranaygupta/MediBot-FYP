interface CustomCardProps {
  key: number;
  recommendation: {
    Medicine_URL: string;
    Medicine_Name: string;
    Medicine_Side_Effects: string;
    Medicine_Uses: string;
  };
}

export default function CustomCard({ recommendation }: CustomCardProps) {
  return (
    <div className='flex max-w-2xl flex-col items-center rounded-md border md:flex-row text-gray-900'>
      <div className='h-full w-full md:h-[200px] md:w-[300px]'>
        <img src={recommendation?.Medicine_URL} alt='Laptop' className='h-full w-full rounded-md object-cover' />
      </div>
      <div className='flex-1'>
        <div className='p-4'>
          <h3 className='inline-flex items-center text-lg font-semibold'>{recommendation?.Medicine_Name}</h3>
          <div className='mt-4'>
            <span className='font-bold'>Uses: </span>
            <span className='text-sm text-gray-900'>{recommendation?.Medicine_Uses}</span>
          </div>
          <p className='mt-3 text-sm'>
            <span className='font-bold'>Side Effects: </span>
            {recommendation?.Medicine_Side_Effects}
          </p>
        </div>
      </div>
    </div>
  );
}
