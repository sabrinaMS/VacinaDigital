class NavbarController{
    constructor(){
        this.paginas = [
            {
                text:"home",
                clickHandler:e => {
                    this.makeLinkActive(0)
                    const controller = new DashboardController()
                    controller.loadDashboard()
                }
            },
            {
                text:"Cadastrar Paciente",
                clickHandler: e =>{
                    this.makeLinkActive(1)
                    const controller = new PacienteController()
                    controller.inicializa()
                }
            },
            {
                text: "Estoque de Vacinas",
                clickHandler:e =>{
                    this.makeLinkActive(2)
                    const controller = new VaccineStockController()
                    controller.loadLots()
                
                }
            },
            {
                text: "Cuidados Vacinas",
                clickHandler: this.loadVaccineReccomendantions
            }
        ];

        this.view = new NavbarView(this.paginas);
    }
    
    loadNavbar(){
        $('.headerContainer').empty().append(this.view.render());
    }

    makeLinkActive(index){
        $('.nav-item').removeClass('active')
        $('.nav-item').eq(index).addClass('active')
    }

}