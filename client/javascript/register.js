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