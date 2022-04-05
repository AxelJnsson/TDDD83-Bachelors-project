// fetch("/config")
// .then((result) => { return result.json(); })
// .then((data) => {
// // Initialize Stripe.js
// const stripe = Stripe(data.publicKey);
// });



function stripeTestFunction(){
  price=100
    fetch("/create-checkout-session")
    .then((result) => { return result.json(); })
    .then((data) => {
      console.log(data);
      // Redirect to Stripe Checkout
      return stripe.redirectToCheckout({sessionId: data.sessionId})
    })
    .then((res) => {
      console.log(res);
    });
    console.log("allabarn");
}