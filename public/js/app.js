// fetch('http://localhost:3000/Weather?address=Bhubaneswar').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.forecast)
//             console.log(data.location)
//         }
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    url = '/Weather?address=' + search.value

    message1.textContent = 'Loading.......'
    message2.textContent = ''
    message3.textContent = ''

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            message1.textContent = data.error
            } else {
                console.log(data.forecast)
                console.log(data.location)
                message1.textContent = data.location
                message2.textContent = data.forecast
                message3.textContent = data.humidity
            }
        })
    })

})

