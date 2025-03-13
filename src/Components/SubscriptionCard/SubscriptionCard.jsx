import '../SubscriptionCard/SubscriptionCard.css'
import tea from '../../assets/tea.png'

function SubscriptionCard({ subscription, SubscriptionDetails, id }) {
  console.log("subscirptionsCard, ", id)
  return (
    <section className='SubscriptionCard' onClick={() => SubscriptionDetails(id)}>
       <img className='logo' src={ tea } alt="tea logo" />
       <h2>{subscription.title}</h2>
    </section>
  )
}

export default SubscriptionCard;