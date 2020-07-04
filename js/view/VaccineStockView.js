class VaccineStockView{
    constructor(lotesVacina, addButtonCallback){
        this.lotesVacina = lotesVacina
        this.headers = ["Vacina", "Lote", "Validade", "Quantidade Lote", "Quantidade Total"]
        this.addButtonCallback = addButtonCallback
    }

    render(){
        const container = $('<section>')
            .addClass('container')
        const title = $('<h3>')
            .text('Estoque')
        
        const add_button = $('<button>')
            .text('Cadastrar Lote')
            .addClass('btn btn-info my-3')
            .click(this.addButtonCallback)
        
        let table = $('<table>')
            .addClass('table')
        let thead = $('<thead>')
            .addClass('thead-dark')
        let theadRow = $('<tr>')
        this.headers.forEach(header => {
            let th = $('<th>')
                .text(header)
            theadRow.append(th)            
        })
        thead.append(theadRow)

        let tbody = $('<tbody>')
        this.lotesVacina.forEach(lot => {
            let tr = $('<tr>')
            let vaccine_td = $('<td>')
                .text(lot.vaccine.name)
            let lot_td = $('<td>')
                .text(lot.lotNumber)
            let expDate_td = $('<td>')
                .text(lot.expDate)
            let lotInStock_td = $('<td>')
                .text(lot.quantity)
            let vaccineInStock_id = $('<td>')
                .text(lot.vaccine.quantityInStock)
            tr.append(vaccine_td, lot_td, expDate_td, lotInStock_td, vaccineInStock_id)
            tr.click(function(e){
                new VaccineLotRegisterController(lot).loadForm()
            })
            tbody.append(tr)
        })

        table.append(thead, tbody)
        container.append(title,add_button, table)
        $('main').empty().append(container)        
        table.DataTable() //iniciando o plugin
        
    }
}