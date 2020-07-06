class LoginAPIService{
    constructor(){
        this.uri = "https://vacina-digital.herokuapp.com/api/auth"
        //this.uri = "http://localhost:8080/api/auth"
    }

    login(email, password, ok) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 201) {
                    console.log(JSON.parse(this.responseText).token)
                    localStorage.setItem("token", JSON.parse(this.responseText).token)
                    location.reload();
                }
                else {
                    console.log(this.status);
                }
            }
        };
        const body = {email, password}

        xhttp.open("POST", this.uri, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify(body));
    }
}