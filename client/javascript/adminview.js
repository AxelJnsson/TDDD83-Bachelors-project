function User_admin() {

    
    //var x = JSON.parse(sessionStorage.getItem('auth')).user.is_admin;
    
    //if (is_admin != 1) {
    $.ajax({
     headers: {
       "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
     url:'/user',
     type: 'GET',
     success: function(users) {
       
        var list = users;


        for (let i = 0; i < list.length; i++) {      
          $(".card-container").append('<div class="card" style="width:400px"><div class="card-body"><h4 class="card-title"></h4><p class="card-text"></p></div></div>');                    
    
          let cards = $('.card-text');
          var admin =  JSON.parse(sessionStorage.getItem('auth')).user.isadmin;
          var x = JSON.parse(sessionStorage.getItem('auth')).user.id;

          cards.eq(i).html(("Id: " + list[i].user_id + "<br>"+ "Email: " + list[i].email + "<br>" + "First Name: " + list[i].first_name + "<br>" + "Last Name: " + list[i].last_name + "<br>" + "Admin (0 eller 1): " + list[i].is_admin + "<br>" + '<a class="btn btn-primary deletebutton" data-id = "'+list[i].user_id+'" href="#">Delete</a>' + '<a class="btn btn-primary editbutton" data-id onclick="openModal()"= "'+list[i].user_id+'" data-toggle="modal" data-target="#exampleModal" href="#">Edit</a>'));
     }
    }
    }) 
//}
  }

  function adminEdit1() {
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
    $('#closeEditButton1').click(function (e) {
      e.preventDefault();
      $("#adminEditModal").modal('hide');
    });
  }
  
  function adminEdit2() {
    
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

  function openModal() {
    $("#adminEditModal").modal('toggle');
  }

  $('#closeEditButton1').click(function (e) {
    e.preventDefault();
    $("#adminEditModal").modal('hide');
  });