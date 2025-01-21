"use client";
import { useRouter  } from 'next/navigation'
export default function CorePrograms() {
  const router = useRouter();

const WomenEntrepreneurship = ()=>{
router.push('/program')
}






  return (
    <div className="w-full py-12 bg-gray-100">
  
     

   
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-7xl"> 
          <h2 className="text-4xl sm:text-4xl font-bold items-center text-center text-[#D41461] mb-8">
        Exploring Core Programs
      </h2>
      <div className="border-b-2 border-[#D41461] w-1/4 mx-auto mb-8"></div>


          <div className="flex justify-between gap-4 flex-wrap cursor-pointer"> 
            {/* Image 1 */}
            <div className="flex flex-col items-center text-center"  onClick={WomenEntrepreneurship}>
              <img
                src="/program1.png" 
                alt="Program 1"
                className="w-50 h-40 object-cover mb-4 rounded-lg" 
              />
              <p className="text-sm text-gray-700 font-semibold">Women Entrepreneurship
</p>
<p className="text-sm text-gray-700 font-semibold">
program
</p>
            </div>
{/* 
            Image 2
            <div className="flex flex-col items-center text-center">
              <img
                src="/core-program.png" // Replace with actual image path
                alt="Program 2"
                className="w-w-50 h-40 object-cover mb-4 rounded-lg" // Image size
              />
          <p className="text-sm text-gray-700 font-semibold">Women Creators</p>
<p className="text-sm text-gray-700 font-semibold">Program</p>

            </div>

         
            <div className="flex flex-col items-center text-center">
              <img
                src="/core-program.png" // Replace with actual image path
                alt="Program 3"
                className="w-w-50 h-40 object-cover mb-4 rounded-lg" // Image size
              />
              <p className="text-sm text-gray-700 font-semibold">Women Global
              Networking </p>
              <p className="text-sm text-gray-700 font-semibold"> Program</p>
            </div>

        
            <div className="flex flex-col items-center text-center">
              <img
                src="/core-program.png" // Replace with actual image path
                alt="Program 4"
                className="w-w-50 h-40 object-cover mb-4 rounded-lg" // Image size
              />
              <p className="text-sm text-gray-700 font-semibold">Women Job Seekers
              </p>
              <p className="text-sm text-gray-700 font-semibold">
              program</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
