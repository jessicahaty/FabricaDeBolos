class Bolo {
    constructor(nome, imagemUrl, peso, dataValidade, preco){
        this.nome = nome
        this.imagemUrl = imagemUrl
        this.peso = peso
        this.dataValidade = dataValidade
        this.preco = preco
    }
}

const bolosDisponiveis = [
    new Bolo ("Bolo de Chocolate", "/img-bolo/Chocolate.png", "5 kg", "3 dias", 40),
    new Bolo ("Bolo de Morango", "/img-bolo/Morango.png", "4 kg", "3 dias", 60),
    new Bolo ("Bolo de Limão", "/img-bolo/Limao.png", "5 kg", "2 dias", 50),
    new Bolo ("Bolo de Cenoura", "/img-bolo/Cenoura.png", "3 kg", "2 dias", 50),
    new Bolo ("Bolo de Coco", "/img-bolo/Coco.png", "3 kg", "2 dias", 50),
    new Bolo ("Bolo Red Velvet", "/img-bolo/Red_velvet.png", "3 kg", "2 dias", 50),
    new Bolo ("Bolo de Nozes", "/img-bolo/Nozes.png", "3 kg", "2 dias", 50),
    new Bolo ("Bolo de Abacaxi", "/img-bolo/Abacaxi.png", "3 kg", "2 dias", 50),
    new Bolo ("Bolo de Maracujá", "/img-bolo/Maracuja.png", "3 kg", "2 dias", 50),
    new Bolo ("Bolo de Café", "/img-bolo/Cafe.png", "3 kg", "2 dias", 50),
    new Bolo ("Bolo de Amendoim", "/img-bolo/Amendoim.png", "3 kg", "2 dias", 50),
    new Bolo ("Bolo de Prestígio", "/img-bolo/Prestigio.png", "3 kg", "2 dias", 50),
    new Bolo ("Bolo de Brigadeiro", "/img-bolo/Brigadeiro.png", "3 kg", "2 dias", 50),
    new Bolo ("Bolo de Leite Ninho", "/img-bolo/Leite.png", "3 kg", "2 dias", 50),
]


function exibirBolos() {
    const catalogo = document.getElementById("catalogo")

    bolosDisponiveis.forEach(bolo => {

        const boloCard = document.createElement("div")
        boloCard.classList.add("boloCard")

        const boloImagem = document.createElement("img")
        boloImagem.src = bolo.imagemUrl
        boloImagem.alt = bolo.nome

        const boloTitulo = document.createElement("h2")
        boloTitulo.textContent = bolo.nome

        const boloPeso = document.createElement("p")
        boloPeso.textContent = `Peso: ${bolo.peso}`
        
        const boloValidade = document.createElement("p")
        boloValidade.textContent = `Validade: ${bolo.dataValidade}`

        const boloPreco = document.createElement("p")
        boloPreco.textContent = `Preço: R$ ${bolo.preco.toFixed(2)}`

        const botoesDosBolos = document.createElement("div")
        botoesDosBolos.classList.add("botoesDosBolos")

        const botaoEditar = document.createElement("button")
        botaoEditar.classList.add("botao", "botaoEditar")
        botaoEditar.textContent = "Editar"

        const botaoDeletar = document.createElement("button")
        botaoDeletar.classList.add("botao", "botaoDeletar")
        botaoDeletar.textContent = "Deletar"

        botoesDosBolos.appendChild(botaoEditar)
        botoesDosBolos.appendChild(botaoDeletar)

        boloCard.appendChild(boloImagem)
        boloCard.appendChild(boloTitulo)
        boloCard.appendChild(boloPeso)
        boloCard.appendChild(boloValidade)
        boloCard.appendChild(boloPreco)
        boloCard.appendChild(botoesDosBolos)

        catalogo.appendChild(boloCard)

    })

}

window.onload = function() {
    exibirBolos();
};

console.log(bolosDisponiveis)