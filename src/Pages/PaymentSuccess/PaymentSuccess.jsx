import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {
    const [searchParams]=useSearchParams();
    const sessionId =searchParams.get("session_id");

    useEffect(()=>{
        axios.post(`http://localhost:5000/success-payment?session_id=${sessionId}`).then(res =>{
            console.log(res.data);
        })
    },[sessionId])
    return (
        <div>
            success
        </div>
    );
};

export default PaymentSuccess;