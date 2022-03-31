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
    
    let active_user = new User("3", "Fredrik.Lindberg@gmail.com", "Fredrik", "Lindberg", "Åbylundsgatan", "True");
    $("#profname").append("<h5 class='card-title'>" + active_user.first_name + " " + active_user.last_name +"</h5>");
   // $("#profmail").append("<h5 class='card-title'>" + active_user.email + "</h5>");
    //$("#profAdress").append("<div class='card-body'> <h6 class='card-title'>"+ active_user.adress +"</h6></div>");
    $("#profAdress").append("<input class='form-control form-control-sm' type='text' placeholder="+ active_user.adress+" readonly>");
    $("#profContact").append("<input class='form-control form-control-sm' type='text' placeholder="+ active_user.email+" readonly>");
    $("#profSek").append("<input class='form-control form-control-sm' type='text' placeholder="+ active_user.is_admin+" readonly>");
}
