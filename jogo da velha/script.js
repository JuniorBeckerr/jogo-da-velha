// dados iniciais

let frame = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset()
// eventos
//evento de reset para resetar configs
document.querySelector('.reset').addEventListener('click', reset)
//evento para selecionar todas as casas com foreach, aplicar um evento e uma func
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemclick);
})

//funçoes

//func de adicionar o evento na tela de click 
function itemclick(event){
    let item = event.target.getAttribute('data-item');
    if( playing && frame[item] === ''){
        frame[item] = player;
        renderframe()
        toggleplayer()
    }
}


// func de resetar/zerar infos e gerar play random
function reset(){
    warning = '';

    //gerar player X ou O aleatoriamente
    let random = Math.floor(Math.random() * 2)
    player = (random === 0) ? 'x' : 'o';

    // if(random === 0){
    //     player = 'x'
    // }else {
    //     player = 'o'
    // }

    //varer todos os itens dentro do quadro transformando em '' vazio
    for(let itm in frame){
        frame[itm] = '';
    }

    //ativar jogo
    playing = true;

    renderframe()
    renderinfo()
}

//renderizar na tela o item, se item diferente de vazio renderizar dentro do quadro
function renderframe(){
    for(let itm in frame){
        let item = document.querySelector(`div[data-item=${itm}]`)
            item.innerHTML = frame[itm]
    
        }
        checkgame()
}

//renderizar na tela o placar
function renderinfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

//func que vai mudar o player a cada jogada
function toggleplayer(){
    player = (player ==='x') ? 'o' : 'x';
    // if(player === 'x'){
    //     player = 'o'
    // }else{
    //     player = 'x'
    // }
    renderinfo()
}

// func que vai fzer as 4 verificaçoes, se o x ganhou, se o o ganhou, se empatou, ou nao faz nada
function checkgame(){
    if(checkWinnerFor('x')){
        warning = 'O "X" venceu'
        playing = false;
    }else  if(checkWinnerFor('o')){
        warning = 'O "O" venceu'
        playing = false;
    } else if(draw()){
        warning = 'Deu empate'
        playing = false
    }
}

//func pra verificar ganhador
function checkWinnerFor(player){
    //let das posibilidades 
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

     //vai fazer uma varredura em pos e criar um array pra cada item que esta separado por virgula
    for(let w in pos){
        let pArray = pos[w].split(',');
        //cria o check pra saber se o player marcou alguma das opçoes do array, se sim ele ganhou
        let winner = pArray.every(option => frame[option] === player)
            if(winner){
                return true
            }
        }
        //caso passe pelo for inteiro e nao achou nenhum vencedor cque condiz com as arrays, entao retorna falso
        return false
    }
//basicamente o for rodou um loop pra verificar se o player está com alguma dessas posibilidades preenchidas, caso nao esteje retorna false



//func pra verificar se deu empate
function draw(){
    for(let i in frame){
        if(frame[i] ===''){
            return false
        }
    }
    return true
}