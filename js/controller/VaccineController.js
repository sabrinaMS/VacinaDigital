class VaccineController {
    constructor(){
        this.service = new VaccineAPIService();
    }

    loadVaccines() {
        const self = this;

        const success = function(vaccines){

            self.populateVaccinesCards(vaccines);
        }

        const error = function(statusCode) {
            console.log("Error:",statusCode);
        }

        this.service.searchVaccines(success, error);
    }

    // VACCINE CRUD
    
    populateVaccinesCards(vaccines) {
        var vaccine = ""
        
        for (var i in vaccines) {
            vaccine += `
            <div class="col-md-3 themed-grid-col">
                <div class="vaccine-card">
                    <h5><b> ${vaccines[i].name}</b></h5>
                    <p> ${vaccines[i].quantityInStock}</p>
                </div>
            </div>`
        }
        var cardsDiv = document.querySelector("#loadingVaccines");
        cardsDiv.innerHTML = vaccine;
    }

}