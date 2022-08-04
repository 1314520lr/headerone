// 闭包实现变量的封装
export function debounce(fn, t = 500) {
    let timer = null
    return function (...arg) {
        clearTimeout(timer)

        timer = setTimeout((v) => {
            fn.apply(this, arg) //  这是业务逻辑
        }, t);
    }
}
