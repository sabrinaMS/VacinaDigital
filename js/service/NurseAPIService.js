class NurseAPIService{
    constructor() {
        this.uri = "https://vacina-digital.herokuapp.com/api/enfermeiros";
    }

    buscarEnfermeiros(ok, erro) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    ok(JSON.parse(this.responseText));
                }
                else {
                    erro(JSON.parse(this.responseText));
                }
            }
        };


        xhttp.open("GET", this.uri, true);
        xhttp.setRequestHeader('Authorization', localStorage.getItem("token"));
        xhttp.send();
    }
}