// NOT BEING USED!!!

class PatientController {
    constructor(){
        this.service = new PatientAPIService();
    }

    loadPatients() {
        const self = this;

        const success = function(patients){

            self.populatePatients(patients);
        }

        const error = function(statusCode) {
            console.log("Error:",statusCode);
        }

        this.service.searchPatients(success, error);
    }

    loadPatientsById(id) {
        const self = this;

        const success = function(patient){

            self.populatePatients(patient);
        }

        const error = function(statusCode) {
            console.log("Error:",statusCode);
        }

        this.service.searchPatientById(id, success, error);
    }

    insertPatient(event) {
        event.preventDefault();
        var patient = new Patient();
        patient.name = document.querySelector("#txtname").value;
        patient.birthDate = document.querySelector("#txtbirthdate").value;
        patient.phoneNumber = document.querySelector("#txtphone").value;
        patient.email = document.querySelector("#txtemail").value;
        patient.password = document.querySelector("#txtpassword").value;
        console.log("Patient", patient);

        const self = this;

        const success = function(patientCreated) {
            // AJUSTAR
        }

        const error = function(statusCode) {
            console.log("Erro:",statusCode);
        }
                
        this.service.insertPatient(patient, success, error);    
    }

    updatePatient(event) {
        event.preventDefault();
        var patient = new Patient();
        //id hidden
        patient.id = document.querySelector("#txtid").value;
        patient.name = document.querySelector("#txtname").value;
        patient.birthDate = document.querySelector("#txtbirthdate").value;
        patient.phoneNumber = document.querySelector("#txtphone").value;
        patient.email = document.querySelector("#txtemail").value;
        patient.password = document.querySelector("#txtpassword").value;
        console.log("Patient", patient);

        const self = this;

        const success = function(patientCreated) {
            // AJUSTAR
        }

        const error = function(statusCode) {
            console.log("Erro:",statusCode);
        }
                
        this.service.updatePatient(patient, success, error);    
    }

    deletePatient(event){
        const self = this;

        const success = function(){
            console.log("Paciente deletado com sucesso")
        }

        const error = function(statusCode) {
            console.log("Error:",statusCode);
        }
        // PEGAR ID
        this.service.deletePatient(id, success, error);
    }
    
    populatePatients(patients) {

        const self = this

        var patient = `
            <div class = "row"
            <div class="col-sm-6">`

        for (var i in patients) {
            patient += `

            
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">${patients[i].name}</h4>
                        <h5 class="card-subtitle mb-2 text-muted">${patients[i].birthDate}</h5>
                        <p > ${patients[i].phoneNumber} </p>
                        <p class="card-text">${patients[i].email}</p>
                        <a href="#" class="btn btn-primary edit" id = "${patients[i].id}">Editar</a>
                    <a href="#" class=" btn btn-primary detail" id = "${patients[i].id}">Cartão de Vacinas</a>
                    </div>
                </div>
            </div>
            `
        }

        patient += `</div> </div>`

        var cardsDiv = document.querySelector("main");
        cardsDiv.innerHTML = patient;


        //const self = this;
        const linkNovo = document.querySelector("#new");
        linkNovo.onclick = function(event) {
            self.produtoController.carregarFormulario(event);
        }

        const linksDelete = document.querySelectorAll(".delete");
        for(let linkDelete of linksDelete)
        {
            const id = linkDelete.parentNode.parentNode.id;
            linkDelete.onclick = function(event){
                self.produtoController.deletarProduto(id);
            }
        }

        // const loadPatientVaccines = function(patient){
        //     var card = `
        //     <div>`

        //     const te = [patient.vaccineShots]

        //     for (var i in te) {
        //         console.log(te[1].date)
        //         console.log("aaa")
        //         card += `
        //         <div class="row mb-3">
        //             <div class="col-md-3 themed-grid-col">
        //                 <div class="vaccine-card">
        //                     <h5><b>${te[i].lot}</b></h5>
        //                     <p>${te[i].date}</p>
        //                 </div>
        //             </div>
        //         </div>`
        //     }

        //     card += `</div>`

        //     var cardsDiv = document.querySelector("main");
        //     cardsDiv.innerHTML = [card];
        // }

        const loadPatientForm = function(patient) {
            var patient = `            
            <div class="form-group">
            <h5>Editar Dados de Paciente</h5>
            <!-- NOME -->
            <div class="form-group">
                <label for="example-text-input">Nome Completo</label>
                <input class="form-control" type="text" placeholder="Nome" id="example-text-input" value = "${patient.name}">
              </div>
            
            <!-- ANIVERSARIO -->
            <div class="form-group">
                <label for="example-date-input">Data de Nascimento</label>
                <input class="form-control" type="date" id="example-date-input">
            </div>
        
            <!-- TELEFONE -->
            <div class="form-group ">
                <label for="example-tel-input">Telefone</label>
                <input class="form-control" type="tel" placeholder="(51) 9999-9999" id="example-tel-input" value = "${patient.phoneNumber}">
            </div>
        
            <!-- EMAIL -->
            <div class="form-group">
                <label for="exampleInputEmail1">E-mail</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail do Paciente" value = "${patient.email}">
            </div>
        
            <button type="button" class="btn btn-dark">Salvar</button>
        </div>`

            var cardsDiv = document.querySelector("main");
            cardsDiv.innerHTML = patient;
        }

        const linksEdit = document.querySelectorAll(".edit");
        const linksDetail = document.querySelectorAll(".detail");

        for(let linkEdit of linksEdit) {
            const id = linkEdit.id;

            const error = function(statusCode) {
                console.log("Error:",statusCode);
            }

            linkEdit.onclick = function(event){
                self.service.searchPatientById(id, loadPatientForm, error);
            }
        }

        for(let linkDetail of linksDetail) {
            const id = linkDetail.id;

            const error = function(statusCode) {
                console.log("Error:",statusCode);
            }

            linkDetail.onclick = function(event){
                self.service.searchPatientById(id, loadPatientVaccines, error);
            }
        }
    }    
}