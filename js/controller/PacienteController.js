class PacienteController{  
    constructor() {
        this.pacienteService = new PacienteAPIService(); 
        this.enfermeirosService = new NurseAPIService();
        this.lotesService = new VaccineLotAPIService();
        this.tabelaPacientes = new TabelaPacientes(this,"main");
        this.formPacientes = new FormPacientes(this,"main");
        this.cardsPacientes = new CardsPacientes(this, "main", this.cadastrarVacinacaoCallback.bind(this));
        this.vacinacaoForm = new VacinacaoForm(this.carregarEnfermeiros.bind(this), this.carregarLotes.bind(this), this.enviarFormVacinacao.bind(this))
        this.spinnerView = new SpinnerView()
        this.vaccineShotService = new VaccineShotAPIService()
    } 

    inicializa(){
        this.carregarPacientes();
    }

    carregarFormulario(){
        event.preventDefault();
        this.formPacientes.montarForm();
    }

    carregarPacientes(){
        const self = this;
        //definição da função que trata o buscar pacientes com sucesso
        const sucesso = function(pacientes){
            self.tabelaPacientes.montarTabela(pacientes);
        }

        //definição da função que trata o erro ao buscar os pacientes
        const trataErro = function(statusCode) {
            console.log("Erro:",statusCode);
        }
        
        self.spinnerView.render()
        this.pacienteService.buscarPacientes(sucesso, trataErro);
    }

    limpar(event){
        event.preventDefault();
        this.formPacientes.limparFormulario();
        this.carregarPacientes();
    }
    
    salvar(event){        
        event.preventDefault();
        var paciente = this.formPacientes.getDataPaciente();        
        console.log("Paciente", paciente);

        this.salvarPaciente(paciente);

    }

    salvarPaciente(paciente){
        const self = this;

        const sucesso = function(pacienteCriado) {
            console.log("Paciente Criado",pacienteCriado);
            self.spinnerView.render();
            self.carregarPacientes();
            self.formPacientes.limparFormulario();
        }

        const trataErro = function(error) {
            $('form').prepend($('<text>').addClass('text-center text-danger').text(error.message))
        }
        
        this.pacienteService.enviarPaciente(paciente, sucesso, trataErro);    
    }

    deletarPaciente(id, event){
        const self = this;
        this.pacienteService.deletarPaciente(id, 
            //colocar direto a funcao no parametro
            //nao precisa criar a variavel ok e erro
            function() {
                self.carregarPacientes();
            },
            function(status) { 
                console.log(status);
            }
        );
    }

    carregaFormularioComPaciente(id, event){
        event.preventDefault();             
        
        const self = this;
        const ok = function(paciente){
            self.formPacientes.montarForm(paciente);
        }
        const erro = function(status){
            console.log(status);
        }

        this.spinnerView.render()
        this.pacienteService.buscarPaciente(id,ok,erro);   
    }

    carregaCardsPaciente(id, event){
        if (event != null){
            event.preventDefault();             
        }
        
        const self = this;
        const ok = function(paciente){
            self.cardsPacientes.paciente = paciente
            self.cardsPacientes.render();
        }
        const erro = function(status){
            console.log(status);
        }

        this.spinnerView.render()
        this.pacienteService.buscarPaciente(id,ok,erro);   
    }

    editar(pacienteR, event){
        event.preventDefault();
        console.log("pacienteR", pacienteR)
        let paciente = this.formPacientes.getDataPaciente();
        for (let field in paciente){
            if (paciente[field]){
                pacienteR[field] = paciente[field]
            }
            console.log("FIELS", field)
        }

        delete pacienteR.vaccineShots

        paciente.id = pacienteR.id

        console.log("depois do r",pacienteR)
        const self = this;

        this.pacienteService.atualizarPaciente(pacienteR, 
            function() {
                self.formPacientes.limparFormulario();
                self.carregarPacientes();
            },
            function(status) {
                console.log(status);
            } 
        );
    } 
    
    cadastrarVacinacaoCallback(paciente){
        this.vacinacaoForm.paciente = paciente
        this.vacinacaoForm.render()
    }

    carregarEnfermeiros(ok, erro){ //será chamado na view do cadastro para pegar as options do select de enfermeiros
        this.enfermeirosService.buscarEnfermeiros(ok,erro)
    }

    carregarLotes(ok,erro){
        this.lotesService.searchVaccineLots(ok, erro)
    }

    enviarFormVacinacao(e){
        e.preventDefault()
        const data = this.vacinacaoForm.formValues

        const success = shot => {
            new ToastView("Vacinação aplicada com sucesso").render()
            this.carregaCardsPaciente(shot.patient.id, null)
        }

        const error = error =>{
            new ErrorView(error.status, error.message).show()
        }

        this.vaccineShotService.insertShot(data, success, error)
    }
}