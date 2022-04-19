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
  constructor (id, products, amount){
    this.id = id;
    this.products = products;
    this.amount = amount;
  }
}

var orderlista = [];




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
    //displayUserAdd();
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

function displayUserAdd() {
 x= JSON.parse(sessionStorage.getItem('auth')).user.user_id;
  $.ajax({
    headers: {
      "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/useradd/' + x,
    type: 'GET',
    success: function(u) {
     
      for (let i=0; i < u.length; i++) {
        var html = '<div class="col-md-11" onclick="openAdd('+i+')"><img src="'+u[i].image+'" class="media-object img-thumbnail" /></div>\
                      <div class="col-md-11" style="display: none" id="add'+i+'" >\
                            <div class="row">\
                              <div class="col-md-12">Namn: '+u[i].name+'</a></div>\
                              <div class="col-md-12">Kategori: '+u[i].type+'</a></div>\
                              <div class="col-md-12">Märke: '+u[i].brand+'</a></div>\
                              <button type="button" class="btn btn-danger" id="deleteaddButton" onclick="deleteUserAdd(\'' + u[i].name + '\')">Radera</button>\
                            </div>\
                       </div>\
                     </div>';

          $("#userAdds").append(html);
          $("#userAdds").append("<p> <br></p>");
      }     
    }
});
   }

//ej fungerande än
   function deleteUserAdd(name) {
     alert("hej");
     var namn = name;
   x= JSON.parse(sessionStorage.getItem('auth')).user.user_id;
    $.ajax({
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/useradd/' + x,
      type: 'DELETE',
      datatype: 'JSON',
      contentType: "application/json",
      data: JSON.stringify({
        "namn":namn}),
      success: function(u) {
        alert("raderat annons");

   }});}

   function printOrderHistory() {
    userID = JSON.parse(sessionStorage.getItem('auth')).user.user_id
  
    $.ajax ({
      headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/order/' +userID,
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",
  
      success: function(orderhistory) {
        for(var i = 0; i < orderhistory.length ; i++){
          item =  new Order(orderhistory[i].id, getOrderHistoryItems(orderhistory[i].id), orderhistory[i].amount);
          orderlista.push(item);
          //console.log( getOrderHistoryItems(orderhistory[i].id));
        }
        return orderhistory;
      },
      error: function(){
        //alert("error");

      } 
    });
  }

  function getOrderHistoryItems(orderID){

    userID = JSON.parse(sessionStorage.getItem('auth')).user.user_id
    $.ajax ({
      headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/orderitems/' +orderID,
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",
  
      success: function(order) {
        var product_names = []
       //console.log(order)
        for (var i = 0; i < order.length; i++){
          console.log(order[i].product_id)
        let tempProdName = getProduct(order[i].product_id) //問題是這裡
        console.log(tempProdName)
       product_names.push(tempProdName);
        }
        return product_names;
      },
      error: function(){
        //alert("error");
      } 
    });
  }

  // function getOrderItems(orderID){

  //   userID = JSON.parse(sessionStorage.getItem('auth')).user.user_id
  //   $.ajax ({
  //     headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
  //     url:'/orderitems/' +orderID,
  //     type: 'GET',
  //     datatype: 'JSON',
  //     contentType: "application/json",
  
  //     success: function(order) {
  //       const product_names = []
  //      console.log(order)
  //       for (var i = 0; i < order.length; i++){
  //       temp = getProduct(order[i].product_id).name
  //      product_names.push(temp);
  //       }
  //       return product_names;
  //     },
  //     error: function(){
  //       //alert("error");
  //     } 
  //   });
  // }

  function getProduct(prod_id){
    $.ajax ({
      headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/product/' +prod_id,
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",
  
      success: function(prod) {
        //getOrderHistoryItems(orderhistory);
        console.log(prod)
        return prod;
      },
      error: function(){
        //alert("error");
      } 
    });
  }


function displayHistory() {
  //printOrderHistory();
  const orderhistory = printOrderHistory();

  // for (item in orderhistory){
  //   //$("#orderHistory").append("<div class='row' id='historyCol'>"+ orderhistory.order_id + orderhistory.amount + "</div>");
  //   $("#orderHistory").append("<div class='row' id='historyCol'>hej</div>");


  // }


  let order1 = new Order(1, "Gitarr", "Piano", 3000);
  let order2 = new Order(2, "Trumma", "Saxofon", 1500);
  let order3 = new Order(3,"Piano", "Flöjt", 10000);
  let order4 = new Order(4, "Violin", "Bas", 3700);

  //const orderlista= [order1, order2, order3, order4];

 
for (let i=0; i < orderlista.length; i++) {
 var html = '<div class="col-md-6" onclick="openForm('+i+')" style="padding-top: 25px;"><img src="/images/order.png" class="media-object img-thumbnail" /></div>\
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

    function openAdd(i) {
      var add =  "add"+i;
      if(document.getElementById(add).style.display == 'none')
       {
        document.getElementById(add).style.display = "block";
       }else{
          document.getElementById(add).style.display = 'none';
      }
        } 
    



