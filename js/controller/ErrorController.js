class ErrorController{
    constructor(error){
        this.error = error
        this.view = new ErrorView(this.error.status, this.error.message)
    }

    showError(){
        view.render()
    }

}