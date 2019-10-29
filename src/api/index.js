/**
 * 包含应用中所有请求接口的函数：接口请求函数
 * 函数的返回值都是promise
 */
import ajax from './ajax'
//引入qs包，将json对象请求转成x-www-form-urlencoded格式请求
/*import qs from 'qs'*/
// 通过jsonp包来发送jsonp请求，axios不能发jsonp请求
import jsonp from 'jsonp'

import { message } from 'antd';

const BASE = '';
/**
 * 发送登录请求
 */

//方法1、简写成箭头函数，并将ajax当作对象发post请求
export const reqLogin = (username, password) => ajax.post(BASE+'/login', {username, password});
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

/**
 * 发送天气信息的jsonp请求
 */
export const reqWeather = (city) => {
    // 执行器函数: 内部去执行异步任务,
    // 成功了调用resolve(), 失败了不调用reject(), 直接提示错误
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url, {}, (error, data) => {
            if (!error && data.error===0) { //成功的
                const {dayPictureUrl, weather} = data.results[0].weather_data[0];
                resolve({dayPictureUrl, weather})
            } else { //失败的
                message.error('获取天气信息失败')
            }
        })
    });
};

/**
 * 发送获取分类列表的请求
 */
export const reqCategories = () => ajax(BASE + '/manage/category/list'); //get请求可以省略get

/**
 * 添加分类
 */
export const reqAddcategory = (categoryName) => ajax.post(BASE + '/manage/category/add', {categoryName});

/**
 * 修改分类
 */
export const reqUpdatecategory = ({categoryId, categoryName}) => ajax.post(BASE + '/manage/category/update', {
    categoryId,
    categoryName
});

/**
 * 获取商品分页列表
 */
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {
    params: { //包含所有query参数的对象
        pageNum,
        pageSize
    }
});

/**
 * 获取商品分页列表
 */
export const reqSearchProducts = ({
        pageNum,
        pageSize,
        searchName,
        searchType  //它的值是'productName'或者'productDesc'
    }) => ajax(BASE + '/manage/product/search', {
        params: {
            pageNum,
            pageSize,
            [searchType]: searchName, //属性名加[]表示取这个属性名的值，这种情况用于属性值固定，而属性名不固定
    }
});