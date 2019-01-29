/*
* getter setter
* */
// let obj = {
//     msg: 'hello',
//     get msg () {
//         console.log('read msg')
//     },
//     set msg (newMsg) {
//         console.log(`write msg: ${newMsg}`)
//     }
// }
//
// // test code
// const a = obj.msg // read msg
// obj.msg = 'world' // write msg: world

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*
* sync - compose
* */
// function add(x, y) {
//     return x + y
// }
// function double(z) {
//     return z * 2
// }
// const middleWares = [add, double]
// const length = middleWares.length
//
// function compose (middleWares) {
//     return (...args) => {
//         let res = middleWares[0](...args);
//         for (let i = 1; i < length; i++) {
//             res = middleWares[i](res);
//         }
//         return res
//     }
// }
//
// // test code
// const fn = compose(middleWares)
// const res = fn(1, 2)
// console.log(res)

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*
* async - compose
* */
function compose (middleWares) {
    return () => {
        return dispatch(0)
        function dispatch(i) {
            let fn = middleWares[i]
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(fn(function next () {
                return dispatch(i + 1)
            }))
        }
    }
}

// test code
async function test1 (next) {
    console.log('test1 start')
    await next()
    console.log('test1 end')
}
async function test2 (next) {
    console.log('test2 start')
    await delay()
    await next()
    console.log('test2 end')
}
async function test3 () {
    console.log('test3')
}
const middleWares = [test1, test2, test3]
const finalFn = compose(middleWares)
finalFn()

function delay() {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    }))
}

module.exports = delay
