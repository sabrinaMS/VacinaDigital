class TabelaPacientes {
    constructor(controller, seletor) {
        this.pacienteController = controller;
        this.seletor = seletor;
    }

    montarTabela(pacientes) {
        var str = `
        <h2>Tabela de Pacientes</h2>
        <button type="button" id="novo" class="btn btn-info my-3">Adicionar Paciente</button>
        <div class = "table-container">
        <table class = "table" id="tabela-pacientes">
            <thead class="thead-dark">
            <tr>
                <th scope="col">Nome do Paciente</th>
                <th scope="col">E-mail</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>

            </thead>`;
        // <td>${pacientes[i].vaccineShots.lenght > 0 ? '<button type="button" class="btn btn-info cardVacina">Cartão de Vacina</button>' : 'Paciente sem Vacinas'} </td>

        // console.log("CARTA", pacientes)
        for (var i in pacientes) {
            str += `
            <tr id=${pacientes[i].id}>
                    <td>${pacientes[i].name}</td>
                    <td>${pacientes[i].email}</td>
                    <td><button type="button" class="btn btn-light edit">Editar</button></td>
                    <td><button type="button" class="btn btn-info cardVacina">Cartão de Vacina</button></td>
                    <td><button type="button" class="btn btn btn-light" data-toggle="modal" data-target="#exampleModal${pacientes[i].id}">Excluir</button></td>   
                </tr>

                <div class="modal fade" id="exampleModal${pacientes[i].id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ver o que colocar</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Voce deseja deletar esse usuário?</p>
                    </div>
                    <div class="modal-footer" id = "${pacientes[i].id}">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary delete" data-dismiss="modal">Confirmar</button>
                    </div>
                    </div>
                </div>
            </div>`;
        }
        str += `
        </table></div>`;

        var tabela = document.querySelector(this.seletor);
        tabela.innerHTML = str;

        const self = this;


        const linkNovo = document.querySelector("#novo");
        linkNovo.onclick = function (event) {
            self.pacienteController.carregarFormulario(event);
        }

        const linksDelete = document.querySelectorAll(".delete");
        for (let linkDelete of linksDelete) {
            const id = linkDelete.parentNode.id;
            linkDelete.onclick = function (event) {
                self.pacienteController.deletarPaciente(id);
            }
        }

        const linksEdit = document.querySelectorAll(".edit");
        for (let linkEdit of linksEdit) {
            const id = linkEdit.parentNode.parentNode.id;
            linkEdit.addEventListener("click", this.pacienteController.carregaFormularioComPaciente.bind(this.pacienteController, id));
        }

        const linksCard = document.querySelectorAll(".cardVacina");
        for (let linkCard of linksCard) {
            const id = linkCard.parentNode.parentNode.id;
            linkCard.addEventListener("click", this.pacienteController.carregaCardsPaciente.bind(this.pacienteController, id));
        }

    }

}