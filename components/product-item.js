class ProductItem extends HTMLElement {
  constructor() {
    super()

    const shadowDom = this.attachShadow({mode: 'open'}) // sets and returns 'this.shadowRoot'

    const wrapper = document.createElement('li')
    wrapper.setAttribute('class', 'product')

    const img = wrapper.appendChild(document.createElement('img'))
    img.src = this.getAttribute('img')
    img.alt = this.getAttribute('alt')

    const titleTag = wrapper.appendChild(document.createElement('p'))
    titleTag.textContent = this.getAttribute('title')
    titleTag.setAttribute('class', 'title')

    const priceTag = wrapper.appendChild(document.createElement('p'))
    const price = this.getAttribute('price')
    priceTag.textContent = `$${price}`
    priceTag.setAttribute('class', 'price')

    const countSpan = document.getElementById('cart-count')
    const cardButton = wrapper.appendChild(document.createElement('button'))

    const itemsInCartStorage = JSON.parse(
      window.localStorage.getItem('itemsInCart')
    )

    if (itemsInCartStorage.length > 0) {
      countSpan.textContent = itemsInCartStorage.length
    }

    const itemKey = this.getAttribute('key')
    const alreadyInCart = itemsInCartStorage.indexOf(itemKey) > -1
    cardButton.textContent = alreadyInCart ? 'Remove from Cart' : 'Add to Cart'
    let method = alreadyInCart ? 'subtract' : 'add'

    cardButton.addEventListener('click', function () {
      let currentCount = +countSpan.textContent
      const itemsInCart = JSON.parse(window.localStorage.getItem('itemsInCart'))

      if (method === 'add') {
        countSpan.textContent = currentCount += 1
        cardButton.textContent = 'Remove from Cart'
        method = 'subtract'
        alert('Added to Cart!')
        itemsInCart.push(itemKey)
        window.localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart))
      } else {
        const itemsInCartAfterFilter = itemsInCart.filter(
          (item) => item !== itemKey
        )
        countSpan.textContent = currentCount -= 1
        cardButton.textContent = 'Add to Cart'
        method = 'add'
        window.localStorage.setItem(
          'itemsInCart',
          JSON.stringify(itemsInCartAfterFilter)
        )
      }
    })

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', './styles/styles.css')

    shadowDom.append(linkElem)
    shadowDom.append(wrapper)
  }
}

customElements.define('product-item', ProductItem)
