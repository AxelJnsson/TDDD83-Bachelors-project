//refaktorerad
function Display_admin() {
    $.ajax({
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/user',
      type: 'GET',
      success: function(users) {
          var list = users;
          for (let i = 0; i < list.length; i++) {      
            $(".card-container").append('<div class="card col-4", id = "userCard" style="width:400px"><div class="card-body"><h4 class="card-title"></h4><p class="card-text"></p></div></div>');                    
      
            let cards = $('.card-text');

            cards.eq(i).html(("Id: " + list[i].user_id + "<br>"+ "Email: " + list[i].email + "<br>" + "First Name: " + list[i].first_name + "<br>" + "Last Name: " 
            + list[i].last_name + "<br>" + "Admin (0 eller 1): " + list[i].is_admin + "<br>" + '<a class="btn btn-tonehub deletebutton" onclick="adminDeleteUser('+list[i].user_id+')" data-id = "'
            +list[i].user_id+' " href="#">Radera</a>' + '<a class="btn btn-tonehub editbutton" onclick="adminEditUser('+list[i].user_id+')" data-id = "'+list[i].user_id
            +'" data-toggle="modal" data-target="#adminEditModal" href="#">Ändra</a>' + '<a class="btn btn-tonehub adminbutton" onclick="makeAdmin('+list[i].user_id+ "," +list[i].is_admin +')" data-id = "'+list[i].user_id
            +'" href="#">Ändra adminstatus</a>'));
          }
      }
    }) 
  }
  
function makeAdmin(user_id, adminStatus) {
    
  if (adminStatus == 1) {
    adminStatus = 0;
  } else {
    adminStatus = 1;
  }
  $.ajax({
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/user/' + user_id,
      type: 'PUT',
      datatype: 'JSON',
      contentType: "application/json",
      data: JSON.stringify({
        "is_admin" : adminStatus}),
      success: function(u) {
        alert("Adminstatus ändrad");
        $("#mainViewContainer").html($("#view-adminPage").html())
        Display_admin();
      }
  });
}

function adminDeleteUser(user_id) {
    
  $.ajax({
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/user/' + user_id,
      type: 'DELETE',
      success: function(u) {
        alert("Din användare är nu raderad!!!");
        $("#mainViewContainer").html($("#view-adminPage").html())
        Display_admin();
      }
  });
}

function adminEditUser(user_id) {
  $.ajax({
    headers: {
      "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/user/'+ user_id,
    type: 'GET',
    success: function(user) {
    var anv = user[0]
    if (user[0] == undefined) {
      $('#adminEditIdField').val(user.user_id);
      $('#adminEditFirstnameField').val(user.first_name);    
      $('#adminEditLastnameField').val(user.last_name);      
      $('#adminEditEmailField').val(user.email);
      $('#adminEditPasswordField').val(user.password_hash);
    } else{
      var anv = user[0]
      $('#adminEditIdField').val(anv.user_id);
      $('#adminEditFirstnameField').val(anv.first_name);    
      $('#adminEditLastnameField').val(anv.last_name);      
      $('#adminEditEmailField').val(anv.email);
      $('#adminEditPasswordField').val(anv.password_hash);
    }
    }
  })   
}

$('#editFinishButton1').click(function(e) {
  var id = parseInt($("#adminEditIdField").val());
  var first_name = $("#adminEditFirstnameField").val();
  var last_name = $("#adminEditLastnameField").val();
  var email = $("#adminEditEmailField").val();
  var password = $("#adminEditPasswordField").val();
  $.ajax ({
    headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/user/' + id,
    type: 'PUT',
    datatype: 'JSON',
    contentType: "application/json",
    data: JSON.stringify({
      "first_name":first_name, "last_name": last_name, "email": email, "password_hash" : password}),
    success: function(user) {    
      alert("Användare ändrad");
      $("#mainViewContainer").html($("#view-adminPage").html())
      Display_admin();
    }
  }) 
});