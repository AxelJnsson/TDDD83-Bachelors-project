//asdfghjkl
$(document).ready(function() {   

    $(".container").html($("#view-home").html());
    var signedIn;
    if ((sessionStorage.getItem('auth') == null) || sessionStorage.getItem('auth').token <= 0) {
      signedIn = true;
    } else {
      signedIn = false;
    }


    $('#registerButton').toggleClass('d-none', !signedIn);
    $('#loginButton').toggleClass('d-none', !signedIn);
    $('#logoutButton').toggleClass('d-none', signedIn);
   
});

$('#contactButton').click(function (e) {
   /* e.preventDefault(); */  
    $(".container").html($("#view-contact").html())
    $("#skickaknapp").append('<button type="button" class="btn btn-primary" id="sendButton" onclick="submitmsg()">Skicka</button>');
});

$('#homeButton').click(function (e) {
  $(".container").html($("#view-home").html())
 

 /* e.preventDefault(); */
});

$('#carsButton').click(function (e) {
  $(".container").html($("#view-cars").html())
  var signedIn;
  if ((sessionStorage.getItem('auth') == null) || sessionStorage.getItem('auth').token <= 0) {
    signedIn = true;
  } else {
    signedIn = false;
  }
    $('#add-car').toggleClass('d-none', signedIn);
  showCars();
 /* e.preventDefault(); */
});

$('#registerButton').click(function (e) {
  $(".container").html($("#view-signup").html())
  //alert("registrera");
  $("#signupknapp").append(' <button type="button" class="btn btn-primary" id="signupButton" onclick="signUp()">Registrera</button>');
 /* e.preventDefault(); */
});

$('#loginButton').click(function (e) {
  $(".container").html($("#view-login").html())
  
 
  $("#loggainknapp").append('<button type="button" class="btn btn-primary" id="loginButton" onclick="logIn()">Logga in</button>');
 /* e.preventDefault(); */
});

$('#logoutButton').click(function (e) {
  $(".container").html($("#view-home").html())
 sessionStorage.removeItem('auth');
 alert("Du loggas ut!");
 window.location.reload();

 /* e.preventDefault(); */
});





function showCars(){  
  $.ajax ({
    headers: {
      "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url: '/cars',
      type: 'GET',

      success: function(cars) {
  
    var list = cars;
    

  for (let i = 0; i < list.length; i++) {      
      $(".card-container").append('<div class="card" style="width:400px"><div class="card-body"><h4 class="card-title"></h4><p class="card-text"></p></div></div>');                    

      let cards = $('.card-text');
      var admin =  JSON.parse(sessionStorage.getItem('auth')).user.isadmin;
      var x = JSON.parse(sessionStorage.getItem('auth')).user.id;
      
        
       if (list[i].owner != null){ 
            if (list[i].owner.id == JSON.parse(sessionStorage.getItem('auth')).user.id) {        
           cards.eq(i).html(("Id: " + list[i].id + "<br>"+ "Make: " + list[i].make + "<br>" + "Model: " + list[i].model + "<br>" + "Bokad av: " + list[i].owner.name + "<br>" + '<a class="btn btn-primary deletebutton" data-id = "'+list[i].id+'" href="#">Delete</a>' + '<a class="btn btn-primary editbutton" data-id = "'+list[i].id+'" data-toggle="modal" data-target="#exampleModal" href="#">Edit</a>' + '<a class="btn btn-primary unbookbutton" data-id = "'+list[i].id+'" href="#">Unbook</a>'));
            } else {
              cards.eq(i).html(("Id: " + list[i].id + "<br>"+ "Make: " + list[i].make + "<br>" + "Model: " + list[i].model + "<br>" + "Bokad av: " + list[i].owner.name + "<br>" + '<a class="btn btn-primary deletebutton" data-id = "'+list[i].id+'" href="#">Delete</a>' + '<a class="btn btn-primary editbutton" data-id = "'+list[i].id+'" data-toggle="modal" data-target="#exampleModal" href="#">Edit</a>'));

            }
          } else {
           cards.eq(i).html(("Id: " + list[i].id + "<br>"+ "Make: " + list[i].make + "<br>" + "Model: " + list[i].model + "<br>" + '<a class="btn btn-primary deletebutton" data-id = "'+list[i].id+'" href="#">Delete</a>' + '<a class="btn btn-primary editbutton" data-id = "'+list[i].id+'" data-toggle="modal" data-target="#exampleModal" href="#">Edit</a>' +'<a class="btn btn-primary bookbutton" data-id = "'+list[i].id+'" href="#">Book</a>'));           
           
          }         
  }

    $('.deletebutton').toggleClass('d-none', !admin);
    $('.editbutton').toggleClass('d-none', !admin);
    $('.bookbutton').toggleClass('d-none', admin);
    $('.unbookbutton').toggleClass('d-none', admin);
    $('#add-car').toggleClass('d-none', !admin);
    

  $('.deletebutton').click(function (e) {        
    var car_id = $(this).data('id');
    $.ajax ({
      headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
      url:'/cars/' + car_id,
      type: 'DELETE',

      success: function(cars) {    
        alert("Bilen tas bort");
        $(".container").html($("#view-cars").html())   
        showCars();        
      }
    })
  });  
  

  $('.editbutton').click(function (e) {   
   var car_id = $(this).data('id');
   $.ajax({
    headers: {
      "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/cars/' + car_id,
    type: 'GET',
    success: function(cars) {
      var car = cars;
      $('#inputId').val(car.id);    
      $('#inputMake').val(car.make);      
      $('#inputModel').val(car.model);
      $('#inputCustomer').val(car.owner.id);
    }
   })   
   }); 
   
   $('.bookbutton').click(function (e) {        
    var car_id = $(this).data('id');  
    $.ajax({
     headers: {
        "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
     url:'/carsb/' + car_id+ '/booking',
     type: 'POST',
     datatype: 'JSON',
    contentType: "application/json",
    data: JSON.stringify({"id" : car_id}), 
     success: function(info) {
      $(".container").html($("#view-cars").html()) 
        showCars();
     }
    })   
    }); 

    $('.unbookbutton').click(function (e) {        
      var car_id = $(this).data('id');
     
      $.ajax({
       headers: {
          "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
       url:'/carsb/' + car_id+ '/unbook',
       type: 'POST',
       datatype: 'JSON',
      contentType: "application/json",
      data: JSON.stringify({"id" : car_id}), 
       success: function(info) {
          alert(info);
          $(".container").html($("#view-cars").html()) 
          showCars();
       }
      })   
      }); 
   
}})
}

//add car
$('#add-btn').click(function(e) {
  var make = $("#inputMake2").val();
  var model = $("#inputModel2").val();
  var customer = parseInt($("#inputCustomer2").val());
  
  $.ajax ({  
    headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
    url:'/cars',
    type: 'POST',
    datatype: 'JSON',
    contentType: "application/json",
    data: JSON.stringify({
      "make":make, "model":model, "owner_id":customer}), 
    success: function(cars) {    
      $(".container").html($("#view-cars").html())
      showCars();
    }
  })
});

//save edit
$('#save-btn').click(function(e) {
 var id = parseInt($("#inputId").val());   
 var make = $("#inputMake").val();
 var model = $("#inputModel").val();
 var customer = parseInt($("#inputCustomer").val());
 
 $.ajax ({
  headers : {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
  url:'/cars/' + id,
  type: 'PUT',
  datatype: 'JSON',
  contentType: "application/json",
  data: JSON.stringify({
    "make":make, "model": model, "owner_id":customer}),
  success: function(cars) {    
    alert("bil ändrad");
    $(".container").html($("#view-cars").html())
    showCars();
  }
}) 

});


function submitmsg() {
  alert($("#inputName").val() + "\n"+ $("#inputMail").val()+ "\n" + $("#inputMessage").val());
}

function signUp() {
  var name = $("#inputName2").val();
  var mail = $("#inputMail2").val();
  var password = $("#inputPassword").val();
 
  $.ajax ({  
    url:'/sign-up',
    type: 'POST',
    datatype: 'JSON',
    contentType: "application/json",
    data: JSON.stringify({
      "name":name, "mail":mail, "password":password}), 
    success: function(i) { 
         alert("Din användare är skapad!");
         $(".container").html($("#view-home").html());
    }
  });
 
}

function logIn() {
  var mail = $("#inputMail3").val();
  var password = $("#inputPassword2").val();
 
  $.ajax ({  
    url:'/login',
    type: 'POST',
  datatype: 'JSON',
    contentType: "application/json",
    data: JSON.stringify({
      "name":name, "mail":mail, "password":password}), 
    success: function(i) { 
        
     sessionStorage.setItem('auth', JSON.stringify(i));     
     $(".container").html($("#view-home").html());
     window.location.reload(); 
       
    },
    error: function(){
      alert("Wrong username or password!");
    }
    // statuscode: {
    //   401: function() {
    //     alert("Wrong username or password!");
    //     $(".container").html($("#view-home").html());

    //   }
    //}
  });
}