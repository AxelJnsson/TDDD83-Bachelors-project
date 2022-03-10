class Guitar {
    constructor(id, brand, model, name, price, color, year){
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.name = name;
        this.price = price;
        this.color = color;
        this.year = year;     

    }
}

function createGuitar(){
    let dummyGuitar = new Guitar("1", "märke", "modell", "bra gitarr", "100 kr", "svart", "2000");
    alert("hej");
    $(".product-modal-body").append(dummyGuitar.guitarBrand());                

    return dummyGuitar;
}