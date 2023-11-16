async function loginFormHandler(event) {
  event.preventDefault();

  const username = $("#username-login").value.trim();
  const password = $("#password-login").value.trim();

  if (username && password) {
    const response = await fetch("/user/login", {
      method: "post",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }
}

const loginButton = document.querySelector(".loginbtn");
loginButton.addEventListener("click", () => {
  loginButton.classList.add("button--loading");
});

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
