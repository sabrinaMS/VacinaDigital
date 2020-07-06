class VaccineLotRegisterView{
    constructor(formCallback, vaccines = null, vaccineLot = null){
        this.vaccines = vaccines
        this.vaccineLot = vaccineLot
        this.enviarForm = formCallback
    }

    render(){
        let container = $('<section>')
            .addClass('container')

        const title = $('<h3>')
            .text(this.vaccineLot == null? 'Cadastrar Lote':'Editar Lote')
        
            const form = this.makeForm()

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

    makeForm(){
        const form = $('<form>')
            .addClass('row my-5')
        const lotNumberGroup = this.makeLotNumberGroup()
        const expDateGroup = this.makeExpDateGroup()
        const quantityGroup = this.makeQuantityGroup()
        const vaccineGroup = this.makeVaccineGroup()
        
        const submitButton = $('<button>')
            .addClass('btn btn-info mt-5 mx-auto col-3')
            .attr({'type':'submit'})
            .text('Enviar')
        
        form.append(lotNumberGroup,expDateGroup,quantityGroup,vaccineGroup, submitButton)
        return form
    }

    makeLotNumberGroup(){
        const lotNumberGroup = $('<div>')
            .addClass('form-group col-6')

        const lotNumberLabel = $('<label>')
            .attr('for', 'lotNumber')
            .text('Numero do Lote:')

        const lotNumberInput = $('<input>')
            .attr({'type': 'text' ,'id': 'lotNumber', 'name':'lotNumber', 'placeholder': 'N° Lote' ,'required': true})
            .addClass('form-control')
        
        lotNumberGroup.append(lotNumberLabel, lotNumberInput)
        return lotNumberGroup
    }

    makeExpDateGroup(){
        const expDateGroup = $('<div>')
            .addClass('form-group col-6')

        const expDateLabel = $('<label>')
            .attr('for', 'expDate')
            .text('Data de Validade:')

        const expDateInput = $('<input>')
            .attr({'type': 'date' ,'id': 'expDate', 'name':'expDate' ,'required': true, 'min': this.tomorrowString})
            .addClass('form-control')

        expDateGroup.append(expDateLabel, expDateInput)
        return expDateGroup            
    }

    makeVaccineGroup(){
        const vaccineGroup = $('<div>')
        .addClass('form-group col-6')

        const vaccineLabel = $('<label>')
            .attr('for', 'vaccine_id')
            .text('Vacina:')
        const vaccineSelect = $('<select>')
        .addClass('form-control')
        .attr({'id':'vaccine_id', 'name':'vaccine_id', 'required':true})
        const defaultOption =$('<option>')
            .attr({'selected':true, 'disabled': true, 'value':''})
            .text('Selecione...')
        vaccineSelect.append(defaultOption, this.createVaccineOptions())
        vaccineGroup.append(vaccineLabel, vaccineSelect)
        return vaccineGroup       
    }

    createVaccineOptions(){
        return this.vaccines.map(vaccine =>{
            return $('<option>')
                .attr('value', vaccine.id)
                .text(vaccine.name)
        })
    }

    makeQuantityGroup(){
        const quantityGroup = $('<div>')
            .addClass('form-group col-6')

        const quantityLabel = $('<label>')
            .attr('for', 'quantity')
            .text('Quantidade:')

        const quantityInput = $('<input>')
            .attr({'type': 'number' ,'id': 'quantity', 'name':'quantity' ,'required': true, 'min': 0})
            .addClass('form-control')

        quantityGroup.append(quantityLabel, quantityInput)
        return quantityGroup            
    }

    carregarForm(){
        let form = document.querySelector('form')
        form.lotNumber.value = this.vaccineLot.lotNumber
        form.expDate.value = this.vaccineLot.expDate
        form.quantity.value = this.vaccineLot.quantity
        form.vaccine_id.value = this.vaccineLot.vaccine.id

    }

    get tomorrowString(){
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)

        const dd = tomorrow.getDate() < 10? '0' + tomorrow.getDate() : tomorrow.getDate()
        const mm = tomorrow.getMonth() + 1 < 10? '0' + (tomorrow.getMonth()+1) : tomorrow.getMonth() + 1
        const yyyy = tomorrow.getFullYear()

        return `${yyyy}-${mm}-${dd}`
    }

    get formData(){
        const form = document.querySelector('form')
        let data = {
            "lotNumber": form.lotNumber.value,
            "expDate": form.expDate.value,
            "vaccine_id": form.vaccine_id.value,
            "quantity": form.quantity.value
        }
        if (this.vaccineLot != null){
            data.id = this.vaccineLot.id
        }
        return data
    }

    showFormError(e){
        $('form').prepend($('<p>').addClass('text-danger p-3 w-100').text(e.message))
    }
            
}