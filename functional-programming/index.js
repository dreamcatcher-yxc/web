var curry = require('lodash').curry
var readlineSync = require('readline-sync')
var _ = require('ramda')
var moment = require('moment')
var Task = require('data.task');

var modules = require('./modules')
var memoize  = modules.memoize,
    compose = modules.compose,
    Container = modules.Container,
    Maybe = modules.Maybe,
    Left = modules.Left,
    Right = modules.Right,
    either = modules.Either,
    id = modules.id,
    IO = modules.IO

var match = curry(function(what, str) {
    return str.match(what);
})

var replace = curry(function(what, replacement, str) {
    return str.replace(what, replacement)
})

var filter = curry(function(f, ary) {
    return ary.filter(f)
})

var map = curry(function(f, ary) {
    return ary.map(f)
})

const test1 = function() {
    var squareNumber = memoize(function(x) { return x * x })
    console.log(squareNumber(2))
    console.log(squareNumber(2))
    console.log(squareNumber(3))
    console.log(squareNumber(3))

    console.log(match(/\s+/g, 'hello world'))
    console.log(match(/\s+/g)('hello world'))

    const hasSpaces = match(/\s+/g)
    console.log(hasSpaces('hello world'))
    console.log(hasSpaces('spaceless'))

    filter(hasSpaces, ["tori_spelling", "tori amos"])
    // ["tori amos"]

    var findSpaces = filter(hasSpaces)
    // function(xs) { return xs.filter(function(x) { return x.match(/\s+/g) }) }

    var findSpacesRes = findSpaces(["tori_spelling", "tori amos"])
    console.log(findSpacesRes)
    // ["tori amos"]

    var noVowels = replace(/[aeiou]/ig)
    // function(replacement, x) { return x.replace(/[aeiou]/ig, replacement) }

    var censored = noVowels("*")
    // function(x) { return x.replace(/[aeiou]/ig, "*") }

    var censoredRes = censored("Chocolate Rain")
    console.log(censoredRes)

    var toUpperCase = function(x) { return x.toUpperCase() }
    var exclaim = function(x) { return x + '!' }
    var shout = compose(exclaim, toUpperCase)
    var shotRes = shout("send in the clowns")
    console.log(shotRes)
}

const test2 = function() {
    console.log('run test2')
}

// 测试 Container
const test3 = function() {
    var c1 = Container.of(3)
    console.log(c1)
    // => Container { __value: 3 }

    var c2 = Container.of('hotdogs')
    console.log(c2)
    // => Container { __value: 'hotdogs' }

    var c3 = Container.of(Container.of({ name : 'yoda' }))
    console.log(c3)
    // => Container { __value: Container { __value: { name: 'yoda' } } }

    var c4 = Container.of(2).map(function(two) { return two + 2 })
    console.log(c4)
    // =>  Container { __value : 4 }

    var c5 = Container.of("flamethrowers").map(function(s){ return s.toUpperCase() })
    console.log(c5)
    //=> Container("FLAMETHROWERS")
    
    // concat :: String -> String -> String
    var concat = _.curry(function(tailStr, srcStr) {
        return srcStr + tailStr
    })
    var c6 = Container.of("bombs").map(concat(' away')).map(_.prop('length'))
    console.log(c6)
    //=> Container(10)     
}

// 测试 Maybe
var test4 = function() {
    var c1 = Maybe.of("Malkovich Malkovich").map(match(/a/ig))
    console.log(c1)
    //=> Maybe(['a', 'a'])

    var c2 = Maybe.of(null).map(match(/a/ig))
    console.log(c2)
    //=> Maybe(null)

    // add :: Number -> Number -> Number
    var add = _.curry(function(a, b) {
        return a + b
    })
    var c3 = Maybe.of({name: "Boris"}).map(_.prop("age")).map(add(10))
    console.log(c3)
    //=> Maybe(null)

    var c4 = Maybe.of({name: "Dinah", age: 14}).map(_.prop("age")).map(add(10))
    console.log(c4)
    //=> Maybe(24)
}

// test 函数的实际运用
var test5 = function() {
    // safeHead :: [a] -> Maybe(a)
    var safeHead = function(xs) {
        return Maybe.of(xs[0])
    }

    var streetName = _.compose(_.map(_.prop('street')), safeHead, _.prop('addresses'))

    var name1 = streetName({ addresses : [] })
    console.log(name1)
    // => Maybe { __value: null }

    var name2 = streetName({ addresses : [ { 'street' : '明楼街道' } ] })
    console.log(name2)
    // => Maybe { __value: '明楼街道' }
}

var test6 = function() {
    // withdraw :: Number -> Account -> Maybe(Account)
    var withdraw = curry(function(amount, account) {
        return account.balance >= amount ?
            Maybe.of({balance: account.balance - amount}) :
            Maybe.of(null);
    });
    
    // updateLedger :: Object -> Object
    var updateLedger = function(account) {
        console.log(account)
        return account
    }

    // remainingBalance :: Object -> Maybe(String)
    var remainingBalance = function(account) {
        console.log(`剩余￥${account.balance}元`)
        return Maybe.of(`your balance is \$${account.balance}`)
    }

    // finishTransaction :: Account -> String
    var finishTransaction = _.compose(remainingBalance, updateLedger)
    // getTwenty :: Account -> Maybe(String)
    var getTwenty = _.compose(_.map(finishTransaction), withdraw(20))
    var res1 = getTwenty({ balance: 200.00})
    console.log(res1)
    // => Maybe { __value: Maybe { __value: 'your balance is $180' } }

    var res2 = getTwenty({ balance: 10.00})
    console.log(res2)
    // => Maybe { __value: null }
}

// 使用 Maybe 避免空值的一些例子
var test7 = function() {
    var m1 = Maybe.of("Malkovich Malkovich").map(match(/a/ig))
    console.log(m1)
    //=> Maybe(['a', 'a'])

    var m2 = Maybe.of(null).map(match(/a/ig))
    console.log(m2)
    //=> Maybe(null)

    var m3 = Maybe.of({name: "Boris"}).map(_.prop("age")).map(_.add(10))
    console.log(m3)
    //=> Maybe(null)

    var m4 = Maybe.of({name: "Dinah", age: 14}).map(_.prop("age")).map(_.add(10))
    console.log(m4)
    //=> Maybe(24)
}

// Left、Right 基本使用示例
var test8 = function() {
    var val1 = Right.of("rain").map(function(str){ return "b"+str })
    console.log(val1)
    // Right("brain")

    var val2 = Left.of("rain").map(function(str){ return "b"+str })
    console.log(val2)
    // Left("rain")

    var val3 = Right.of({host: 'localhost', port: 80}).map(_.prop('host'))
    console.log(val3)
    // Right('localhost')

    var val4 = Left.of("rolls eyes...").map(_.prop("host"))
    console.log(val4)
    // Left('rolls eyes...')
}

// Left 用于报错, Right 用于正常调用
var test9 = function() {
    // getAge :: Date -> User -> Either(String, Number)
    var getAge = curry(function(now, user) {
        var birthdate = moment(user.birthdate, 'YYYY-MM-DD')
        if(!birthdate.isValid()) return Left.of("Birth date could notbe parsed")
        return Right.of(now.diff(birthdate, 'years'))
    });
    
    var res1 = getAge(moment(), {birthdate: '2005-12-12'})
    console.log(res1)
    // Right(9)

    var res2 = getAge(moment(), {birthdate: 'balloons!'})
    console.log(res2)
    // Left("Birth date could not be parsed")

    // fortune :: Number -> String
    var fortune = _.compose(_.concat("If you survive, you will be "), function(x) { return new String(x) }, _.add(1))

    // zoltar :: User -> Either(String, _)
    var zoltar =  _.compose(_.map(console.log), _.map(fortune), getAge(moment()))
    var res3 = zoltar({birthdate: '2005-12-12'})
    console.log(res3)
    // "If you survive, you will be 10"
    // Right(undefined)

    var res4 = zoltar({birthdate: 'balloons!'})
    console.log(res4)
    // Left("Birth date could not be parsed")

    // zoltar :: User -> _
    var zoltar = _.compose(console.log, either(id, fortune), getAge(moment()))
    var res5 = zoltar({birthdate: '2005-12-12'})
    console.log(res5)
    // "If you survive, you will be 10"
    // undefined

    var res6 = zoltar({birthdate: 'balloons!'});
    console.log(res6)
    // "Birth date could not be parsed"
    // undefined    
}

// IO 测试
var test10 = function() {
    // io_window_ :: IO Window
    var io_window = new IO(function(){ return {} })
    var res1 = io_window.map(function(win){ return 100 }).__value()
    console.log(res1)
    // IO(1430)
}

// 恒等定律、结合律 测试
var test11 = function() {
    var idRaw1 = map(id)
    var idRaw2 = id

    // (identity)
    // map(id) === id 
    var res1 = idRaw1(Container.of(2))
    console.log(res1)
    // => Container { __value: 2 }
    
    var res2 = idRaw1(Container.of(2))
    console.log(res2)
    // => Container { __value: 2 }

    // (composition)
    // compose(map(f), map(g)) === map(compose(f, g))
    var cmplaw1 = _.compose(_.map(_.concat('1')), _.map(_.concat('2')))
    var cmplaw2 = _.map(_.compose(_.concat('1'), _.concat('2')))
    var res3 = cmplaw1('3')
    var res4 = cmplaw2('3')
    console.log(res3)
    console.log(res4)
}

// ch08 习题
// 练习 1
// ==========
// 使用 _.add(x,y) 和 _.map(f,x) 创建一个能让 functor 里的值增加的函数
var ex1 = function() {
    var addOne = _.map(_.add(1))
    console.log(addOne([1]))
}

//练习 2
// ==========
// 使用 _.head 获取列表的第一个元素
var ex2 = function() {
    var xs = _.identity(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
    var ex2 = _.head
    console.log(ex2(xs))
}

// 练习 3
// ==========
// 使用 safeProp 和 _.head 找到 user 的名字的首字母
var ex3 = function() {
    var safeProp = _.curry(function (x, o) { return Maybe.of(o[x]) })
    var user = { id: 2, name: "Albert" };
    var ex3 = _.compose(_.map(_.head), safeProp('name'))
    console.log(ex3(user))
}

// 练习 4
// ==========
// 使用 Maybe 重写 ex4，不要有 if 语句
var ex4 = function() {
    var ex4 = _.compose(_.map(function(n) { return parseInt(n) }), Maybe.of)
    console.log(ex4('10'))
}

// 练习 5
// ==========
// 写一个函数，先 getPost 获取一篇文章，然后 toUpperCase 让这片文章标题变为大写
var ex5 = function() {
    // getPost :: Int -> Future({id: Int, title: String})
    var getPost = function (i) {
        return new Task(function(rej, res) {
            setTimeout(function(){
                res({id: i, title: 'Love them futures'})
            }, 300)
        })
    }
    
    var ex5 = function(id) { return getPost(id).map(_.prop('title')).map(_.toUpper)}
    ex5(1).fork(id, function(data) {
        console.log(data)
        // => LOVE THEM FUTURES
    })
}

// 练习 6
// ==========
// 写一个函数，使用 checkActive() 和 showWelcome() 分别允许访问或返回错误
var ex6 = function() {
    var showWelcome = _.compose(_.concat('Welcome '), _.prop('name'))
    var checkActive = function(user) {
        return user.active ? Right.of(user) : Left.of('Your account is not active')
    }
    var ex6 = _.compose(_.map(showWelcome), checkActive)
    console.log(ex6({ name : 'zs', active : true}))
    console.log(ex6({ name : 'ls', active : false}))
}

// 练习 7
// ==========
// 写一个验证函数，检查参数是否 length > 3。如果是就返回 Right(x)，否则就返回
// Left("You need > 3")
var ex7 = function(){
    var ex7 = function(x) {
        return x.length > 3 ? Right.of(x) : Left.of('You need > 3')
    }
    console.log(ex7([1, 2, 3]))
    console.log(ex7([1, 2, 3, 4]))
}

// 练习 8
// ==========
// 使用练习 7 的 ex7 和 Either 构造一个 functor，如果一个 user 合法就保存它，否则
// 返回错误消息。别忘了 either 的两个参数必须返回同一类型的数据。
var ex8 = function() {
    var save = function(x){
        return new IO(function() {
            console.log("SAVED USER!")
            return x + '-saved'
        })
    }
        
    const validateName = ({ name }) => {
        return name.length > 3 ? Right.of(name) : Left.of('You need > 3')
    }
    
    const validateUser = _.curry(function(nameValidator, user) {
        var res = nameValidator(user)
        console.log(res)
        return res
    })

    const showWelcome = _.compose(_.concat('Welcome '), _.prop('name'))
      
    const saveAndWelcome = _.compose(map(showWelcome), save)
    
    const register = compose(
        either(IO.of, saveAndWelcome),
        validateUser(validateName),
    )

    console.log(register({ name : 'aaa' }))
    console.log(register({ name : 'aaaa' }))
}

// 练习 1
// ==========
// 给定一个 user，使用 safeProp 和 map/join 或 chain 安全地获取 sreet的 name
var ex9_1 = function() {
    var safeProp = _.curry(function (x, o) { return Maybe.of(o[x]) })

    var user = {
        id: 2,
        name: "albert",
        address: {
            street: {
                number: 22,
                name: 'Walnut St'
            }
        }
    }

    var chain = _.curry(function(f, m) {
        return m.map(f).join();
    })

    var ex1 = _.compose(chain(safeProp('street')), safeProp('address'))
    console.log(ex1(user))
}   

// 练习 2
// ==========
// 使用 getFile 获取文件名并删除目录，所以返回值仅仅是文件，然后以纯的方式打印文件
var ex9_2 = function() {
    var getFile = IO.of('C:/foo/foo.txt')
    
    var pureLog = function(x) {
        return new IO(function() {
            console.log(x)
            return 'logged ' + x
        })
    }

    var basename = _.compose(_.last,  _.split('/'))

    var chain = _.curry(function(f, m) {
        return m.map(f).join();
    })
    
    var ex2 = _.compose(chain(pureLog),  _.map(basename))
    console.log(ex2(getFile).__value())
}

// 练习 4
// ==========
// 用 validateEmail、addToMailingList 和 emailBlast 实现 ex4 的类型签名
// addToMailingList :: Email -> IO([Email])
var ex9_3 = function() {
    // addToMailingList :: Email -> IO([Email])
    var addToMailingList = (function(list){
        return function(email) {
            return new IO(function(){
                list.push(email);
                return list;
            })
        }
    })([])
        
    function emailBlast(list) {
        return new IO(function(){
            return 'emailed: ' + list.join(',')
        })
    }

    var validateEmail = function(x){
        return x.match(/\S+@\S+\.\S+/) ? (new Right(x)) : (new Left('invalid email'))
    }

    var chain = _.curry(function(f, m) {
        return m.map(f).join()
    })

    // ex4 :: Email -> Either String (IO String)
    var ex4 = _.compose(
        _.map(
            _.compose(
                chain(emailBlast),
                function(x) {
                    console.log(x)
                    return x
                },
                addToMailingList
            )
        ),
        validateEmail
    )

    console.log(ex4('aaa@163.com'))
}

const test10_1 = function() {
    var res = Container.of(_.add)
                .ap(Container.of(2))
                .ap(Container.of(3))
    console.log(res)
}

var methodName = readlineSync.question('请输入需要执行的函数名称: ', { encoding : 'UTF-8' } )

try {
    eval(`${methodName}()`)
} catch(e) {
    console.log(e)
}