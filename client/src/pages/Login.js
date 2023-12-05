const Login = () => {
  return (
    <section>
      <div class="d-flex flex-column text-center mb-3 p-5">
        <a href="/">Go back</a>
        <form class="login-form text-center">
          <h2 class="login-title text-black">log-in</h2>
          <div>
            <input
              class="text-base text-center border-secondary-color rounded-md mt-4 p-2.5"
              type="text"
              id="username-login"
              placeholder="username"
            />
          </div>
          <div>
            <input
              class="text-base text-center border-secondary-color rounded-md mt-4 p-2.5"
              type="password"
              id="password-login"
              placeholder="password"
            />
          </div>
          <div>
            <button
              class="loginbtn bg-tertiary-color px-4 py-2 border-tertiary-color rounded-md mt-4 hover:bg-quinary-color"
              type="submit"
            >
              login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
