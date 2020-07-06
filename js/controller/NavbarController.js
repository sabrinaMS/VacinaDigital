class NavbarController{
    constructor(){      
        this.view = new NavbarView(this.paginas);
    }
    
    loadNavbar(){
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
                text:"Cadastrar Paciente",
                clickHandler: e =>{
                    this.makeLinkActive(1)
                    const controller = new PacienteController()
                    controller.inicializa()
                    $('.collapse').collapse('hide')
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
            }
        ];
    }
    
}