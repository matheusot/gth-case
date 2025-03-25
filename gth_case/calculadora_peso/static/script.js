async function getPessoas(query = '') {
    let endpoint = '/api/pessoas/';
    if (query.length > 2) {
        endpoint = `/api/pessoas/search/?nome=${query}`;
    }

    const response = await fetch(endpoint);
    const result = await response.json();
    const rowsToRemove = document.querySelectorAll('#pessoas tbody tr');
    rowsToRemove.forEach(row => row.remove());

    if (result.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-4 pt-4" colspan="8">Nenhuma pessoa encontrada</td>
        `;
        tr.className = 'bg-white border-gray-200 hover:bg-gray-100';
        document.querySelector('#pessoas tbody').appendChild(tr);
    }

    result.forEach(pessoa => {
        const tr = document.createElement('tr');

        let data_nasc = '';
        if (pessoa.data_nasc) {
            data_nasc = pessoa.data_nasc.split('-').reverse().join('/');
        } else {
            data_nasc = 'Não informada';
        }

        let cpf = '';
        if (pessoa.cpf) {
            cpf = pessoa.cpf;
            try {
                cpf = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
            } catch (e) {
                console.error(e);
                cpf = pessoa.cpf;
            }
        } else {
            cpf = 'Não informado';
        }

        let sexo = pessoa.sexo === 'M' ? 'Masculino' : 'Feminino';
        pessoa.peso = pessoa.peso.toFixed(2).replace('.', ',');
        pessoa.altura = pessoa.altura.toFixed(2).replace('.', ',');

        tr.innerHTML = `
            <td class="px-4 py-2">${pessoa.id}</td>
            <td class="px-4 py-2">${pessoa.nome}</td>
            <td class="px-4 py-2">${data_nasc}</td>
            <td class="px-4 py-2">${cpf}</td>
            <td class="px-4 py-2">${sexo}</td>
            <td class="px-4 py-2">${pessoa.altura}</td>
            <td class="px-4 py-2">${pessoa.peso}</td>
            <td class="px-4 py-2 action-buttons">
                <button type="button" onclick="openModal('Editar Pessoa', ${pessoa.id})"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm p-1 bg-blue-600 text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm text-sm">
                    Editar
                </button>
                <button type="button" onclick="deletePessoa(${pessoa.id})"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm  p-1 bg-red-600 text-base text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-1 sm:w-auto sm text-sm">
                    Excluir
                </button>
                <button type="button" onclick="openPesoIdealModal(${pessoa.id})"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm p-1 bg-green-600 text-base text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-1 sm:w-auto sm text-sm">
                    Peso Ideal
                </button>
            </td>
        `;
        tr.className = 'bg-white border-gray-200 hover:bg-gray-100';
        document.querySelector('#pessoas tbody').appendChild(tr);
    });

    const actionButtons = document.querySelectorAll('.action-buttons');
    if (query.length > 2) {
        actionButtons.forEach(button => button.style.display = 'block');
    } else {
        actionButtons.forEach(button => button.style.display = 'none');
    }
}

async function getPessoa(id) {
    const response = await fetch(`/api/pessoas/${id}/`);
    const result = await response.json();
    return result;
}

async function deletePessoa(id) {
    await fetch(`/api/pessoas/${id}/`, {
        method: 'DELETE',
    }).then(() => {
        getPessoas(document.querySelector('#busca').value);
    }).catch(err => {
        console.error(err);
    });
}

const openModal = (title, id = null) => {
    document.querySelector('#modal').style.display = 'block';
    document.querySelector('#modal-title').innerText = title;
    if (id) {
        getPessoa(id).then(pessoa => {
            document.querySelector('#pessoaId').value = pessoa.id;
            document.querySelector('#nome').value = pessoa.nome;
            document.querySelector('#data_nasc').value = pessoa.data_nasc;
            document.querySelector('#cpf').value = pessoa.cpf;
            document.querySelector('#sexo').value = pessoa.sexo;
            document.querySelector('#altura').value = pessoa.altura;
            document.querySelector('#peso').value = pessoa.peso;
        });
    }
}

const closeModal = () => {
    document.querySelector('#pessoaId').value = '';
    document.querySelector('#modal-form').reset();
    document.querySelector('#modal').style.display = 'none';
    showErrors([], 'errors');
}

const showErrors = (errors, id) => {
    const errorsDiv = document.querySelector(`#${id}`);
    let errorText = '<div class="py-2">';
    for (field in errors) {
        errorText += `<p>${errors[field][0]}</p>`;
    }
    errorText += '</div>';
    errorsDiv.innerHTML = errorText;
}

const openPesoIdealModal = async (id) => {
    document.querySelector('#pesoIdealModal').style.display = 'block';
    fetch(`/api/pessoas/${id}/peso_ideal`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(response => {
            document.querySelector('#pesoIdeal').innerText = "O peso ideal é " + response.peso_ideal
        })
        .catch(err => console.error(err));
}

const closePesoIdealModal = () => {
    document.querySelector('#pesoIdeal').innerText = '';
    document.querySelector('#pesoIdealModal').style.display = 'none';
}

const updatePessoa = async () => {
    const data = {
        nome: document.querySelector('#nome').value,
        data_nasc: document.querySelector('#data_nasc').value,
        cpf: document.querySelector('#cpf').value,
        sexo: document.querySelector('#sexo').value,
        altura: document.querySelector('#altura').value,
        peso: document.querySelector('#peso').value,
    };

    if (data.cpf === '') {
        data.cpf = null;
    }

    if (data.data_nasc === '') {
        data.data_nasc = null;
    }

    fetch(`/api/pessoas/${document.querySelector('#pessoaId').value}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (!response.ok) {
            const errorData = await response.json();
            showErrors(errorData, 'errors');
            return;
        }
        getPessoas(document.querySelector('#busca').value);
        closeModal();
    }).catch(err => {
        console.log(err);
    });
}

const createPessoa = async () => {
    const data = {
        nome: document.querySelector('#nome').value,
        data_nasc: document.querySelector('#data_nasc').value,
        cpf: document.querySelector('#cpf').value,
        sexo: document.querySelector('#sexo').value,
        altura: document.querySelector('#altura').value,
        peso: document.querySelector('#peso').value,
    };

    if (data.cpf === '') {
        data.cpf = null;
    }

    if (data.data_nasc === '') {
        data.data_nasc = null;
    }

    fetch('/api/pessoas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(async (response) => {
        if (!response.ok) {
            const errorData = await response.json();
            showErrors(errorData, 'errors');
            return;
        }
        getPessoas(document.querySelector('#busca').value);
        closeModal();
    }).catch(err => {
        console.log(err);
    });
}

document.querySelector('#busca').oninput = function () {
    getPessoas(this.value);
};

document.querySelector('#adicionar-modal').onclick = () => {
    openModal('Adicionar Pessoa');
};

document.querySelector('#salvar').onclick = () => {
    if (document.querySelector('#pessoaId').value) {
        updatePessoa();
    } else {
        createPessoa();
    }
}

document.querySelector('#cancelar').onclick = () => {
    closeModal();
}

document.querySelector('#pesoIdealFechar').onclick = () => {
    closePesoIdealModal();
}

document.onload = getPessoas();
