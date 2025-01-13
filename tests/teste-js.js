const checkboxSelecao = document.querySelector('#selecionarTodas')

checkboxSelecao.addEventListener('change', () => {

    if (checkboxSelecao.checked) {

        console.log(checkboxSelecao.value)
    } else {
        console.log(checkboxSelecao.value)
    }
})

const selecionarChk = document.querySelector('.arquivo')

function marcaDesmarcaCheckbox(elemento, checkbox) {

    elemento.addEventListener('click', () => {
        if (checkbox.checked) {
            checkbox.checked = false
            console.log('descheckado');

        } else {
            checkbox.checked = true
            console.log('checkado');

        }
    })

}
selecionarChk.style.cursor = 'pointer'