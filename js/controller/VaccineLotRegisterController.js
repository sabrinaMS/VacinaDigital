class VaccineLotRegisterController{
    constructor(vaccineLot = null){
        this.vaccineService = new VaccineAPIService()
        this.vaccineLotService = new VaccineLotAPIService()
        this.vaccineLot = vaccineLot
    }

}