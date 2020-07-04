// const vaccineCardController =  new VaccineController();
// const patientController = new PatientController();
const pacienteController =  new PacienteController();

var body = document.querySelector("body");
body.onload = function () {
    new NavbarController().loadNavbar()
    // patientController.loadPatients();
    pacienteController.inicializa();
    // vaccineCardController.loadVaccines();
}