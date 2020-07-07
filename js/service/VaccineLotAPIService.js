class VaccineLotAPIService{
    constructor(){
        this.uri = "https://vacina-digital.herokuapp.com/api/lotesvacina";
        //this.uri = "http://localhost:8080/api/lotesvacina"
    }

    searchVaccineLots(ok, erro){
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
        }
        xhttp.open("GET", this.uri, true);
        xhttp.send();
    }

    insertVaccineLot(vaccineLot, ok, erro){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if(this.status === 201) {
                    ok(JSON.parse(this.responseText));
                }
                else {
                    erro(JSON.parse(this.responseText));
                }
            }
        };
        xhttp.open("POST", this.uri, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader('Authorization', this.jwtoken);

        xhttp.send(JSON.stringify(vaccineLot));
    }

    updateVaccineLot(data, id, ok, erro){
        console.log(data)
        console.log(this.uri + `/${id}`)
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
        xhttp.open("PUT", this.uri + `/${id}`, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader('Authorization', this.jwtoken);

        xhttp.send(JSON.stringify(data));
    }

    deleteVaccineLot(id, ok, error){
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
        xhttp.open("DELETE", this.uri + `/${id}` , true);
        xhttp.send();
    }
}
