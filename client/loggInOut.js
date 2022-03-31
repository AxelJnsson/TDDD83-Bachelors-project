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

