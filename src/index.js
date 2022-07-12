// write your code here
const ramenURL = 'http://localhost:3000/ramens'
const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetails = document.querySelector('#ramen-detail')
const extraDetails = document.querySelector('#extra-details')
const ramenForm = document.querySelector('#new-ramen')
const editForm = document.querySelector('#edit-ramen')
const details = document.querySelector('#details')

document.addEventListener('DOMContentLoaded', e => {
    fetchRamen()
    ramenForm.addEventListener('submit', e => {
        e.preventDefault()
        getNewRamen()
    })
    //console.log(ramenURL)
})   
function fetchRamen(){
    fetch(ramenURL)
    .then(resp => resp.json())
    .then(ramens => 
        {
            ramens.forEach(ramen => addMenu(ramen))
            getDetails(ramens[0])
        })
}
function addMenu(ramen){
    let card = document.createElement('ul')
    card.innerHTML = `
    <img src= ${ramen.image}>
    `
    ramenMenu.appendChild(card)
    card.addEventListener('click', e => {
        getDetails(ramen)
        })
    //console.log(ramen.image)
}
function getDetails(ramen){
    let editBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')
    document.querySelector('#new-rating').value = ''
    document.querySelector('#new-comment').value =''
    editBtn.innerText = ' EDIT '
    deleteBtn.innerText = ' DELETE '
    document.querySelector('#name').innerText = ramen.name
    document.querySelector('#restaurant').innerText = ramen.restaurant
    document.querySelector('#image').src = ramen.image
    
    extraDetails.innerHTML = `
    <h3>Rating:</h3>
  <p>
    <span id='rating-display'>${ramen.rating}</span> / 10
  </p>
  <h3>Comment:</h3>
  <p id='comment-display'>
    ${ramen.comment}
  </p>
    `
    extraDetails.appendChild(editBtn)
    extraDetails.appendChild(deleteBtn)
    editBtn.addEventListener('click', e => {
        document.querySelector('#new-rating').value = ramen.rating
        document.querySelector('#new-comment').value = ramen.comment
        editForm.addEventListener('submit', e => {
            e.preventDefault()
            ramen.rating = document.querySelector('#new-rating').value 
            ramen.comment = document.querySelector('#new-comment').value
            getDetails(ramen)
        })
    })
    deleteBtn.addEventListener('click', e => {
        console.log('This Does Not Work')
    })
}
const getNewRamen = () => {
    let newName = document.querySelector('#new-name').value
        let newRestaurant = document.querySelector('#new-restaurant').value
        let newImage = document.querySelector('#new-image').value
        let newRating = document.querySelector('#new-rate').value
        let newComment = document.querySelector('#new-comm').value
        let newRamen = {
            'name': newName,
            'restaurant': newRestaurant,
            'image': newImage,
            'rating': newRating,
            'comment': newComment
        }
        addMenu(newRamen)
        console.log(newRamen)
}