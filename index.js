import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let total = 0
let formModal = document.getElementById("form_modal")



document.addEventListener("click", function(e) {
  if(e.target.dataset.product) {
    showBasket(e.target.dataset.product)
  }else if(e.target.dataset.remove) {
    removeProduct(e.target.dataset.remove)
  }else if(e.target.dataset.star) {
    colorTheStart(e.target.dataset.star)
  }
})

function productsHtml() {
  let html = ""
     
  menuArray.forEach(item => {
    html += `
    <div class="product" >    
    <div class="item_container">
      <div class="product-emoji">${item.emoji}</div>
      <div class="product_info">
        <h2>${item.name}</h2>
        <p>${item.ingredients}</p>
        <h3>$${item.price}</h3>
      </div>
      </div>
      <i class="fa-regular fa-plus" data-product="${item.id}" ></i>
      
    </div>    
    `
  
  })
  return html
}

function getFeedHtml() {
  let productsHTML = productsHtml()   
  let feedHTML = `
  ${productsHTML}     
  <div id="reviews_container">
        <h2>Reviews</h2>
        <ul id="reviews_list"></ul>
  </div>
 <div id="basket_layout">
    <h2 class="title">Your Order</h2>
    <ul id="basket"></ul>
   <div class="basket_total">
      <h2>Total price:</h2>
      <h2 id="total_price"></h2>
    </div>
  <button id="buy_btn">Complete order</button>    
  </div>`   
  return feedHTML
}

function showBasket(productId) {  
  const chosenProduct = menuArray.filter(function(product){
   return product.id == productId
  })[0]

  total += chosenProduct.price

  let basketItem = `
  <li class="basket_li" id="basket_li-${chosenProduct.id}"> 
    <div>
    <h2>${chosenProduct.name}</h2>
    <button data-remove="${chosenProduct.id}" id="remove_btn">remove</button>
    </div>
    <h2 id="price-${chosenProduct.id}">$${chosenProduct.price}</h2>
  </li>`
   
  document.getElementById("basket_layout").style.display = "block"
  document.getElementById("reviews_container").style.display = "none"
  document.getElementById("basket").innerHTML += basketItem
  document.getElementById("total_price").innerHTML = `$${total}`
  
}

function removeProduct(productId) {  
  let priceString = document.getElementById(`price-${productId}`).innerText
  let priceNum = priceString.match(/(\d+)/)[0]
  document.getElementById("total_price").innerHTML = `$${total = total - priceNum}`
  document.getElementById(`basket_li-${productId}`).remove()
  if(total === 0) {
    document.getElementById("basket_layout").style.display = "none"
  }  
}

let reviewsFromLs = JSON.parse(localStorage.getItem("reviews"))

let reviewsObj = []

if(reviewsFromLs) {
    reviewsObj = reviewsFromLs
}


formModal.addEventListener("submit", function(e) {         
  
  e.preventDefault()
  let inputName = document.getElementsByName("name")[0].value
 
  formModal.style.display = "none"
  document.getElementById("basket_layout").innerHTML = `
  <div class="order_notification"><h2>Thanks, ${inputName }! Your order is on its way!</h2>
  <div id="rating_layout">
    <h3>Rate us: </h3>
    
    <div id="stars">
      <a data-star="${uuidv4()}">⭐</a>
      <a data-star="${uuidv4()}">⭐</a>
      <a data-star="${uuidv4()}">⭐</a>
      <a data-star="${uuidv4()}">⭐</a>
      <a data-star="${uuidv4()}">⭐</a>
    </div>
   
    <form id="review_form">  
      <textarea placeholder="Leave your review" id="review"></textarea>
      <button type="submit" class="review_submit" required>Submit</button>
    </form>
  </div>
  </div>
  `
  
  const reviewForm = document.getElementById("review_form")
  const reviewVal = document.getElementById("review")
  
  const ratingList = document.getElementById("stars")
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if(reviewVal.value) {
    
      let objToPush = {
        name: inputName,
        review: reviewVal.value,
        stars: ratingList.innerHTML     
    }
    reviewsObj.unshift(objToPush)
    }

    localStorage.setItem("reviews", JSON.stringify(reviewsObj))
   
    render()
  })
  
})



function colorTheStars(starId) {
 
  let stars = document.querySelectorAll("#stars a")
  stars = [...stars]

  stars.forEach(star => {
    star.style.opacity = "50%" 
  })
   
   
  let clickedStar = stars.filter((star) => {
    return star.dataset.star === starId
  })[0]
  let index = stars.indexOf(clickedStar) 
  
  for(let i = index; i >= 0;  --i) {
   
    stars[i].style.opacity = "100%"
     
  }
}


function render() {
  total = 0
  document.getElementById("root").innerHTML = getFeedHtml() 
  const reviewsContainer = document.getElementById("reviews_container")
  reviewsObj.length > 0 ? reviewsContainer.style.display = "flex" : reviewsContainer.style.display = "none"
  let reviewsList = document.getElementById("reviews_list")
  
  for(let obj of reviewsObj) {
    reviewsList.innerHTML += `<li class="review_li">
      <div class="flex_container">
      <h3>${obj.name}</h3>
      <div class="starts_container">
      ${obj.stars}
      </div>
      </div>
      <p class="review_text">${obj.review}</p>
    </li>`

  }
  const buyBtn = document.getElementById("buy_btn")
  buyBtn.addEventListener("click", function() {
    document.getElementById("form_modal").style.display = "flex"
  })
}

render()


let slideIndex = 0

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides")
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }
  slideIndex++
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block"
  setTimeout(showSlides, 3000)
}

showSlides()

