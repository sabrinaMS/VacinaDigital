class VaccineStockView{
    constructor(addButtonCallback, editLotCallback, deleteLotCallback, lotesVacina = []){
        this.addButtonCallback = addButtonCallback
        this.editLotCallback = editLotCallback
        this.deleteLotCallback = deleteLotCallback
        this.lotesVacina = lotesVacina
        this.headers = ["Vacina", "Lote", "Validade", "Quantidade Lote", "Quantidade Vacina", "", ""]
    }

    render(){
        const container = $('<section>')
        const title = $('<h3>')
            .text('Estoque')
        
        const add_button = $('<button>')
            .text('Cadastrar Lote')
            .addClass('btn btn-info my-3')
            .click(this.addButtonCallback)
        
        const table = this.makeTable()
        
        container.append(title,add_button, table)
        $('main').empty().append(container) 
               
        $('table').DataTable(this.dataTableOptions) //iniciando o plugin
        this.bootstrapDatatable()
        
    }

    makeTable(){
        const tableContainer = $('<div>').addClass('table-container')
        const table = $('<table>')
            .addClass('table')
            .attr('id', 'tabela-lotes')
        
        const thead = this.makeThead()
        const tbody = this.makeTbody()
        
        table.append(thead, tbody)
        tableContainer.append(table)
        return tableContainer
    }

    makeTbody(){
        const tbody = $('<tbody>')
        this.lotesVacina.forEach(lot => {
            const tr = this.makeTr(lot)
            tbody.append(tr)
        })
        return tbody
    }

    makeThead(){
        const thead = $('<thead>')
            .addClass('thead-dark')
        const theadRow = $('<tr>')
        this.headers.forEach(header => {
            const th = $('<th>')
                .addClass('text-center')
                .text(header)
            if (header == ""){
                th.attr('data-orderable', 'false')
            }

            theadRow.append(th)            
        })
        thead.append(theadRow)
        return thead
    }

    makeTr(lot){
        const tr = $('<tr>')
        const vaccine_td = $('<td>')
            .text(lot.vaccine.name)
        const lot_td = $('<td>')
            .text(lot.lotNumber)
            .addClass('text-center')
        const expDate_td = $('<td>')
            .text(this.dateToStr(lot.expDate))
            .addClass('text-center')
        const lotInStock_td = $('<td>')
            .text(lot.quantity)
            .addClass('text-center')
        const vaccineInStock_td = $('<td>')
            .text(lot.vaccine.quantityInStock)
            .addClass('text-center')
        const edit_td = this.makeEditTd(lot)
        const delete_td = this.makeDeleteTd(lot)

        tr.append(vaccine_td, lot_td, expDate_td, lotInStock_td, vaccineInStock_td, edit_td, delete_td)
        
        return tr
    }

    makeEditTd(lot){
        const editTd = $('<td>')
            .addClass('text-center')

        const editButton = $('<button>')
            .addClass('btn btn-info mx-2')
            .click(e=>{this.editLotCallback(lot)})

        const editIcon = $('<i>')
            .addClass('fas fa-edit')
        editButton.append(editIcon) 
        editTd.append(editButton)
        return editTd
    }

    makeDeleteTd(lot){
        const deleteTd = $('<td>')
            .addClass('text-center')
        const deleteButton = $('<button>')
            .addClass('btn btn-light mx-2')
            .click(e=>{this.deleteLotCallback(lot)})
        const deleteIcon = $('<i>')
            .addClass('fas fa-trash-alt')
        
        deleteButton.append(deleteIcon)
        deleteTd.append(deleteButton)       
        return deleteTd
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