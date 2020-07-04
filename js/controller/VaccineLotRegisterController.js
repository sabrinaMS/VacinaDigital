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

            if(this.vaccineLot == null){ //CADASTRO
                const formSuccess = function(vaccineLot){
                    new VaccineStockController().loadLots()
                }
                const formFail = function(e){
                    console.log(e)
                }
                self.vaccineLotService.insertVaccineLot(formData, formSuccess, formFail)
            } else{ //UPDATE
                const formSuccess = function(vaccineLot){
                    new VaccineStockController().loadLots()
                }
                const formFail = function(e){
                    console.log(e)
                }
                self.vaccineLotService.updateVaccineLot(formData, this.vaccineLot.id, formSuccess, formFail)
            }

            $('.modal').modal('hide').then(() => $('.modal').remove())
        }

        const success = function(vaccines) {
            let view = new VaccineLotRegisterView(vaccines, submitCallback, self.vaccineLot)
            view.render()
        }

        const error = function(error){
            console.log('error', error);
        }

        this.vaccineService.searchVaccines(success, error)
    }
}