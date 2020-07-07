// NOT BEING USED


class PatientAPIService {
    constructor(){
        this.uri = "https://vacina-digital.herokuapp.com/api/pacientes";
        //this.uri = "http://localhost:8080/api/pacientes"
        this.jwtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsImVtYWlsIjoiYUBmYWtlbWFpbC5jb20ifQ.cWNK0NIj2muQlPxXH8uDlj-VZiRCshHMGwEfVNwtEiY"
    }

    searchPatients(ok, erro) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    ok(JSON.parse(this.responseText));
                }

                else {
                    erro(this.status);
                }
            }
        };
        
        xhttp.open("GET", this.uri, true);
        xhttp.setRequestHeader('Authorization', this.jwtoken);
        xhttp.send();
    }

    searchPatientById(id , ok, erro) {
        console.log(id)
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    console.log(this.responseText)
                    ok(JSON.parse(this.responseText));
                }

                else {
                    erro(this.status);
                }
            }
        };

        
        xhttp.open("GET", this.uri + `/${id}` , true);
        xhttp.setRequestHeader('Authorization', this.jwtoken);
        xhttp.send();
    }

    insertPatient(patient, ok, erro) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    ok(JSON.parse(this.responseText));
                }
                else {
                    erro(this.status);
                }
            }
        };
        xhttp.open("POST", this.uri, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader('Authorization', this.jwtoken);

        xhttp.send(JSON.stringify(patient));
    }

    updatePatient(patient, ok, erro) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    ok(JSON.parse(this.responseText));
                }
                else {
                    erro(this.status);
                }
            }
        };
        xhttp.open("PUT", this.uri + `/${patient.id}` , true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader('Authorization', this.jwtoken);
        xhttp.send(JSON.stringify(patient));
    }

    deletePatient(id , ok, erro) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    ok(JSON.parse(this.responseText));
                }

                else {
                    erro(this.status);
                }
            }
        };
        xhttp.open("DELETE", this.uri + `/${id}` , true);
        xhttp.send();
    }
}