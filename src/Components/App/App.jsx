import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import SubscriptionList from '../SubscriptionList/SubscriptionList';
import SubscriptionDetails from '../SubscriptionDetails/SubscriptionDetails';

function App() {
  const [subscriptions, setSubscriptions] = useState([])
  const [specificSubscription, setSpecificSubscription] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getSubscriptions() ;
  }, [])

  function getSubscriptions() {
    fetch("http://localhost:3000/api/v1/subscriptions")
    .then(response => response.json())
    .then(data => {
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

  return (
    <main className='App'>
      <header>
        <h1>Admin Portal: Tea Subscriptions</h1>
      </header>
      
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
