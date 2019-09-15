define(function() {
    var Maybe = function(x) {
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
    
    return Maybe;
});