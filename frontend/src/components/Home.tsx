export default function Home() {
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>MediBot</h2>

          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Medibot is an AI-powered health assistant designed to provide personalized healthcare support. Using
            advanced algorithms, it offers users tailored medical advice, tracks their health metrics, and schedules
            appointments with healthcare professionals.
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2'>
          <a
            href='/medicine-recommendation'
            className='group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg'>
            <img
              src='https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              loading='lazy'
              alt='Medicine Recommendation'
              className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
            />
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50'></div>
            <div className='relative flex flex-col'>
              <span className='text-lg font-semibold text-white lg:text-xl'>Medicine Recommendation</span>
            </div>
          </a>

          <a
            href='/brain-tumor-detection'
            className='group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg'>
            <img
              src='https://images.pexels.com/photos/4226123/pexels-photo-4226123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              loading='lazy'
              alt='Brain Tumor Detection'
              className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
            />
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50'></div>
            <div className='relative flex flex-col'>
              <span className='text-lg font-semibold text-white lg:text-xl'>Brain Tumor Detection</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
