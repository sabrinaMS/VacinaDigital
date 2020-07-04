// const vaccineCardController =  new VaccineController();
// const patientController = new PatientController();
const pacienteController =  new PacienteController();
const loginController = new LoginController(pacienteController);

var body = document.querySelector("body");
body.onload = function () {
    new NavbarController().loadNavbar()
    // patientController.loadPatients();
    if (localStorage.getItem("token")){
        pacienteController.inicializa();
    } else {
        loginController.loginForm();
    }
    // vaccineCardController.loadVaccines();
}