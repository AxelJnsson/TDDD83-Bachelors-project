//REFAKTORERAD
$('#registerButton').click(function (e) {
    e.preventDefault();
    $("#registerModal").modal('toggle');
});

function closeRegisterModal(){
  $("#registerModal").modal('hide');
}
  
$('#registerModal').on('keypress', function (e) {
  var keycode = (e.keyCode ? e.keyCode : e.which);
  if(keycode == '13'){
    $('#registerFinishButton').click();   
  }
});

$('#inputPasswordRegisterForm, #inputPasswordRegisterForm2').on('keyup', function () {
  if ($('#inputPasswordRegisterForm').val() == $('#inputPasswordRegisterForm2').val()) {
    $('#passMessage').html('Matchar').css('color', 'green');
    document.getElementById("registerFinishButton").disabled = false;
  } else 
    $('#passMessage').html('Matchar ej').css('color', 'red');
  
        
});

function checkPass() {
  if ($('#inputPasswordRegisterForm').val() == $('#inputPasswordRegisterForm2').val()) {
    document.getElementById("registerFinishButton").disabled = false;
}else {
  document.getElementById("registerFinishButton").disabled = true;
}}