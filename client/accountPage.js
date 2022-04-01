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

function changeUser() {
  
}


}
