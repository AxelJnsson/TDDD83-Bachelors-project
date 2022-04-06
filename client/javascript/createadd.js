function createAdd() {
  
    var pris = $("#createPris").val();
    var begagnad = 1;
    var saljare = JSON.parse(sessionStorage.getItem('auth')).user.user_id;
    var year = $("#createYear").val();
    var model = $("#modelVal").val();
    var color = $("#colorVal").val();
    var brand = $("#brandVal").val();
    var text = $("#createText").val();
    var type = $("#createkat").val();
    var imgag = $("#createImg").val();
    
    
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

function fillOptions1(){ 
  $.ajax({        
      url:'/product',
      type: 'GET',
      success: function(u) {          
          var allinstruments = u;
          //getInstruments(allinstruments);
          fillOptions2(allinstruments); 
          //filtertest2(allinstruments, filteringByArrayTest);
      },
      error: function(){
          alert("fel");
      }    
  });
}



function fillOptions2(products) {

  let prod = products;

  const brands = [];
  const models = [];
  const colors = [];
  const years = [];
  const all = [];
  
  for(var j = 0; j < prod.length; j++){
    brands.push(prod[j].brand);
    models.push(prod[j].model);
    colors.push(prod[j].color);
    years.push(prod[j].year);
}

    var uniqueBrands = brands.filter((v, i, a) => a.indexOf(v) === i);
    var uniqueModels = models.filter((v, i, a) => a.indexOf(v) === i);
    var uniqueColors = colors.filter((v, i, a) => a.indexOf(v) === i)
    var uniqueYears = years.filter((v, i, a) => a.indexOf(v) === i);

    all.push(uniqueBrands);
    all.push(uniqueModels);
    all.push(uniqueColors);
    all.push(uniqueYears);

    for(var j = 0; j < uniqueBrands.length; j++){
      $("#brandVal").append("<option>"+uniqueBrands[j]+"</options>");           
  }

  for(var i = 0 ; i < uniqueModels.length; i++) {
    $("#modelVal").append("<option>"+uniqueModels[i]+"</options>");   
}


  
 
  
}