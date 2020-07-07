class CardsPacientes {

    constructor(controller, seletor, adicionarCallback, paciente = null) {
        this.pacienteController = controller;
        this.seletor = seletor;
        this.adicionarCallback = adicionarCallback
        this.paciente = paciente
    }

    render() {

        const shots = this.paciente.vaccineShots;

        const container = $('<div>')

        const title = $('<h3>')
            .text(`Cartão de Vacinação de ${this.paciente.name}`)
        const row = this.montarCards(shots);

        container.append(title, row)

        $(this.seletor).empty().append(container);
    }

    montarCards(shots){
        const row = $('<div>')
            .addClass('row mb-3 align-items-stretch justify-content-center justify-content-sm-start');
        row.append(this.montarBotaoAdicionar(row))
        shots.forEach( shot => {
            const card = this.montarCard(shot);
            row.append(card);
        });
        return row
    }

    montarCard(shot){
        console.log(shot)
        const col = $('<div>')
            .addClass('col-6 col-sm-6 col-md-4 col-lg-3 my-3 d-flex align-items-stretch');
        const card = $('<div>')
            .addClass('vaccine-card d-flex flex-column justify-content-between w-100');
        const vaccineLabel = $('<h5>')
            .append(
                $('<b>')
                    .text(shot.lot.vaccine.name)
            );
        const nurseLabel = $('<p>')
            .text(shot.nurse.name);
        
        card.append(vaccineLabel, nurseLabel);
        col.append(card);

        card.click(e=>{new VacinacaoModalView(shot, this.paciente).render()})
        return col;
    }

    montarBotaoAdicionar(){
        const col = $('<div>')
            .addClass('col-12 col-sm-6 col-md-4 col-lg-3 my-3');
        const card = $('<button>')
            .addClass('vaccine-card-button')
            .text('Adicionar Vacina')
            .click(e=>{this.adicionarCallback(this.paciente)});
        col.append(card);
        return col;

    }
}