
let mainDiv = document.getElementById('mainDiv')


const getProducts = async (product) => {
if (product) {
try {
const resp = await axios.get(`http://localhost:3000/${product}`)
let productosArr = resp.data.productos
return productosArr
} catch (err) {
// Handle Error Here
console.error(err);
}
} else {
try {
const resp = await axios.get("http://localhost:3000/");
let productosArr = resp.data.productos
return productosArr
} catch (err) {
// Handle Error Here
console.error(err);
}
}
}




let showProducts = async (product) => {
try {
let resp = await getProducts(product)
console.log(resp)
mainDiv.innerHTML = ""
resp.map((item) => {
mainDiv.innerHTML += `<div class="card col-3" style="width: 18rem;">
<img id="cardImg" class="card-img-top" src="${item.url_image}" alt="Card image cap">
<div class="card-body">
<h5 class="card-title">${item.name}</h5>
<p class="card-text">$ ${item.price - item.discount}</p>
<a href="#" class="btn btn-primary">Agragar al carrrito</a>
</div>
</div>`
})

let images = document.querySelectorAll('img')
images.forEach(img => {
img.addEventListener('error', function handleError() {
const defaultImage =
'../assets/img/descarga.png';
img.src = defaultImage;
img.alt = 'default';
});
});

} catch (err) {
console.log(err)
}
}

showProducts()


