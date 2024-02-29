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

  const image = document.createElement("img");

  image.src = data.image.url;

  image.alt = "Cargando imagen...";

  document.getElementById("resultado").appendChild(image);

  displaySuperhero(data);
  console.log(data);
  console.log(data.image.url);
}

function SuperHeroAPIHttp(characterId) {
  const apiKey = "357848050455796";
  const url = `https://www.superheroapi.com/api.php/${apiKey}/${characterId}`;

  var request = new XMLHttpRequest();

  request.open("GET", url, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      const data = JSON.parse(request.responseText);

      const image = document.createElement("img");

      image.src = data.image.url;

      image.alt = "Cargando imagen...";

      document.getElementById("resultado").appendChild(image);

      displaySuperhero(data);
      console.log(data);
      console.log(data.image.url);
    } else {
      alert("Error al buscar el superhéroe: " + request.statusText);
    }
  };
  request.onerror = function () {
    alert("Error al conectar con la API.");
  };

  request.send();
}

function SuperHeroJquery(characterId) {
  const apiKey = "357848050455796";
  const url = `https://www.superheroapi.com/api.php/${apiKey}/${characterId}`;

  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data) {
      const image = document.createElement("img");
      image.src = data.image.url;
      image.alt = "Cargando imagen...";
      document.getElementById("resultado").appendChild(image);
      displaySuperhero(data);
    },
    error: function(error) {
      alert("Error al buscar el superhéroe: " + error.statusText);
    }
  });
}

function SuperHeroRandom(characterId) {

  const randomId = Math.floor(Math.random() * 731) + 1;

  SuperHeroJquery(randomId);
}


function displaySuperhero(data) {
  const name = data.name;
  const appearance = data.appearance;
  const biography = data.biography;

  let result = `<h2>${name}</h2>`;

  result += `<table>`;

  result += `<tr><th>Imagen:</th><td>`;
  result += `<img src="${data.image.url}" alt="${name}">`;
  result += `</td></tr>`;

  result += `<tr><th>Apariencia:</th><td>`;
  for (const key in appearance) {
    result += `${key}: ${appearance[key]}, `;
  }
  result += `</td></tr>`;

  result += `<tr><th>Biografía:</th><td>`;
  for (const key in biography) {
    result += `${key}: ${biography[key]}, `;
  }
  result += `</td></tr>`;

  result += `</table>`;

  document.getElementById("resultado").innerHTML = result;
}