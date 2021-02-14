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
    const itemKey = this.getAttribute('key')
    let method = 'add'
    const alreadyInCart = itemsInCartStorage.indexOf(itemKey) > -1
    cardButton.textContent = alreadyInCart ? 'Remove from Cart' : 'Add to Cart'

    cardButton.addEventListener('click', function () {
      let currentCount = +countSpan.textContent

      if (alreadyInCart || method === 'add') {
        const itemsInCart = JSON.parse(
          window.localStorage.getItem('itemsInCart')
        )
        countSpan.textContent = currentCount += 1
        cardButton.textContent = 'Remove from Cart'
        method = 'subtract'
        // alert('Added to Cart!')
        itemsInCart.push(itemKey)
        window.localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart))
      } else {
        countSpan.textContent = currentCount -= 1
        cardButton.textContent = 'Add to Cart'
        method = 'add'
      }
    })

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', './styles/style.css')
    linkElem.setAttribute('href', './styles/style.css')

    shadowDom.append(linkElem)
    shadowDom.append(wrapper)
  }
}

customElements.define('product-item', ProductItem)