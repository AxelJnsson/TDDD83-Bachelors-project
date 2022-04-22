
//För att söka när man klickar på enter
$('#datatable-search-input').on('keypress', function (e) {
  var keycode = (e.keyCode ? e.keyCode : e.which);
  if(keycode == '13'){
    $('#searchButton').click();   
  }
});

//Hämta produkter från databasen och skicka till "search"
function getSearchProducts() {
  $.ajax({        
    url:'/product',
    type: 'GET',
    success: function(u) {  
        search(u);
    },
    error: function(){
        alert("error");
    }    
  });
}
  
//I denna funktion finns algoritmen som sorterar ut vilka objekt som matchar sökningen
function search(productList) {
  var attributeList = [];
  var searchResults = [];
  var prices = [];

  for (a = 0; a < productList.length; a++) {
    prices.push(productList[a].price);
  }

  var input = document.getElementById('datatable-search-input');
  inputWord = input.value.toUpperCase();

  // Loop through all list items, and choose those who match the search query
  for (a = 0; a < productList.length; a++) {
    attributeList[0] = productList[a].brand;
    attributeList[1] = productList[a].model;
    attributeList[2] = productList[a].name;
    attributeList[3] = productList[a].color;
    attributeList[4] = productList[a].type;
    attributeList[5] = productList[a].product_id;
    for (b = 0; b < 5; b++) {
      word = attributeList[b];    
      if (word.toUpperCase().indexOf(inputWord) > -1) {
        //alert("din sökning machar ett instrument");   
        searchResults.push(productList[a]);
        searchResults[searchResults.length - 1].price = 10;      
        break;
      }
    }
  }

  var splitWords = [];
  splitWords = inputWord.split(" ");

  //Iterera över varje ord i den sökta strängen
  if (splitWords.length > 1) {
    for (a = 0; a < splitWords.length; a++) {
      if (splitWords[a] != (null || " ")) {
      //Jämför attributen för varje produkt med det sökta ordet
        for (b = 0; b < productList.length; b++) {
          var y = 0;
          attributeList[0] = productList[b].brand;
          attributeList[1] = productList[b].model;
          attributeList[2] = productList[b].color;
          attributeList[3] = productList[b].type;
          attributeList[4] = productList[b].product_id;
          //Iterera över varje attribut för produkten
          aloop:
          for (c = 0; c < 4; c++) {
            word = attributeList[c];    
            //Matchar något av attributen med sökordet?
            if (word.toUpperCase().indexOf(splitWords[a]) > -1) {
              //Höj ratingen om produkten redan finns i searchResults, lägg till produkten annars
              bloop:
              for (d = 0; d < searchResults.length; d++) {
                if (searchResults[d].product_id == productList[b].product_id) {             
                  searchResults[d].price = searchResults[d].price + 10;  
                  if (c == 3) {
                    searchResults[d].price = searchResults[d].price + 10; 
                  }            
                  y++;
                  break bloop;
                }  
              }
              if (y == 0) {
                searchResults.push(productList[b]);
                searchResults[searchResults.length - 1].price = 10;
                if (c == 3) {
                  searchResults[d].price = searchResults[d].price + 10; 
                } 
              }
              break aloop;
            }
          }
        }
      }
    }
  }

  //Kolla om några instrument matchar sökningen på bokstavsnivå för att hantera felstavning

  // if (searchResults.length == 0) {
  //   //Kolla först för hela strängen
  //   for (a = 0; a < productList.length; a++) {
  //     var ratedAttributes = [];
  //     attributeList[0] = productList[a].brand;
  //     attributeList[1] = productList[a].model;
  //     attributeList[2] = productList[a].name;
  //     attributeList[3] = productList[a].color;
  //     attributeList[4] = productList[a].type;
  //     attributeList[5] = productList[a].product_id;
  //     for (b = 0; b < 5; b++) {
  //       word = attributeList[b];
  //       sim = compare(word, inputWord);
  //       ratedAttributes[b] = sim;
  //     }
  //     var max = Math.max.apply(null, ratedAttributes); 
  //     if (max > 0.5) {
  //       searchResults.push(productList[a]);
  //       searchResults[searchResults.length - 1].price = max; 
  //     }
  //   }

  //   //Undersök på bokstavsnivå för enstaka ord i den sökta strängen
  //   if (splitWords.length > 1) {
  //     for (a = 0; a < splitWords.length; a++) {
  //       if (splitWords[a] != (null || " ")) {
  //         for (b = 0; b < productList.length; b++) {
  //           var y = 0;
  //           attributeList[0] = productList[b].brand;
  //           attributeList[1] = productList[b].model;
  //           attributeList[2] = productList[b].color;
  //           attributeList[3] = productList[b].type;
  //           attributeList[4] = productList[b].product_id;
  //           //Iterera över varje attribut för produkten
  //           for (c = 0; c < 4; c++) {  
  //             sim = compare(attributeList[c], splitWords[a]);
  //             ratedAttributes[c] = sim;
  //           }
  //           max = Math.max.apply(null, ratedAttributes); 

  //           if (max > 0.5) {
  //             //Höj ratingen om produkten redan finns i searchResults, lägg till produkten annars
  //             bloop:
  //             for (d = 0; d < searchResults.length; d++) {
  //               if (searchResults[d].product_id == productList[b].product_id) {             
  //                 searchResults[d].price = searchResults[d].price + max;           
  //                 y++;
  //                 break bloop;
  //               }  
  //             }
  //             if (y == 0) {
  //               searchResults.push(productList[b]);
  //               searchResults[searchResults.length - 1].price = max;
  //             }
  //           } 
  //         }
  //       }
  //     }
  //   }
  // }

  searchResults.sort(function(a, b)
  {return b.price - a.price});

  for (a = 0; a < searchResults.length; a++) {
    for (b = 0; b < prices.length; b++) {
      if (searchResults[a].product_id == b + 1) {
        searchResults[a].price = prices[b];
      }
    }
  }
  loadSearchResults(searchResults);
}
  
//Skriver ut sökresultaten på skärmen
function loadSearchResults(searchList) {
  $("#sideBarContainer").html($("#view-sidebar").html())
  $("#productViewContainer").html($("#view-product").html())
  $("#mainViewContainer").html($("#empty").html())
  appendProducts(searchList);
}

//Här sker jämförelsen mellan det sökta ordet och ett ord i databasen, används för
//att hantera felstavning
// function compare(s1, s2) {
//   for(var result = 0; i = s1.length; i--){
//     if (typeof s2[i] == 'undefined' || s1[i] == s2[i]) {

//     } else if (s1[i].toLowerCase() == s2[i].toLowerCase()) {
//       result++;
//     } else {
//       result += 4;
//     }
//   }
//   return 1 - (result + 4*Math.abs(s1.length - s2.length))/(2*(s1.length+s2.length));
// }