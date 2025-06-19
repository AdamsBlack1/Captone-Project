// Show Password Toggle
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", function () {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle effect
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");

  // Add animation class
  this.classList.add("animate");

  // Remove it after animation completes
  setTimeout(() => {
    this.classList.remove("animate");
  }, 400);
});

// Email & Password Validation and API Login
const form = document.getElementById("loginForm");
const typeEmail = document.getElementById("email");
const typePassword = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginButton = document.querySelector(".btn");
const generalError = document.getElementById("generalError");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = typeEmail.value.trim();
  const password = typePassword.value.trim();
  let isValid = true;

  generalError.textContent = "";

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError(emailError, "Email is required", typeEmail);
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError(emailError, "Enter a valid email address", typeEmail);
    isValid = false;
  }

  if (!password) {
    showError(passwordError, "Password is required", typePassword);
    isValid = false;
  }

  if (isValid) {
    loginButton.textContent = "Logging in...";
    loginButton.disabled = true;
    typeEmail.disabled = true;
    typePassword.disabled = true;

    fetch("https://my-style-mag-backend.onrender.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",  // 👈 this ensures cookie is sent and saved
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or password.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // No need to store token — cookie handles it
        window.location.href = "../blog page/index.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        generalError.textContent = error.message;
        generalError.classList.add("show");
      })
      .finally(() => {
        loginButton.textContent = "Log In";
        loginButton.disabled = false;
        typeEmail.disabled = false;
        typePassword.disabled = false;
      });
  }
});

// Show error helper
function showError(element, message, input) {
  element.textContent = message;
  element.classList.add("show");
  input.classList.add("input-error");
}

// Clear error when typing
typeEmail.addEventListener("input", () => {
  emailError.textContent = "";
  emailError.classList.remove("show");
  typeEmail.classList.remove("input-error");
  generalError.textContent = "";
  generalError.classList.remove("show");
});

typePassword.addEventListener("input", () => {
  passwordError.textContent = "";
  passwordError.classList.remove("show");
  typePassword.classList.remove("input-error");
  generalError.textContent = "";
  generalError.classList.remove("show");
});





















//show Password Toggle
// const togglePassword = document.getElementById("togglePassword");
// const passwordInput = document.getElementById("password");

// togglePassword.addEventListener("click", function () {
//   const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
//   passwordInput.setAttribute("type", type);

//   // Toggle effect
//   this.classList.toggle("fa-eye");
//   this.classList.toggle("fa-eye-slash");

//   // Add animation class
//   this.classList.add("animate");

//   // Remove it after animation completes
//   setTimeout(() => {
//     this.classList.remove("animate");
//   }, 400);
// });




// // Email & Password Validation and API Login
// const form = document.getElementById("loginForm");
// const typeEmail = document.getElementById("email");
// const typePassword = document.getElementById("password");
// const emailError = document.getElementById("emailError");
// const passwordError = document.getElementById("passwordError");
// const loginButton = document.querySelector(".btn");

// // Suggestion #1: General error message container (add this <p id="generalError" class="error-message"></p> in your HTML)
// const generalError = document.getElementById("generalError");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const email = typeEmail.value.trim();
//   const password = typePassword.value.trim();
//   let isValid = true;

//   // Clear general error message on submit
//   generalError.textContent = "";

//   // Suggestion #3: Email format validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!email) {
//     showError(emailError, "Email is required", typeEmail);
//     isValid = false;
//   } else if (!emailRegex.test(email)) {
//     showError(emailError, "Enter a valid email address", typeEmail);
//     isValid = false;
//   }

//   if (!password) {
//     showError(passwordError, "Password is required", typePassword);
//     isValid = false;
//   }

//   if (isValid) {
//     // Disable button and inputs while fetching
//     loginButton.textContent = "Logging in...";
//     loginButton.disabled = true;
//     typeEmail.disabled = true;
//     typePassword.disabled = true;

//     fetch("https://my-style-mag-backend.onrender.com/api/v1/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Invalid email or password.");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         window.location.href = "../blog page/index.html";
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         // Suggestion #1: Show error in general error message container
//         generalError.textContent = error.message;
//         generalError.classList.add("show");
//       })
//       .finally(() => {
//         // Reset button state and inputs
//         loginButton.textContent = "Log In";
//         loginButton.disabled = false;
//         typeEmail.disabled = false;
//         typePassword.disabled = false;
//       });
//   }
// });

// // Show error function
// function showError(element, message, input) {
//   element.textContent = message;
//   element.classList.add("show");
//   input.classList.add("input-error");
// }

// // Clear error when typing again
// typeEmail.addEventListener("input", () => {
//   emailError.textContent = "";
//   emailError.classList.remove("show");
//   typeEmail.classList.remove("input-error");
//   generalError.textContent = "";
//   generalError.classList.remove("show");
// });

// typePassword.addEventListener("input", () => {
//   passwordError.textContent = "";
//   passwordError.classList.remove("show");
//   typePassword.classList.remove("input-error");
//   generalError.textContent = "";
//   generalError.classList.remove("show");
// });








