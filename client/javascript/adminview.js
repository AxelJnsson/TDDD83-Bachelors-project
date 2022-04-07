function deleteUser_admin() {
  
    var x = JSON.parse(sessionStorage.getItem('auth')).user.is_admin;
    
    if (is_admin == 1) {
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
  }