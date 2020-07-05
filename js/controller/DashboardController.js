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
            console.log(e)
        }
        this.service.getInfo(success, error)
    }


    verPacientesCallback(e){
        e.preventDefault()
        $('.nav-link')
            .removeClass('active')
            .eq(1).addClass('active')
        
        const controller = new PacienteController()
        controller.inicializa()
    }

    verEstoqueCallback(e){
        e.preventDefault()
        $('.nav-link')
            .removeClass('active')
            .eq(1).addClass('active')
        
        const controller = new VaccineStockController()
        controller.inicializa()
    }
}