import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function Withdrawal({onClose,TA}) {
  const { ID } = useParams();
  const [amount, setAmount] = useState(0);
  const [accName, setAccName] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [ifc, setIfc] = useState('');

  const handleWithdrawl = async()=>{
    if(accName == '' || accNumber == '' || ifc == ''){
      alert('All filds are required')
    }else if(TA < amount){
      alert('Insufficient Amount')
    }else if(amount < 0){
      alert('Enter a valid Amount')
    }else{
      try {
        const response = await fetch(`/api/payment/teacher/${ID}/withdraw`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({amount : amount})
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const user = await response.json();
        // setAmount(user.data.newTeacher.Balance);
        console.log(user)
        onClose();
      } catch (error) {
        // setError(error.message)
        console.log(error);
      }
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
        <div className=' bg-blue-600 w-80 h-96 rounded-md'>
            <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div>
            <div className='flex flex-col items-center justify-center mt-10 font-semibold'>
                <h1 className='text-2xl mb-10'>Remuneration</h1>
                
                <input type="text" placeholder='Amount' className="p-2 mb-3 rounded-md w-56 border-0 outline-0 text-gray-800" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                <input type="text" placeholder='Ac Holder Name' className="p-2 mb-3 rounded-md w-56 border-0 outline-0 text-gray-800" value={accName} onChange={(e)=>setAccName(e.target.value)}/>
                <input type="text" placeholder='Account Number' className="p-2 mb-3 rounded-md w-56 border-0 outline-0 text-gray-800" value={accNumber} onChange={(e)=>setAccNumber(e.target.value)}/>
                <input type="text" placeholder='IFC Code' className="p-2 mb-5 rounded-md w-56 border-0 outline-0 text-gray-800" value={ifc} onChange={(e)=>setIfc(e.target.value)}/>

                <div onClick={handleWithdrawl} className='bg-green-700 py-2 px-5 rounded-md cursor-pointer'>Withdrawal</div>
                
            </div>
        </div>
    </div>
  )
}

export default Withdrawal