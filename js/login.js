async function loginFormHandler(event) {
  event.preventDefault();

  const username = $("#username-login").val();
  const password = $("#password-login").val();

  if (username && password) {
    const response = await fetch("/users/login", {
      method: "post",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

const loginButton = document.querySelector(".loginbtn");
loginButton.addEventListener("click", () => {
  loginButton.classList.add("button--loading");
});

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
