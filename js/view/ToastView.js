class ToastView{
    constructor(message){
        this.message = message
    }
    render(){
        $('.toastContainer').remove() //Remove qualquer toast que possa estar carregado no dom
        const toast = $('<div>')
            .addClass('toastContainer')
            .attr({'aria-live':'polite', 'aria-atomic':'true'})
            .css({'position': 'relative', 'min-height': '200px'})
            .append(
                $('<div>')
                    .addClass('toast')
                    .css({'position':'absolute', 'bottom':'10px', 'right':'50px'})
                    .append(
                        // TOAST HEADER
                        $('<div>')
                            .addClass('toast-header')
                            .append(
                                $('<img>')
                                    .addClass('rounded mr-2')
                                    .attr({'src':'#', 'alt':''})
                                ,
                                $('<strong>')
                                    .addClass('mr-auto')
                                    .text('VacinaDigital')
                                ,
                                $('<small>')
                                    .text('agora')
                                ,
                                $('<button>')
                                    .addClass('ml-2 mb-1 close')
                                    .attr({'type': 'button', 'data-dismiss':'toast', 'aria-label':'Close'})
                                    .append(
                                        $('<span>')
                                            .attr('aria-hidden', 'true')
                                            .html('&times;')
                                    )
                            )
                        ,
                        // TOAST BODY
                        $('<div>')
                            .addClass('toast-body')
                            .text(this.message)
                    )
            )
        
        //ADICIONANDO E MOSTRANDO O TOAST
        $('body').append(toast)
        $('.toast')
            .toast({
                'delay': 2000
            })
            .toast('show')
    }
}