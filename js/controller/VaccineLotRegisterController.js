class VaccineLotRegisterController{
    constructor(vaccineLot = null){
        this.vaccineService = new VaccineAPIService()
        this.vaccineLotService = new VaccineLotAPIService()
        this.vaccineLot = vaccineLot
    }

    loadForm(){
        const self = this
        const submitCallback = function(event){
            const form = document.querySelector('form')
            const formData = {
                "lotNumber": form.lotNumber.value,
                "expDate": form.expDate.value,
                "quantity": form.quantity.value,
                "vaccine_id": form.vaccine_id.value
            }
            
            if(self.vaccineLot == null){ //CADASTRO
                const formSuccess = function(vaccineLot){
                    new VaccineStockController().loadLots()
                    new ToastView('Vacina cadastrada com sucesso').render()
                }
                const formFail = function(e){
                    $('form').prepend($('<p>').addClass('text-danger p-3 w-100').text(e.message))
                }
                self.vaccineLotService.insertVaccineLot(formData, formSuccess, formFail)
            } else{ //UPDATE
                const formSuccess = function(vaccineLot){
                    new VaccineStockController().loadLots()
                    new ToastView('Vacina atualizada com sucesso').render()
                }
                const formFail = function(e){
                    console.log(e)
                }
                self.vaccineLotService.updateVaccineLot(formData, self.vaccineLot.id, formSuccess, formFail)
            }

            $('.modal').modal('hide')
        }

        const success = function(vaccines) {
            let view = new VaccineLotRegisterView(vaccines, submitCallback, self.vaccineLot)
            view.render()
        }
        
        const error = function(error){
            const errorView = new ErrorView(error)
            errorView.render()
        }
        
        const spinner = new SpinnerView()
        spinner.render()
        this.vaccineService.searchVaccines(success, error)
    }
}