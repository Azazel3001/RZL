const token = localStorage.getItem("token");

async function loadProducts() {

    const response = await fetch(
        "/api/products",
        {
            headers: {
                authorization: token
            }
        }
    );

    const products =
        await response.json();

    console.log(products);

}

loadProducts();