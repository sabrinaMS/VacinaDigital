class DashboardController{
    constructor(){
        this.service = new DashboardAPIService()
        this.view = new DashboardView(this.verEstoqueCallback, this.verPacientesCallback, this.verVacinasCallback)
        this.spinnerView = new SpinnerView()
    }
    loadDashboard(){
        const self = this
        const success = function(info){
            self.view.info = info;
            self.view.render()
        }
        const error = function(e){
            const eController = new ErrorController(e.status, e.message)
            eController.render()
        }

        this.spinnerView.render()
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

    verVacinasCallback(e){
        e.preventDefault()
        $('.nav-item')
            .removeClass('active')
            .eq(3).addClass('active')
        
        const controller = new VaccineController()
        controller.loadVaccines()
    }
}