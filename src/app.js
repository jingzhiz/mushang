import bootstrap, * as functions from './utils/extendApi'
import ajax, { get } from './utils/request'

bootstrap(functions)

App({
  async onShow() {
    const res = await ajax.get('/index/findBanner')

    console.log(res)
  }
})