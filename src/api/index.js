/**
 * 包含应用中所有请求接口的函数：接口请求函数
 * 函数的返回值都是promise
 */
import ajax from './ajax'
//引入qs包，将json对象请求转成x-www-form-urlencoded格式请求
/*import qs from 'qs'*/


//请求登录

//方法1、简写成箭头函数，并将ajax当作对象发post请求
export const reqLogin = (username, password) => ajax.post('/login', {username, password});

//方法2、原始的请求函数形式
/*export function reqLogin(username, password) {
    return ajax({  //data是对象，默认使用json格式的请求体携带参数数据
        method: 'post',
        url: '/login',
        data: {
            username,
            password
        }
        /!*data: qs.stringify({username, password})*!/
    })
}*/


/*
const name = 'admin';
const pwd = 'admin';
reqLogin(name, pwd).then(result => {
    /!*const result = response.data;*!/
    console.log('请求成功', result)
}/!*, error => {
    console.log('请求失败', error)
}*!/);*/
