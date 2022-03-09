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

$('#registerFinishButton').click(function (e) {
    e.preventDefault();
    alert("hej");
    var inputEmail = $("#inputEmailRegisterForm").val();
    var inputPassword = ("#inputPasswordRegisterForm").val();
    var inputCheckPassword = $("#inputPasswordAgainRegisterForm").val();
    if (inputPassword == inputCheckPassword){
        alert("Du försökte registrera dig med\n emailen: " + inputEmail+ "\noch lösenordet: "+inputCheckPassword+"\n Men asså det går inte att registrera sig än.");
        $("#loginModal").modal('hide');
    }else{
        alert("Dit andra lösenord matchar inte det första!")
    }
  });
inputPasswordRegisterForm