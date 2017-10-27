// 依赖 Jquery

(function() {
    String.prototype.format = function(args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if(args[key]!=undefined){
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                        var reg= new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    }
})();

var FormUtil = {
	addCascade2Select : function(opts) {
  		// 取参数
  		// 1. selectors
  		// 2. defaults
  		// 3. defaultVals
  		// 4. data
      var selectors = opts["selectors"] || false;
      var defaults = opts["defaults"] || [];
      var defaultVals = opts["defaultVals"] || [];
      var data = opts["data"] || false;
      // 如果 selector 或者 data 参数没有传递,
      // 方法跳过
      if(!selectors || !data) {
          return;
      }

      // 添加级联事件处理.
      var addListener = function(selector) {
          var $tDom = $(selector);
          // 添加
          $tDom.unbind("change").on("change", function() {
              var val = $tDom.val();
              var $tp = $(selector + " option[value='" + val + "']");
              var cascadeData = $tp.attr("cascade-data");
              if(cascadeData && cascadeData.trim() != "") {
                  // 如果有级联的 select, 则触发关联的 select 改变显示的内容
                  var cascadeObj = JSON.parse(cascadeData);
                  parseData2DOM($tp.attr("cascade-selector"), cascadeObj);
              } else {
                  // 将当前 select 之后的所有 select 都清空.
                  var t = $.inArray(selector, selectors);
                  for(var i = t + 1; i < selectors.length; i++) {
                      $(selectors[i]).prop("innerHTML", defaults.length > i && defaults[i] != "" ? "<option value=''>{0}</option>".format(defaults[i]) : "");
                  }
              }
          });
          // 触发 $tDom 的 select 的 change 事件, 则所有关联的 select 数据都会相应的改变,
          // 为什么呢? 可以参看如下的解释!(假设 selct1 => select2 => select3)
          // => 为 select1 数据改变
          // => 为 select1 添加 change 事件
          // => 触发 select1 的 change 事件
          // => select2 数据改变
          // => 为 select2 添加 change 事件
          // => 触发 select2 的 change 事件
          // => select3 数据改变
          // => ...
          $tDom.trigger("change");
      };

      var parseData2DOM = function(selector, data) {
          var $dom = $(selector);
          var tHtml = "";
          for(var key in data) {
              var val = data[key];
              var type = $.type(val);
              var tIndex = $.inArray(selector, selectors);
              var selected = "";

              if($.inArray(type, ["number", "string", "boolean"]) >= 0) {
                  // 如果 val 类型为 number、string、boolean 则转换为一条 option
                  tHtml += "<option value='{0}' {1}>{2}</option>".format(key, selected, val);
              } else if(type == "object") {
                  // 如果为 object 类型则认为是一个 JSON 对象, 需要进行如下的处理.
                  var text = val["text"] || "";
                  var vals = val["vals"] || false;
                  // 没有级联的选择器则不会进行级联操作.
                  if(!vals) {
                      tHtml += "<option value='{0}' {1}>{2}</option>".format(key, selected, text);
                      return true;
                  }
                  // 如果 vals 的类型也是为 object, 说明还有级联的 select, 则新生成 option 需要附加上如下的自定义属性
                  // 1. cascade-selector: 当该 option 被点击的时候需要触发的目标 select 的 Jquery 选择器.
                  // 2. cascade-data: 当该 optsion 被点击的时候出发的时候目标 select 所需要显示的数据.
                  // dom 元素上的自定义属性可以使用 $([targetDomSelector]).attr([customPropertyName]) 读取.
                  var tType = $.type(vals);
                  if(tType == "object") {
                      tHtml += "<option value='{0}' cascade-data='{1}' cascade-selector='{2}' {3}>{4}</option>".format(key, JSON.stringify(vals), selectors[$.inArray(selector, selectors) + 1], selected, text);
                  }
              }
          }
          $dom.prop("innerHTML", tHtml);
          addListener(selector);
      };

      // 第一个个级联节点, 填充数据.
      parseData2DOM(selectors[0], data);
    }
}
