class VaccineStockView{
    constructor(lotesVacina, addButtonCallback){
        this.lotesVacina = lotesVacina
        this.headers = ["Vacina", "Lote", "Validade", "Quantidade Lote", "Quantidade Vacina"]
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
                .text(this.dateToStr(lot.expDate))
            let lotInStock_td = $('<td>')
                .text(lot.quantity)
            let vaccineInStock_id = $('<td>')
                .text(lot.vaccine.quantityInStock)
            tr.append(vaccine_td, lot_td, expDate_td, lotInStock_td, vaccineInStock_id)
            //SETTING UP EDITING EVENT
            tr.on('dblclick',function(e){
                new VaccineLotRegisterController(lot).loadForm()
            })
            tbody.append(tr)
        })

        table.append(thead, tbody)
        container.append(title,add_button, table)
        $('main').empty().append(container)        
        table.DataTable(this.dataTableOptions) //iniciando o plugin
        this.bootstrapDatatable()
        
    }

    get dataTableOptions(){
        return {  
            pageLength: 50, 
            language: {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "<i class='fas fa-search pr-1'></i>Pesquisar",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                },
                "select": {
                    "rows": {
                        "_": "Selecionado %d linhas",
                        "0": "Nenhuma linha selecionada",
                        "1": "Selecionado 1 linha"
                    }
                }
            }
        }
    }

    bootstrapDatatable(){
        $('.dataTables_filter input').addClass('form-control d-inline w-50')
        $('.dataTables_length select').addClass('form-control d-inline w-25').css('min-width', '5em')
        $('.paginate_button.current').removeClass().addClass('btn btn-light active')
        $('.paginate_button').removeClass().addClass('btn btn-light')

    }

    dateToStr(date){
        return `${date.substring(8,10)}/${date.substring(5,7)}/${date.substring(0,4)}`
    }
}