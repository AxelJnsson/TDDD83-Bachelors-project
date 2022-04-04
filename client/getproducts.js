function getNewProducts(){  
    
     $.ajax({  
        headers: {
            "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},       
         url:'/newproduct',
         type: 'GET',
         success: function(u) {            
            var produkt = u;           
        /*alert(produkt[1].name);*/
      
         
     },
     error: function(){
        alert("fel");
      }
 });
 
 
 }
 