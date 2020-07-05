class FormLogin {
    constructor(controller, seletor) {
        this.loginController = controller;
        this.seletor = seletor;
    }

    mostrarLogin() {
        const form = `<form action="form-action" id = "login">
    <h3>Login Enfermagem</h3>
    <div class="form-group">
        <label for="exampleInputEmail1">Faça login com seu E-mail</label>
        <input type="email" class="form-control" required id="txtemail" aria-describedby="emailHelp" placeholder="Insira seu E-mail">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Senha</label>
        <input type="password" class="form-control" required id="txtsenha" placeholder="Senha">
      </div>
      <input type="submit" id="btnsalvar" class="btn btn-dark" value="Entrar">
      </form>`

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = form;

        var formElement = document.querySelector("#login");
        
        const self = this;
        
        formElement.onsubmit = function(event){
            event.preventDefault();
            const email = document.querySelector("#txtemail").value;
            const senha = document.querySelector("#txtsenha").value;

            self.loginController.efetuarLogin(email, senha);
            // NAO DEIXAR LISTAR SEM LOGIN
            // if (localStorage.getItem("token")){}
            
            // self.pacienteController.carregarPacientes();
        }
    }
}