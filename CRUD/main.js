let title = document.querySelector("#title")
let price = document.querySelector("#price")
let taxes = document.querySelector("#taxes")
let ads = document.querySelector("#ads")
let discount = document.querySelector("#discount")
let total = document.getElementById("total")
let count = document.querySelector("#count")
let category = document.querySelector("#category")
let creatbtn = document.querySelector("#creatbtn")
let deleteAll=document.getElementById("deleteAll")
let mood ="create"
let tmp = ""



function priceSum(){
    if (price.value != `` ) {
        let res =( +price.value + +taxes.value + +ads.value )- +discount.value;
        total.innerHTML = res;
        total.style.backgroundColor =`#040`
    }else{
        total.style.backgroundColor =`#8b0000`
    }
}

if(localStorage.getItem("product")==null){
    var productContainer = [];
}else{
    productContainer = JSON.parse(localStorage.getItem("product"))
}
display(productContainer)


function submit (){
    let product={
    title : title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
    }
    if (mood==="create") {
        if (product.count > 1) {
            for (let i = 0; i < product.count; i++) {
                productContainer.push(product)
            }
        }else{productContainer.push(product)
        }
    }else{
        productContainer[ tmp]=product
        mood="create"
        creatbtn.innerHTML="create"
        creatbtn.style.backgroundColor="#198754"
        count.style.display="block"

    }

    localStorage.setItem("product",JSON.stringify(productContainer))
    console.log(productContainer);
    clear()
    display(productContainer)
    priceSum()
}


function clear() {
    title.value=``;
    price.value=``;
    taxes.value=``;
   ads.value=``;
    discount.value=``;
    total.innerHTML=``;
   count.value=``;
    category.value=``;
}


function display(displayProduct) {
    let cartona =``;
    for (let i = 0; i < productContainer.length; i++) {
        cartona += `                        
        <tr>
        <td>${i+1}</td>
        <td>${displayProduct[i].title}</td>
        <td>${displayProduct[i].price}</td>
        <td>${displayProduct[i].taxes}</td>
        <td>${displayProduct[i].ads}</td>
        <td>${displayProduct[i].discount}</td>
        <td>${displayProduct[i].total}</td>
        <td>${displayProduct[i].category}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById("tbody").innerHTML=cartona
    if (productContainer.length>0) {
        deleteAll.innerHTML=`<button onclick="deleteAllBtn()" id="deleteAll" class="BTN1 w-100 mt-2 btn btn-success">delete All ${productContainer.length}</button>`
    }else{
        deleteAll.innerHTML=``
    }
    
}


function deleteProduct(i){

    productContainer.splice(i,1)
    localStorage.product=JSON.stringify(productContainer)
    display(productContainer)
}


function deleteAllBtn() {
    localStorage.clear()
    productContainer.splice(0)
    display(productContainer)
}


function updateProduct(i) {
    title.value=productContainer[i].title
    price.value=productContainer[i].price
    taxes.value=productContainer[i].taxes
    ads.value=productContainer[i].ads
    discount.value=productContainer[i].discount
    category.value=productContainer[i].category
    priceSum()
    creatbtn.innerHTML="update"
    creatbtn.style.backgroundColor="#ffc107"
    count.style.display="none"
    mood ="update"
    tmp =i
}

let searchMood="title"
let search=document.getElementById("search")

function searchInput(id) {
    if (id=="searchTitle") {
        searchMood="title"
        search.placeholder="search by title"
    }else{
        searchMood="category"
        search.placeholder="search by category"
    }
    search.focus()
    search.value=""
    display(productContainer)
}


function searchData(value) {
    let cartona=``
    if (searchMood=="title") {
        for (let i = 0; i < productContainer.length; i++) {
            if (productContainer[i].title.includes(value.toLowerCase())) {
                cartona += `                         
                <tr>
                <td>${i+1}</td>
                <td>${productContainer[i].title}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].taxes}</td>
                <td>${productContainer[i].ads}</td>
                <td>${productContainer[i].discount}</td>
                <td>${productContainer[i].total}</td>
                <td>${productContainer[i].category}</td>
                <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`
            }
        }
        
    }else{
        for (let i = 0; i < productContainer.length; i++) {
            if (productContainer[i].category.includes(value.toLowerCase())) {
                cartona += `                        
                <tr>
                <td>${i+1}</td>
                <td>${productContainer[i].title}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].taxes}</td>
                <td>${productContainer[i].ads}</td>
                <td>${productContainer[i].discount}</td>
                <td>${productContainer[i].total}</td>
                <td>${productContainer[i].category}</td>
                <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`
            }
        }
    }
    console.log(searchMood);

    document.getElementById("tbody").innerHTML=cartona
}