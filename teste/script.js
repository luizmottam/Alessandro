let impressoras = [];
localStorage.setItem("test","test")

// LIMPAR FORMULARIO
function limparFormulario() {
    $('#id').val('');
    $('#nome').val('');
    $('#link').val('');
    $('#qtnPreto').val('');
    $('#qtnCiano').val('');
    $('#qtnMagenta').val('');
    $('#qtnAmarelo').val('');
}

// CARREGAR DO LOCALSTORAGE
function carregarDadosDoLocalStorage() {
    const impressorasSalvas = localStorage.getItem('impressoras');
    if (impressorasSalvas) {
        impressoras = JSON.parse(impressorasSalvas);
    }
}

// SALVAR NO LOCALSTORAGE
function salvarDadosNoLocalStorage() {
    const impressorasSalvas = JSON.stringify(impressoras);
    localStorage.setItem('impressoras', impressorasSalvas);
}

// ADICIONAR IMPRESSORA
function adicionarImpressora(idImp, nome, link, qtnPreto, qtnCiano, qtnMagenta, qtnAmarelo) {
    if (idImp === null || idImp === undefined || idImp <= 0) {

        const novaImpressora = {
            id: impressoras.length + 1,
            nome: nome,
            link: link,
            qtnPreto: qtnPreto,
            qtnCiano: qtnCiano,
            qtnMagenta: qtnMagenta,
            qtnAmarelo: qtnAmarelo
        };
        impressoras.push(novaImpressora);
    } else {

        const impressora = impressoras.find((item) => item.id === idImp);
        if (impressora) {
            impressora.nome = nome;
            impressora.link = link;
            impressora.qtnPreto = qtnPreto;
            impressora.qtnCiano = qtnCiano;
            impressora.qtnMagenta = qtnMagenta;
            impressora.qtnAmarelo = qtnAmarelo;
        }
    }


    salvarDadosNoLocalStorage();
}

// ADICIONAR IMPRESSORA
function adicionarImpressora(idImp, nome, link, qtnPreto, qtnCiano, qtnMagenta, qtnAmarelo) {

    if (idImp === null || idImp === undefined || idImp <= 0) {

    } else {
        excluirImpressora(idImp)
    }

    const novaImpressora = {
        id: impressoras.length + 1,
        nome: nome,
        link: link,
        qtnPreto: qtnPreto,
        qtnCiano: qtnCiano,
        qtnMagenta: qtnMagenta,
        qtnAmarelo: qtnAmarelo
    };
    impressoras.push(novaImpressora);

}

// MOSTRAR CAMPOS
function mostrarCamposQuantidade() {
    const selectMes = document.getElementById('inlineFormCustomSelectPref');
    const camposQuantidadeDiv = document.getElementById('camposQuantidadeDiv');

    if (selectMes.value === "Selecione um Mes") {
        camposQuantidadeDiv.style.display = 'none';
    } else {
        camposQuantidadeDiv.style.display = 'block';
    }
}

// VALIDAR FORMULARIO
function validarFormulario(event) {
    const qtnPreto = parseInt($('#qtnPreto').val());
    const qtnCiano = parseInt($('#qtnCiano').val());
    const qtnMagenta = parseInt($('#qtnMagenta').val());
    const qtnAmarelo = parseInt($('#qtnAmarelo').val());

    if (qtnPreto < 0 || qtnCiano < 0 || qtnMagenta < 0 || qtnAmarelo < 0) {
        event.preventDefault();
        alert('A quantidade não pode ser negativa ou zero.');
    }
}

// RENDERIZAR TABELA
function renderizarTabela() {
    const tabelaImpressoras = $('#tabelaImpressoras');
    tabelaImpressoras.empty();
    impressoras.forEach((impressora) => {
        const row = $('<tr></tr>');
        row.append(`<td>${impressora.id}</td>`);
        row.append(`<td>${impressora.nome}</td>`);
        row.append(`<td>${impressora.link}</td>`);
        row.append(`<td>${impressora.qtnPreto}</td>`);
        row.append(`<td>${impressora.qtnCiano}</td>`);
        row.append(`<td>${impressora.qtnMagenta}</td>`);
        row.append(`<td>${impressora.qtnAmarelo}</td>`);
        row.append(`
                    <td>
                        <button type="button" class="btn btn-danger" onclick="excluirImpressora(${impressora.id})">Excluir</button>
                        <button type="button" class="btn btn-warning" onclick="editarFormulario(${impressora.id})" data-toggle="modal" data-target="#formularioModal">Editar</button>
                    </td>
                `);
        tabelaImpressoras.append(row);
    });
}

// EDITAR FOMULARIO
function editarFormulario(id) {

    const impressora = impressoras.find((item) => item.id === id);
    $('#id').val(impressora.id);
    $('#nome').val(impressora.nome);
    $('#link').val(impressora.link);
    $('#qtnPreto').val(impressora.qtnPreto);
    $('#qtnCiano').val(impressora.qtnCiano);
    $('#qtnMagenta').val(impressora.qtnMagenta);
    $('#qtnAmarelo').val(impressora.qtnAmarelo);

    // Exibir o formulário de edição e ocultar a tabela de impressoras
    $('#tabelaImpressorasDiv').hide();
    $('#formEdicaoDiv').show();
}


// EXCLUIR
function excluirImpressora(id) {
    impressoras = impressoras.filter((impressora) => impressora.id !== id);
    renderizarTabela();
}

$('#impressoraForm').submit(function (event) {
    event.preventDefault();
    const idImp = parseInt($('#id').val());
    const nome = $('#nome').val();
    const link = $('#link').val();
    const qtnPreto = $('#qtnPreto').val();
    const qtnCiano = $('#qtnCiano').val();
    const qtnMagenta = $('#qtnMagenta').val();
    const qtnAmarelo = $('#qtnAmarelo').val();
    adicionarImpressora(idImp, nome, link, qtnPreto, qtnCiano, qtnMagenta, qtnAmarelo);
    renderizarTabela();
    $('#impressoraForm').trigger("reset");
});
// Renderiza a tabela ao carregar a página
renderizarTabela();
