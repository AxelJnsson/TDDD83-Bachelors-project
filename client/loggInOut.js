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
    alert("Du försökte logga in med\n emailen: " + inputEmail+ "\noch lösenordet: "+inputPassword+"\n Men asså det går inte att logga in än.");
    $("#loginModal").modal('hide');
  });
  
$('#logoutButton').click(function (e) {
  alert("vi får väll låtsas att du loggade ut nu")
  });

  $('#registerButton').click(function (e) {
    $(".container").html($("#view-signup").html())
    
    //$("#signupknapp").append(' <button type="button" class="btn btn-primary" id="signupButton" onclick="signUp()">Registrera</button>');
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
      }
    });
  
  });

  
  