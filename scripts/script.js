// Script.js

window.addEventListener('DOMContentLoaded', () => {
  const itemsInCart = window.localStorage.getItem('itemsInCart')

  if (!itemsInCart) {
    window.localStorage.setItem('itemsInCart', JSON.stringify([]))
  }

  const defaultItems = window.localStorage.getItem('productList')
  let productList = JSON.parse(defaultItems)

  if (!productList) {
    fetch('https://fakestoreapi.com/products')
      .then((responseData) => responseData.json())
      .then((products) => {
        renderProducts(products)
        window.localStorage.setItem('productList', JSON.stringify(products))
      })
  } else {
    renderProducts(productList)
  }

  function renderProducts(productList) {
    const productListContainer = document.getElementById('product-list')
    productList.forEach((product) => {
      const {title, price, description, image, id} = product
      const productItem = `<product-item title="${title}" price="${price}" img="${image}" alt="${description}" key="${id}" />`
      productListContainer.insertAdjacentHTML('beforeend', productItem)
    })
  }

  // //  localStorage("name", "number")
  // //  localStorage.setItem("age", "30")
  // //  localStorage.setItem("name", "domenic")
  // //  console.log(localStorage.getItem("age"));

  // const myStorage = window.localStorage
  // myStorage.getItem()
  // myStorage.setItem('productList', JSON.stringify(productList))
})

