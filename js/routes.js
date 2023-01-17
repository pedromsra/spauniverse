export class Router {
    routes = {}
    routesName = []

    add(routeName, page) {
        this.routes[routeName] = page //objeto com nome da rota e a pagina de destino

        this.routesName.push(routeName) //para alterar font-weight dos links da navbar de acordo com a página que estou vendo
    }

    route (event) {
        event = event || window.event //para ter algum elemento
        event.preventDefault() //evitar atualização da página
        window.history.pushState({}, "", event.target.href) //pegar url(href) destino do event, no caso, do clique, adicionando ao historico do navegador
        this.handle() //adiciona a pagina desejada no html index para ser exibida
    }

    handle() {
        const {pathname} = window.location //peagar nome da rota que esta sendo vista no momento
        const route = this.routes[pathname] || this.routes[404] //definir a variável para a página exibida (/page/exemplo.html)

        document.documentElement.style.setProperty('--bg-image-', getComputedStyle(document.documentElement).getPropertyValue('--bg-image-0' + pathname.substring(1))) //para alterar a imagem exibida de acord com a página
        this.routesName.forEach(function (index) {
            if (index != 404) {
                document.getElementById('a0' + index.substring(1)).style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw') //para restaurar a font-weight de todos os intens da navbar
            }
        });
        document.getElementById('a0' + pathname.substring(1)).style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw-solid') //para aplicar a nova font-weight
        fetch(route) //buscar pagina
        .then(data => data.text()) //pega o retorno do fetch(data) e retorna em forma de texto
        .then(html => {
            document.querySelector('#app').innerHTML = html //adicionar esse texto ao id:app no index.html
        })


    }


}