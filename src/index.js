let mainDiv = document.getElementById("mainDiv")
let pageNav = document.getElementById("pageNav")
let searchBtn = document.getElementById("searchBtn")
let searchInput = document.getElementById("searchInput")
const url = 'https://sleepy-lake-91005.herokuapp.com' || 'http://localhost:3000'


//----------------------Consumo de api-------------
const getProducts = async (product) => {
  if (product) {
    try {
      const resp = await axios.get(`${url}/${product}`);
      let productosArr = resp.data.productos;
      return productosArr;
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  } else {
    try {
      const resp = await axios.get(url);
      let productosArr = resp.data.productos;
      return productosArr;
    } catch (err) {
      
      console.error(err);
    }
  }
};

//---------------Ruta search------------------

const getSearch = async(searchStr) => {
    try {
        const resp = await axios.post(`${url}/search`, {
             search: searchStr
            });
        
        let productosArr = resp.data.products;
        return productosArr;
      } catch (err) {
        
        console.error(err);
      }
}

//------------Manipulacion del DOM para listar productos-----------
let showProducts = async (data, search=false) => {

    let resp 
  try {
    if (search === true) {
        resp = await getSearch(data);
    }else {
        resp = await getProducts(data);
    }
    

    let pageIndex = 0;
    let itemsPerPage = 8;

    loadItems();
    loadPageNav();

    function loadItems() {
      mainDiv.innerHTML = "";
      for (
        let i = pageIndex * itemsPerPage;
        i < pageIndex * itemsPerPage + itemsPerPage;
        ++i
      ) {
        if (!resp[i]) {
          break;
        }

        let beforePrice = "";
        if (resp[i].discount > 0) {
          beforePrice = `$ ${resp[i].price}`;
        }

        let discount = Math.floor((resp[i].price * resp[i].discount) / 100);

        mainDiv.innerHTML += `<div class="card col-3" style="width: 18rem;">
<img id="cardImg" class="card-img-top" src="${
          resp[i].url_image
        }" alt="Card image cap">
<div class="card-body">
<h5 class="card-title">${resp[i].name}</h5>
<del class="card-text" style="color: red;">${beforePrice}</del>
<p class="card-text">$ ${resp[i].price - discount}</p>
<button type="button" class="carritoBtn btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Agregar al carrito
</button>
</div>
</div>`;

        //---------------------------Imagen por defecto si hay error en src-------------
        let images = document.querySelectorAll("img");
        images.forEach((img) => {
          img.addEventListener("error", function handleError() {
            const defaultImage = "../assets/img/descarga.png";
            img.src = defaultImage;
            img.alt = "default";
          });
        });

        // let carritoBtns = document.getElementsByClassName("carritoBtn")
        // carritoBtns.forEach((btn) => {
        //     btn.addEventListener("click", (e) => {
        //         e.preventDefault

        //     })
        // })

      }
    }

    //-----------------Paginacion----------

    function loadPageNav() {
      pageNav.innerHTML = "";

      
      for (let i = 0; i < Object.keys(resp).length / itemsPerPage; i++) {
        let span = document.createElement("span");
        span.innerHTML = i + 1;

        span.addEventListener("click", (e) => {
          pageIndex = e.target.innerHTML - 1;
          loadItems();
        });

        pageNav.append(span);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

showProducts();



searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let searchString = searchInput.value
    showProducts(searchString, true)
})
