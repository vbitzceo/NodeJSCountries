document.querySelector('#btnFetchCountries').addEventListener('click', () => {
    fetch('http://localhost:1337/api')
            .then(response => response.json())
            .then(json => {
                for (var i = 0; i < json.length; i++)
                {
                    document.querySelector("#txtArea").value += json[i].name + '\n';
                }});
});