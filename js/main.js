var colunasPorLinha = 2;
var resultados = 9;

// ready
$(document).ready(function (){
    buscarDestaque();
    buscarConteudo();
    utilitarios();
    $('.load').hide();
});

// eventos e cliques
$('#vai').click( function () {
    buscarConteudo($('#busca')[0].value)
});

document.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        buscarConteudo($('#busca')[0].value);
    }
 }, false);

$('#mostrarMais').click(function (){
    resultados = resultados + 3;
    buscarConteudo($('#busca')[0].value);
})

// manipulação de noticias
function buscarConteudo(query,category){
    let url = 'https://newsapi.org/v2/top-headlines?country=br&category=general&apiKey=6abfa0117cdc455ab8101fb433bfb4c0';
    if(category){
        url = `https://newsapi.org/v2/top-headlines?country=br&category=${category}&apiKey=6abfa0117cdc455ab8101fb433bfb4c0`;
    }
    if(query){
        url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=6abfa0117cdc455ab8101fb433bfb4c0`;
    }
    $.ajax({
        url: url,
        success: function (data){
            let noticias = data.articles;
            let coluna = 0;
            let html = '';
            for(let i = 1; i <= resultados ;i++){
                html += listNoticias(noticias[i],coluna);
                if(coluna > colunasPorLinha)
                    coluna = 0;
                coluna++;
                
            }
            $('[list-noticias]')[0].innerHTML = html;
        }
    });
}

function buscarDestaque(){
    let url = 'https://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=6abfa0117cdc455ab8101fb433bfb4c0';
    $.ajax({
        url: url,
        success: function (data){
            let noticias = data.articles;
            let html = '';
            for(let i = 0; i < 4 ;i++){
                html += itemCarousel(noticias[i]);
            }
            $('.slider__inner')[0].innerHTML = html;
        }
    });
}

const listNoticias = (data,coluna) => {
    let html = '';
    
    if(coluna === 0)
        html += '<div class="noticias">';

    if(coluna > colunasPorLinha)
        html += '</div><div class="noticias">';

    html +=
    `
    <div class="noticia">
        <h3 id="n1Titulo">${data.title}</h3>
        <img id="n1Imagem" src="${data.urlToImage}" alt="" width="10%">
        <p id="n1Texto">${data.content}</p>
        <a id="n1Mais" href="${data.url}">Mais</a>
    </div>
    `;
    
    return html;
}

const itemCarousel = (data) =>{
    return (
        `
        <div class="slider__contents"><i class="slider__image fa fa-newspaper-o"></i>
            <h2 class="slider__caption">${data.title}</h2>
                <p class="slider__txt"><a href="${data.url}">${data.description}</a></p>
        </div>
        `
        
    )
}

// utilitarios
const utilitarios = () =>{
    let date = new Date();
    $('.hora')[0].innerText = date.getHours() + ':' + date.getMinutes();
    $('.temperatura')[0].innerText = Math.round(22.5) + '°';
    $('.dolar')[0].innerText = 'R$ 3.50';
    $('.euro')[0].innerText = 'R$ 4.80';
    $('.data')[0].innerText = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}
