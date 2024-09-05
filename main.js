var btn = document.getElementById("btnAdd");
var ProductNameInput = document.getElementById("ProductName");
var ProductPriceInput = document.getElementById("ProductPrice");
var ProductCategoryInput = document.getElementById("ProductCategory");
var ProductDescriptionInput = document.getElementById("floatingTextarea");
var ProductImageInput = document.getElementById("Productfile");
var profilePhoto = document.getElementById("profilePhoto");
let mood = "create";
let tmp;

var products = [];
if (localStorage.getItem("localItems") !== null) {
    products = JSON.parse(localStorage.getItem("localItems"));
    display();
}

btn.addEventListener("click", () => {
    var product = {
        name: ProductNameInput.value,
        price: ProductPriceInput.value,
        category: ProductCategoryInput.value,
        description: ProductDescriptionInput.value,
        image: profilePhoto.src,
    };

    if (product.name === "" || product.price === "" || product.category === "" || product.description === ""|| product.image === "") {
        alert("Please fill the form");
    } else {
        if (mood === "create") {
            products.push(product);
        } else {
            products[tmp] = product;
            mood = "create";
            btn.classList.remove("btn-warning");
            btn.classList.add("btn-primary");
            btn.innerText = "Add Product";
        }
    }

    localStorage.setItem("localItems", JSON.stringify(products));
    
    display();
    clear();
});

function clear() {
    ProductNameInput.value = "";
    ProductPriceInput.value = "";
    ProductCategoryInput.value = "";
    ProductDescriptionInput.value = "";
    ProductImageInput.value = "";
    profilePhoto.src = "profile.png";
}

function display() {
    var container = "";
    products.forEach((ele, index) => {
        container += `
            <tr>
                <td>${index + 1}</td>
                <td>${ele.name}</td>
                <td>${ele.price}</td>
                <td>${ele.category}</td>
                <td>${ele.description}</td>
                <td><img src="${ele.image}" alt="product image" width="100px"></td>
                <td>
                    <button onclick="updateProduct(${index})" class="btn btn-outline-warning">Update</button>
                    <button onclick="deleteProduct(${index})" class="btn btn-outline-danger">Delete</button>
                </td>
            </tr>`;
    });
    document.getElementById("tbody").innerHTML = container;
}

function deleteProduct(el) {
    products.splice(el, 1);
    localStorage.setItem("localItems", JSON.stringify(products));
    display();
}

function updateProduct(el) {
    ProductNameInput.value = products[el].name;
    ProductPriceInput.value = products[el].price;
    ProductCategoryInput.value = products[el].category;
    ProductDescriptionInput.value = products[el].description;
    profilePhoto.src = products[el].image;
    btn.innerText = "Update Product";
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-warning");
    mood = "update";
    tmp = el;
}


ProductImageInput.onchange = function () {
    if (ProductImageInput.files[0].size < 1000000) {
        var reader = new FileReader();
        reader.onload = function (e) {
            profilePhoto.src = e.target.result;
        };
        reader.readAsDataURL(ProductImageInput.files[0]);
    } else {
        alert("Image too large");
    }
};

//search function

let search=document.getElementById('search');
search.addEventListener('keyup', function(e){
    let searchValue=e.target.value.toLowerCase();
    let table='';
    products.forEach((ele,index)=>{
        if(ele.name.toLowerCase().includes(searchValue)){
            table += `
            <tr>
                <td>${index + 1}</td>
                <td>${ele.name}</td>
                <td>${ele.price}</td>
                <td>${ele.category}</td>
                <td>${ele.description}</td>
                <td><img src="${ele.image}" alt="product image" width="100px"></td>
                <td>
                    <button onclick="updateProduct(${index})" class="btn btn-outline-warning">Update</button>
                    <button onclick="deleteProduct(${index})" class="btn btn-outline-danger">Delete</button>
                </td>
            </tr>`
        }
        
      
    })
    if (table === '') {
        table = `<tr><td colspan="7" style="text-align: center;">No Records Found</td></tr>`;
    }
   
    document.getElementById('tbody').innerHTML = table;
});
   
