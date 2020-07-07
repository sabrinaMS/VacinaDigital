class NavbarView{
    constructor(paginas){
        this.paginas = paginas
    }

    render(){
        const navBar_nav = $('<nav>')
        .addClass('navbar navbar-expand-md navbar-dark bg-dark fixed-top')
        const container = $('<div>').addClass('container')
        
        const title_a = $('<a>')
            .addClass('navbar-brand text-white')
            .attr('href', '#')
            .text('Vacina Digital')

            
        if(this.paginas.length > 0){
            const colapsible_div = $('<div>')
                .addClass('collapse navbar-collapse')
                .attr('id', 'navbarCollapsible')
            const links_ul = this.makeLinksList()
            const collapse_button = this.makeCollapseButton()
            colapsible_div.append(links_ul)
            container.append(title_a, collapse_button, colapsible_div)

        }else{
            container.append(title_a)
        }
        navBar_nav.append(container)

        return navBar_nav
    }

    
    makeLinksList(){
        const links_ul = $('<ul>')
            .addClass('navbar-nav mr-auto')

        this.paginas.forEach(item => {
            if (item.text != "Logout" || localStorage.getItem("token")){
            const item_li = this.makeLink(item)
            links_ul.append(item_li)
        }
        })
        return links_ul
    }

    makeLink(item){
        const item_li = $('<li>')
                .addClass('nav-item')
                .click(item.clickHandler)
        const item_a = $('<a>')
            .addClass('nav-link')
            .attr('href', '#')
            .text(item.text)
            
        item_li.append(item_a)
        return item_li
    }

    makeCollapseButton(){
        const collapse_button = $('<button>')
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
        
        return collapse_button

    }
}