var orderlista = [];
let orderHist  = new Array()
const orderList = []
var productlist = ["Name"]

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
   printOrderHistory()
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
    }
  });
}

function printOrderHistory() {
  userID = JSON.parse(sessionStorage.getItem('auth')).user.user_id

  $.ajax ({
    headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/order/' +userID,
    type: 'GET',
    datatype: 'JSON',
    contentType: "application/json",
    success: function(orderhistory) {
      for(var i = 0; i < orderhistory.length; i++){
        var orderid = orderhistory[i].id
        var orderamount = orderhistory[i].amount
        getOrderHistoryItems(orderid, orderamount) 
      }
    },
    error: function(){
      //alert("error");

    } 
  });
}

function getOrderHistoryItems(orderID, orderamount){
  console.log(orderID)
  userID = JSON.parse(sessionStorage.getItem('auth')).user.user_id
  $.ajax ({
    headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/orderitems/' +orderID,
    type: 'GET',
    datatype: 'JSON',
    contentType: "application/json",
    success: function(order) {
    productlist.length = 0;
      prodnames.length = 0;
      console.log(order)
        for (var i = 0; i < order.length ; i++){
          console.log(order[i].product_id)
          productlist.push(order[i].product_id)
        }
        console.log(productlist.length)
        getProduct(productlist, orderID, orderamount)
        console.log(productlist)
    },
    error: function(){
      //alert("error");
    } 
  });
} 

  const prodnames = []
  var nextorder;

function getProduct(prod_list, orderID, orderamount){

    for(var i = 0; i < prod_list.length; i++){
    $.ajax ({
      headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/product/' +prod_list[i],
      type: 'GET',
      datatype: 'JSON',
      contentType: "application/json",  
      success: function(prod) {
  
        if(nextorder != orderID){
          $("#historyCol").append("<div><b>Ordernummer: "+ orderID + "<br>Totalkostnad: " + orderamount + "kr </b>")
        }
        $("#historyCol").append("<div> Produkter:  "+ prod.name +" ("+ prod.price +" kr) </div>")
        nextorder = orderID
      },
      error: function(){
        alert("error");
      } 
    });
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