const obtenerValorInput = () => {
    let inputTexto = document.getElementById("input_piloto");
    let valor = inputTexto.value;
    peticionApi(valor);
}

const peticionApi = (piloto) => {
    const baseUrl = "https://v1.formula-1.api-sports.io/";
    const endpoint = `drivers?search=${piloto}`;
    const url = `${baseUrl}${endpoint}`;

    axios
    .get(url, {
        headers: {
            "x-apisports-key": "f9591acc2234f043ce8122f85fa35314" 
        }
    })
    .then(res => printData(res.data.response))
    .catch(err => console.log(err));
} 

const printData = (data) => {
    let respuesta = document.getElementById('show-info');

    if (!data || data.length === 0) {
        respuesta.innerHTML = `<p>No se encontró información del piloto.</p>`;
        return;
    }

    respuesta.innerHTML = `
        <h3>${data[0].name} (${data[0].abbr})</h3>
        <p><strong>Nacionalidad:</strong> ${data[0].nationality}</p>
        <p><strong>Equipo:</strong> ${data[0].team ? data[0].team.name : "N/A"}</p>
        <p><strong>Número:</strong> ${data[0].number ? data[0].number : "N/A"}</p>
        <p><strong>Fecha de nacimiento:</strong> ${data[0].birthdate}</p>
        <img src="${data[0].image}" alt="Foto de ${data[0].name}" style="max-height:150px;margin-top:10px;">
    `;
}
