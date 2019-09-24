define(['ramda'], function(_) {
    var IO = function(f) {
        this.__value = f;
    }
    
    IO.of = function(x) {
        return new IO(function() {
            return x;
        });
    }

    IO.prototype.map = function(f) {
        return new IO(_.compose(f, this.__value));
    }

    IO.prototype.unsafePerformIO = function() {
        return this.__value();
    }

    IO.prototype.join = function() {
        return this.unsafePerformIO();
    }

    return IO;
});