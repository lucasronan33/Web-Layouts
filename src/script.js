const label_tipoImpressao = document.getElementById('label_slct_tipo_impressao')
const slct_tipo_impressao = document.getElementById('slct_tipo_impressao')

// onchange=(event)=>{}

slct_tipo_impressao.addEventListener('change', (event) => {
    console.log(slct_tipo_impressao.value)
    if (slct_tipo_impressao.value !== 'recorte') {
        label_tipoImpressao.style.display = 'block'
    } else {
        label_tipoImpressao.style.display = 'none'
    }
})


// console.log(tipoSelecionado)