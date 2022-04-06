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



class Order {
  constructor (id, product1, product2, amount) {
    this.id = id;
    this.product1 = product1;
    this.product2 = product2;
    this.amount = amount;
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
    displayHistory();
    $.ajax({
        headers: {
          "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
        url:'/user/' + x,
        type: 'GET',
        success: function(u) {
          var admin; 
         
         var anv = u[0] 
          if (anv.is_admin==0) {
            admin = "ej admin";
          } else {
            admin = "admin";
          }          
          $("#profname").append("<h6 class='card-title'> "+anv.first_name + " " + anv.last_name +"</h6>");   
          $("#profAdress").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value='Åbylundsgatan'>");
          //hårdkodat
          $("#profAdress").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value='582 36 Linköping'>");
          $("#profContact").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+anv.email+">");
          $("#profContact").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value='078 346 876 21'>");
          $("#profSek").append("<input type='text' readonly class='form-control-plaintext' id='staticEmail' value="+admin+">");
        }
    });
}

function deleteUser() {
    
  var x = JSON.parse(sessionStorage.getItem('auth')).user.user_id; 
    
  $.ajax({
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/user/' + x,
      type: 'DELETE',
      success: function(u) {
        alert("Din användare är nu raderad!!!, FU");
        logoutUser();

       
      }
  });
}

function displayHistory() {
  
  let order1 = new Order(1, "Gitarr", "Piano", 3000);
  let order2 = new Order(2, "Trumma", "Saxofon", 1500);
  let order3 = new Order(3,"Piano", "Flöjt", 10000);
  let order4 = new Order(4, "Violin", "Bas", 3700);

  const orderlista= [order1, order2, order3, order4];

 
for (let i=0; i < orderlista.length; i++) {
 var html = '<div class="col-md-6" onclick="openForm('+i+')" style="padding-top: 25px;"><img src="https://bootdey.com/img/Content/user_3.jpg" class="media-object img-thumbnail" /></div>\
 <div class="col-md-11" style="display: none" id="order'+i+'" >\
     <div class="row">\
         <div class="col-md-12">\
             <div class="pull-right"><label class="label label-danger">Delivered</label></div>\
             <div class="col-md-12">Summa: '+orderlista[i].amount+' kr</a></div>\
             <div class="col-md-12">Produkt 1: '+orderlista[i].product1+'</a></div>\
             <div class="col-md-12">Produkt 2: '+orderlista[i].product2+'</a></div>\
             <div class="col-md-12">Order nr: '+orderlista[i].id+'</a></div>\
         </div>\
     </div>\
 </div>';

       
  //$("#historyCol").append("<div class='col-md-6'><img src='https://bootdey.com/img/Content/user_3.jpg' class='media-object img-thumbnail' /></div>  <div class='col-md-11'> <div class='row'><div class='col-md-12'><div class='pull-right'><label class='label label-danger'>rejected</label></div><span><strong>Order name</strong></span> <span class='label label-info'>group name</span><br />Quantity : 2, cost: $323.13 <br /><a data-placement='top' class='btn btn-success btn-xs glyphicon glyphicon-ok' href='#' title='View'></a> <a data-placement='top' class='btn btn-danger btn-xs glyphicon glyphicon-trash' href='#' title='Danger'></a> <a data-placement='top' class='btn btn-info btn-xs glyphicon glyphicon-usd' href='#' title='Danger'></a></div><div class='col-md-12'>order made on: 05/31/2014 by <a href='#'>Jane Doe </a></div> <br></div>");
  $("#historyCol").append(html);
  $("#historyCol").append("<p> <br></p>");
}
}

function openForm(i) {
  var order =  "order"+i;
  if(document.getElementById(order).style.display == 'none')
   {
    document.getElementById(order).style.display = "block";
   }else{
      document.getElementById(order).style.display = 'none';
  }
    } 



