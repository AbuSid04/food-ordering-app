import {menuArray} from '/data.js'

const menuItems = document.getElementById('menu-items')
const preCheckoutSection = document.getElementById('pre-checkout-section')
const paymentModal = document.getElementById('payment-modal')
const orderList = document.getElementById('order-list')
const totalPriceValue = document.getElementById('total-price-value')
const paymentForm = document.getElementById('payment-form')

let orderListArray = []
let price = 0

// Step 1. Render menu Items

function renderMenu(itemsArr){
    const foodItem = itemsArr.map(item => {

        const {name, emoji, ingredients, price, id} = item

        return `
        <div class="menu-items">
            <div class="menu-items-details">
                <p class="item-emoji">${emoji}</p>
                <div class="item-detail">
                    <p class="item-name">${name}</p>
                    <p class="item-ingredients">${ingredients}</p>
                    <p class="item-price">$${price}</p>
                </div>
            </div>
            <button class="add-item-btn" data-add="${id}">+</button>
        </div>
        `
    }).join('');

    return foodItem
}

menuItems.innerHTML = renderMenu(menuArray)

// step 2. event istner on add buttons

document.addEventListener('click', e => {

    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    
    if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }

    if(e.target.id === 'complete-order-btn'){
        handleOrderClick(e.target.id)
    }

})

// step 3. Function for each event listener

/* A. Event listener for Add Button*/
function handleAddClick(orderedItemId){
    const targetMenuItemObj = menuArray.filter(menuItem => menuItem.id == orderedItemId)[0]
    
    orderListArray.push(targetMenuItemObj)

    render()  
}

/* B. Event listener for remove Button*/

function handleRemoveClick(itemId){
   
    const index = orderListArray.findIndex(item => item.id == itemId)

    orderListArray.splice(index, 1)

    if(orderListArray.length > 0){
        render()
    }
    else{
        preCheckoutSection.style.display = 'none'
    }
}

/* C. Event listener for Complete Order Button*/

function handleOrderClick(itemId){
    paymentModal.style.display = 'flex'
}

/* D. Event listener for submit Button of Form*/

paymentForm.addEventListener('submit',function(e){
    e.preventDefault()

    const paymentFormData = new FormData(paymentForm)
    const fullName = paymentFormData.get('full-name')
    
    preCheckoutSection.innerHTML = `
        <p class="order-completed-msg">Thanks ${fullName} , your order is on it's way!</p>
    `

    paymentModal.style.display = 'none'
})


// Render function for ordered Items

function render(){

    preCheckoutSection.style.display = 'flex'

    orderList.innerHTML = orderListArray.map(order => 
        `
        <div class="order-item-detail">
            <div class="order-item-name">
                <h3>${order.name}</h3>
                <button data-remove="${order.id}">remove</button>
            </div>
            <h3>$${order.price}</h3>
        </div>
        `
    ).join('')

    getTotalPrice()
}

function getTotalPrice(){
    price = orderListArray.reduce((total, current) => total + current.price ,0 )

    totalPriceValue.innerHTML = `<h3>$${price}</h3>`
}