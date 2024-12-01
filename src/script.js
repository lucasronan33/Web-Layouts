const label_tipoImpressao = document.getElementById('label_slct_tipo_impressao')
const slct_tipo_impressao = document.getElementById('slct_tipo_impressao')
// onchange=(event)=>{}

slct_tipo_impressao.addEventListener('change', (event) => {
    const tipoSelecionado = slct_tipo_impressao.value

    console.log(slct_tipo_impressao.value)
    if (slct_tipo_impressao.value !== 'recorte') {
        label_tipoImpressao.style.display = 'block'
    } else {
        label_tipoImpressao.style.display = 'none'
    }

    let formCorpo = document.querySelector('.corpo')

    switch (tipoSelecionado) {
        case 'uv':
            formCorpo.style.backgroundImage = 'url(../img/gabarito_layout_uv.png)'
            console.log('Background alterado')
            break;

        case 'adesivo':
            formCorpo.style.backgroundImage = 'url(../img/gabarito_layout_adesivo.png)'
            console.log('Background alterado')
            break;

        case 'recorte':
            formCorpo.style.backgroundImage = 'url(../img/gabarito_layout_recorte.png)'
            console.log('Background alterado')
            break;

        case 'tecido':
            formCorpo.style.backgroundImage = 'url(../img/gabarito_layout_tecido.png)'
            console.log('Background alterado')
            break;

        case 'lona':
            formCorpo.style.backgroundImage = 'url(../img/gabarito_layout_lona.png)'
            console.log('Background alterado')
            break;

        default:
            break;
    }

})


// console.log(tipoSelecionado)