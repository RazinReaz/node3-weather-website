const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //the <p> element in index.hbs with id message-1
const messageTwo = document.querySelector('#message-2') //the <p> element in index.hbs with id message-2



messageOne.textContent = 'Fire up the search to begin'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = searchElement.value
    const urlTofetchForecast = 'http://localhost:3000/weather?address=' + location
    
    messageOne.textContent = 'Loading weather of ' + location
    messageTwo.textContent = ''
    
    
    fetch(urlTofetchForecast).then((response) => {
        response.json().then((data) => {
            if (data.error) { 
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'Weather for ' + data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})