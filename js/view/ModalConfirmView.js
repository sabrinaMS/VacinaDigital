class ModalConfirmView{
    constructor(title, text, confirmCallback, confirmText = 'Salvar'){
        this.title = title
        this.text = text
        this.confirmCallback = confirmCallback
        this.confirmText = confirmText
    }
    
    get modal(){
        $('.modal').remove() //removendo modais que possam estar carregados na tela
        return $('<div>')
            .addClass('modal fade')
            .attr({'id': 'modal', 'tabindex': '-1', 'role': 'dialog', 'aria-labelledby': 'modaltitulo', 'aria-hidden':true})
            .append(
                $('<div>')
                    .addClass('modal-dialog')
                    .attr('role', 'document')
                    .append(
                        $('<div>')
                            .addClass('modal-content')
                            .append(
                                // MODAL HEADER
                                $('<div>')
                                    .addClass('modal-header')
                                    .append(
                                        $('<h5>')
                                            .addClass('modal-title')
                                            .attr({'id': 'modaltitulo'})
                                            .text(this.title),
                                        $('<button>')
                                            .addClass('close')
                                            .attr({'type': 'button', 'data-dismiss':'modal', 'aria-label':'Close'})
                                            .append(
                                                $('<span>')
                                                    .attr('aria-hidden', true)
                                                    .html('&times;')
                                            )
                                    )
                                ,    
                                // MODAL BODY
                                $('<div>')
                                    .addClass('modal-body')
                                    .text(this.text)
                                ,
                                // MODAL FOOTER
                                $('<div>')
                                    .addClass('modal-footer')
                                    .append(
                                        $('<button>')
                                            .addClass('btn btn-secondary')
                                            .attr({'type':'button', 'data-dismiss':'modal'})
                                            .text('Cancelar')
                                        ,
                                        $('<button>')
                                            .addClass('btn btn-primary')
                                            .attr({'type':'button'})
                                            .click(this.confirmCallback)
                                            .text(this.confirmText)
                                    )
                            )
                    )
            )

    }
}