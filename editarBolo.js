document.addEventListener("DOMContentLoaded", function() {

const parametros = new URLSearchParams(window.location.search)
const boloIndex = parseInt(parametros.get("index"))

const editarBoloForm = document.getElementById("editar-bolo-form")

const boloNomeInput = document.getElementById("bolo-nome")
const boloUrlInput = document.getElementById("bolo-url")
const boloPesoInput = document.getElementById("bolo-peso")
const boloValidadeInput = document.getElementById("bolo-validade")
const boloPrecoInput = document.getElementById("bolo-preco")

if (!isNaN(boloIndex) && boloIndex >= 0 && boloIndex < bolosDisponiveis.length) {
    const bolo = bolosDisponiveis[boloIndex]
    boloNomeInput.value = bolo.nome
    boloUrlInput.value = bolo.imagemUrl
    boloPesoInput.value = bolo.peso
    boloValidadeInput.value = bolo.dataValidade
    boloPrecoInput.value = bolo.preco
}

editarBoloForm.addEventListener("submit", function(event) {
    event.preventDefault()

    const updateBoloNome = boloNomeInput.value
    const updateBoloUrl = boloUrlInput.value
    const updateBoloPeso = boloPesoInput.value
    const updateBoloValidade = boloValidadeInput.value
    const updateBoloPreco = boloPrecoInput.value

    if (!isNaN(boloIndex) && boloIndex >= 0 && boloIndex < bolosDisponiveis.length) {
        bolosDisponiveis[boloIndex].nome = updateBoloNome
        bolosDisponiveis[boloIndex].imagemUrl = updateBoloUrl
        bolosDisponiveis[boloIndex].peso = updateBoloPeso
        bolosDisponiveis[boloIndex].dataValidade = updateBoloValidade
        bolosDisponiveis[boloIndex].preco = updateBoloPreco
    }

    window.location.replace("index.html")
})

})