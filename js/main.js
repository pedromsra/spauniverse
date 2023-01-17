import {Router} from './routes.js'

const router = new Router()

//Cria as rotas:
router.add('/', '/pages/home.html')
router.add('/universe', '/pages/universe.html')
router.add('/exploration', '/pages/exploration.html')
router.add(404, '/pages/404.html')
//

router.handle()//adiciona a pagina desejada no html index para ser exibida

window.onpopstate = () => router.handle() //caso a avance ou retorne no navegador
window.route = () => router.route() //deixando route() global