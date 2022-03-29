'use strict';

/*
    <label class="todo__item">
                <input type="checkbox">
                <div>teste de item 1</div>
                <input type="button" value="X">
            </label>

*/

// let banco = [
//     {'tarefa': 'Estudar', 'status' : ''},
//     {'tarefa': 'netflix', 'status' : 'checked'},
//     {'tarefa': 'Estudar', 'status' : ''},
//     {'tarefa': 'netflix', 'status' : 'checked'}
// ]

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

//declarei essa variavel global pra não ter q refazela varias vezes
const banco = getBanco()

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice = ${indice}>
    `

    document.getElementById('todoList').appendChild(item)
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList')
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas()
    banco.forEach((item, indice )=> criarItem(item.tarefa, item.status, indice))
}



const inserirTarefa = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value
    if(tecla === 'Enter'){
        banco.push({'tarefa': texto, 'status' : ''})
        setBanco(banco)
        atualizarTela()
       evento.target.value = ''
    }
}

const removeItem = (indice) => {
    banco.splice(indice,1)
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice) => {
    banco[indice].status = banco[indice].status == '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela()
}

const clickItem = (evento) => {
    const elemento = evento.target
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removeItem(indice)
    }else if(elemento.type == 'checkbox'){
        const indice = elemento.dataset.indice
        atualizarItem(indice)
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirTarefa)

document.getElementById('todoList').addEventListener('click', clickItem)

atualizarTela()