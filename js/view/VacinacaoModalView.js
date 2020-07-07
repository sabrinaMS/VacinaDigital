class VacinacaoModalView{
    constructor(vacinacao, paciente){
        this.vacinacao = vacinacao
        this.paciente = paciente
        this.title = "Detalhes da Vacinação"
    }
    render(){
        const modal = $('<div>')
            .addClass('modal fade bd-example-modal-lg')
            .attr({
                'tabindex':'-1',
                'role':'dialog',
                'aria-labelledby':'myLargeModalLabel',
                'aria-hidden': 'true'
            })

        const modalDialog = $('<div>')
            .addClass('modal-dialog modal-lg')
        
        const modalContent = $('<div>')
            .addClass('modal-content')

        const modalHeader = this.makeModalHeader()
        const modalBody = this.makeModalBody()
        const modalFooter = this.makemodalFooter()

        
        modalContent.append(modalHeader, modalBody, modalFooter)
        modalDialog.append(modalContent)
        modal.append(modalDialog)

        $('.modal').remove()
        $('body').append(modal)
        modal.modal('show')
    }

    makeVacinacaoDl(){
        console.log(this.vacinacao)
        const dl = $('<dl>')

        const vaccineDt = $('<dt>')
            .text('Vacina:')
        const vaccineDd = $('<dd>')
            .text(this.vacinacao.lot.vaccine.name)
        
        const lotDt = $('<dt>')
            .text('Lote:')
        const lotDd = $('<dd>')
            .text(this.vacinacao.lot.lotNumber)

        const nurseDt = $('<dt>')
            .text('Aplicada por:')
        const nurseDd = $('<dd>')
            .text(this.vacinacao.nurse.name)

        const dataDt = $('<dt>')
            .text('Data de Aplicação:')
        const dataDd = $('<dd>')
            .text(this.vacinacao.date)

        const pacienteDt = $('<dt>')
            .text('Paciente:')
        const pacienteDd = $('<dd>')
            .text(this.paciente.name)

        dl.append(vaccineDt, vaccineDd, lotDt, lotDd, nurseDt, nurseDd, dataDt, dataDd, pacienteDt, pacienteDd)
        return dl
    }

    makeModalHeader(){
        const header = $('<div>')
            .addClass('modal-header')
        
        const title = $('<h5>')
            .addClass('modal-title')
            .attr({'id': 'modaltitulo'})
            .text(this.title)
            
        const closeButton = $('<button>')
            .addClass('close')
            .attr({'type': 'button', 'data-dismiss':'modal', 'aria-label':'Close'})
            .append(
                $('<span>')
                    .attr('aria-hidden', true)
                    .html('&times;')
            )
        header.append(title, closeButton)
        return header;
    }

    makeModalBody(){
        const modalBody = $('<div>')
            .addClass('modal-body')
            .text(this.text)
        const vaccinationInfo = this.makeVacinacaoDl()
        modalBody.append(vaccinationInfo)
        return modalBody
    }

    makemodalFooter(){
        const modalFooter = $('<div>')
            .addClass('modal-footer')

        const dismissButton = $('<button>')
                    .addClass('btn btn-secondary')
                    .attr({'type':'button', 'data-dismiss':'modal'})
                    .text('Cancelar')

        modalFooter.append(dismissButton)
        return modalFooter
    } 
}