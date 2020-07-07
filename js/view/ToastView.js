class ToastView{
    constructor(message){
        this.message = message
    }
    render(){
        $('.toastContainer').remove() //Remove qualquer toast que possa estar carregado no dom
        const toastContainer = this.makeToastContainer()

        
        //ADICIONANDO E MOSTRANDO O TOAST
        $('body').append(toastContainer)
        $('.toast')
            .toast({
                'delay': 2000
            })
            .toast('show')
    }


    makeToastHeader(){
        const toastHeader = $('<div>')
            .addClass('toast-header')

        const toastImg =$('<img>')
            .addClass('rounded mr-2')
            .attr({'src':'#', 'alt':''})
                                
        const toastTitle = $('<strong>')
            .addClass('mr-auto')
            .text('VacinaDigital')
                                
        const toastTime =$('<small>')
            .text('agora')
                                
        const toastCloseButton = $('<button>')
            .addClass('ml-2 mb-1 close')
            .attr({'type': 'button', 'data-dismiss':'toast', 'aria-label':'Close'})
            .append(
                $('<span>')
                    .attr('aria-hidden', 'true')
                    .html('&times;')
            )

        toastHeader.append(toastImg, toastTitle, toastTime, toastCloseButton)
        return toastHeader
    }

    makeToastBody(){
        const toastBody = $('<div>')
            .addClass('toast-body')
            .text(this.message)
        return toastBody
    }

    makeToast(){
        const toast = $('<div>')
            .addClass('toast')
            .css({'position':'absolute', 'bottom':'10px', 'right':'50px', "z-index": "999999"})

        // TOAST HEADER
        const toastHeader = this.makeToastHeader()
        
        // TOAST BODY
        const toastBody = this.makeToastBody()

        toast.append(toastHeader, toastBody)
        return toast
    }
    
    makeToastContainer(){
        const toastContainer = $('<div>')
            .addClass('toastContainer')
            .attr({'aria-live':'polite', 'aria-atomic':'true'})
            .css({'min-height': '200px'})
        
        const toast = this.makeToast()
        toastContainer.append(toast)
        return toastContainer
    }
}