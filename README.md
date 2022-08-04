#
vant 引入也分情况

1.全局引入
impor {button} from 'vant'
vue.use(button)



2.局部(单页面内引入)
   impor  {button} from 'vant'

components:{
    [button.name]=button
}