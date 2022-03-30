class User {
    constructor(id, email, first_name, last_name, is_admin ) {
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.is_admin = is_admin;
    }
}

var active_user = new User(3, "fred@fred", "fredrik", "lindberg", True);


function displayUser() {

    $("#").append("<div class='col-auto mb-3'><div class='card-body'><h5 class='card-title'>" + active_user.id + "</h5><p class='card-text'> <b>Email </b> "+ active_user.email +"<br> <b>Namn:</b> " + active_user.first_name+active_user.last_name + "<br> <b>Admin:</b> " + active_user.is_admin + "</p></div>");
}