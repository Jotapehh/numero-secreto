let listaNumSort = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 0;


function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function msgInicial(){
    exibirTexto('h1', 'Jogo do Número secreto');
    exibirTexto('p', `Escolha um número entre 1 e ${numeroLimite}`);
}
msgInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        tentativas++;
        let msgTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTexto('h1', 'Acertou!!');
        exibirTexto('p', `Você descobriu o número secreto com ${tentativas} ${msgTentativas}`);
        
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled', true);
    }
    else if(chute > numeroSecreto && chute <= numeroLimite){
        tentativas++;
        exibirTexto('p', `O número secreto é menor que ${chute}`);
    }
    else if(chute < numeroSecreto && chute > 0){
        tentativas++;
        exibirTexto('p', `O número secreto é maior que ${chute}`);
    }
    else{
            if(chute > numeroLimite){
                exibirTexto('p', 'O número máximo foi atingido, escolha um menor ou igual a 10.');
            }
            if(chute < 1){
                exibirTexto('p', 'O número mínimo foi atigido, escolha um maior ou igual a 1');
            }

    }
    limparcampo();
}

function gerarNumero() {
    let numEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdElementosLista  = listaNumSort.length;

    if(qtdElementosLista == numeroLimite){
        listaNumSort = [];
    }

    if(listaNumSort.includes(numEscolhido)){
        return gerarNumero();
    }
    else{
        listaNumSort.push(numEscolhido);
        return numEscolhido;
    }
}
function limparcampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    numeroSecreto = gerarNumero();
    tentativas = 0;
    chute.value = '';
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chute').removeAttribute('disabled');
    msgInicial();

}