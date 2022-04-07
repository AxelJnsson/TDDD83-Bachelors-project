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
    var userNr = JSON.parse(sessionStorage.getItem('auth')).user.user_id;
    var url1 =  userNr+"_"+ model;
    var image = "/images/" + url1+".jpg";
   
    downloadImg(url1);
    
    
    $.ajax ({       
        url:'/product',
        type: 'POST',
        datatype: 'JSON',
        contentType: "application/json",
        data: JSON.stringify({
          "brand":brand, "model":model, "image":image, "name":text, "type":type, "price":pris, "color":color, "year":year, "new_or_not": begagnad, "seller": saljare}),
        success: function(user) {    
          alert("produkt tillagd!");
          
        }
      })  
}

const filtertypes2 = [];
 const filterbrands2 = [];
 const filtermodels2 = [];
 
 let filterQ2 = [filtertypes2, filterbrands2, filtermodels2];

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

var brandClicked1 = false;
var modelClicked1 = false;




function updateChoice() {
  if($("#brandVal").val() == "Märke") {
    
}else{
  filterbrands2.length = 0;
  filterbrands2.push($("#brandVal").val());
}
createSelects(filterQ2);

}

function updateChoice2() {
if($("#typVal").val() == "Kategori") {    

} else {
  filtertypes2.length = 0;
  filtertypes2.push($("#typVal").val());
}
createSelects(filterQ2);
$("#brandVal").empty(); 


}


function fillOptions2(products) {
 
  let prod = products;
  $("#modelVal").empty(); 
  

  const brands = [];
  const models = [];  
  const type = [];

  
  for(var j = 0; j < prod.length; j++){
    brands.push(prod[j].brand);
    models.push(prod[j].model);
    type.push(prod[j].type)    
}

    var uniqueBrands = brands.filter((v, i, a) => a.indexOf(v) === i);
    var uniqueModels = models.filter((v, i, a) => a.indexOf(v) === i);
    var uniqueType = type.filter((v, i, a) => a.indexOf(v) === i);
   // var uniqueColors = colors.filter((v, i, a) => a.indexOf(v) === i)
   // var uniqueYears = years.filter((v, i, a) => a.indexOf(v) === i);

    
  
    for(var j = 0; j < uniqueBrands.length; j++){
      $("#brandVal").append("<option >"+uniqueBrands[j]+"</options>");           
  }
  
  for(var j = 0; j < uniqueType.length; j++){
    $("#typVal").append("<option >"+uniqueType[j]+"</options>");           
}

  
  for(var i = 0 ; i < uniqueModels.length; i++) {
    $("#modelVal").append("<option >"+uniqueModels[i]+"</options>");   
}}

function createSelects(filteringByArrayTest){ 

  $.ajax({        
      url:'/product',
      type: 'GET',
      success: function(u) {          
          var allinstruments = u;
          //getInstruments(allinstruments);
          filtertestSelect(allinstruments, filteringByArrayTest);
      },
      error: function(){
          alert("fel");
      }    
  });
}



//riktig filtrering
function filtertestSelect(arr, testingArrayFilters){

  const types2 = testingArrayFilters[0];
  const brands2 = testingArrayFilters[1];
  const models2 = testingArrayFilters[2];
  
 
  var filteredstuff2 = arr;

  if (types2.length !== 0) {
      filteredstuff2 = filteredstuff2.filter( el => 
          types2.indexOf(el.type) >= 0);
  }

  if (brands2.length !== 0) {
      filteredstuff2 = filteredstuff2.filter( el => 
          brands2.indexOf(el.brand) >= 0);
  }
  fillOptions2(filteredstuff2); 

}

function downloadImg(url) {
      var fd = new FormData();
      var files = $('#formFile')[0].files[0];
      fd.append('url', url)
      fd.append('file',files);
    
     
      $.ajax({
          url: '/saveImg',
          type: 'POST',
          data: fd,  
          success: function(response){
          
          },
          cache: false,
          contentType: false,
          processData: false
      });
        }
      
