define(['ramda'], function(_) {
    var trace = _.curry(function(tag, meta) {
        console.log(tag, meta);
        return meta;
    });
    return trace;
})