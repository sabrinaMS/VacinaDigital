class VaccineStockController{
    constructor(){
        this.service = new VaccineLotAPIService() 
        this.vaccineService = new VaccineAPIService() 
        this.stockView = new VaccineStockView(this.addLotCallback.bind(this), this.editLot.bind(this), this.deleteLot.bind(this))
        this.formView = new VaccineLotRegisterView(this.submitLot.bind(this))
    }

    loadLots(){
        self = this
        const success = function(lots){
            self.stockView.lotesVacina = lots
            self.populateTable(lots)
        }
        const error = function(error){
            const controller = new ErrorController(error)
            controller.showError()
        }

        const spinner = new SpinnerView()
        spinner.render()
        this.service.searchVaccineLots(success, error)
    }

    populateTable(lots){
        this.stockView.vaccineLots = lots
        this.stockView.render()
    }

    addLotCallback(e){
        this.formView.vaccineLot = null
        this.loadForm()
    }

    loadForm(){
        const self = this

        const success = function(vaccines) {
            self.formView.vaccines = vaccines
            self.formView.render()
        }
        
        const error = function(error){
            const errorView = new ErrorView(error.status, error.message)
            errorView.render()
        }
        
        const spinner = new SpinnerView()
        spinner.render()
        self.vaccineService.searchVaccines(success, error)
    }

    submitLot(e){
        const formData = this.formView.formData
        
        if(this.formView.vaccineLot == null){ //CADASTRO
            this.postLot(formData)
        } else{ //UPDATE
            this.putLot(formData)
        }

        $('.modal').modal('hide')
    }

    putLot(formData){
        const formSuccess = function(vaccineLot){
            new VaccineStockController().loadLots()
            new ToastView('Vacina atualizada com sucesso').render()
        }
        const formFail = function(e){
            console.log(e)
        }
        this.service.updateVaccineLot(formData, formData.id, formSuccess, formFail)
    }

    postLot(formData){
        const formSuccess = function(vaccineLot){
            this.loadLots()
            new ToastView('Vacina cadastrada com sucesso').render()
        }
        const formFail = function(e){
            this.formView.showFormError(e)
        }

        this.service.insertVaccineLot(formData, formSuccess.bind(this), formFail.bind(this))
    }

    editLot(lot){
        this.formView.vaccineLot = lot
        this.loadForm()
    }

    deleteLot(lot){
        this.formView.vaccineLot = lot
        new ModalConfirmView('Confirme', 'Deseja confirmar a exclusão do lote?', this.deleteRequest.bind(this), 'Excluir').modal.modal()
    }

    deleteRequest(){
        const lot = this.formView.vaccineLot
        const success = resp =>{
            this.loadLots()
        }
        const error = error =>{
            const errorController = new ErrorController(error);
            errorController.showError()
        }

        this.service.deleteVaccineLot(lot.id, success, error)
        $('.modal').modal('hide')
        new ToastView("Lote excluído com sucesso").render()
    }
}
