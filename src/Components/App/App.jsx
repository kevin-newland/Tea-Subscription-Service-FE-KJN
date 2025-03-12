import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import SubscriptionList from '../SubscriptionList/SubscriptionList';
import SubscriptionDetails from '../SubscriptionDetails/SubscriptionDetails';

function App() {
  const [subscriptions, setSubscriptions] = useState([])
  const [specificSubscription, setSpecificSubscription] = useState([])
  // const [canceledSubscriptions, setCanceledSubscriptions] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    getSubscriptions() ;
  }, [])

  function getSubscriptions() {
    fetch("http://localhost:3000/api/v1/subscriptions")
    .then(response => response.json())
    .then(data => {
      // console.log("Fetched Data:", data)
      setSubscriptions(data.data);
  })
    .catch(error => console.log(error.message))
  }

  function getSpecificSubscriptionDetails(id) {
    fetch(`http://localhost:3000/api/v1/subscriptions/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log("Fetched single Data:", data)
      setSpecificSubscription({
        subscription: data.data,
        included: data.included
      });
      navigate(`/subscriptions/${id}`)
  })
    .catch(error => console.log(error.message))
  }

  // function cancelCustomerSubscription(id) {
  //   fetch(`http://localhost:3000/api/v1/customer_subscriptions/${id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log("Fetched cancel Data:", data)
  //     setCanceledSubscriptions(prev => [...prev, customerId]);
  // })
  //   .catch(error => console.log(error.message))
  // }
  
  return (
    <main className='App'>
      
      
      <section className='content'>
        <Routes>
          <Route path="/" element={<SubscriptionList subscriptions={subscriptions} SubscriptionDetails={getSpecificSubscriptionDetails}/>} />
          <Route path="/subscriptions/:id" element={<SubscriptionDetails specificSubscription={specificSubscription} />} /> 
        </Routes>
      </section>
    </main>
  );
}

export default App
