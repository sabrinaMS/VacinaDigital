class LoginController{
    constructor(pacienteController) {
        this.loginService = new LoginAPIService();
        this.pacienteController = pacienteController;
        this.formLogin = new FormLogin(this, "main");
    }

    loginForm() {
        this.formLogin.mostrarLogin();
    }

    efetuarLogin(email, password){
        const self = this;
        this.loginService.login(email, password, self.pacienteController.carregarPacientes, self.formLogin.mostrarErro);
    }
}