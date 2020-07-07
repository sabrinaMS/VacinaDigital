// NOT BEING USED

class VaccineController {
    constructor(){
        this.service = new VaccineAPIService();
        this.vaccineView = new VaccineView(this.addButtonCallback.bind(this), this.editButtonCallback.bind(this), this.deleteButtonCallback.bind(this));
        this.vaccineFormView = new VaccineFormView(this.formSubmitCallback.bind(this));
        this.spinnerView = new SpinnerView();
    }

    loadVaccines() {
        const self = this;

        const success = function(vaccines){
            self.showVaccines(vaccines);
        }

        const error = function(e) {
            const errorView = new ErrorView();
            errorView.render();
        }

        this.spinnerView.render();
        this.service.searchVaccines(success, error);
    }

    // VACCINE CRUD
    
    showVaccines(vaccines) {
        this.vaccineView.vaccines = vaccines
        this.vaccineView.render();
    }

    openForm(){
        this.vaccineFormView.render()
    }

    formSubmitCallback(e){
        e.preventDefault()
        const data = this.vaccineFormView.formVaules

        const success = data => {
            const toast = new ToastView(this.vaccineFormView.vaccine == null? 'Vacina cadastrada com sucesso!':'Vacina atualizada com sucesso!');
            toast.render()
            this.loadVaccines()
        }

        const fail = error =>{
            const errorView = new ErrorView(error.status, error.message)
            errorView.render()
        }

        this.spinnerView.render();
        if(this.vaccineFormView.vaccine == null){
            this.service.insertVaccine(data, success, fail);
        }else{
            this.service.updateVaccine(data, success, fail)
        }

    }

    addButtonCallback(e){
        this.openForm()
    }

    editButtonCallback(vaccine){
        console.log(vaccine)
        this.vaccineFormView.vaccine = vaccine
        this.openForm()
    }

    deleteButtonCallback(vaccine){
        this.vaccineFormView.vaccine = vaccine
        new ModalConfirmView('Confirme', 'Deseja confirmar a exclusão do lote?', this.deleteRequest.bind(this), 'excluir').modal.modal()
    }


    deleteRequest(){
        const vaccine = this.vaccineFormView.vaccine
        const success = resp =>{
            this.loadVaccines()
        }
        const error = error =>{
            const errorController = new ErrorController(error);
            errorController.showError()
        }

        this.service.deleteVaccine(vaccine.id, success, error)
        $('.modal').modal('hide')
        new ToastView("Vacina excluída com sucesso").render()
    }
    

}