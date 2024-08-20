const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

$(document).ready(function() {
  $("#change").click(function() {
    if ($(this).text() === "Login / Sign Up") {


      $(this).text("Logout");
      
    } else {
      $(this).text("Login / Sign Up");
    }
  });
});