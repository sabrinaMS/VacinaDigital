class LoginController{
    constructor(pacienteController) {
        this.loginService = new LoginAPIService();
        this.pacienteController = pacienteController;
        this.formLogin = new FormLogin(this, pacienteController ,"main");
    }

    loginForm() {
        this.formLogin.mostrarLogin();
    }

    efetuarLogin(email, password){
        this.loginService.login(email, password);
    }
}