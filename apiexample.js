function getMyIpHttp() {
 var request = new XMLHttpRequest()
 
 request.open('GET', 'https://api.ipify.org?format=json', true)
 request.onload = function (resp) {
  console.log(resp);
  console.log(resp.target.response)
 }
 
 request.send()
}

function getMyIpFetch() {
 var request = new Request('https://randomuser.me/api/?results=3',
 {
 	method: 'GET',
 	headers: new Headers({ 'Content-Type': 'application/json'})
 });
 
 fetch(request)
 .then(function(response) {
    response.json().then(function(respjson) {
    console.log (respjson.results);
    });
 })
 .catch(err => {
   console.log(err);
 })
}
