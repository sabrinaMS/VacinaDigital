// NOT BEING USED

class VaccineController {
    constructor(){
        this.service = new VaccineAPIService();
        this.vaccineView = new VaccineView();
        this.vaccineFormView = new VaccineFormView();
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
        this.vaccineView.addButtonCallback = this.openForm.bind(this);
        this.vaccineView.render(vaccines);
    }

    openForm(){
        this.vaccineFormView.submitCallback = this.vaccinePostRequest.bind(this)
        this.vaccineFormView.render()
    }

    vaccinePostRequest(e){
        e.preventDefault()
        const data = this.vaccineFormView.formVaules

        const success = data => {
            const toast = new ToastView('Vacina cadastrada com sucesso!');
            toast.render()
            this.loadVaccines()
        }

        const fail = error =>{
            const errorView = new ErrorView(error.status, error.message)
            errorView.render()
        }

        this.spinnerView.render();
        this.service.insertVaccine(data, success, fail);

    }

}