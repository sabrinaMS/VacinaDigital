// const vaccineCardController =  new VaccineController();
// const patientController = new PatientController();
const pacienteController =  new PacienteController();
const dashboardController = new DashboardController()
const loginController = new LoginController(pacienteController);
const navbarController = new NavbarController()

var body = document.querySelector("body");
body.onload = function () {
    // patientController.loadPatients();
    if (localStorage.getItem("token")){
        navbarController.loadNavbar()
        dashboardController.loadDashboard();
        navbarController.makeLinkActive(0)
    } else {
        navbarController.loadWithoutLinks()
        loginController.loginForm();
    }
    // vaccineCardController.loadVaccines();
}