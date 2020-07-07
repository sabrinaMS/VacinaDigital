class VacinacaoModalView{
    constructor(vacinacao, paciente){
        this.vacinacao = vacinacao
        this.paciente = paciente
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
            .addClass('modal-content p-5')

        //     <div class="modal-header">
        //     <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        //     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //       <span aria-hidden="true">&times;</span>
        //     </button>
        //   </div>

        const vacinacaoDl = this.makeVacinacaoDl()
        
        modalContent.append(vacinacaoDl)
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
    
}