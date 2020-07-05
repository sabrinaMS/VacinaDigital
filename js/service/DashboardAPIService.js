class DashboardAPIService{
    constructor(){
        this.uri = 'http://localhost:8080/api/dashboardInfo'
    }
    getInfo(ok, erro){
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
        
        xhttp.open("GET", this.uri, true);
        xhttp.setRequestHeader('Authorization', this.jwtoken);
        xhttp.send();
    }
}