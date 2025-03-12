import '../SubscriptionCard/SubscriptionCard.css'

function SubscriptionCard({ subscription, SubscriptionDetails, id }) {
  console.log("subscirptionsCard, ", id)
  return (
    <section className='SubscriptionCard' onClick={() => SubscriptionDetails(id)}>
       <p>Image or icon will go here</p>
       <h2>{subscription.title}</h2>
    </section>
  )
}

export default SubscriptionCard;