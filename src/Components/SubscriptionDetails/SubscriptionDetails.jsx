import '../SubscriptionDetails/SubscriptionDetails.css';
import { useState, useEffect } from "react";

function SubscriptionDetails( {specificSubscription} ) {
  
  const {subscription, included } = specificSubscription;

  const [canceledSubscriptions, setCanceledSubscriptions] = useState([]); 

  useEffect(() => {
    console.log("Updated canceled subscriptions:", canceledSubscriptions);
  }, [canceledSubscriptions]);

  function cancelCustomerSubscription(customerId,  subscriptionId) {
    fetch(`http://localhost:3000/api/v1/customer_subscriptions/${customerId}/${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log("Fetched cancel Data:", data)
      setCanceledSubscriptions(prev => [...prev, `${customerId}-${subscriptionId}`]);
  })
    .catch(error => console.log(error.message))
  }
  
  console.log(" details page",subscription.attributes.title)
  return (
    <div className='SubscriptionDetails'>
      <div className='details-container'>
        <h2>{subscription.attributes.title}</h2>
        <p>Price: {subscription.attributes.price}</p>
        <p>Frequency: {subscription.attributes.frequency}</p>

        <h3>Teas</h3>
        <ul>
          {included.filter(item => item.type === "tea")
          .map(tea => (
            <li>
              <p>Title: {tea.attributes.title}</p> 
              <p>Description: {tea.attributes.description}</p>
              <p>Temperature(in F*): {tea.attributes.temperature}</p>
              <p>Brew Time(in Minutes): {tea.attributes.brew_time}</p>
            </li>
          ))}
        </ul>
      </div>

      <h3>Customers that are Subscribed</h3>
      <ul>
        {included.filter(item => item.type === "customer").map(customer => {
          const canceled = `${customer.id}-${subscription.id}`; 

          return (
            <li>
              <p>First Name: {customer.attributes.first_name}</p> 
              <p>Last Name: {customer.attributes.last_name}</p>
              <p>Email: {customer.attributes.email}</p>
              <p>Address: {customer.attributes.address}</p>

              {canceledSubscriptions.includes(canceled) ? (
                <span className="canceled-text">Canceled!</span>
              ) : (
                <button onClick={() => cancelCustomerSubscription(customer.id, subscription.id)}>
                  Cancel Subscription
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SubscriptionDetails;

