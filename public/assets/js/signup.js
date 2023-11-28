async function signupFormHandler(event) {
  event.preventDefault();

  const username = $("#username-signup").value();
  const email = $("#email-signup").value();
  const password = $("#password-signup").value();

  if (username && email && password) {
    const response = await fetch("/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }
}

document
  .querySelector("#signupform")
  .addEventListener("submit", signupFormHandler);
