class DashboardController{
    constructor(){
        this.service = new DashboardAPIService()
    }
    loadDashboard(){
        const self = this
        const success = function(info){
            const view = new DashboardView(info, self.verPacientesCallback, self.verEstoqueCallback)
            view.render()
        }
        const error = function(e){
            const eController = new ErrorController(e)
            eController.showError()
        }

        const spinner = new SpinnerView()
        spinner.render()
        this.service.getInfo(success, error)
    }


    verPacientesCallback(e){
        e.preventDefault()
        $('.nav-item')
            .removeClass('active')
            .eq(1).addClass('active')
        
        const controller = new PacienteController()
        controller.inicializa()
    }

    verEstoqueCallback(e){
        e.preventDefault()
        $('.nav-item')
            .removeClass('active')
            .eq(2).addClass('active')
        
        const controller = new VaccineStockController()
        controller.loadLots()
    }
}