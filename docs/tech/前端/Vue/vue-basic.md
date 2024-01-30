---
title: Vue基础
tag: [Vue]
slug: /tech/frontend/vue/basic
date: 2024-01-30T20:04
---
# Vue基础语法

## 基础指令

### v-html

将html内容嵌入到==当前标签里==

```html
  <!-- 显示数据 -->
  <div id="app" v-html="url">
  </div>  
  <script>
      var app = new Vue({
        el: "#app",
        data: {
          message: '<a href=" **">链接</a>'
        }
      })
  </script>

```

呈现效果

```html
  <!-- 显示数据 -->
  <div id="app">
	<a href=" **">连接</a>
  </div>  
```

### v-once(不常用)

数据初次渲染之后改变数据，前端不改变

### v-text

会覆盖当前标签下的文本，没有==mustache==灵活

### v-pre

将mustache原样显示，不进行数据解析

### v-cloak(不常用)

在vue解析之前，div中有一个属性v-cloak，解析之后没有，用于在解析前不显示{{message}}

```html
<style>
    [v-cloak] {
        display:none
    }
</style>

<div id="#app" v-cloak>
    {{message}}
</div>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            message: 'Hello'
        }
    })
</script>
```

## 计算属性

如果要对属性进行变化之后再显示，可以使用计算属性

```html
 <!-- 被vm 实例所控制的区域 -->
<div id="app">
    <h2>{{fullName}}</h2>
</div>
<script>
    // 创建实例对象
    const vm = new Vue({
        // 指定控制的区域
        el: '#app',
        data: {
            firstName: 'Lebron',
            lastName: 'James'
        },
        computed: {
            fullName() {
                return this.firstName + ' ' + this.lastName
            }
        }
    });
</script>
```

### setter与getter

setter一般不使用

```html
<div id="app">
    <h2>{{fullName}}</h2>
 </div>
  <script>
    // 创建实例对象
    const vm = new Vue({
      // 指定控制的区域
      el: '#app',
      data: {
        firstName: 'Lebron',
        lastName: 'James'
      },
      computed: {
        fullName: {
          set: function(newValue) {
            const names=newValue.split(' ');
            this.firstName=names[0];
            this.lastName=names[1];
          },
          get: function() {
            return this.firstName + ' ' + this.lastName
          }
        }
      },
      methods: {}
    });
  </script>
</body>
</html>
```

### methods与computed的区别

methods没有缓存，使用几次调用基础

computed有缓存，只在第一次调用及更改时调用

## js高阶函数

### filter

必须返回一个bollean值，当返回true时，会加内容加入新数组，反之过滤掉

```javascript
const nums=[10,20,30,40,50];
let num=nums.filter(n=>n>20)
console.log(num)
```

### map

将返回的值作为新的值

```javascript
let num2=num.map(n=>n*2)
console.log(num2);
```

### reduce

对数组中所有的内容进行汇总

## 组件

**组件使用的三个步骤**

>1 创建组件构造器——Vue.extend()方法
>
>2 注册组件——Vue.component()
>
>3 使用组件——在Vue实例中使用



**组件使用实例**

```html
 <!-- 被vm 实例所控制的区域 -->
  <div id="app">
    //使用组件  
    <my-con></my-con>
  </div>

  <script>
     //创建组件
    const cpnContructor=Vue.extend({
      template: `
        <div>
          <h2>我是标题</h2>
          <p>内容1</p>
          <p>内容2</p>
        </div>`
    });
	//注册组件(全局)
    Vue.component('my-con',cpnContructor);
```



### 全局组件与局部组件

>全局组件：在所有的Vue实例中都可使用
>
>局部组件：在当前Vue实例下使用

```html
//局部组件
 //创建组件
    const cpnContructor=Vue.extend({
      template: `
        <div>
          <h2>我是标题</h2>
          <p>内容1</p>
          <p>内容2</p>
        </div>`
    });
    // 创建实例对象
    const vm = new Vue({
      // 指定控制的区域
      el: '#app',
      data: {},
      methods: {},
      components: {
        //局部组件（cpn:组件名,cpnContructor：组件内容）
        cpn: cpnContructor
      }
    });
```

### 父组件与子组件

```html
  <!-- 被vm 实例所控制的区域 -->
  <div id="app">
    <cpn2></cpn2>
  </div>

  <script>
    //1:创建第一個组件(子組件)
    const cpn1 = Vue.extend({
      template: `
        <div>
          <h2>我是标题</h2>
          <p>内容1</p>
        </div>`
    });
    //1:创建第二個组件(父組件)
    const cpn2 = Vue.extend({
      template: `
        <div>
          <h2>我是标题2</h2>
          <p>内容2</p>
          <cpn1></cpn1>
        </div>`,
      components: {
        cpn1: cpn1
      }
    });
    // 创建实例对象
    const vm = new Vue({
      // 指定控制的区域
      el: '#app',
      data: {},
      methods: {},
      components: {
        //在div中可以使用cpn2,不能使用cpn1
        cpn2: cpn2
      }
    });
  </script>
```

### 注册组件语法糖

```html
 <!-- 被vm 实例所控制的区域 -->
  <div id="app">
    <cpn1></cpn1>
  </div>

  <script>
    //组件的语法糖写法
    Vue.component('cpn1', {
      template: `
        <div>
          <h2>我是标题2</h2>
          <p>内容2</p>
        </div>`,
    })

    // 创建实例对象
    const vm = new Vue({
      // 指定控制的区域
      el: '#app',
      data: {},
      methods: {},
      components: {
        'cpn2': {
          template: `
        <div>
          <h2>我是标题2</h2>
          <p>内容2</p>
        </div>`,
        }
      }
    });
  </script>
```

模板分离的两种写法

>1：通过script，类型必须为x-template
>
>2：通过template 



```html
  <!-- 被vm 实例所控制的区域 -->
  <div id="app">
    <cpn></cpn>
  </div>
  <!-- 1 通过script，类型必须为x-template， -->
  <script type="text/x-template" id="cpn">
    <div>
      <h2>标题</h2>
      <p>内容</p>s
    </div>
  </script>
  <!-- 2:通过template -->
  <template id="tem">
    <div>
      <h2>标题</h2>
      <p>内容</p>
    </div>
  </template>
  <script>
    //注册一个全局组件
    Vue.component('cpn', {
      template: '#tem'
    })
    // 创建实例对象
    const vm = new Vue({
      // 指定控制的区域
      el: '#app',
      data: {},
      methods: {}
    });
  </script>
```

### 组件数据

**组件数据的存放**

1. 组件属性有自己的data属性
2. 这个data属性必须为一个函数
3. 这个函数必须返回的是一个对象，对象中保存着数据

```html
 //注册一个全局组件
    Vue.component('cpn', {
      template: '#tem',
	  data: function(){
		return {
			titile: 'ddd'
		}
	  }
    })
```

**为什么data必须是一个函数**

>如果不是函数，多个组件将共享同一个属性，
>
>而函数每次返回的是不同的对象

### 父组件与子组件传值

父组件->子组件  props

子组件->父组件 $emit Events



#### 父传子

##### 通过数组方式

```html
 <!-- 被vm 实例所控制的区域 -->
  <div id="app">
     //必须使用v-bind将父组件数据绑定给子组件
    <cpn :cmovies="movies" :cmessage="message"></cpn>
  </div>

  <template id="cpn">
    <div>
      <ul>
        <li v-for="item in cmovies">{{item}}</li>
      </ul>
      <h2>{{cmessage}}</h2>
    </div>
  </template>

  <script>
    const cpn = {
      template: '#cpn',
      //设置子组件的数据
      props: ['cmovies','cmessage']
    }
    // 创建实例对象
    const vm = new Vue({
      // 指定控制的区域
      el: '#app',
      data: {
        message: 'Hello',
        movies:['海王','海贼王','海尔']
      },
      methods: {},
      components: {
        cpn
      }
    });
  </script>
```

##### 对象方式

==如果属性是对象或数据，则默认值必须返回一个函数==

可提供默认值、属性类型、是否必须传、验证等参数

```html
 <!-- 被vm 实例所控制的区域 -->
  <div id="app">
      //通过v-bind获取父组件数据
    <cpn :cmovies="movies" :cmessage="message" :proa="pro"></cpn>
  </div>

  <template id="cpn">
    <div>
      <ul>
        <li v-for="item in cmovies">{{item}}</li>
      </ul>
      <h2 v-for="m in  cmessage">{{m}}</h2>
      <h1>{{proa}}</h1>
    </div>
  </template>

  <script>
    const cpn = {
      template: '#cpn',
      //props: ['cmovies','cmessage']
      props: {
        //1 类型限制
        // cmovies: Array,
        // cmessage: String

        //2 提供默认值
        cmessage: {
          type: [Array,String], //可以是多个类型
          default: 'aaaaaaa',
          require: true //表示这个属性必须传
        },
        //3 如果属性是对象或数据，则默认值必须返回一个函数
        cmovies: {
          type: Array,
          default() {
            return [] 
          }
        },
        //4 多个可能的类型
        pro: [String,Number],
        //5自定义验证函数
        proa: {
          type: String,
          validator: function(value){
            //这个值必须匹配下列字符串中的一个
            return ['success','warning','danger'].indexOf(value)!=-1
          }
        }
      }
    }
    // 创建实例对象
    const vm = new Vue({
      // 指定控制的区域
      el: '#app',
      data: {
        message: ['Hello','ddd'],
        movies:['海王','海贼王','海尔'],
        pro: 'success'
      },
      components: {
        cpn
      }
    });
  </script>
```

#### 子传父

步骤：

> 1. 给子组件设置事件
> 2. 在子组件中的事件使用this.$emit发送自定义事件
> 3. 父组件使用v-on监听事件，并定义一个监听事件
> 4. 在父组件的监听事件中可获取到子组件传的数据

**实例**

```html
<!-- 父组件模板 -->
<div id="app">
    <cpn @itemclick="cpnClick"></cpn>
</div>

<!-- 子组件模板 -->
<template id="cpn">
    <div>
        <!-- 点击调用事件 -->
        <button v-for="item in categories" @click="btnClick(item)">{{item.name}}</button>
    </div>
</template>
<script>
    //子组件
    const cpn = {
        template: '#cpn',
        data() {
            return {
                categories: [
                    {id: 'aaa', name: '热门推荐'},
                    {id: 'bbb', name: '手机数码'},
                    {id: 'ccc', name: '家用家电'},
                    {id: 'ddd', name: '电脑办公'}
                ]
            }
        },
        methods: {
            btnClick(item){
                //发送事件，父组件监听事件
                this.$emit('itemclick',item);
            }
        }
    }
    // 父组件
    const vm = new Vue({
        // 指定控制的区域
        el: '#app',
        data: {
            message: 'Hello'
        },
        components: {
            cpn
        },
        methods: {
            cpnClick(item){
                console.log(item)
            }
        }
    });
</script>

```

#### 父子双向绑定修改案例

开发过程中，不推荐子访问父

==v-model相当于:value="dnum1" @input="dum1=$event.target.value"==

```html
<!--实现在子组件input中修改值，父子数据都变 -->
<div id="app">
    <npc :number1="num1" :number2="num2" @num1="num1c" @num2="num2c"></npc>
</div>
<template id="npc">
    <div>
        <h2>{{number1}}</h2>
        <h2>{{dnum1}}</h2>

        <input type="text" :value="dnum1" @input="num1change" />
        <h2>{{number2}}</h2>
        <h2>{{dnum2}}</h2>
        <input type="text" :value="dnum2" @input="num2change"/>
    </div>
</template>
<script>
    const npc={
        template: '#npc',
        props: {
            number1: Number,
            number2: Number
        },
        data(){
            return {
                dnum1:this.number1,
                dnum2:this.number2
            }
        },
        methods: {
            num1change(event){
                this.dnum1=event.target.value*1,
                    this.$emit('num1',this.dnum1)
            },
            num2change(event){
                this.dnum2=event.target.value*1,
                    this.$emit('num2',this.dnum2)
            }
        }
    }
    // 创建实例对象
    const vm=new Vue({
        // 指定控制的区域
        el:'#app',
        data:{
            num1:0,
            num2:1
        },
        methods:{
            num1c(value){
                console.log(44444)
                this.num1=value
            },
            num2c(value){
                this.num2=value
            }
        },
        components: {
            npc
        }
    });
</script>
```

#### v-watch——监听数据改变

```js
 const npc={
        template: '#npc',
        props: {
            number1: Number,
            number2: Number
        },
        data(){
            return {
                dnum1:this.number1,
                dnum2:this.number2
            }
        },
  	    watch: {
		//newValue为新值
			dnum1(newValue){
			//做一些操作
			}
		}
    }
```

### 父子组件的访问方式

父组件访问子组件：使用$children==(不常用)==或$refs(通过ref属性去获取)

子组件访问父组件：使用parent

this.$children是一个数组类型，包含子组件的所有对象

#### 父访问子

```html
 <!-- 被vm 实例所控制的区域 -->
  <div id="app">
    <cpn></cpn>
    <cpn ref="bbb"></cpn>
    <cpn ref="aaa"></cpn>
    <button @click="btnClick">按钮</button>
  </div>
  <template id="cpn">
    <div>
      我是子组件
    </div>
  </template>
  <script>
    // 创建实例对象
    const vm = new Vue({
      // 指定控制的区域
      el: '#app',
      data: {
        message: 'Hello'
      },
      methods: {
        btnClick() {
          //1.$children(一般不用)
          //  console.log(this.$children);
          //  this.$children[0].showMessage()
          //2.$refs(通过ref属性去获取)
          this.$refs.aaa.showMessage()
        }
      },
      components: {
        cpn: {
          template: '#cpn',
          methods: {
            showMessage() {
              console.log('---showMeaasge');
            }
          }
        }
      }
    });
  </script>
```

#### 子访问父

在子组件中通过this.$parent.xxxx(**开发中不建议使用，会破坏松耦合**)

**访问根组件**

this.$root.xxx

### 动态组件

```html
<div id="dynamic-component-demo" class="demo">
    <button
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: currentTab === tab }]"
            v-on:click="currentTab = tab"
            >
        {{ tab }}
    </button>
    <!-- 更改currentTabComponent以切换组件 -->
    <component v-bind:is="currentTabComponent" class="tab"></component>
</div>

<script>
    //定义三个组件
    Vue.component("tab-home", {
        template: "<div>Home component</div>"
    });
    Vue.component("tab-posts", {
        template: "<div>Posts component</div>"
    });
    Vue.component("tab-archive", {
        template: "<div>Archive component</div>"
    });

    new Vue({
        el: "#dynamic-component-demo",
        //数据
        data: {
            currentTab: "Home",
            tabs: ["Home", "Posts", "Archive"]
        },
        //计算，返回
        computed: {
            currentTabComponent: function() {
                return "tab-" + this.currentTab.toLowerCase();
            }
        }
    });
</script>
```



## 插槽

#### 基本使用

<slot></slot>

**插槽使用要点**

1.  插槽的基本使用<slot></slot>
2.  插槽的默认值<slot><button>默认按钮</button></slot>
3.  如果有多个值，同时放到组件插槽中进行替换，则会全部替换

```html
<!-- 被vm 实例所控制的区域 -->
  <div id="app">
    <cpn>
      <button>按钮</button>
    </cpn>
    <cpn></cpn>
  </div>

  <template id="cpn">
    <div>
      <h2>我是组件</h2>
      <p>我是组件，哈哈</p>
      <slot><button>默认按钮</button></slot>
    </div>
  </template>
```

#### 具名插槽

向指定插槽插入内容

==旧版本使用sloat="",新版本使用v-sloat指令==

```html
<div id="app">

    <cpn><span slot="center">标题</span></cpn>
    <cpn>
      <span slot="left">
        <button>返回</button>
      </span>
      <span slot="center">标题</span>
    </cpn>
    <hr />
    <!--新版本使用方法-->
    <cpn>
      <!-- 缩写  <template #left>  -->
      <template v-slot:left>
        标题
      </template>
      
    </cpn>
  </div>

  <template id="cpn">
    <div>
      <slot name="left"><span>左边</span></slot>
      <slot name="center"><span>中间</span></slot>
      <slot name="right"><span>右边</span></slot>
    </div>
  </template>
```

#### 编译作用域

> 父级模板里的所有内容都是在父级作用域中编译的；
>
> 子模板里的所有内容都是在子作用域中编译的。



```html
<div id="app">
    <!--这里的是app实例的data-->
    <cpn v-show="isShow"></cpn>
</div>

<template id="cpn">
    <div>
        <h1>子组件</h1>
        <!--这里的是子组件的data-->
        <button v-show="isShow">按钮</button>
    </div>
</template>
<script>
    // 创建实例对象
    const vm = new Vue({
        // 指定控制的区域
        el: '#app',
        data: {
            isShow: true
        },
        components: {
            cpn:{
                template: '#cpn',
                data() {
                    return {
                        isShow: true
                    }
                }
            }
        }
    });
</script>
```

#### 作用域插槽

 **父组件替换插槽的标签，但是内容由子组件提供**

> 在插槽里绑定数据
>
> 父组件通过v-slot获取数据



```html
 <!-- 被vm 实例所控制的区域 -->
  <div id="app">
    <cpn></cpn>
    <hr />
    <cpn>
      <!-- 通过v-slot 获取插槽  s可随意取名 v-slot默认是v-slot:default-->
      <template v-slot="s">   
        <span v-for="item in s.data">
          {{item}}
        </span>
      </template>
    </cpn>
  </div>
  <template id="cpn">
    <div>
      <!-- :data绑定数据,data可随意命名 -->
      <slot :data="pLanguages">
        <ul>
          <li v-for="item in pLanguages">{{item}}</li>
        </ul>
      </slot>
    </div>
  </template>
```

## 模块化

### Common JS

导出：

```javascript
//module.js
module.exports-={
    flag: true,
    test(a,b) {
        return a+b;
    }
    demo(a,b) {
        return a*b;
    }
}
```

导入

```javascript
//CommonJs模块
let {test,demo,flag}=require('../module.js')
```

### export与import

导出：

通过export关键字进行导出，

```javascript
var name = '小明';
var age = 18;
var flag = true;

function sum(num1, num2) {
  return num1 + num2;
}
if (flag) {
  console.log(sum(20, 30))
}
//导出方式一
export {
  flag, sum
}
//导出方式二
export var num1=1100;
export var height=12.0;
//导出函数
export function mul(num1,num2) {
  return num1-num2;
}
//导出类
export class Person{
  n='张三';
  run() {
    console.log('在奔跑');
  }
}
//export default
const address='北京市'
//导出默认只能有一个
export default address;
```

导入

```javascript
//1.导入{}中定义的
import {sum,flag} from './aaa.js'
if(flag){
  console.log('小明是天才');
  console.log(sum(10,10));
}
//2.导入export直接定义的变量
import {num1,height} from './aaa.js'
console.log(num1);
//3.导入export定义的函数
import {mul} from './aaa.js'
console.log(mul(15,6));
//4.导入类
import {Person} from './aaa.js'
const person=new Person();
console.log(person.n);
person.run();
//5.导入默认default,这里的addr随便取，导入文件中用default导出的内容
import addr from './aaa.js'
console.log(addr);
//5.统一全部导入,将导出的所有东西放到aaa当中  
import * as aaa from './aaa.js'
console.log(aaa.flag);


```

## Vue Cli脚手架

### Vue Cli的安装

安装Vue脚手架

```
npm install -g @vue/cli
```

拉取旧版本

```
npm install -g @vue/cli-init
```

运行流程

npm run build

![npn run build](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/npn%20run%20build.png)

npm run dev

![npm run dev](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/npm%20run%20dev.png)

### Vue Cli2初始化项目

**Vue Cli2创建项目**

```
vue init webpack my-project
```

**初始化选项**

1. Project name：项目名称

2. Project description：描述信息
3. Author：作者
4. 通过哪个创建
   1. Runtime+Complier：大多数人选择的
   2. Runtime-only：运行效率更高，更轻
5. 是否安装路由
6. 使用ESlint限制代码(**限制JS代码，如果不规范，编译不通过**)==需要选择规范==
7. 是否需要单元测试
8. 是否需要测试(Nightwatch)
9. 通过什么管理项目，npm or yarn



**render**

template -> ast -> render -> vdom -> UI

```javascript
render: function(createElement) {
    //createElement('标签',{标签的属性,[标签的内容])内容可以继续createElement
    return createElement('h2',{class: 'box'},['Hello world'])
}
//传一个组件
const cpn={
    template: '<div>{{messgae}}</div>',
    data() {
        message: '我是组件'
    }
}
render: function(createElement) {
    return createElement(cpn);
}
```





### Vue Cli3初始化项目

**与Cli2的区别**

>vue-cli3是基于webpack4打造，vue-cli2是基于webpack3
>
>vue-cli3的设计原则为0配置，移除根目录下的配置目录build和config
>
>vue-cli3提供了vue ui命令，提供可视化开发
>
>移除了static文件夹，新增了public文件夹，并且将index.html移动到public



```
vue create my-project
```

目录结构

![cli3目录结构](https://picgo-starry.oss-cn-beijing.aliyuncs.com/img/cli3%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png)

$mount('#app')  ==  el: '#app'

```javascript
new Vue({
  render: h => h(App),
}).$mount('#app')

```

Vue cli3配置文件的查看与修改

> vue.ui 在图形化界面修改
>
> 创建vue.config.js配置文件



# Vue Router

两种方式**

location.hash='foo'

history.pushState({},'','about')

history.replaceState({},'','aaa')   ==此方法直接替换之前的地址，页面后退按钮不可使用==

history.go(-1) 弹出栈中一个元素

------

## 安装和基本配置vue-router

步骤一：安装vue-router

```
npm install vue-router --save -g
```

步骤二：在模块化工程中使用

> 第一步：导入路由对象，并且调用Vue.use(VueRouter)
>
> 第二步：创建路由实例，并且传入路由映射配置
>
> 第三步：在Vue实例中挂载创建的路由实例

**使用路由**

```javascript
//通过Vue.user(插件)，安装插件
Vue.use(VueRouter)
//创建VueRouter对象
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]
//注册路由
const router = new VueRouter({
  //更改链接更改模式，默认使用hash
  mode: 'history',
  base: process.env.BASE_URL,
  //配置路由和组件之间的关系  
  routes
})
//导出路由并挂载到实例
export default router
```

## 使用vue-router

> 第一步：创建路由组件
>
> 第二步：配置路由映射：组件和路径映射关系
>
> 第三步：使用路由：通过<router-link>和<router-view>

### 使用

 <router-link></router-link> ：内置组件，会被渲染为一个a标签

 <router-view/>：根据当前的路径，动态渲染出不同的组件

```vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
     //将组件替换这个标签
    <router-view/>
  </div>
</template>
```

### 默认路径

```javascript
{
    path: '',
        //redirect重定向
        redirect: '/home'
},
    {
        path: '/home',
            name: 'Home',
                component: Home
    },
```

### router-link标签属性

**tag:将a链接替换为其他**

```vue
<router-link to="/" tag="button">Home</router-link>
```

**replace:不允许页面进行后退操作**

> 原理使用：history.replaceState({},'','aaa')

**active-class：更改当前活动时的class**

默认名称为：router-link-active

```html
active-class="active"
```

在路由中统一更改

```javascript
const router = new VueRouter({
  ......
  //更改活动clss
  linkActiveClass: 'active',
  ......
})
```

### 通过代码方式跳转

```vue
<button @click="homeClick">首页</button>
<button @click="aboutClick">关于</button>
<script>
    export default {
      name: 'App',
      methods: {
        homeClick() {
          //通过代码的方式修改路径
          this.$router.push('/home')
          //this.$router.replace('home');
        },
        aboutClick() {
          this.$router.push('/about')
        }
      }
    }
</script>
```

==屏蔽掉连续点击控制台报错==

```
this.$router.push('home').catch(err=>{err});
```

## 动态路由
```javascript
{
    path: '/user/:userId',
    name: 'User',
    component: User
}
```

传递参数

```vue
<router-link :to="'/user/'+userId">用户</router-link>
<script>
export default {
  name: 'App',
  data() {
    return {
      userId: 'lisi'
    }
  }
}
</script>

```

显示数据

```vue
<template>
  <div >
    <h2>{{userId}}</h2>
  </div>
</template>

<script>

export default {
  name: 'User',
  //import引入的组件需要注入到对象中才能使用
  computed: {
    userId() {
      //route:当前活跃的路由
      return this.$route.params.userId
    }
  }
}
</script>
```

## 懒加载

懒加载三种写法

```javascript
//方式一：结合Vue的异步组件和Webpack的代码分析
const Home=resolve=>{require.ensure(['../components/Home.vue'],()=>{resovle(require('../components/Home.vue'))})}
//方式二：AMD写法
const About=resolve=>require(['../components/About.vue'],resolve)
//方式三：ES6中
const Home=()=>import('../views/Home.vue')
```



当请求组件的时候才去加载

```javascript
{
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
},
```

推荐写法

```javascript
const Home=()=>import('../views/Home.vue')
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
```

## 嵌套路由

通过/home/news和/home/message访问一些内容

**实现步骤**

> 创建对应的子组件，并在路由映射中配置对应的子路由
>
> 在组件内部使用<router-view>标签

创建组件

配置子路由

```javascript
const HomeNew = () => import('../views/HomeNew.vue')
const HomeMessage = () => import('../views/HomeMessage.vue')
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
     {path: '',redirect: 'news'}, { path: 'news', component: HomeNew }, { path: 'message', component: HomeMessage }
    ]
  },
```

在本层路由中使用子路由，即在/home页面使用

```vue
<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页内容</p>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
    <router-view></router-view>   
  </div>
</template>
```

## 参数传递

参数传递的方式

> 主要有两种类型
>
> params的类型：
>
> ​	配置路由格式：/router/:id
>
> ​	传递的方式：在path后跟上对应的值
>
> ​	传递后形成的路径：/router/123，/router/abc
>
> query的类型：
>
> ​	配置路由格式：/router，普通配置
>
> ​	传递的方式：对象中使用query的key作为传递方式
>
> ​	传递后形成的路径：/router?id=123

### params方式

<a href="#动态路由">动态路由</a>

### query方式

#### 通过router-link方式

```vue
<router-link :to="{path: '/profile',query: {name: 'starrysky', age: 18, height: 1.88}}">档案</router-link>


<template>
  <div class>
    <h2>我是profile组件</h2>
    <h2>{{$route.query.name}}</h2>
    <h2>{{$route.query.age}}</h2>
    <h2>{{$route.query.height}}</h2>
    <ul>
      <li :key="item" v-for="item in $route.query">{{item}}</li>
    </ul>
  </div>
</template>

```

#### 通过点击事件

```javascript
<button @click="userClick">用户</button>
<button @click="profileClick">档案</button>
userClick() {
   this.$router.push("/user/" + this.userId);
},
profileClick() {
   this.$router.push({
   path: '/profile',
   query: {
   	 name: 'sta',
     age: 21,
     height: 178
   }
 }
```

## 全局导航守卫

路由跳转前置钩子：router.beforeEach()

==必须使用next()==

```javascript
 //向路由中增加meta属性
{
    path: '/user/:userId',
    name: 'User',
    component: User,
    meta: {
      title: '用户'
    }
 },
  //调用全局导航守卫函数
router.beforeEach((to,from,next)=> {
  //从from跳到to
  //获取到将要去的路由中的title改变页面标题
  document.title=to.matched[0].meta.title
  //必写
  next()
})
```

后置钩子：router.afterEach()

```javascript
roter.afterEach((to,from)=>{
  //不需要写next
})
```

路由的守卫

```javascript
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '档案'
    },
    //路由守卫
    beforeEnter: (to,form,next)=>{
      console.log('档案')
      next()
    }
  }
```

## keep-alive

### 简介

keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染

router-view也是一个组件，如果被包含在keep-alive里，所有的路径匹配到的视图组件都会缓存

```vue
<keep-alive>
   <router-view />
</keep-alive>
```

**activated和deactivated只有在使用keep-alive时有作用**

### 属性

include：字符串或正则表达式，只有匹配的字符串会被缓存

exclude：字符串或正则表达式，任何匹配的字符串都不会被缓存

```vue
<keep-alive exclude="User,Profile">
    <router-view />
</keep-alive>
```



# Vuex

## 简介

Vuex是专为Vue.js应用程序开发的状态管理模式

## 安装

`npm install vuex --save`

## 使用

安装插件

```javascript
//store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

//安装插件
Vue.use(Vuex)
//创建对象
const store = new Vuex.Store({
  state: {
    counter: 1000
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

export default store
```

在main.js中导入

```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store'
Vue.config.productionTip = false
//将store给$store
Vue.prototype.$store=store
new Vue({
  render: h => h(App),
  store
}).$mount('#app')

```

使用

```vue
<template>
  <div class>
    <h2>{{$store.state.counter}}</h2>
  </div>
</template>
```

## mutations

![状态图](C:\Users\Starry_sky\AppData\Roaming\Typora\typora-user-images\1589802341513.png)

如果要修改状态中的值，不可直接修改，直接修改会导致devtools插件无法正常跟踪

```js
//    /store/index.js
state: {
    counter: 1000
  },
  mutations: {
    //定义方法
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    }
  }
```

```vue
//Hello.vue
<template>
  <div id="app">
   <h2>{{$store.state.counter}}</h2>
   <button @click="add">+</button>
   <button @click="sub">-</button>
   <HelloVuex ></HelloVuex>
  </div>
</template>
<script>
import HelloVuex from './components/HelloVuex'
export default {
  name: 'App',
  components: {
    HelloVuex
  },
  methods: {
    add() {
      //通过commit提交修改
      this.$store.commit('increment')
    },
    sub() {
      this.$store.commit('decrement')
    }
  }
  
}
</script>

```

## Vue核心概念

### State

用于管理状态

#### 单一状态树

将所有的状态放到一个store中去管理，方便维护

#### 响应式要求

- 提前在store中初始化好所需的属性
- 当给state中的对象添加新属性时，使用下面的方式
  - 使用Vue.set(obj,'newProp',123)
  - 用新对象给旧对象赋值

```javascript
//添加属性
//非响应式
state.info['address']="洛杉矶"
//响应式,向info对象中添加属性address,值为洛杉矶
Vue.set(state.info,'address',洛杉矶)
//删除属性
//非响应式
delete state.info.age
//响应式
Vue.delete(state.info,'age')
```



### Getters

如果存储的状态需要变换后再获取，可以通过getters进行

用法

```javascript
//在store中的getters中定义函数
const store = new Vuex.Store({
  state: {
    counter: 1000,
    students: [
      {id: 100,name: 'why', age: 18},
      {id: 101,name: 'why', age: 24},
      {id: 102,name: 'why', age: 30},
      {id: 103,name: 'why', age: 10},
      {id: 104,name: 'why', age: 18}
    ]
  }
  getters: {
    powerCounter(state) {
      return state.counter * state.counter
    },
    more20stu(state) {
      return state.students.filter(s=>s.age>20)
    },
    more20stuLength(state,getters) {
      return getters.more20stu.length
    }
  },
})
//使用
<h2>{{$store.getters.powerCounter}}</h2>
<h2>{{$store.getters.more20stu}}</h2>
```

需要传递参数的情况：

```javascript
//返回一个函数
moreAgeStu(state) {
    return function(age) {
        return state.students.filter(s=>s.age>age)
    }
}
//使用
<h2>{{$store.getters.moreAgeStu(25)}}</h2>
```

### Mutations

参数被称为mutations的Payload（载荷）

Vuex要求Mutations中的方法都要是同步的

用于更改状态的值，不建议通过==$store.state.counter++==修改

```javascript
//定义  
mutations: {
    //定义方法
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    }
  }
//使用，在组件方法中
this.$store.commit('increment')
```

传递单个参数

```javascript
//在store的mutations中定义
incrementCount(state,count) {
    state.counter+=count
}
//使用。给组件添加点击事件并传参数
addCount(count) {
    this.$store.commit('incrementCount',count)
}
//或者，在按钮上直接调用
<button @click="$store.commit('incrementCount',5)">+5</button>
```

传递多个参数(一个对象)

```javascript
//在store的mutations中定义
moreAgeStu(state) {
    return function(age) {
        return state.students.filter(s=>s.age>age)
    }
}
//使用,定义点击事件
addStudent() {
    const stu={id: 10036, name: 'ddddd', age: 35}
    this.$store.commit('addStudent',stu)
}
```

特殊的提交方式

```javascript
//在store的mutations中定义，payload是一个对象
incrementCount(state,payload) {
    state.counte+=payload.count
}
//使用
addCount(count) {
    //特殊的提交风格,type:要调用的方法名，之后的数据将作为对象传入payload
    this.$store.commit({
        type: 'incrementCount',
        count
    })
},
```

#### 类型常量

将matations中的方法定义为常量，单独新建一个文件

```javascript
//matations-types.js
export const INCREMENT = 'increment'
//在Vuex定义时使用
import {INCREMENT} from './mutations-types'
[INCREMENT](state) {
    state.counter++
}
//在组件中使用
import * as types from './store/mutations-types'
add() {
    this.$store.commit(INCREMENT);
},
```

### Actions

用于异步修改state的值

**在actions方法中，不能直接修改值，需要通过context.commit(Mutation方法名)提交**

**在使用时，通过this.$stroe.dispatch调用actions中的方法**

```javascript
//第一种
//store/index.js
actions: {
    aUpdateInfo(context,payload) {
        setTimeout(() => {
            context.commit('updateInfo')
            console.log(payload.message)
            payload.success()
        }, 1000);
    }
}
//使用,调用点击事件
updateInfo() {    
    this.$store.dispatch('aUpdateInfo',{
        message: '我是数据',
        success: ()=>{
            console.log('修改成功');
        }
    })
}
//第二种
//定义，返回一个Promise函数
actions: {
    aUpdateInfo(context,payload) {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                context.commit('updateInfo')
                console.log(payload+'hankun')
                resolve()
            }, 1000);
        })
    }
}
//使用
updateInfo() {    
    this.$store.dispatch('aUpdateInfo','我是数据').then(()=>{
        console.log('第二种成功')
    })
}
```

### Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```javascript
const moduleA = {
  state: {
    name: '张三'
  },
  mutations: {
    updateName(state,payload) {
      state.name=payload
    }
  },
  actions: {
      //使用es6语法，对象的结构
      in({state,commit,rootState}) {
          if((state.count+rootState.count)%2==1){
              commit('updateName')
          }
      }
  },
  getters: {}
}
//在store对象中
modules: {
    a: moduleA
}
--------------
//获取数据,调用模块中的getters等方法，直接调用即可
<h2>{{$store.state.a.name}}</h2>
//调用mutations中的方法依旧通过this.$store.commit('')提交
```

## 目录结构

官方推荐，将state仍放置index.js文件下，将getters、mutations、actions单独新建一个js存放，将Module新建一个目录，里面存放若干模块的js文件

