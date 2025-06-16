let inputPassword = document.getElementById('password')
let inputConfirmPassword = document.getElementById('confirm-password')
let message = document.querySelector('.message')
let eyePassword = document.getElementById('eye-password')
let eyeConfirm = document.getElementById('eye-confirm')
let form = document.getElementById('form')

form.addEventListener('submit',confirm)
eyePassword.addEventListener('click',togglePassword)
eyeConfirm.addEventListener('click',toggleConfirmPassword)



function confirm(e){
    e.preventDefault()
    const email = localStorage.getItem('userEmail')
    const resetToken = localStorage.getItem('otp')
    let passwordValue = inputPassword.value
    let confirmPasswordValue = inputConfirmPassword.value

    console.log(inputPassword.value,inputConfirmPassword.value)
    if(passwordValue !== 0){
        if(passwordValue === confirmPasswordValue){
            message.innerHTML = ''
            inputConfirmPassword.style.borderColor =' #BFBFBF'
            
         }else{
            message.innerHTML='password does not match'
            inputConfirmPassword.style.borderColor =' #EB4335'
         }
    }
    if(passwordValue === ''){
        alert('please enter your password')
    }

    fetch('https://my-style-mag-backend.onrender.com/api/v1/changePassword',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'accept': 'application/json'
            },
            body:JSON.stringify({
                newPassword:passwordValue,
                resetToken:resetToken,
                email:email
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(localStorage.getItem('userEmail'))
            console.log(localStorage.getItem('otp'))
            localStorage.clear()
            setTimeout(() => {
                window.location.href = '../password_changed/index.html'
            }, 1500)
        })

        .catch((err) => {
            console.log(err)
        })
    
    
}
    

    





function togglePassword(e){
    if(inputPassword.type == "password"){
        inputPassword.type = "text"
        eyePassword.classList.remove("fa-eye-slash")
        eyePassword.classList.add("fa-eye")
    }else{
        inputPassword.type = "password"
        eyePassword.classList.remove("fa-eye")
        eyePassword.classList.add("fa-eye-slash")
    }


}

function toggleConfirmPassword(e){
        if(inputConfirmPassword.type == "password"){
            inputConfirmPassword.type = "text"
            eyeConfirm.classList.remove("fa-eye-slash")
            eyeConfirm.classList.add("fa-eye")
        }else{
            inputConfirmPassword.type = "password"
            eyeConfirm.classList.remove("fa-eye")
            eyeConfirm.classList.add("fa-eye-slash")
        }
    }
