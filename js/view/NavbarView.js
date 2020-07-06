class NavbarView{
    constructor(paginas){
        this.paginas = paginas
    }

    render(){
        let navBar_nav = $('<nav>')
            .addClass('navbar navbar-expand-md navbar-dark bg-dark fixed-top')
        
        let title_a = $('<a>')
            .addClass('navbar-brand text-white')
            .attr('href', '#')
            .text('Vacina Digital')

        let colapsible_div = $('<div>')
            .addClass('collapse navbar-collapse')
            .attr('id', 'navbarCollapsible')

        let links_ul = $('<ul>')
            .addClass('navbar-nav mr-auto')

        this.paginas.forEach(item => {
            let item_li = $('<li>')
                .addClass('nav-item')
                .click(item.clickHandler)
            let item_a = $('<a>')
                .addClass('nav-link')
                .attr('href', '#')
                .text(item.text)
            
            item_li.append(item_a)
            links_ul.append(item_li)
        })

        const collapseButton = $('<button>')
            .addClass('navbar-toggler')
            .attr({
                'type':'button',
                'data-toggle':'collapse',
                'data-target':'#navbarCollapsible',
                'aria-controls':'navbarNavAltMarkup',
                'aria-expanded':'false',
                'aria-label':'Toggle navigation'
            })
            .append(
                $('<span>')
                    .addClass('navbar-toggler-icon')
            );
        
        colapsible_div.append(links_ul)
        navBar_nav.append(title_a, collapseButton, colapsible_div)
        return navBar_nav
    }
}