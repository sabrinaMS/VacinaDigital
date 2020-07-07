class NavbarController{
    constructor(){      
        this.view = new NavbarView(this.paginas);
    }
    
    loadNavbar(){
        this.view.paginas = this.paginas
        $('.headerContainer').empty().append(this.view.render());
    }
    
    loadWithoutLinks(){
        this.view.paginas = []
        $('.headerContainer').empty().append(this.view.render());
    }
    
    makeLinkActive(index){
        $('.nav-item').removeClass('active')
        $('.nav-item').eq(index).addClass('active')
    }
    
    get paginas(){
        return [
            {
                text:"Home",
                clickHandler:e => {
                    this.makeLinkActive(0)
                    const controller = new DashboardController()
                    controller.loadDashboard()
                    $('.collapse').collapse('hide')
                }
            },
            {
                text:"Pacientes",
                clickHandler: e =>{
                    this.makeLinkActive(1)
                    if (localStorage.getItem("token")){
                        const controller = new PacienteController()
                        controller.inicializa()
                        $('.collapse').collapse('hide')
                    } else {
                        location.reload();
                    }
                }
            },
            {
                text: "Estoque de Vacinas",
                clickHandler:e =>{
                    this.makeLinkActive(2)
                    const controller = new VaccineStockController()
                    controller.loadLots()
                    $('.collapse').collapse('hide')
                    
                }
            },
            {
                text: "Vacinas",
                clickHandler: e=>{
                    this.makeLinkActive(3);
                    const vaccineController = new VaccineController();
                    vaccineController.loadVaccines();
                    $('.collapse').collapse('hide')
                }
            },
            {
                text: "Logout",
                clickHandler: e=>{
                    this.makeLinkActive(4);
                    localStorage.removeItem("token");
                    location.reload();
                    $('.collapse').collapse('hide')
                }
            }
        ];
    }
    
}