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
<<<<<<< HEAD
         
         sessionStorage.setItem('auth', JSON.stringify(i));
        
          $(".container").html($("#view-home").html());
          window.location.reload(); 
  
=======
        
         sessionStorage.setItem('userID',i.user.user_id)
         sessionStorage.setItem('auth', JSON.stringify(i));           
         $(".container").html($("#view-home").html());
         window.location.reload();
>>>>>>> 641d1579018679f22bcb2c26051936852e746e49
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
  sessionStorage.removeItem('auth');
  sessionStorage.removeItem('anv');

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
            url:'/createorderhistory/'+ i.user_id,
            type: 'POST',
            contentType: "application/json",
          
            success: function() { 
      }
    })}
    });
  
  });

//  function updateUserPriceAtLogin(userAndToken){
//     alert(userAndToken)
//   }