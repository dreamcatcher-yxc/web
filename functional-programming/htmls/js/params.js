define(['ramda', 'io', 'maybe', 'trace'], function(_, IO, Maybe, Trace) {
    // url :: IO String
    var url = new IO(function() { return window.location.href; });
    
    // toPairs = String -> [[String]]
    var toPairs = _.compose(_.map(_.split('=')), _.split('&'));
    
    // params :: String -> [[String]]
    var params = _.compose(toPairs, _.last, _.split('?'));
    
    // findParam :: String -> IO Maybe [String]
    var findParam = function(key) {
        return _.map(_.compose(Maybe.of, _.filter(_.compose(_.equals(key), _.head)), params), url);
    };

    return findParam;
});