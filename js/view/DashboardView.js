class DashboardView{
    constructor(info, patientCallback, stockCallback){
        this.info = info
        this.patientCallback = patientCallback
        this.stockCallback = stockCallback
    }

    render(){
        const container = $('<div>')
            .addClass('container')
        const title = $('<h3>')
            .text('Bem Vindo')
        const cardsRow = $('<div>')
            .addClass('row')
        this.cardsData.forEach(card => {
            let cardContainer = $('<div>')
                .addClass('col-12 col-sm-12 col-md-6 col-lg-4')
            let cardElement = $('<div>')
                .addClass('card m-3')
            let cardBody = $('<div>')
                .addClass('card-body')
                
            let valueContainer = $("<div>")
                .addClass('mx-auto d-flex justify-content-center align-items-center')
                .css({
                    'height':'6em',
                    'width':'6em',
                    'border': `10px solid ${card.borderColor}88`,
                    'border-radius': '50%'
                })
            let cardValue = $('<h5>')
            .addClass('card-title m-0')
            .text(card.value)

            
            let cardLegend = $('<p>')
            .addClass('card-text text-center mt-3')
            .text(card.legend) 

            let cardLink = $('<a>')
                .addClass('d-block text-center my-2')
                .attr('href', '#')
                .text(card.actionText)
                .click(card.callback)

            valueContainer.append(cardValue)
            cardBody.append(valueContainer, cardLegend, cardLink)
            cardElement.append(cardBody)
            cardContainer.append(cardElement)
            cardsRow.append(cardContainer)
        })
        container.append(title,cardsRow)

        $('main').empty().append(container)

    }




    get cardsData(){
        return [
            {
                legend: 'Pacientes cadastrados',
                value: this.info.patients_total,
                borderColor: '#28a745',
                callback: this.patientCallback,
                actionText: 'Ver pacientes'
            },
            {
                legend:'Vacinados na última semana',
                value: this.info.patients_lastWeek,
                borderColor: '#007bff',
                callback: this.patientCallback,
                actionText: 'Ver pacientes'
            },
            {
                legend: 'Média de vacinas por paciente',
                value: this.info.patients_avg,
                borderColor: '#ffc107',
                callback: this.patientCallback,
                actionText: 'Ver pacientes'
            },
            {
                legend: 'Vacinas esgotadas',
                value: this.info.vaccines_outOfStock,
                borderColor: '#dc3545',
                callback: this.stockCallback,
                actionText: 'Ver estoque'
            },
            {
                legend: 'Doses em estoque',
                value: this.info.shots_inStock,
                borderColor: '#17a2b8',
                callback: this.stockCallback,
                actionText: 'Ver estoque'
            },
            {
                legend: 'Com data de validade expirada',
                value: this.info.shots_expired,
                borderColor: '#343a40',
                callback: this.stockCallback,
                actionText: 'Ver estoque'
            }
        ]
    }
}