const checkboxSelecao = document.querySelector('#selecionarTodas')

checkboxSelecao.addEventListener('change', () => {

    if (checkboxSelecao.checked) {

        console.log(checkboxSelecao.value)
    } else {
        console.log(checkboxSelecao.value)
    }
})

const selecionarChk = document.querySelector('.arquivo')

selecionarChk.addEventListener('click', () => {
    if (checkboxSelecao.checked) {
        checkboxSelecao.checked = false
        console.log('descheckado');

    } else {
        checkboxSelecao.checked = true
        console.log('checkado');

    }
})

selecionarChk.style.cursor = 'pointer'