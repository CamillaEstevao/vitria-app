function Login() {
  return (
    <div className="loginPage">
      <div className="loginCard">
        <div className="loginLogo">
          <div className="logoCircle">V</div>
          <h1>Vitria</h1>
        </div>

        <h2>Entrar na sua conta</h2>

        <form>
          <input
            type="email"
            placeholder="Seu e-mail"
          />

          <input
            type="password"
            placeholder="Sua senha"
          />

          <button>
            Entrar
          </button>
        </form>

        <p>
          Ainda não possui conta?
          <a href="#"> Fale conosco</a>
        </p>
      </div>
    </div>
  );
}

export default Login;