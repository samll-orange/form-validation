$(function() {
  "use strict";

  //暴露到全局，selector找到绑定的input
  window.Input = function(selector) {
    var $ele,
      $error_ele, //记录错误信息提示
      me = this,
      rule = {
        required: true
      }; //元素

    this.load_validator = function() {
      var val = this.get_val();
      this.validator = new Validator(val, rule);
    };

    this.get_val = function() {
      return $ele.val();
    };

    function init() {
      find_ele();
      get_error_ele(); //调用函数找到错误信息，存到$error_ele
      parse_rule();
      me.load_validator(); //把loda_validator封装成一个函数
      listen();
    }

    function listen() {
      //根据用户的体验选择触发的事件类型：blur、change、keyup
      $ele.on("blur", function() {
        //区分blur、keyup
        var valid = me.validator.is_valid(me.get_val());
        //注意逻辑层面上的，语法层面就交给JS引擎
        if (valid) {
          //合法，隐藏错误提示
          $error_ele.hide();
        } else {
          //不合法，显示错误提示
          $error_ele.show();
        }
      });
    }
    //错误信息提示是固定的，只有显示和不显示两种状态
    function get_error_ele() {
      $error_ele = $(get_error_selector());
    }
    function get_error_selector() {
      return "#" + $ele.attr("name") + "-input-error";
    }

    //传入字符串、或者原生的node对象
    function find_ele() {
      if (selector instanceof jQuery) {
        $ele = selector;
      } else {
        $ele = $(selector);
      }
    }

    function parse_rule() {
      var i;
      var rule_str = $ele.data("rule"); // jQuery中data方法就是用于获取"data-xxx"之类的属性值
      if (!rule_str) return;

      var rule_arr = rule_str.split("|"); // ['min:18','maxlength:10']
      for (i = 0; i < rule_arr.length; i++) {
        var item_str = rule_arr[i];
        var item_arr = item_str.split(":"); // ['min','18']
        rule[item_arr[0]] = JSON.parse(item_arr[1]); // {min: 18}
      }
    }
    init();
  };
});
