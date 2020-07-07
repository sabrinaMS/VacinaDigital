// NOT BEING USED


class VaccineAPIService {
    constructor(){
        this.uri = "http://vacina-digital.herokuapp.com/api/vacinas";
        //this.uri = "http://localhost:8080/api/vacinas"
    }
// QUANTITY IN STOCK

    searchVaccines(ok, erro) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    ok(JSON.parse(this.responseText));
                }

                else {
                    erro(JSON.parse(this.responseText));
                }
            }
        };
        xhttp.open("GET", this.uri, true);
        xhttp.send();
    }

    insertVaccine(data, ok, error){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 201) {
                    ok(JSON.parse(this.responseText));
                }
                else {
                    error(JSON.parse(this.responseText));
                }
            }
        };
        console.log(this.uri)
        xhttp.open("POST", this.uri, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader('Authorization', this.jwtoken);

        xhttp.send(JSON.stringify(data));
    }

    updateVaccine(vaccine, ok, error){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    ok(JSON.parse(this.responseText));
                }
                else {
                    error(JSON.parse(this.responseText));
                }
            }
        };
        xhttp.open("PUT", this.uri + `/${vaccine.id}` , true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader('Authorization', this.jwtoken);
        xhttp.send(JSON.stringify(vaccine));
    }

    deleteVaccine(id, ok, error){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 200) {
                    ok(JSON.parse(this.responseText));
                }

                else {
                    error(JSON.parse(this.responseText));
                }
            }
        };
        xhttp.open("DELETE", this.uri + `/${id}` , true);
        xhttp.send();
    }
}