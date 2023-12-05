async function signupFormHandler(event) {
  event.preventDefault();

  const username = $("#username-signup").val();
  const email = $("#email-signup").val();
  const password = $("#password-signup").val();

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

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#signupform")
  .addEventListener("submit", signupFormHandler);
