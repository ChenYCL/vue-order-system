
import axios from 'axios'
import qs from 'qs';
let axiosIns = axios.create({});

const axiosIns = axios.create()
if (process.env.NODE_ENV === 'development') {
  axiosIns.defaults.baseURL = 'http://192.168.*.*:8080'
}
// 添加请求拦截器
axiosIns.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  let token = window.localStorage.getItem('token')
  // 把token放到参数里面
  // if (token && config.params) {
  //   config.params.token = token
  // } else {
  //   config.params = { 'token': token }
  // }
  // 把token放到header里面
  if (token) {
    config.headers['token'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  console.log('错误的传参')
  return Promise.reject(error)
})

axiosIns.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (!res.data) {
    return Promise.reject(res)
  }
  return res
}, (error) => {
  return Promise.reject(error)
})
const ajaxMethod = ['get', 'post']
const api = {}
ajaxMethod.forEach((method) => {
  api[method] = function (uri, data, config) {
    return new Promise(function (resolve, reject) {
      axiosIns[method](uri, data, config).then((response) => {
        if (response.data.code === 500) {
          instance.$notify({
            title: '温馨提示',
            message: response.data.msg,
            position: 'top-right'
          })
        } else if (response.data.code === 2000) {
          instance.$notify({
            title: '参数错误',
            message: response.data.msg,
            position: 'top-right'
          })
        } else if (response.data.code === 401) {
          instance.$notify({
            title: '温馨提示',
            message: '登录信息失效，请重新登陆',
            position: 'top-right'
          })
          instance.$router.replace('/login')
        } else if (response.data.code === 0) {
          resolve(response)
        }
      }).catch(function (error) {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          instance.$notify({
            title: '温馨提示',
            message: '网络故障',
            position: 'top-right'
          })
          console.log(error)
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
    })
  }
})

Vue.prototype.$axios = api

Vue.config.productionTip = false

//.....
let instance =new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});

/* 1 根据process.env.NODE_ENV 获取对应的apiDomain
 * 2 处理ajax库axios，为了以后不重复引用，挂在原型对象上
 * 3 axios是封装在main.js里面的，是为了获取vue实例操作store、router
 * 4 组件里面使用this.$axios.get or  this.$axios.post 调用  使用debugger，查看接口返回数据的走向
 */
