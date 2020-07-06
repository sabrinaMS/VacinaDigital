class PacienteAPIService {
    constructor() {
        this.uri = "https://vacina-digital.herokuapp.com/api/pacientes";
        //this.uri = "http://localhost:8080/api/pacientes"
        // this.jwtoken = localStorage.getItem("token")

        // this.jwtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsImVtYWlsIjoiYUBmYWtlbWFpbC5jb20ifQ.cWNK0NIj2muQlPxXH8uDlj-VZiRCshHMGwEfVNwtEiY"
    }
    buscarPacientes(ok, erro) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    ok(JSON.parse(this.responseText));
                }
                else {
                    erro(this.status);
                }
            }
        };


        xhttp.open("GET", this.uri, true);
        xhttp.setRequestHeader('Authorization', localStorage.getItem("token"));
        xhttp.send();
    }

    buscarPaciente(id, ok, erro) {
        console.log(id)
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    console.log(this.responseText)
                    ok(JSON.parse(this.responseText));

                }

                else {
                    erro(this.status);
                }
            }
        };


        xhttp.open("GET", this.uri + `/${id}`, true);
        xhttp.setRequestHeader('Authorization', localStorage.getItem("token"));
        xhttp.send();
    }

    enviarPaciente(patient, ok, erro) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200 || this.status === 201) {
                    ok(JSON.parse(this.responseText));
                }
                else {
                    erro(this.status);
                }
            }
        };
        xhttp.open("POST", this.uri, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader('Authorization', localStorage.getItem("token"));

        xhttp.send(JSON.stringify(patient));
    }

    atualizarPaciente(patient, ok, erro) {
        console.log('SERVICE', patient)
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    ok(JSON.parse(this.responseText));
                }
                else {
                    erro(this.status);
                }
            }
        };
        xhttp.open("PUT", this.uri + `/${patient.id}`, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader('Authorization', localStorage.getItem("token"));
        xhttp.send(JSON.stringify(patient));
    }

    deletarPaciente(id, ok, erro) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    console.log(this.responseText)
                    ok(JSON.parse(this.responseText));
                }

                else {
                    erro(this.status);
                }
            }
        };
        xhttp.open("DELETE", this.uri + `/${id}`, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader('Authorization', localStorage.getItem("token"));
        xhttp.send();
    }
}