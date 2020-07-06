class ErrorController{
    constructor(error){
        this.error = error
    }

    showError(){
        const view = new ErrorView(this.error.status, this.error.message)
        view.render()
    }

}