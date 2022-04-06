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
         
         //var user = i["user"];
         
         sessionStorage.setItem('auth', JSON.stringify(i));
         alert(JSON.stringify(sessionStorage.getItem('auth')));
         if (user["is_admin"] == 1) {
          $(".container").html($("#view-home").html());
         } else {
          $(".container").html($("#view-home").html());
          window.location.reload(); 
         }
         

         
           
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
           $(".container").html($("#view-home").html());
           $("#registerModal").modal('hide');
      }
    });
  
  });

  
  