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

    // CODIGO TEMPORARIO
    // alteração de gabarito de background
    let formCorpo = document.querySelector('.corpo')
    info_adicionalStyle = document.querySelector('.info_adicional').style
    let classeElemento

    let i = 6
    function esconderEstiloBotao() {
        let esconder = formCorpo.getElementsByClassName('estilo_botao')
        for (i; i < esconder.length; i++) {

            if (i > 8) {
                break
            }
            console.log('for:', esconder.length)
            esconder[i].style.display = 'none'

        }
    }
    function mostrarEstiloBotao() {
        let esconder = formCorpo.getElementsByClassName('estilo_botao')
        for (i; i < esconder.length; i++) {

            if (i > 8) {
                break
            }
            console.log('for:', esconder.length)
            esconder[i].style.display = 'flex'

        }
    }
    switch (tipoSelecionado) {
        case 'uv':
            formCorpo.style.backgroundImage = 'url(../img/gabarito_layout_uv.png)'
            console.log('Background alterado')
            i = 6
            console.log('i: ' + i)

            mostrarEstiloBotao()

            break;

        case 'adesivo':
            formCorpo.style.backgroundImage = 'url(../img/gabarito_layout_adesivo.png)'
            console.log('Background alterado')
            mostrarEstiloBotao()
            break;

        case 'recorte':
            formCorpo.style.backgroundImage = 'url(../img/gabarito_layout_recorte.png)'
            console.log('Background alterado')

            console.log('i: ' + i)
            mostrarEstiloBotao()
            i = 7
            esconderEstiloBotao()

            break;

        case 'tecido':
            formCorpo.style.backgroundImage = 'url(../img/gabarito_layout_lona.png)'
            console.log('Background alterado')

            mostrarEstiloBotao()
            i = 6
            esconderEstiloBotao()

            break;

        case 'lona':
            formCorpo.style.backgroundImage = 'url(../img/gabarito_layout_lona.png)'
            console.log('Background alterado')

            mostrarEstiloBotao()
            i = 6
            esconderEstiloBotao()

            break;
    }

})
