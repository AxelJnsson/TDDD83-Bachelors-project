// fetch("/config")
// .then((result) => { return result.json(); })
// .then((data) => {
// // Initialize Stripe.js
// const stripe = Stripe(data.publicKey);
// });



function stripeTestFunction(){

    $.ajax ({  
        url:'/config',
        datatype: 'JSON',
        contentType: "application/json",
        success: function(cars) {    
        }
      })

    alert("hej");
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