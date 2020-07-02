class NavBarController{
    constructor(){
        this.paginas = [
            {
                text:"home",
                clickHandler:function(e){
                    
                }
            },
            {
                text:"Cadastrar Paciente",
                clickHandler:this.loadPatientRegistration
            },
            {
                text: "Estoque de Vacinas",
                clickHandler:this.loatVaccineStock
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

}