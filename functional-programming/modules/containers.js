var curry = require('lodash').curry
var _ = require('ramda')

const Container = function(x) {
    this.__value = x
}

Container.of = function(x) { return new Container(x) }

// (a -> b) -> Container a -> Container b
Container.prototype.map = function(f){
    return Container.of(f(this.__value))
}

Container.prototype.ap = function(other_container) {
    return other_container.map(this.__value)
}

const Maybe = function(x) {
    this.__value = x
}

Maybe.of = function(x) {
    return new Maybe(x)
}

Maybe.prototype.isNothing = function() {
    return (this.__value === null || this.__value === undefined);
}

// Maybe 原型链上添加了 map 方法, 则称 Maybe 是个 functor 类型
Maybe.prototype.map = function(f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}    

Maybe.prototype.join = function(f) {
    return this.__value
}

var Left = function(x) {
    this.__value = x;

}

Left.of = function(x) {
    return new Left(x);
}

Left.prototype.map = function(f) {
    return this;
}

var Right = function(x) {
    this.__value = x;
}

Right.of = function(x) {
    return new Right(x);
}

Right.prototype.map = function(f) {
    return Right.of(f(this.__value));
}

// Either :: (a -> c) -> (b -> c) -> Either a b -> c
var Either = curry(function(f, g, e) {
    switch(e.constructor) {
        case Left: return f(e.__value)
        case Right: return g(e.__value)
    }
})    

var id = function(x) {
    return x
}

var IO = function(f) {
    this.__value = f
}

IO.of = function(x) {
    return new IO(function() { return x })
}

IO.prototype.map = function(f) {
    return new IO(_.compose(f, this.__value))
}

IO.prototype.join = function() {
    return this.__value()
}

exports.Container = Container
exports.Maybe = Maybe
exports.Left = Left
exports.Right = Right
exports.Either = Either
exports.id = id
exports.IO = IO