class SpinnerView{
    render(){
        const container = $('<div>')
            .addClass('w-100 text-center my-5')
        const spinner = $('<div>')
            .addClass('spinner-border')
            .attr('role', 'status')
            .append(
                $('<span>')
                    .addClass('sr-only')
                    .text('Carregando...')
            )
        container.append(spinner)

        $('main').empty().append(container)
    }
}

