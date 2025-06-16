let forgotBtn = document.querySelector('.forgot-btn')
let emailInput = document.getElementById('email')
localStorage.setItem('userEmail', emailInput)
let form = document.querySelector('.forgot-container')


form.addEventListener('submit',doThis)

function doThis(e){
    e.preventDefault()
    const email = emailInput.value.trim()
    fetch('https://my-style-mag-backend.onrender.com/api/v1/forgotPassword', {
        method:"POST",
        headers:{'Content-Type': 'application/json' },
        body: JSON.stringify({email})
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        if( data.message === `Email sent Successfully to ${email}` ){
            window.location.href = "../OTP/index.html"
        }
        else{
            alert("Invalid Email")
        }
    })


    

    .catch(err => {
        console.log(err)
    })
}