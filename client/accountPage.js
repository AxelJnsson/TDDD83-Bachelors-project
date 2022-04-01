class User {
    constructor(id, email, first_name, last_name, adress, is_admin ) {
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.adress = adress;
        this.is_admin = is_admin;
    }
}
//let active_user = new User(3, "Fredrik.Lindberg@gmail.com", "Fredrik", "Lindberg", True);

function editUser2() {
  $("#editUserModal").modal('toggle');

  var x = JSON.parse(sessionStorage.getItem('auth')).user.user_id;

  $.ajax({
   headers: {
     "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
   url:'/user/' + x,
   type: 'GET',
   success: function(u) {
     var user = u;
     $('#editFirstnameField').val(user.first_name);    
     $('#editLastnameField').val(user.last_name);      
     $('#editEmailField').val(user.email);
     $('#editPasswordField').val(user.password_hash);
   }
  }) 
}

function editUser3() {
  var firstName = $("#editFirstnameField").val();   
  var lastName = $("#editLastnameField").val();
  var email = $("#editEmailField").val();
  var password = $("#editPasswordField").val();
  
  var x = JSON.parse(sessionStorage.getItem('auth')).user.user_id;

  $.ajax ({
   headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
   url:'/user/' + x,
   type: 'PUT',
   datatype: 'JSON',
   contentType: "application/json",
   data: JSON.stringify({
     "first_name":firstName, "last_name":lastName, "email":email, "password_hash":password}),
   success: function(user) {    
     alert("Användarinfo redigerad");
     $("#editUserModal").modal('hide');
   }
 })   
}
 

  $('#closeEditButton').click(function (e) {
    e.preventDefault();
    $("#editUserModal").modal('hide');
  });

function displayUser() {
   
   var x = JSON.parse(sessionStorage.getItem('auth')).user.user_id; 
    
    $.ajax({
        headers: {
          "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
        url:'/user/' + x,
        type: 'GET',
        success: function(u) {
            
          var anv = u;
          let active_user = new User("3", "Fredrik.Lindberg@gmail.com", "Fredrik", "Lindberg", "Åbylundsgatan", "True");
          $("#profname").append("<h5 class='card-title'> "+anv.first_name + " " + anv.last_name +"</h5>");   
          $("#profAdress").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+active_user.adress+">");
          $("#profContact").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+anv.email+">");
          $("#profSek").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+anv.is_admin+">");
        }
    });
}

function editUser() {
  
  var x = JSON.parse(sessionStorage.getItem('auth')).user.user_id; 
      
    $.ajax({
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/user/' + x,
      type: 'GET',
      success: function(u) {
          
        var anv = u;
        let active_user = new User("3", "Fredrik.Lindberg@gmail.com", "Fredrik", "Lindberg", "Åbylundsgatan", "True");
        $("#profname").append("<h5 class='card-title'> "+anv.first_name + " " + anv.last_name +"</h5>");   
        $("#profAdress").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+active_user.adress+">");
        $("#profContact").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+anv.email+">");
        $("#profSek").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+anv.is_admin+">");
      }
    });
}
