class CardsPacientes {

    constructor(controller, seletor) {
        this.pacienteController = controller;
        this.seletor = seletor;
    }

    montarCard(paciente) {

        var card = `
            <div>`

        const vacinas = paciente.vaccineShots

        for (var i in vacinas) {
            card += `
                <div class="row mb-3">
                    <div class="col-md-3 themed-grid-col">
                        <div class="vaccine-card">
                            <h5><b>${vacinas[i].date}</b></h5>
                            <p>${vacinas[i].lot}</p>
                        </div>
                    </div>
                </div>`
        }

        card += `</div>`

        let containerForm = document.querySelector(this.seletor);
        containerForm.innerHTML = card;
    }
}