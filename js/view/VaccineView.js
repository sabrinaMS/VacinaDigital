class VaccineView{
    constructor(addButtonCallback, editButtonCallback, deleteButtonCallback, vaccines = []){
        this.title = "Vacinas"
        this.addButtonCallback = addButtonCallback
        this.editButtonCallback = editButtonCallback
        this.deleteButtonCallback = deleteButtonCallback
        this.vaccines = vaccines
    }
    render(){
        const container = this.makeContainer()
        $('main').empty().append(container)
        $('table').DataTable(this.dataTableOptions)
        this.bootstrapDatatable()
    }

    makeTable(){
        const table = $('<table>')
            .addClass('table')
        const thead = this.makeThead(['Nome', 'Quantidade', '', ''])
        const tbody = this.makeTbody()
        table.append(thead, tbody)
    
        return table
    }

    makeThead(headers){
        const thead = $('<thead>')
            .addClass('thead-dark');
        const row = $('<tr>');
        headers.forEach(header => {
            const th = $('<th>')
                .addClass('text-center')
                .text(header);

            if (header == ''){
                th.attr('data-orderable', 'false')
            }
            row.append(th);
        });
        thead.append(row);
        return thead
    }

    makeTbody(){
        const tBody = $('<tbody>');
        this.vaccines.forEach(vaccine =>{
            const tr = $('<tr>');
            const nameTd = $('<td>')
                .text(vaccine.name);
            const quantityTd = $('<td>')
                .addClass('text-center')
                .text(vaccine.quantityInStock);
            const editTd = this.makeEditTd(vaccine);
            const deleteTd = this.makeDeleteTd(vaccine);
            tr.append(nameTd, quantityTd, editTd, deleteTd);
            tBody.append(tr);
        })
        return tBody
    }

    makeContainer(){
        const container = $('<div>');
        const headerRow = $('<div>')
            .addClass('d-flex justify-content-between mb-5');

        const title = $('<h3>')
            .addClass('')
            .text(this.title)
        
        const addVaccineButton = $('<button>')
            .addClass('btn btn-info')
            .text('Adicionar Vacina')
            .click(this.addButtonCallback)
        
        headerRow.append(title, addVaccineButton)

        const vaccinesTable = this.makeTable();
        

        container.append(headerRow, vaccinesTable)
        return container
    }

    makeEditTd(vaccine){
        const editTd = $('<td>')
            .addClass('text-center')

        const editButton = $('<button>')
            .addClass('btn btn-info mx-2')
            .click(e=>{this.editButtonCallback(vaccine)})

        const editIcon = $('<i>')
            .addClass('fas fa-edit')
        editButton.append(editIcon) 
        editTd.append(editButton)
        return editTd
    }

    makeDeleteTd(vaccine){
        const deleteTd = $('<td>')
            .addClass('text-center')
        const deleteButton = $('<button>')
            .addClass('btn btn-light mx-2')
            .click(e=>{this.deleteButtonCallback(vaccine)})
        const deleteIcon = $('<i>')
            .addClass('fas fa-trash-alt')
        
        deleteButton.append(deleteIcon)
        deleteTd.append(deleteButton)       
        return deleteTd
    }

    get dataTableOptions(){
        return {  
            order: [1, 'desc'],
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

}