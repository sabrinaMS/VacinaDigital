class VaccineFormView{
    constructor(){
        this.vaccine = null
        this.submitCallback = null
        this.form = null
        this.title = 'Cadastrar Vacina'
    }

    render(){
        const container = $('<section>')
        const title = $('<h3>')
            .text(this.title);
        
        const form = this.makeForm()

        container.append(title, form)
        $('main').empty().append(container)

        if (this.vaccine != null){
            this.carregarForm()
        }

    }

    makeForm(){
        const form = $('<form>')
            .addClass('mt-5 col-lg-6 mx-auto');
        
        const nameGroup = this.makeNameGroup();
        const sumbitButton = $('<button>')
            .addClass('btn btn-primary mx-auto d-block col-12 col-md-6 mt-5')
            .text('Cadastrar');

        form.append(nameGroup, sumbitButton);

        form.submit(this.submitCallback)
        return form
    }

    makeNameGroup(){
        const nameGroup = $('<div>')
            .addClass('form-group');
        
        const nameLabel = $('<label>')
            .attr('for', 'nome')
            .text('Nome');
        const nameInput = $('<input>')
            .addClass('form-control')
            .attr({
                'type':'text',
                'name':'nome',
                'id':'nome',
                'required':'true',
                'placeholder':'Digite o nome da vacina'
            });
        
        nameGroup.append(nameLabel, nameInput);
        return nameGroup
    }

    carregarForm(){
        const form = document.querySelector('form');
        form.nome.value = this.vaccine.name;
    }

    get formVaules(){
        const form = document.querySelector('form');
        return {
            "name" : form.nome.value
        }
    }
}