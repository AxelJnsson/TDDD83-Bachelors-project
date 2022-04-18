$('#loginButton').click(function (e) {
    e.preventDefault();
    $("#loginModal").modal('toggle');
  });

$('#closeLoginButton').click(function (e) {
    e.preventDefault();
    $("#loginModal").modal('hide');
  });

$('#xButtonLogin').click(function (e) {
  e.preventDefault();
  $("#loginModal").modal('hide');
});

$('#loginModal').on('keypress', function (e) {
  var keycode = (e.keyCode ? e.keyCode : e.which);
  if(keycode == '13'){
    $('#LoginFinishButton').click();   
  }
});

$('#LoginFinishButton').click(function (e) {
    e.preventDefault();
    var inputEmail = $("#inputEmailForm").val();
    var inputPassword = $("#inputPasswordForm").val();     
      $.ajax ({  
        url:'/login',
        type: 'POST',
      datatype: 'JSON',
        contentType: "application/json",
        data: JSON.stringify({
          "email":inputEmail, "password":inputPassword}), 
        success: function(i) {
         sessionStorage.setItem('auth', JSON.stringify(i)); 
         sessionStorage.setItem('userID',i.user.user_id);
         sessionStorage.setItem('loggedIn',true);     
         $(".container").html($("#view-home").html());
         storeCartedItems();
         sessionStorage.setItem('startedShopping',true);
         window.location.reload();
        },
        error: function(){
          alert("Wrong username or password!");
        }
        // statuscode: {
        //   401: function() {
        //     alert("Wrong username or password!");
        //     $(".container").html($("#view-home").html());
    
        //   }
        //}
      });    
  });
  
function logoutUser() {
  $(".container").html($("#view-home").html())
  sessionStorage.setItem('loggedIn', false);
  transferCartToSession();
  sessionStorage.removeItem('auth');
  sessionStorage.removeItem('anv');
  sessionStorage.removeItem('userID');
  window.location.reload();
}
  $('#registerButton').click(function (e) {
    $(".container").html($("#view-signup").html())
    
   /* e.preventDefault(); */
  });

  $('#registerFinishButton').click(function(e) {
    var email = $("#inputEmailRegisterForm").val();
    var first_name = $("#inputFirstname").val();
    var lastName = ($("#inputLastname").val());
    var password = ($("#inputPasswordRegisterForm").val());  
    $.ajax ({  
      url:'/sign-up',
      type: 'POST',
    datatype: 'JSON',
      contentType: "application/json",
      data: JSON.stringify({
         "firstname":first_name, "last_name": lastName, "email":email, "password":password}), 
      success: function(i) { 
           alert("Din användare är skapad!");
           $("#sideBarContainer").html($("#empty").html())
           $("#productViewContainer").html($("#empty").html())
           $("#mainViewContainer").html($("#view-home").html())
           $("#registerModal").modal('hide');
           $.ajax ({  
            url:'/login',
            type: 'POST',
          datatype: 'JSON',
            contentType: "application/json",
            data: JSON.stringify({
              "email":email, "password":password}), 
            success: function(i) {
             sessionStorage.setItem('auth', JSON.stringify(i)); 
             sessionStorage.setItem('userID',i.user.user_id);
             sessionStorage.setItem('loggedIn',true);     
             $(".container").html($("#view-home").html());
             storeCartedItems();
             sessionStorage.setItem('startedShopping',true);
             window.location.reload();
            },
            error: function(){
              alert("Wrong username or password!");
            }
          });    
           $.ajax ({  
            url:'/createorderhistory/'+ i.user_id,
            type: 'POST',
            contentType: "application/json",
          
            success: function() {
      }
    })}
    });
  
  });

function storeCartedItems(){
  var productsInCart = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
  var ID = JSON.parse(sessionStorage.getItem('auth')).user.user_id;
  $.ajax ({  
    url:'/user/'+ ID,
    type: 'GET',
    contentType: "application/json",
    success: function(data) { 
      for (let i = 0; i<data[2].length;i++){
        // alert(data[2][i].product_id);
        productsInCart.delete(data[2][i].product_id);
      }
      if (productsInCart.size>0){
        for (let key of productsInCart.keys()){
          for (let i=0; i < parseInt(productsInCart.get(key)); i++){
            addProductToCart(key);
          }
        }
      }
      productsInCart.clear();
      sessionStorage.setItem('productsInCart', JSON.stringify(Array.from(productsInCart)));
    }
  });
}

function transferCartToSession(){
  var ID = JSON.parse(sessionStorage.getItem('auth')).user.user_id;
  $.ajax ({  
    url:'/user/'+ ID,
    type: 'GET',
    contentType: "application/json",
    success: function(data) { 
      var productsInCart = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));
      console.log(data[2])
      for (let i = 0; i<data[2].length;i++){
        productsInCart.set(data[2][i].product_id,data[2][i].quantity);
        console.log(productsInCart);
        }
      sessionStorage.setItem('productsInCart', JSON.stringify(Array.from(productsInCart)));
    }
  });
}          