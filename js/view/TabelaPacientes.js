class TabelaPacientes {
    constructor(controller, seletor){
        this.pacienteController = controller;
        this.seletor = seletor;
    }

    montarTabela(pacientes){
        var str=`
        <h2>Tabela de Pacientes</h2>
        <button type="button" id="novo" class="btn btn-info my-3">Adicionar Paciente</button>

        <table class = "table">
            <thead class="thead-dark">
            <tr>
                <th scope="col">Nome do Paciente</th>
                <th scope="col">E-mail</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>

            </thead>
        
        
            `;
    
        for(var i in pacientes){
            str+=`
            <tr id=${pacientes[i].id}>
                    <td>${pacientes[i].name}</td>
                    <td>${pacientes[i].email}</td>
                    <td><button type="button" class="btn btn-light edit">Editar</button></td>
                    <td>${pacientes[i].vaccineShots.lenght > 0 ? '<button type="button" class="btn btn-info cardVacina">Cartão de Vacina</button>' : 'Paciente sem Vacinas'} </td>
                    <td><button type="button" class="btn btn btn-light delete">Excluir  </button></td>   
                </tr>`;
                
        } 
        str+= `
        </div>`;
    
        var tabela = document.querySelector(this.seletor);
        tabela.innerHTML = str;

        const self = this;

        
        const linkNovo = document.querySelector("#novo");
        linkNovo.onclick = function(event) {
            self.pacienteController.carregarFormulario(event);
        }

        const linksDelete = document.querySelectorAll(".delete");
        for(let linkDelete of linksDelete)
        {
            const id = linkDelete.parentNode.parentNode.id;
            linkDelete.onclick = function(event){
                self.pacienteController.deletarPaciente(id);
            }
        }

        const linksEdit = document.querySelectorAll(".edit");
        for(let linkEdit of linksEdit)
        {
            const id = linkEdit.parentNode.parentNode.id;
            linkEdit.addEventListener("click",this.pacienteController.carregaFormularioComPaciente.bind(this.pacienteController,id));
        }

        const linksCard = document.querySelectorAll(".cardVacina");
        for(let linkCard of linksCard)
        {
            const id = linkCard.parentNode.parentNode.id;
            linkCard.addEventListener("click",this.pacienteController.carregaCardsPaciente.bind(this.pacienteController,id));
        }

    }

}