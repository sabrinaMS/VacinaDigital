const vaccineCardController =  new VaccineController();
const patientController = new PatientController();


var body = document.querySelector("body");
body.onload = function () {
    new NavBarController().loadNavbar()
    patientController.loadPatients();
    vaccineCardController.loadVaccines();
}