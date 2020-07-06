
class ErrorView{
    constructor(code = '', message = ''){
        this.code = code
        this.message = message
    }
    render(){
        const container = $('<div>')

        const title = $('<h3>')
            .text(`Erro ${this.code}`)

        const imgContainer = $('<picture>')
            .addClass('d-block w-100 mt-5')

        const img = $('<img>')
            .addClass('d-block mx-auto')
            .attr({
                "src":`https://http.cat/${this.code}`,
                "alt":`Erro ${this.code}`
            })
            .css('opacity', '0.85')

        const caption = $('<figcaption>')
            .addClass('text-center mt-3')
            .text(this.message)
        
        imgContainer.append(img, caption)

        container.append(title, imgContainer)
        $('main').empty().append(container)
    }
}