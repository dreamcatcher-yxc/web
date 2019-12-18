let obj = { 
    name: 'zs',
    age: 20,
    gender: 'male'
}

let realName = obj.name

Object.defineProperty(obj, 'name', {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
        console.log('invoke property of \'name\' getter method...')
        return realName
    },
    set: function reactiveSetter (newVal) {
        console.log('invoke property of \'name\' setter method...')
        realName = newVal
    }
})

let propOfName = Object.getOwnPropertyDescriptor(obj, 'name')
let propOfAge = Object.getOwnPropertyDescriptor(obj, 'age')
let propOfGender = Object.getOwnPropertyDescriptor(obj, 'gender')

obj.name = 'ls'
console.log(obj.name)

console.log(propOfName)
console.log(propOfAge)
console.log(propOfGender)