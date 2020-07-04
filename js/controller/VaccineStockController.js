class VaccineStockController{
    constructor(){
        this.service = new VaccineLotAPIService()
    }

    loadLots(){
        self = this
        const success = function(lots){
            self.populateTable(lots)
        }
        const error = function(error){
            console.log("error:",error)
        }

        this.service.searchVaccineLots(success, error)
    }

    populateTable(lots){
        const registerButtonCallback = function(e){
            const registerController = new VaccineLotRegisterController()
            registerController.loadForm()
        }
        const view = new VaccineStockView(lots, registerButtonCallback)
        view.render()
    }
}