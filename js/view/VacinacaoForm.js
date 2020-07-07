class VacinacaoForm{
    constructor(loadNurses, loadLots, enviarForm, paciente = null){
        this.loadNurses = loadNurses
        this.loadLots = loadLots
        this.enviarForm = enviarForm
        this.paciente = paciente
    }
    render(){
        const container = $('<div>')
        const titulo = $('<h3>')
            .text('Cadastrar Vacinação')

        const form = this.makeForm()
        container.append(titulo, form)

        $('main').empty().append(container)

        this.loadLots(this.renderLots.bind(this), this.renderError.bind(this))
        this.loadNurses(this.renderNurses.bind(this), this.renderError.bind(this))
    }

    makeForm(){
        const form = $('<form>')

        const lotGroup = this.makeLotGroup()
        const nurseGroup = this.makeNurseGroup()
        const dateGroup = this.makeDateGroup()
        const patientGroup = this.makePatientGroup()

        const submitButton = $('<button>')
            .addClass('btn btn-primary')
            .text('Salvar')

        form.append(lotGroup, nurseGroup, dateGroup, patientGroup, submitButton)
        form.submit(this.enviarForm)
        return form
    }

    makeLotGroup(){
        const lotGroup = $('<div>')
            .addClass('form-group')
        const lotLabel = $('<label>')
            .attr('for', 'vaccineLot_id')
            .text('Lote:')
        const lotSelect = $('<select>')
            .addClass('form-control')
            .attr({
                'name':'vaccineLot_id',
                'id': 'vaccineLot_id',
                'required':'true'
            })
        const defaultOption = $('<option>')
            .text('Selecione...')
            .attr({
                'selected': 'true',
                'disabled': 'true',
                'value': ''
            })

        lotSelect.append(defaultOption)
        lotGroup.append(lotLabel, lotSelect)
        return lotGroup
    }

    makeNurseGroup(){
        const nurseGroup = $('<div>')
            .addClass('form-group')
        const nurseLabel = $('<label>')
            .attr('for', 'nurse_id')
            .text('Enfermeira:')
        const lotSelect = $('<select>')
            .addClass('form-control')
            .attr({
                'name':'nurse_id',
                'id': 'nurse_id',
                'required':'true'
            })
        const defaultOption = $('<option>')
            .text('Selecione...')
            .attr({
                'selected': 'true',
                'disabled': 'true',
                'value': ''
            })

        lotSelect.append(defaultOption)
        nurseGroup.append(nurseLabel, lotSelect)
        return nurseGroup
    }

    makeDateGroup(){
        const dateGroup = $('<div>')
            .addClass('form-group')
        const dateLabel = $('<label>')
            .attr('for', 'date')
            .text('Data Vacinação:')
        const dateInput = $('<input>')
            .addClass('form-control')
            .attr({
                'type':'date',
                'name':'date',
                'id': 'date',
                'required':'true'
            })
        
        dateInput.val(this.todayStr) //valor default hoje
        dateGroup.append(dateLabel, dateInput)
        return dateGroup
    }

    makePatientGroup(){
        const patientGroup = $('<div>')
            .addClass('form-group')
        const patientLabel = $('<label>')
            .attr('for', 'patient_id')
            .text('Paciente:')
        const lotSelect = $('<select>')
            .addClass('form-control')
            .attr({
                'name':'patient_id',
                'id': 'patient_id',
                'required':'true'
            })
        const defaultOption = $('<option>') //só vai ter uma opção que é a do paciente dono da carteira
            .text(this.paciente.name)
            .attr({
                'selected': 'true',
                'disabled': 'true',
                'value': this.paciente.id
            })

        lotSelect.append(defaultOption)
        patientGroup.append(patientLabel, lotSelect)
        return patientGroup
    }

    renderLots(lots){
        const form = document.querySelector('form')
        const lotSelect = $(form.vaccineLot_id)

        lots.forEach(lot=>{
            if (lot.quantity > 0){
                const option = $('<option>')
                    .attr('value', lot.id)
                    .text(`${lot.lotNumber} - ${lot.vaccine.name}`)
                lotSelect.append(option)
            }
        })
    }

    renderNurses(nurses){
        const form = document.querySelector('form')
        const nurseSelect = $(form.nurse_id)

        nurses.forEach(nurse=>{
            const option = $('<option>')
                .attr('value', nurse.id)
                .text(`${nurse.coren} - ${nurse.name}`)
            nurseSelect.append(option)
            
        })
    }

    renderError(error){
        new ErrorView(error.status, error.message).render()
    }

    get todayStr(){
        const today = new Date();
        const yyyy = today.getFullYear()
        const mm = today.getMonth() + 1 < 10? '0' + (today.getMonth() + 1) : today.getMonth() + 1
        const dd = today.getDate() < 10? '0' + today.getDate() : today.getDate()

        return `${yyyy}-${mm}-${dd}`
    }

    get formValues(){
        const form = document.querySelector('form')
        const data = {
            "vaccineLot_id": form.vaccineLot_id.value,
            "nurse_id": form.nurse_id.value,
            "date": form.date.value,
            "patient_id": form.patient_id.value
        }
        return data
    }


}