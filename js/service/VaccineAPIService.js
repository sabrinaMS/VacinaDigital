class VaccineAPIService {
    constructor(){
         //this.uri = "http://vacina-digital.herokuapp.com/api/vacinas";
        this.uri = "http://localhost:8080/api/vacinas"
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
                    erro(this.status);
                }
            }
        };
        xhttp.open("GET", this.uri, true);
        xhttp.send();
    }
}