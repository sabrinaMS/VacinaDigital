class ModalConfirmView{
    constructor(title = 'titulo', text ='texto', confirmCallback = null, confirmText = 'Salvar'){
        this.title = title
        this.text = text
        this.confirmCallback = confirmCallback
        this.confirmText = confirmText
    }

    render(){
        $('.modal').remove() //removendo modais que possam estar carregados na tela
        $('body').append(this.modal)
    }
    
    get modal(){
        const modal = $('<div>')
            .addClass('modal fade')
            .attr({'id': 'modal', 'tabindex': '-1', 'role': 'dialog', 'aria-labelledby': 'modaltitulo', 'aria-hidden':true})
     
        const modalDialog = $('<div>')
            .addClass('modal-dialog')
            .attr('role', 'document')
   
        const modalContent = $('<div>')
            .addClass('modal-content')
         
        // MODAL HEADER
        const modalHeader = this.makeModalHeader()
        
        // MODAL BODY
        const modalBody = this.makeModalBody()
        
        // MODAL FOOTER
        const modalFooter = this.makemodalFooter()
                                    
        modalContent.append(modalHeader, modalBody, modalFooter)
        modalDialog.append(modalContent)
        modal.append(modalDialog)
        return modal
            

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
        return modalBody
    }

    makemodalFooter(){
        const modalFooter = $('<div>')
            .addClass('modal-footer')

        const dismissButton = $('<button>')
                    .addClass('btn btn-secondary')
                    .attr({'type':'button', 'data-dismiss':'modal'})
                    .text('Cancelar')
                
        const saveButton = $('<button>')
                    .addClass('btn btn-primary')
                    .attr({'type':'button'})
                    .click(this.confirmCallback)
                    .text(this.confirmText)

        modalFooter.append(dismissButton, saveButton)
        return modalFooter
    }
}