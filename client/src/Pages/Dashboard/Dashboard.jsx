// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {

     const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const getData = async () => {
        const id = localStorage.getItem('userId');
        
          
        if (!id) {
          toast.error('User not logged in');
         return navigate('/');
        }
      
        try {
          const response = await axios.get(`/api/login/getUser?id=${id}`);
          setUser(response.data);
          console.log(response.data); // Check the response data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      useEffect(() => {
        getData();
      }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-2xl font-bold">Welcome to your Dashboard {user && user.email}!</h2>
    </div>
  );
};

export default Dashboard;
