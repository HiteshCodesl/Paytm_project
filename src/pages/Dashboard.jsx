import axios from 'axios';
import SendMoneyButton from '../components/SendMoneyButton' 
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState([]);

  useEffect(()=>{
    console.log("effect called")
    console.log(`${import.meta.env.VITE_BASE_URL}`);
 const responseBalance = async() =>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/account/balance`, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      }
    })
    console.log(response.data)
  }
  responseBalance();``
  }, [])

  
 

  const SearchUser = async() =>{
      
     const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/users`);

      setUsers(response.data.users);
  }


  return (
    <div className='m-6'>
      <div className='m-3'>
        <h2 className='text-2xl font-bold my-10'>Payments App</h2>
     </div>

     {balance.map(b =>(
      <div className='m-4'>
         <p className='text-xl font-bold mb-10'>Your balance:{b.balance}</p>
     </div>
     ))}

     <div>
      
       <p className='m-4 text-2xl font-bold'>Users</p>

        <input onChange={(e)=>{
          setUsers(e.target.value);
        }} 

        className='border w-[70vw] h-[50px] p-5 text-lg font-medium' placeholder='Search Users...'
        />

        <button onClick={SearchUser}
         className='border p-3 ml-4 bg-[#3f3f46] text-white text-lg font-semibold rounded-md'>Search User</button>

        <div className='flex items-center mt-6 w-full gap-[20vw] text-nowrap mx-2' >
        <div className=' flex flex-col gap-3 items-start ml-2 '>
            
      {users.map(user =>(
      <div key={user._id}>
        <p className='text-xl font-bold border p-2 '>{user.firstname} {user.lastname}</p>

          <div onClick={()=>{
            navigate("/sendmoney")
        }   
        } className='flex  justify-end'>
          <SendMoneyButton>
            Send Money
          </SendMoneyButton>
          </div>

      </div>
    ))}
        </div>
      
        </div>
     </div>
    </div>
  )
}

export default Dashboard
