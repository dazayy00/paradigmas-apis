function getSuperhero() {
  const characterId = Number(document.getElementById("characterID").value);
  if (isNaN(characterId) || characterId < 1 || characterId > 731) {
    alert("Por favor, ingresa un número válido entre 1 y 731.");
    return;
  }

  const button = event.target;
  const apiFunction = button.getAttribute("data-api-function");
  if (!apiFunction) {
    console.error("No se encontró la función API para el botón");
    return;
  }

  window[apiFunction](characterId);
}

async function SuperHeroAPIFetch(characterId) {
  const apiKey = "357848050455796";
  const url = `https://www.superheroapi.com/api.php/${apiKey}/${characterId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json();
  displaySuperhero(data);
}

function SuperHeroAPIHttp(characterId) {
  const apiKey = "357848050455796";
  const url = `https://www.superheroapi.com/api.php/${apiKey}/${characterId}`;

  var request = new XMLHttpRequest();

  request.open("GET", url, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      const data = JSON.parse(request.responseText);
      displaySuperhero(data);
    } else {
      alert("Error al buscar el superhéroe: " + request.statusText);
    }
  };
  request.onerror = function () {
    alert("Error al conectar con la API.");
  };

  request.send();
}

function displaySuperhero(data) {
  const name = data.name;
  const powerstats = data.powerstats;
  const appearance = data.appearance;
  const biography = data.biography;
  const imageUrl = data.image; 

  let result = `<h2>${name}</h2>`;

  result += `<table>
    <tr><th>Imagen:</th><td><img src="${imageUrl}"></td></tr>
    <tr><th>Powerstats:</th><td>`;
  for (const key in powerstats) {
    result += `${key}: ${powerstats[key]}, `;
  }
  result += `</td></tr>
    <tr><th>Apariencia:</th><td>`;
  for (const key in appearance) {
    result += `${key}: ${appearance[key]}, `;
  }
  result += `</td></tr>
    <tr><th>Biografía:</th><td>`;
  for (const key in biography) {
    result += `${key}: ${biography[key]}, `;
  }
  result += `</td></tr>
  </table>`;

  document.getElementById("resultado").innerHTML = result;
}
