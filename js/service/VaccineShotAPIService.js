class VaccineShotAPIService{
    constructor(){
        this.uri = "https://vacina-digital.herokuapp.com/api/vacinacoes"
    }

    insertShot(shot, ok, error){
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
        xhttp.open("POST", this.uri, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.setRequestHeader('Authorization', this.jwtoken);

        xhttp.send(JSON.stringify(shot));
    }
}