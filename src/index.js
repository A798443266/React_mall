import './assets/css/reset.css'
import './assets/css/index.css'
import dva from 'dva'
import { createBrowserHistory } from 'history'
import createLoading from 'dva-loading'
import models from './models'
import routers from './router.jsx'

const history = createBrowserHistory()
const app = dva({
  history,
  onError(e) {
    console.log('发生错误！')
  }
})

app.use(
  createLoading({
    namespace: 'isFetching',
    effects: true,
  })
);

models.forEach((model) => {
  app.model(model)
})

app.router(routers)

app.start('#root')
