class User {
    constructor(id, email, first_name, last_name, is_admin ) {
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.is_admin = is_admin;
    }
}
//let active_user = new User(3, "Fredrik.Lindberg@gmail.com", "Fredrik", "Lindberg", True);



function displayUser() {
    
    let active_user = new User("3", "Fredrik.Lindberg@gmail.com", "Fredrik", "Lindberg", "True");
    $("#profname").append("<h5 class='card-title'>" + active_user.first_name + " " + active_user.last_name +"</h5>");
    $("#profmail").append("<h5 class='card-title'>" + active_user.email + "</h5>");
   // $(".card-container").append('<div class="card" style="width:400px"><div class="card-body"><h4 class="card-title"></h4><p class="card-text"></p></div></div>');                    


}
