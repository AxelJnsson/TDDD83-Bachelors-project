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
  
  function search(productList) {
    var productList2 = [];
    var searchResults = [];
    var prices = [];
  
    for (a = 0; a < productList.length; a++) {
      prices.push(productList[a].price);
    }
  
    var input = document.getElementById('datatable-search-input');
    inputWord = input.value.toUpperCase();
  
  // Loop through all list items, and choose those who match the search query
  
    var y = 0;
  
    for (a = 0; a < productList.length; a++) {
      productList2[0] = productList[a].brand;
      productList2[1] = productList[a].model;
      productList2[2] = productList[a].name;
      productList2[3] = productList[a].color;
      productList2[4] = productList[a].type;
      productList2[5] = productList[a].product_id;
      for (b = 0; b < 5; b++) {
        word = productList2[b];    
        if (word.toUpperCase().indexOf(inputWord) > -1) {
          //alert("din sökning machar ett instrument");   
          searchResults.push(productList[a]);
          searchResults[searchResults.length - 1].price = 1;      
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
            productList2[0] = productList[b].brand;
            productList2[1] = productList[b].model;
            productList2[2] = productList[b].color;
            productList2[3] = productList[b].type;
            productList2[4] = productList[b].product_id;
            //Iterera över varje attribut för produkten
            aloop:
            for (c = 0; c < 4; c++) {
              word = productList2[c];    
              //Matchar något av attributen med sökordet?
              if (word.toUpperCase().indexOf(splitWords[a]) > -1) {
                //Höj ratingen om produkten redan finns i searchResults, lägg till produkten annars
                bloop:
                for (d = 0; d < searchResults.length; d++) {
                  if (searchResults[d].product_id == productList[b].product_id) {             
                    searchResults[d].price = searchResults[d].price + 1;  
                    if (c == 3) {
                      searchResults[d].price = searchResults[d].price + 1; 
                    }            
                    y++;
                    break bloop;
                  }  
                }
                if (y == 0) {
                  searchResults.push(productList[b]);
                  searchResults[searchResults.length - 1].price = 1;
                  if (c == 3) {
                    searchResults[d].price = searchResults[d].price + 1; 
                  } 
                }
                break aloop;
              }
            }
          }
        }
      }
    }
  
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
  
  function loadSearchResults(searchList) {
    $("#sideBarContainer").html($("#view-sidebar").html())
    $("#productViewContainer").html($("#view-product").html())
    $("#mainViewContainer").html($("#empty").html())
    appendProducts(searchList);
  }