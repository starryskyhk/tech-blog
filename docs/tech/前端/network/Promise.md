---
title: Promise基础
tag: [promise,axios]
slug: /tech/frontend/network/promise
date: 2024-01-30T20:04
---
# Promise

## 基本使用
```javascript
new Promise((resolve,reject)=>{
  resolve()
}).then(()=>{})
```

```javascript
<script>
    setTimeout(()=>{
      console.log('Hello World');
    },1000)
    //参数->函数(resolve,reject)
    //resole,reject本身也是函数
    new Promise((resolve,reject)=>{
      //第一次请求
      setTimeout(()=>{
        resolve();
    },1000)
    }).then(()=>{
      //第一次结果处理
      console.log('Hello World');

      return new Promise((resolve,reject)=>{
        //第二次请求
        setTimeout(() => {
          resolve();
        }, 1000);
      }).then(()=>{
        //第二次结果处理
        console.log('Hello');
        return new Promise((resolve,reject)=>{
          resolve();
        }).then(()=>{
          console.log('HHH');
        })
      })
    })
 </script>
```

处理请求的数据

```javascript
new Promise((resolve,reject)=>{
    resolve(data);
    reject(err)
}).then((data)=>{
    //处理数据
}).catch(err=>{
    //处理错误
})
```

## Promise三种状态

`pending`：等待状态，比如正在进行网络请求或定时器没有到时间

`fulfill`：满足状态，当主动回调了resolve时，就处于该状态，并且会回调.then()

`reject`：  拒绝状态，当主动回调了reject时，就处于该状态，并且会回调.catch()

另类写法

```javascript
//结构，函数1为处理请求成功的函数，函数2为处理请求失败的函数
new Promise((resolve,reject)=>{
    resolve('ff');
    reject('ddd');
}).then(函数1，函数2)
//案例
new Promise((resolve,reject)=>{
    //  resolve('resolve');
    reject('reject');
}).then(data=>{
    //处理正确请求
    console.log(data);
},err=>{
    //处理错误请求
    console.log(err)
})
```

## Promise的链式调用

```javascript
return new Promise((resolve,reject)=>{reslove(res+'111')}) 
等价于 return Promise.resolve(res+'111') 
等价于 return res+'111'
<script>
    new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('aaa')
    }, 1000);
}).then(res=>{
    //1:自己处理
    console.log(res,'第一层的处理代码')
    //2:第一种简写
    return res+'122';
}).then(res=>{
    console.log(res,  '第二层的处理')
    //第二种简写
    return Promise.resolve(res+'111')
    //请求错误时，第一种
    return Promise.reject('error')
    //第二种,手动抛出异常
    throw 'error message'
}).then(res=>{
    console.log(res,'第三层')
}).catch(err=>{
    console.log(err)
})
</script>
```

## Promise的All方法

```javascript
<script>
    //传入数组，当所有请求处理完成后会执行then方法，所有的结果会保存至results中
    Promise.all([
    new Promise((resolve, reject) => {
        $.ajax({
            url: 'url1',
            success: function (data) {
                resolve(data);
            }
        })
    }),
    new Promise((resolve, reject) => {
        $.ajax({
            url: 'url2',
            success: function (data) {
                resolve(data);
            }
        })
    })
]).then(results=>{
    //保存第一个请求的结果
    result[0]
    //保存第二个请求的结果
    result[1]
})
</script>
```

# Axios

## 功能特点

在浏览器中发送XMLHttpRequests请求

在node.js中发送http请求

支持Promise API

拦截请求和响应

转换请求和响应数据

## axiox请求方式

`axios(config)`

`axios.request(config)`

`axios.get(url,[,config])`

`axios.delete(url,[,config])`

`axios.head	(url,[,config])`

`axios.post(url,[,config])`

`axios.put(url,[,config])`

`axios.patch(url,[,config])`

### 案例

```javascript

axios({
  url: 'http://123.207.32.32:8000/home/multidata',
  method: 'get'
}).then(res=>{
  console.log(res)
})

axios.get('http://123.207.32.32:8000/home/data?type=sell&page=1',{
  params: {
    type: 'sell',
    page: 1
  }
}).then(res=>{
  console.log(res);
})
```

### 并发请求

```javascript
//并发请求
axios.all([axios(),axios()]).then(results=>{
  
})
//并发请求
axios.all([axios({
  url: 'http://123.207.32.32:8000/home/multidata',

}),axios({
  url: 'http://123.207.32.32:8000/home/data?type=sell&page=1',
  params: {
    type: 'sell',
    page: 1
  }
})]).then(results=>{
  console.log(results)
})
```

结果简写

将结果通过axios.spread进行分开

```javascript
//并发请求
axios.all([axios({
  url: 'http://123.207.32.32:8000/home/multidata',

}),axios({
  url: 'http://123.207.32.32:8000/home/data?type=sell&page=1',
  params: {
    type: 'sell',
    page: 1
  }
})]).then(axios.spread((res1,res2)=>{
  console.log(res1);
  console.log(res2);
}))
```

## axios的全局配置

 常见的配置选项

- 请求地址
  - url:'/user'
- 请求类型
  - method：'get'
- 请根路径
  - baseURL：'http://www.mt.com/api'
- 请求前数据处理
  - transformRequest：[function(data){}]
- 请求后数据处理
  - transformResponse：[function(data){}]
- 自定义请求头
  - headers：{'x-Requested-With':'XMLHttpReuest'}
- URL查询对象
  - params:{id:12}
- 响应数据格式
  - responseType:'json'
- 超时设置
  - timeout:1000

```javascript
//全局配置
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 5000
//并发请求
axios.all([axios({
  url: '/home/multidata',
  ......
}))
```

## axios的封装(四种)

第一种

```javascript
//第一种，定义
export function request(config,success,failure) {
  //1:创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.57.242.221:8080',
    timeout: 5000
  })

  instance(config).then(res=>{
    success(res)
  })
  .catch(err=>{
    failure(err)
  })
//使用
request({
  url: '/home'
  },res=>{

  },
  err=>{

  })
```

第二种

```javascript
//第二种，定义
export function request(config) {
  //1:创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.57.242.221:8080',
    timeout: 5000
  })

  instance(config.baseConfig).then(res=>{
    success(res)
  })
  .catch(err=>{
    failure(err)
  })
//使用
request({
  baseConfig: {
    
  },
  success: res=>{

  },
  failure: err=>{

  }
})
```

第三种

```javascript
//第三种：封装
export function request(config) {
  return new Promise((resolve, reject) => {
    //1:创建axios实例
    const instance = axios.create({
      baseURL: 'http://123.57.242.221:8080',
      timeout: 5000
    })

    instance(config).then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}
//使用
request({
  url: '/home'
}).then(res=>{

}).catch(err=>{
  
})
```

第四种

```javascript
//第四种：封装
export function request(config) {
  const intance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  return instance(config);
}
request({
  url: '/home/multidata',
  method: 'get'
}).then(res=>{
  console.log(res)
})
```

## axios拦截器

```javascript
export function request(config,success,error){
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  //拦截器
  instance.interceptors.request.use(config=>{
    //1:拦截config中一些不属于服务器的要求
    //2:请求过程中，圆圈的转动
    //3:某些网络请求(登录(token))，必须携带一些特殊信息
    console.log(config);
    return config;
  },error=>{

  })
  //响应拦截
  instance.interceptors.response.use(res=>{
    return res;
  }, err=>{

  })
  instance(config).then(res=>{
    success(res)
  }).catch(err=>{
    error(err)
  })
}

```



