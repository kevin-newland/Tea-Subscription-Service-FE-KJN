import SubscriptionCard from "../SubscriptionCard/SubscriptionCard";

function SubscriptionList({ subscriptions, SubscriptionDetails }) {
  // console.log("subscirptionsLists, ", subscriptions)
  return(
    <section className="subscription-list">
      {subscriptions
      .sort((a, b) => (a.attributes.title > b.attributes.title ? 1 : -1)) 
      .map((subscription) => (
        <SubscriptionCard 
        key={subscription.id}
        id={subscription.id} 
        subscription={subscription.attributes}
        SubscriptionDetails={SubscriptionDetails}
        />
      ))}
    </section>    
  );
}


export default SubscriptionList;
