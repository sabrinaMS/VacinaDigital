class VaccineLotRegisterView{
    constructor(vaccines, formCallback, vaccineLot = null){
        this.vaccines = vaccines
        this.vaccineLot = vaccineLot
        this.enviarForm = formCallback
    }

    render(){
        let container = $('<section>')
            .addClass('container')

        const title = $('<h3>')
            .text(this.vaccineLot == null? 'Cadastrar Lote':'Editar Lote')
        const form = $('<form>')
            .addClass('row my-5')
        const lotNumberGroup = $('<div>')
            .addClass('form-group col-6')
            .append(
                $('<label>')
                    .attr('for', 'lotNumber')
                    .text('Numero do Lote:'),
                $('<input>')
                    .attr({'type': 'text' ,'id': 'lotNumber', 'name':'lotNumber', 'placeholder': 'N° Lote' ,'required': true})
                    .addClass('form-control')
            )
        const expDateGroup = $('<div>')
            .addClass('form-group col-6')
            .append(
                $('<label>')
                    .attr('for', 'expDate')
                    .text('Data de Validade:'),
                $('<input>')
                    .attr({'type': 'date' ,'id': 'expDate', 'name':'expDate' ,'required': true})
                    .addClass('form-control')
            )
        const quantityGroup = $('<div>')
            .addClass('form-group col-6')
            .append(
                $('<label>')
                    .attr('for', 'quantity')
                    .text('Quantidade:'),
                $('<input>')
                    .attr({'type': 'number' ,'id': 'quantity', 'name':'quantity' ,'required': true, 'min': 0})
                    .addClass('form-control')
            )
        const vaccineGroup = $('<div>')
            .addClass('form-group col-6')
            .append(
                $('<label>')
                    .attr('for', 'vaccine_id')
                    .text('Vacina:'),
                $('<select>')
                    .addClass('form-control')
                    .attr({'id':'vaccine_id', 'name':'vaccine_id', 'required':true})
                    .append(
                        $('<option>')
                            .attr({'selected':true, 'disabled': true, 'value':''})
                            .text('Selecione...'),
                        this.createVaccineOptions()
                    )
            )
        
            const submitButton = $('<button>')
                .addClass('btn btn-info mt-5 mx-auto col-3')
                .attr({'type':'submit'})
                .text('Enviar')
            
            form.append(lotNumberGroup,expDateGroup,quantityGroup,vaccineGroup, submitButton)
            // INICIANLIZANDO O MODAL DE CONFIRMAÇÂO DO ENVIO DO FORM
            form.submit(e=>{
                    e.preventDefault()
                    new ModalConfirmView('Confirme', this.vaccineLot == null? 'Deseja confirmar a inserção do lote?':'Deseja confirmar a atualização do lote?', this.enviarForm).modal.modal()
                })
            container.append(title, form)
            //carregando formulario na pagina
            $('main').empty().append(container)

            if (this.vaccineLot != null){
                this.carregarForm()
            }
    }

    createVaccineOptions(){
        return this.vaccines.map(vaccine =>{
            return $('<option>')
                .attr('value', vaccine.id)
                .text(vaccine.name)
        })
    }

    carregarForm(){
        let form = document.querySelector('form')
        form.lotNumber.value = this.vaccineLot.lotNumber
        form.expDate.value = this.vaccineLot.expDate
        form.quantity.value = this.vaccineLot.quantity
        form.vaccine_id.value = this.vaccineLot.vaccine.id

    }
            
}