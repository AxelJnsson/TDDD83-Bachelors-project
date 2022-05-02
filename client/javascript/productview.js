//REFAKTORERAD
let sortingKey = "null";
let newlyfilteredproducts = null;
let keyBoos =
{
    price: 0,
    name: 0,
    brand: 0,
    type: 0,
    color: 0
};

// Listening to sortingbuttons


function createProducts(filteringByArray, sortingKey) {
    $.ajax({
        url: '/product',
        type: 'GET',
        success: function (u) {
            var allinstruments = u;
            filtering(allinstruments, filteringByArray);
        },
        error: function () {

        }
    });
}
const lowerBoundPrice = [];
const higherBoundPrice = [];
const numbersArray = [];


function filterPriceInterval(stuffToFilter, interval) {

    var prInterval = interval;

    lowerBoundPrice.length = 0;
    higherBoundPrice.length = 0;


    for (var i = 0; i < prInterval.length; i++) {
        lowerBoundPrice.push(prInterval[i][0]);
        higherBoundPrice.push(prInterval[i][1]);
    }

    numbersArray.length = 0;

    for (item in stuffToFilter) {
        numbersArray.push(stuffToFilter[item].price);
    }

    let nonMatches = [];

    numbersArray.forEach(num => {
        const matched = lowerBoundPrice.some((bound, i) => {
            return num > bound && num < higherBoundPrice[i];
        });

        matched ? filterprices.push(num) : nonMatches.push(num);
    });


}


//filter function
function filtering(returnedProducts, filterQueries) {
    var filteredstuff = returnedProducts;
    const priceInterval = filterQueries[7];

    //checking price intervals and adding prices to the filter
    if (priceInterval !== 0) {
        filterPriceInterval(filteredstuff, priceInterval);
    }

    const types = filterQueries[0];
    const brands = filterQueries[1];
    const models = filterQueries[2];
    const colors = filterQueries[3];
    const prices = filterQueries[4];
    const years = filterQueries[5];
    const newornots = filterQueries[6];



    //filter
    if (types.length !== 0) {
        filteredstuff = filteredstuff.filter(el =>
            types.indexOf(el.type) >= 0);
    }


    if (brands.length !== 0) {
        filteredstuff = filteredstuff.filter(el =>
            brands.indexOf(el.brand) >= 0);
    }


    if (models.length !== 0) {
        filteredstuff = filteredstuff.filter(el =>
            models.indexOf(el.model) >= 0);
    }


    if (prices.length !== 0) {
        filteredstuff = filteredstuff.filter(el =>
            prices.indexOf(el.price) >= 0);
    }


    if (colors.length !== 0) {
        filteredstuff = filteredstuff.filter(el =>
            colors.indexOf(el.color) >= 0);
    }


    if (years.length !== 0) {
        filteredstuff = filteredstuff.filter(el =>
            years.indexOf(el.year) >= 0);
    }


    filteredstuff = filteredstuff.filter(el =>
        newornots.indexOf(el.new_or_not) >= 0);


    newlyfilteredproducts = filteredstuff;
    appendProducts(filteredstuff);
    sideBar(filteredstuff);
}

//get click-id for sorting function
function getClickID() {

    sortingProduct(newlyfilteredproducts, event.target.id)
    document.getElementById('stigande').onclick = changeColor();

    function changeColor() {
        document.body.style.color = "purple";
        return false;
    }


    console.log(event.target.id)
}


//sorting
function sortingProduct(filteredproducts, key) {
    if (key !== "null") {

        if (keyBoos.hasOwnProperty(key)) {
            if (keyBoos["key"] == 0) {
                keyBoos["key"] = 1
                console.log(keyBoos["key"])
            } else {
                keyBoos["key"] = 0
                console.log(keyBoos["key"])
            };

        };

        const objectkeysarray = Object.keys(filteredproducts[0])
        console.log(objectkeysarray);
        const sortedproducts = filteredproducts.sort(function (x, y) {
            if (keyBoos["key"] == 1) {
                let z;
                z = x;
                x = y
                y = z
            }
            if (key == "price") {
                return x[key] - y[key];
            }
            else {
                return x[key] == y[key] ? 0 : x[key] > y[key] ? 1 : -1;
            }

        });
        appendProducts(sortedproducts);
    }
    appendProducts(filteredproducts);
}

//function for appending products in productview
function appendProducts(filteredproducts) {
    $("#productViewContainer").html($("#empty").html())
    $("#productViewContainer").html($("#view-product").html())
    var products = filteredproducts;
    let j = 0;
    var productsInCart = new Map(JSON.parse(sessionStorage.getItem('productsInCart')));

    for (let i = 0; i < products.length; i++) {
        var condition;
        $("#productrow").append("<div class='row' id='" + j + "'></div>");
        if (products[i].new_or_not == 0) {
            condition = "Begagnad";
        } else {
            condition = "Ny";
        }
        let q = 0
        if (productsInCart.has(products[i].product_id)) {
            q = productsInCart.get(products[i].product_id);
        }
        if ((products[i].quantity - q) < 1) {
            $("#" + j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='" + products[i].image + "' alt='Card image cap' id='prodimg'><div class='card-body' style='text-align: center'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>" + condition + "</p><p class='card-text'> <b>Kategori: </b> " + products[i].type + "</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></b></div>" + "<div class ='row' style='margin-left: auto; margin-right: auto;'> <button class='btn btn-secondary btn-sm btnInfo' style='font-size:10px;' data-id='" + i + "'>Visa info</button><button type='button' class='btn btn-red' style='font-size:10px; background-color: red;' data-dismiss='modal'onClick='outOfStockAlert()' value='" + products[i].product_id + "' id='addProductToCartButtonOut" + products[i].product_id + "'>Slut<span class='cart-item'></span></button></div></div></div>");
        } else {
            $("#" + j).append("<div class='col-auto mb-3'><div class='card'><img class='card-img-top prodimg'  src='" + products[i].image + "' alt='Card image cap' id='prodimg'><div class='card-body' style='text-align: center'><h5 class='card-title'><b>" + products[i].name + "</b><br><br></h5><p style='font-weight: bold; display:inline'>Skick: </p><p style='display:inline'>" + condition + "</p><p class='card-text'> <b>Kategori: </b> " + products[i].type + "</p> <b><p style='font-weight: bold; display:inline'>Pris: </p><p style='display:inline; font-weight:normal'>" + products[i].price + "</p></b></div>" + "<div class ='row' id='buttonDivForProductView" + products[i].product_id + "' style='margin-left: auto; margin-right: auto;'> <button class='btn btn-secondary btn-sm btnInfo' style='font-size:10px;' data-id='" + i + "'>Visa info</button><button type='button' class='btn btn-tonehub' style='font-size:10px;' data-dismiss='modal' onClick='addProductDirectlyToCart(this.value, this)' value='" + products[i].product_id + "' id='addProductToCartButton" + products[i].product_id + "'>Köp<span class='cart-item'></span></button></div></div></div>");
        }
    }

    //modal for product info
    $('.btnInfo').on("click", function (e) {
        var prod_id = $(this).data('id');
        $(".product-modal-body").empty();
        $("#productModalFooter").empty();

        $("#productModal").modal('toggle');
        $(".product-modal-body").append("<div class='card-body' style='margin-right: auto; margin-left: auto; text-align: center;'><h5 class='card-title' style='font-weight: bold;'> " + products[prod_id].name + "</h5><br><img class='card-img-top' src='" + products[prod_id].image + "'><br><p class='card-text'> <b>Märke:</b> " + products[prod_id].brand + "<br> <b>Modell:</b> " + products[prod_id].model + "<br> <b>Färg: </b>" + products[prod_id].color + "<br> <b>År: </b>" + products[prod_id].year + "<br> <b>Pris:</b> " + products[prod_id].price + "</p></div>");
        $("#productModalFooter").append('<button type="button" class="btn btn-tonehub" data-dismiss="modal" onClick="addProductDirectlyToCart(this.value, this)" value="' + products[prod_id].product_id + '" id="addProductToCartButton">Lägg i varukorgen<span class="cart-item"></span></button>');
    });

    if (products.length <= 0) {
        $("#productViewContainer").html($("#noProductView").html())
    }
}

function showProdModal() {
    $("#productModal").modal('toggle');
    showProdInfo();
}


function showProdInfo(filterQueries) {
    $(".product-modal-body").empty();
    $("#testrow").empty();
    $(".product-modal-body").append("<p class='ptest'>nånting nånting yamaha</p>");
    var filterQ = filterQueries;

    createProducts(filterQ);
}

//global variables for the sidebar
//variables for if certain areas on the sidebar have been clicked,if they have then the sidebar should not update with the filter
var brandClicked = false;
var modelClicked = false;
var colorClicked = false;
var yearClicked = false;
var priceClicked = false;

function sideBar(products) {

    let prod = products;

    const brands = [];
    const models = [];
    const colors = [];
    const years = [];

    const priceIntervals = [[0, 1000], [1000, 5000], [5000, 10000], [10000, 100000], [100000, 1000000000000000]];

    //adding attributes to lists to be appended in the sidebar
    for (var j = 0; j < prod.length; j++) {
        brands.push(prod[j].brand);
        models.push(prod[j].model);
        colors.push(prod[j].color);
        years.push(prod[j].year);
    }

    //removing duplicates and sorting the attributes/names alphabetically
    var uniqueBrands = brands.filter((v, i, a) => a.indexOf(v) === i);
    var uniqueModels = models.filter((v, i, a) => a.indexOf(v) === i);
    var uniqueColors = colors.filter((v, i, a) => a.indexOf(v) === i)
    var uniqueYears = years.filter((v, i, a) => a.indexOf(v) === i);

    uniqueBrands.sort();
    uniqueModels.sort();
    uniqueColors.sort();
    uniqueYears.sort();


    //appending checkboxes
    if (brandClicked == false) {
        $("#brandArea").empty();
        for (var j = 0; j < uniqueBrands.length; j++) {
            $("#brandArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somebrand' type='checkbox' value='' data-id='" + j + "'><label class='form-check-label' for='defaultCheck1'><span class='text-justright' style='padding-left: 20px;'> " + uniqueBrands[j] + " </span></label></li>");
        }
    }

    if (modelClicked == false) {
        $("#modelArea").empty();
        for (var i = 0; i < uniqueModels.length; i++) {
            $("#modelArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somemodel' type='checkbox' value='' data-id='" + i + "'><label class='form-check-label' for='defaultCheck1'><span class='text-justright' style='padding-left: 20px;'> " + uniqueModels[i] + " </span></label></li>");
        }
    }

    if (colorClicked == false) {
        $("#colorArea").empty();
        for (var i = 0; i < uniqueColors.length; i++) {
            $("#colorArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline somecolor' type='checkbox' value='' data-id='" + i + "'><label class='form-check-label' for='defaultCheck1'><span class='text-justright' style='padding-left: 20px;'> " + uniqueColors[i] + " </span></label></li>");
        }
    }

    if (yearClicked == false) {
        $("#yearArea").empty();
        for (var i = 0; i < uniqueYears.length; i++) {
            $("#yearArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline someyear' type='checkbox' value='' data-id='" + i + "'><label class='form-check-label' for='defaultCheck1'><span class='text-justright' style='padding-left: 20px;'> " + uniqueYears[i] + " </span></label></li>");
        }
    }

    var outputInterval;

    if (priceClicked == false) {
        $("#priceArea").empty();
        for (var i = 0; i < priceIntervals.length; i++) {
            if (i == 0) {
                outputInterval = "0 - 1000";
            } else if (i == 1) {
                outputInterval = "1000 - 5000";
            } else if (i == 2) {
                outputInterval = "5000 - 10 000";
            } else if (i == 3) {
                outputInterval = "10 000 - 100 000";
            } else {
                outputInterval = "Över 100 000";
            }

            $("#priceArea").append("<li class='w-100'><input class='form-check-inpu from-check-inline someprice' type='checkbox' value='' data-id='" + i + "'><label class='form-check-label' for='defaultCheck1'><span class='text-justright' style='padding-left: 20px;'> " + outputInterval + " </span></label></li>");
        }
    }

    //functions for clicking on each checkbox
    //brands
    $('.somebrand').on("click", function (e) {
        e.stopImmediatePropagation();
        var checkBoxId = $(this).data('id');
        if ($(this).prop("checked") === true) {
            filterbrands.push(uniqueBrands[checkBoxId]);
            brandClicked = true;
        } else if ($(this).prop("checked") === false) {
            if (filterbrands.length == 1) {
                brandClicked = false;
                filterbrands.length = 0;
            } else if (filterbrands.length > 1) {
                for (item in filterbrands) {
                    if (filterbrands[item] == uniqueBrands[checkBoxId]) {
                        filterbrands.splice(item, 1);
                    }
                }
            }
        }
        $("#productViewContainer").html($("#empty").html())
        $("#productViewContainer").html($("#view-product").html())
        showProdInfo(filterQ);

    });

    //models
    $('.somemodel').on("click", function (e) {
        e.stopImmediatePropagation();
        var checkBoxId = $(this).data('id');
        if ($(this).prop("checked") == true) {
            filtermodels.push(uniqueModels[checkBoxId]);
            modelClicked = true;
        } else if ($(this).prop("checked") == false) {
            if (filtermodels.length == 1) {
                filtermodels.length = 0;
                modelClicked = false;
            } else if (filtermodels.length > 1) {
                for (item in filtermodels) {
                    if (filtermodels[item] == uniqueModels[checkBoxId]) {
                        filtermodels.splice(item, 1);
                    }
                }

            }
        }
        $("#productViewContainer").html($("#empty").html())
        $("#productViewContainer").html($("#view-product").html())
        showProdInfo(filterQ);
    });

    //colors
    $('.somecolor').on("click", function (e) {
        e.stopImmediatePropagation();
        var checkBoxId = $(this).data('id');
        if ($(this).prop("checked") == true) {
            filtercolors.push(uniqueColors[checkBoxId]);
            colorClicked = true;
        } else if ($(this).prop("checked") == false) {
            if (filtercolors.length == 1) {
                filtercolors.length = 0;
                colorClicked = false;
            } else if (filtercolors.length > 1) {
                for (item in filtercolors) {
                    if (filtercolors[item] == uniqueColors[checkBoxId]) {
                        filtercolors.splice(item, 1);
                    }
                }
            }
        }
        $("#productViewContainer").html($("#empty").html())
        $("#productViewContainer").html($("#view-product").html())
        showProdInfo(filterQ);
    });

    //years
    $('.someyear').on("click", function (e) {
        e.stopImmediatePropagation();
        var checkBoxId = $(this).data('id');
        if ($(this).prop("checked") == true) {
            filteryears.push(uniqueYears[checkBoxId]);
            yearClicked = true;
        } else if ($(this).prop("checked") == false) {
            if (filteryears.length == 1) {
                filteryears.length = 0;
                yearClicked = false;
            } else if (filteryears.length > 1) {
                for (item in filteryears) {
                    if (filteryears[item] == uniqueYears[checkBoxId]) {
                        filteryears.splice(item, 1);
                    }
                }
            }
        }
        $("#productViewContainer").html($("#empty").html())
        $("#productViewContainer").html($("#view-product").html())
        showProdInfo(filterQ);

    });

    //price intervals
    $('.someprice').on("click", function (e) {
        e.stopImmediatePropagation();
        var checkBoxId = $(this).data('id');
        if ($(this).prop("checked") == true) {
            filterpriceinterval.push(priceIntervals[checkBoxId]);
            priceClicked = true;
        } else if ($(this).prop("checked") == false) {
            if (filterpriceinterval.length == 1) {
                filterpriceinterval.length = 0;
                priceClicked = false;
            } else if (filterpriceinterval.length > 1) {
                for (item in filterpriceinterval) {
                    if (filterpriceinterval[item] == priceIntervals[checkBoxId]) {
                        filterpriceinterval.splice(item, 1);
                    }
                }
            }
            filterprices.length = 0;
        }
        $("#productViewContainer").html($("#empty").html())
        $("#productViewContainer").html($("#view-product").html())
        showProdInfo(filterQ);

    });
}

function closeProdModal() {
    $(".product-modal-body").empty();
    $("#productModal").modal('hide');
    $('#productModal').data('bs.modal', null);
}


//To display "added" when a product is added to the cart
function addProductDirectlyToCart(value, btn) {
    addProductToCart(value);
    btn.textContent = 'Tillagd';
    setTimeout(function () { setBack(btn); }, 3000);

}

//Changing the number next to the cart as a product is added to it
function doThings3(a) {
    var newCartTotal = parseInt(a);
    $('#basketArea').empty();

    if (newCartTotal < 10) {
        $("#basketArea").append("<span class='badge badge-primary' style='height: 20px; width: 20px; margin-right: 10px; margin-left: 5px; text-align: center; background-color: rgb(196, 215, 240) !important; color: black;'>" + newCartTotal + "</span>");
    } else {
        $("#basketArea").append("<span class='badge badge-primary' style='height: 20px; width: 30px; margin-right: 10px; margin-left: 5px; text-align: center; background-color: rgb(196, 215, 240) !important; color: black;'>" + newCartTotal + "</span>");
    }
}

//Changing the button from "added" to "buy"
function setBack(btnn) {
    btnn.textContent = 'Köp';
}


function outOfStockAlert() {
    alert("Produkten är för tillfället slut i lager!")
}