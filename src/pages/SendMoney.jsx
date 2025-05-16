import React from 'react'

function SendMoney() {
  return (
    <div>
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='w-[40vw] h-[34vh] border shadow-2xl'>
              <h2 className='font-bold text-3xl justify-center flex mt-9'>Send Money</h2>
              <div className='flex flex-col'>
                 <div className='flex mt-12 mx-[40px] items-center gap-4'>
                  <p className='rounded-full bg-green-500 h-10 w-10 text-xl text-white py-2 px-3 font-semibold'>A</p>
                  <p className='text-2xl font-semibold '>Aman</p>
                 </div>
                   <div>
                   <p className='mx-10 mt-3 font-semibold'>Amount(in Rs)</p>
                   </div>
                   <div className='mx-8 p-3 text-xl font-semibold'>
                     <input type="number" className='focus:outline-none border p-2' placeholder='Enter Amount' 
                     />
                   </div>
                   <div>
                    <button className='text-lg font-semibold mt-2 p-3 bg-green-500  text-white border mx-10 w-[345px]'>Initiate Transfer</button>
                   </div>
             
             
              </div>


            </div>
        </div>
    </div>
  )
}

export default SendMoney
