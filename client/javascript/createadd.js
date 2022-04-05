function createAdd() {
    alert("hej");
    var pris = $("#createPris").val();
    var begagnad = 1;
    var saljare = JSON.parse(sessionStorage.getItem('auth')).user.user_id;
    var year = $("#createYear").val();
    var model = $("#modelVal").val();
    var color = $("#colorVal").val();
    var brand = $("#brandVal").val();
    var text = $("#createText").val();
    var type = $("#createkat").val();
    alert(type);
    
    $.ajax ({       
        url:'/product',
        type: 'POST',
        datatype: 'JSON',
        contentType: "application/json",
        data: JSON.stringify({
          "brand":brand, "model":model, "name":text, "type":type, "price":pris, "color":color, "year":year, "new_or_not": begagnad, "seller": saljare}),
        success: function(user) {    
          alert("produkt tillagd!");
          
        }
      })   

 
}