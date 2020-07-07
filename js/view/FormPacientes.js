class FormPacientes {

    constructor(controller, seletor){
        this.pacienteController = controller;
        this.seletor = seletor;
    }

    montarForm(paciente){
        if(!paciente){
            paciente = new Paciente();
        }
        
        var str = `
        <h2>Formulario de Pacientes</h2>
        <form id="formulario">
            <input type="hidden" id="txtpaciente" value="${paciente.id ? paciente.id : '' }" />

            <div class="form-group">
        <h5>Editar Dados de Paciente</h5>
        <!-- NOME -->
        <div class="form-group">
            <label for="patientName">Nome Completo</label>
            <input type="text" class="form-control" required placeholder="Nome" id="txtnome" value = "${paciente.name ? paciente.name : '' }">
          </div>
        
        <!-- ANIVERSARIO -->
        <div class="form-group">
            <label for="patientBirthDate">Data de Nascinemto</label>
            <input type="date" class="form-control" required id="txtnascimento" value="${paciente.birthDate ? paciente.birthDate : '' }">
        </div>
    
        <!-- TELEFONE -->
        <div class="form-group ">
            <label for="patientPhone">Telefone</label>
            <input type="tel" class="form-control" required placeholder="(51) 9999-9999" id="txttelefone" value = "${paciente.phoneNumber  ? paciente.phoneNumber : '' }">
        </div>
    
        <!-- EMAIL -->
        <div class="form-group">
            <label for="patientEmail">E-mail</label>
            <input type="email" class="form-control" required id="txtemail" aria-describedby="emailHelp" placeholder="E-mail do Paciente" value = "${paciente.email  ? paciente.email : '' }">
        </div>

        <div class="form-group">
            <label for="patientEmail">Senha</label>
            <input type="password" class="form-control" required id="txtsenha" placeholder="Password">
            </div>


        <span id = "${paciente.id}">
        <input type="submit" id="btnsalvar" class="btn btn-dark" value="Salvar">
        <input type="reset" class="btn btn-dark" value="Cancelar">
        </span>
        </div>
        </form>
        `;

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = str;

        var form = document.querySelector("#formulario");
        const self = this;
        form.onsubmit = function(event){
            // console.log("antes do if", paciente)
            if(!paciente.id){
                self.pacienteController.salvar(event);
            }
            else{
                self.pacienteController.editar(paciente,event);
            }
        }
        
        form.onreset = function(event){
            self.pacienteController.limpar(event);
        }
    }

    limparFormulario(){
        document.querySelector("#txtnome").value="";
        document.querySelector("#txtemail").value="";
    }

    getDataPaciente(){
        let paciente = new Paciente();
        
        if(!document.querySelector("#txtpaciente").value){
            // console.log("antes do batata", paciente)
            paciente.id = document.querySelector("#txtpaciente").value;
        }
        // console.log("depois do batata", paciente)
        paciente.name = document.querySelector("#txtnome").value;
        paciente.birthDate = document.querySelector("#txtnascimento").value;
        paciente.phoneNumber = document.querySelector("#txttelefone").value;
        paciente.email = document.querySelector("#txtemail").value;
        paciente.password = document.querySelector("#txtsenha").value;

        // console.log("batatas", paciente)
        return paciente;        
    }

}