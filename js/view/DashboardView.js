class DashboardView{
    constructor(patientCallback, stockCallback, info = null){
        this.patientCallback = patientCallback
        this.stockCallback = stockCallback
        this.info = info
    }
    
    render(){
        const container = $('<div>')
            .addClass('container')
        const title = $('<h3>')
            .text('Bem Vindo')
        
        const cardsRow = this.makeCardsRow()
        
        container.append(title,cardsRow)
        
        $('main').empty().append(container)
        
    }
    
    makeCardsRow(){
        const cardsRow = $('<div>')
            .addClass('row align-items-stretch')
        this.cardsData.forEach(card => {
            const cardContainer = this.makeCard(card)
            cardsRow.append(cardContainer)
            
        })
        return cardsRow;
    }
    
    makeCard(data){
        let cardContainer = $('<div>')
                .addClass('col-12 col-sm-12 col-md-6 col-lg-4 d-flex')

        let cardElement = $('<div>')
            .addClass('card m-3 align-items-stretch w-100')

        let cardBody = $('<div>')
            .addClass('card-body row align-items-center justify-content-center')
        
        let valueContainer = $("<div>")
            .addClass('mx-auto d-flex justify-content-center align-items-center')
            .css({
                'height':'6em',
                'width':'6em',
                'border': `10px solid ${data.borderColor}88`,
                'border-radius': '50%'
            })
        let cardValue = $('<h5>')
            .addClass('card-title m-0')
            .text(data.value)
            
        
        let cardLegend = $('<p>')
            .addClass('card-text text-center mt-3 col-12')
            .text(data.legend) 
        
        let cardLink = $('<a>')
            .addClass('d-block text-center my-2 col-12')
            .attr('href', '#')
            .text(data.actionText)
            .click(data.callback)
        
        valueContainer.append(cardValue)
        cardBody.append(valueContainer, cardLegend, cardLink)
        cardElement.append(cardBody)
        cardContainer.append(cardElement)
        console.log(cardContainer)
        return cardContainer
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
                value: this.info.patients_lastweek,
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
                value: this.info.vaccines_outofstock,
                borderColor: '#dc3545',
                callback: this.stockCallback,
                actionText: 'Ver estoque'
            },
            {
                legend: 'Doses em estoque',
                value: this.info.shots_instock,
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