class LoginAPIService{
    constructor(){
        this.uri = "localhost:8080/api/auth"
    }

    login(email, password) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    console.log(this.responseText)
                    localStorage.setItem("token", this.responseText)
                }
                else {
                    console.log(this.status);
                }
            }
        };
        xhttp.open("POST", this.uri, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify({"email": email, "password": password}));
    }
}