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
   
    var fname = sessionStorage.getItem('anvF');
    var lname = sessionStorage.getItem('anvL');
    var emaila = sessionStorage.getItem('anvE');
    var admini = sessionStorage.getItem('anvA');


    //alert(x);
    
    
    let active_user = new User("3", "Fredrik.Lindberg@gmail.com", "Fredrik", "Lindberg", "Åbylundsgatan", "True");
    $("#profname").append("<h5 class='card-title'> "+fname + " " + lname +"</h5>");
   // $("#profmail").append("<h5 class='card-title'>" + active_user.email + "</h5>");
    //$("#profAdress").append("<div class='card-body'> <h6 class='card-title'>"+ active_user.adress +"</h6></div>");
   // $("#profAdress").append("<input class='form-control form-control-sm' type='text' placeholder="+ active_user.adress+" readonly class='form-control-plaintext'>");
    $("#profAdress").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+active_user.adress+">");
    $("#profContact").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+emaila+">");
    $("#profSek").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+admini+">");
    //$("#profContact").append("<input class='form-control form-control-sm' type='text' placeholder="+ active_user.email+" readonly>");
    //$("#profSek").append("<input class='form-control form-control-sm' type='text' placeholder="+ active_user.is_admin+" readonly>");
}
