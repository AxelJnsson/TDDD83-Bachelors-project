$('#registerButton').click(function (e) {
    e.preventDefault();
    $("#registerModal").modal('toggle');
  });

$('#closeRegisterButton').click(function (e) {
    e.preventDefault();
    $("#registerModal").modal('hide');
  });

  $('#xRegister').click(function (e) {
    e.preventDefault();
    $("#registerModal").modal('hide');
  });
  

/*
$('#xRegister').click(function (e) {
  e.preventDefault();
  $("#registerModal").modal('hide');
});*/

/*$('#registerFinishButton').click(function (e) {
    e.preventDefault();
    var registerEmail = $("#inputEmailRegisterForm").val();
    var registerPassword = $("#inputPasswordRegisterForm").val();
    var registerCheckPassword = $("#inputPasswordAgainRegisterForm").val();
    if (registerPassword == registerCheckPassword){
       alert("Du försökte registrera dig med \nEmailen: "+registerEmail+"\nLösenordet: "+ registerPassword);
    }else{
        alert("Dit andra lösenord matchar inte det första!")
    }
  });
inputPasswordRegisterForm*/