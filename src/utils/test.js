
function fun6(arr) {
    return arr.sort().reduce((init, current) => {
        if (init.length === 0 || init[init.length - 1] !== current) {
            init.push(current)
        }
        return init
    }, [])
}

function fun7(arr) {
    const map = new Map()
    return arr.filter(item => !map.has(item) && map.set(item, 1))
}

// 判断小数是否相等
function equal(n1, n2) {
    return Math.abs(n1 - n2) < Math.pow(2, -52)
}

const arr = [1,4,3,4,1,3,6,4,2,2]
console.log(fun7(arr))
console.log(0.1+0.2 === 0.3, equal(0.1+0.2, 0.3))
//随机生成字母和数字的组合
console.log(Math.random().toString(36).substr(2))
console.log([1,2,[1,[4,[5,6,[1,2]]]]].toString())
console.log({name: 'xiao'}.toString())