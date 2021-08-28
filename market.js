if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var addCounter = 0
var clickedCounter = 0
showCart()

function ready(){
    var cartButton = document.getElementById('cart-button')
    cartButton.addEventListener('click', showCart)

    var removeCartItemButtons = document.getElementsByClassName('product-remove')
    for(var i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInput = document.getElementsByClassName('suma')
    for(i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('add-button')
    for(i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
     }
}

function showCart(){
    var cart = document.getElementsByClassName('container')[0]
    if(clickedCounter == 0 || clickedCounter %2 == 0){
        cart.classList.add('hide')
    }
    else cart.classList.remove('hide')
    clickedCounter += 1
}

function addToCartClicked(event){
    addCounter += 1
     var button = event.target
     button.disabled = true
     button.classList.add('disable')
     var shopItem = button.parentElement.parentElement.parentElement
     var title = shopItem.getElementsByClassName('naziv-proizvoda')[0].innerText
     var price = parseFloat(shopItem.getElementsByClassName('cijena')[0].innerText)
     var imageSrc = shopItem.getElementsByClassName('cvarci-picture')[0].src
     var quantityItem = button.parentElement.parentElement
     var quantity = quantityItem.getElementsByClassName('suma')[0].value
     var total = quantity*price
     addItemToCart(title, total, quantity, imageSrc)
     updateCartSize()
}

function addItemToCart(title, total, quantity, imageSrc){
    var cartRow = document.createElement('div')
    var cartItems = document.getElementsByClassName('products')[0]
    var cartRowContents = `
            <div class="product">
                <img src="${imageSrc}" class="cart-picture" aria-label="Slika odabranih čvaraka" loading="lazy">
                <div class="product-info">
                    <h3 class="product-title">${title}</h3>
                    <p  class="price-quantity-style" id="cart-product-price">Cijena:<b>${total} kn</b></p>
                    <p class="price-quantity-style" id="product-quantity">Količina:<b>${quantity}</b></p>
                </div>
                <button class="product-remove">
                    <i class="far fa-times-circle fa-2x"></i>
                </button>
            </div>
        `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('product-remove')[0].addEventListener('click', removeCartItem)
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
}

function removeCartItem(event){
    addCounter -= 1
    var buttonClicked = event.target
    var title = buttonClicked.parentElement.parentElement.getElementsByClassName('product-title')[0].innerText 
    buttonClicked.parentElement.parentElement.remove()
    updateCartSize()
    enableButton(title)
}

function updateCartSize(){
    var counter = document.getElementById('total_counter')
    counter.innerText = addCounter
}

function enableButton(title){
    var buttons = document.getElementsByClassName('add-button')
    for(var i = 0; i < buttons.length; i++){
        if(buttons[i].parentElement.parentElement.parentElement.getElementsByClassName('naziv-proizvoda')[0].innerText == title){
            buttons[i].disabled = false
            buttons[i].classList.remove('disable')
        }
    }
}