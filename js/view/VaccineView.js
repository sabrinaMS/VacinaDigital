class VaccineView{
    constructor(){
        this.title = "Vacinas"
        this.addButtonCallback = null
    }
    render(vaccines){
        this.vaccinesInStock = vaccines.filter(vaccines => vaccines.quantityInStock > 0);
        this.vaccinesOutOfStock = vaccines.filter(vaccines => vaccines.quantityInStock == 0);
        console.log(this.vaccinesInStock)
        const container = this.makeContainer()
        $('main').empty().append(container)
    }

    makeTable(vaccines){
        const table = $('<table>')
            .addClass('table')
        const thead = this.makeThead(['Nome', 'Quantidade'])
        const tbody = this.makeTbody(vaccines)
        table.append(thead, tbody)
        return table
    }

    makeThead(headers){
        const thead = $('<thead>')
            .addClass('thead-dark');
        const row = $('<tr>');
        headers.forEach(header => {
            let th = $('<th>')
                .text(header);
            row.append(th);
        });
        thead.append(row);
        return thead
    }

    makeTbody(vaccines){
        const tBody = $('<tbody>');
        vaccines.forEach(vaccine =>{
            const tr = $('<tr>');
            const nameTd = $('<td>')
                .text(vaccine.name);
            const quantityTd = $('<td>')
                .addClass('text-center')
                .text(vaccine.quantityInStock);
            
            tr.append(nameTd, quantityTd);
            tBody.append(tr);
        })
        return tBody
    }

    makeTableColumn(table, title){
        const tableCol = $('<div>')
            .addClass('col-12 col-sm-12 col-lg-6');
        const columnTitle = $('<h5>')
            .text(title);
        tableCol.append(columnTitle, table)
        return tableCol
    }

    makeContainer(){
        const container = $('<div>');
        const headerRow = $('<div>')
            .addClass('d-flex justify-content-between');

        const title = $('<h3>')
            .addClass('')
            .text(this.title)
        
        const addVaccineButton = $('<button>')
            .addClass('btn btn-info')
            .text('Adicionar Vacina')
            .click(this.addButtonCallback)
        
        headerRow.append(title, addVaccineButton)
        
        const tablesRow = $('<div>')
            .addClass('row mt-5');

        const inStockTable = this.makeTable(this.vaccinesInStock);
        const outOfStockTable = this.makeTable(this.vaccinesOutOfStock);
        
        const inStockColumn = this.makeTableColumn(inStockTable, "Vacinas Disponíveis")
        const outOfStockColumn = this.makeTableColumn(outOfStockTable, "Vacinas Indisponíveis")

        tablesRow.append(inStockColumn, outOfStockColumn)
        container.append(headerRow, tablesRow)
        return container
    }
}