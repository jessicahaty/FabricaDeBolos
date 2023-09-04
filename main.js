const abrirModal = () => document.getElementById('modal')
    .classList.add('ativo')

const fecharModal = () => {
    limparCampos()
    document.getElementById('modal').classList.remove('ativo')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_bolo')) ?? []
const setLocalStorage = (dbBolo) => localStorage.setItem("db_bolo", JSON.stringify(dbBolo))

const excluirBolo = (indice) => {
    const dbBolo = lerBolos()
    dbBolo.splice(indice, 1)
    setLocalStorage(dbBolo)
}

const atualizarBolo = (indice, bolo) => {
    const dbBolo = lerBolos()
    dbBolo[indice] = bolo
    setLocalStorage(dbBolo)
}

const lerBolos = () => getLocalStorage()

const criarBolo = (bolo) => {
    const dbBolo = getLocalStorage()
    dbBolo.push(bolo)
    setLocalStorage(dbBolo)
}

const camposSaoValidos = () => {
    return document.getElementById('form').reportValidity()
}


const limparCampos = () => {
    const campos = document.querySelectorAll('.modal-field')
    campos.forEach(campo => campo.value = "")
    document.getElementById('url').dataset.indice = 'novo'
    document.querySelector(".modal-header>h2").textContent = 'Novo bolo'
}

const salvarBolo = () => {
    if (camposSaoValidos()) {
        const bolo = {
            url: document.getElementById('url').value,
            nome: document.getElementById('nome').value,
            peso: document.getElementById('peso').value,
            validade: document.getElementById('validade').value,
            preco: document.getElementById('preco').value,
        }
        const indice = document.getElementById('url').dataset.indice
        if (indice == 'novo') {
            criarBolo(bolo)
            atualizarTabela()
            fecharModal()
        } else {
            atualizarBolo(indice, bolo)
            atualizarTabela()
            fecharModal()
        }
    }
}

const criarLinha = (bolo, indice) => {
    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
        <img src="${bolo.url}">
        <td class="bloco-nome"><strong>${bolo.nome}<strong></td>
        <td class="bloco-peso">${bolo.peso} g</td>
        <td class="bloco-validade">${bolo.validade} dias</td>
        <td class="bloco-preco">R$ ${bolo.preco}</td>
        <td class="botoes-bolo">
            <button type="button" class="botao verde" id="editar-${indice}">Editar</button>
            <button type="button" class="botao vermelho" id="excluir-${indice}" >Excluir</button>
        </td>
    `
    document.querySelector('#tabela-bolo>tbody').appendChild(novaLinha)
}

const limparTabela = () => {
    const linhas = document.querySelectorAll('#tabela-bolo>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}

const atualizarTabela = () => {
    const dbBolo = lerBolos()
    limparTabela()
    dbBolo.forEach(criarLinha)
}

const preencherCampos = (bolo) => {
    const urlInput = document.getElementById('url');
    if (urlInput.dataset.indice === 'novo') {
        urlInput.value = "";
    }
    urlInput.value = bolo.url;    
    document.getElementById('url').value = bolo.url
    document.getElementById('nome').value = bolo.nome
    document.getElementById('peso').value = bolo.peso
    document.getElementById('validade').value = bolo.validade
    document.getElementById('preco').value = bolo.preco
    
    urlInput.dataset.indice = bolo.indice;
}

const editarBolo = (indice) => {
    const bolo = lerBolos()[indice]    
    bolo.indice = indice
    preencherCampos(bolo)
    document.querySelector(".modal-header>h2").textContent = `Editando ${bolo.nome}`
    abrirModal()
}

const editarExcluir = (evento) => {
    if (evento.target.type == 'button') {

        const [acao, indice] = evento.target.id.split('-')

        if (acao == 'editar') {
            editarBolo(indice)
        } else {
            const bolo = lerBolos()[indice]
            const resposta = confirm(`Deseja realmente excluir o bolo ${bolo.nome}`)
            if (resposta) {
                excluirBolo(indice)
                atualizarTabela()
            }
        }
    }
}

const bolosIniciaisAdicionados = localStorage.getItem('bolosIniciaisAdicionados')

if (!bolosIniciaisAdicionados) {
    
    const bolosIniciais = [
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2023/02/14115749/25972_chocolate_zero_540x400px.png', nome: 'Bolo de Chocolate', peso: '300', validade: '3', preco: '30' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/10/25112604/20412_fotos_104-frutas-vermelhas_bolo_fatia_540x400px100.png', nome: 'Bolo de Morango', peso: '500', validade: '2', preco: '50' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/10/25112608/20412_fotos_56-ganache-de-limao_bolo_fatia_540x400px56.png', nome: 'Bolo de Limão', peso: '250', validade: '2', preco: '25' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/10/25112545/Cenoura.png', nome: 'Bolo de Cenoura', peso: '600', validade: '3', preco: '40' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/09/25112612/20412_fotos_69-abacaxi-com-coco_zero-acucar_bolo_fatia_540x400px69-1.png', nome: 'Bolo de Coco', peso: '550', validade: '3', preco: '50' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/11/25112440/bolo_de_red_velvet_brasil_pedaco_615x500px-1-e1638550873689.png', nome: 'Bolo Redvelvet', peso: '250', validade: '3', preco: '40' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/10/25112607/20412_fotos_62-nozes_bolo_fatia_540x400px62.png', nome: 'Bolo de Nozes', peso: '340', validade: '3', preco: '50' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/09/25112612/20412_fotos_35-abacaxi_bolo_fatia_540x400px35.png', nome: 'Bolo de Abacaxi', peso: '700', validade: '2', preco: '50' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/09/25112614/20412_fotos_74-maracuja_zero-acucar_bolo_fatia_540x400px74.png', nome: 'Bolo de Maracujá', peso: '670', validade: '2', preco: '40' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/09/20172925/113_alpino_bolo-chocolate_fatia_540x400px.png', nome: 'Bolo de Café', peso: '650', validade: '3', preco: '80' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/09/25112559/20412_fotos_09-chocolate-com-amendoim_bolo_fatia_540x400px9-1.png', nome: 'Bolo de Amendoin', peso: '860', validade: '3', preco: '60' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/09/25112621/20412_fotos_14-delicia-de-coco_bolo_fatia_540x400px14.png', nome: 'Bolo de Prestigio', peso: '560', validade: '3', preco: '70' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/08/09094929/07_Brigadeiro-Tradicional_fatia_540x400-px.png', nome: 'Bolo de Brigadeiro', peso: '630', validade: '3', preco: '50' },
        { url: 'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/10/25112608/20412_fotos_54-delicia-de-leite-II_bolo_fatia_540x400px54.png', nome: 'Bolo de Leite ninho', peso: '590', validade: '3', preco: '75' },
    ];

    bolosIniciais.forEach(bolo => criarBolo(bolo));

    
    localStorage.setItem('bolosIniciaisAdicionados', true);
}

atualizarTabela()

document.getElementById('cadastrarBolo')
    .addEventListener('click', abrirModal)

document.getElementById('modalFechar')
    .addEventListener('click', fecharModal)

document.getElementById('salvar')
    .addEventListener('click', salvarBolo)

document.querySelector('#tabela-bolo>tbody')
    .addEventListener('click', editarExcluir)

document.getElementById('cancelar')
    .addEventListener('click', fecharModal) 