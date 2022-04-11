// function updateUserPriceAtLogin(useID){
//   alert("uppdaterar price för" + useID);

//     $.ajax ({
//         url:'/user/'+useID,
//         type: 'GET',
//         datatype: 'JSON',
//         contentType: "application/json",
//         success: function(data) {
//           arrayOfProducts = []
//           data[2].forEach(element =>arrayOfProducts.push(element))
//             alert(arrayOfProducts[i].product_id);
//             $.ajax ({
//                 url:'/user/1',
//                 type: 'GET',
//                 datatype: 'JSON',
//                 contentType: "application/json",
//                 success: function(user) {
//                     alert(user)
//                     // currentSessionPrice = JSON.parse(sessionStorage.getItem('price'));
//                     // amountToAddFromLogin = product.price* arrayOfProducts[i].quantity;
//                     // sessionStorage.setItem(('price'),currentSessionPrice+amountToAddFromLogin);
//                 }
//               });
//         }
//       }); 
//     sessionStorage.setItem('priceUpToDate', true);
//   }