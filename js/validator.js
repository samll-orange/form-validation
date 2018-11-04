/*
//专门用于验证

var validator = {};
//使得input拥有一个内置的validator对象
//使用JS里面的（constructor）构造函数（构造器）来创建对象

//不污染全局变量，立即执行函数
;(function(){
    'use strict';
    ...;
})();

//JQuery做法：
$(function() {
    'use strict';

    //暴露一个全局的数据，方便调用

    window.Validator = function (val, rule) {
        //设计一个总体的验证，val、rule变量属于私有的，每个对象都是拥有自身的属性和变量
        //可以防止污染下游的代码
        //this-->指向创建的对象
        this.is_valid = function () {
            return true;
        }

        this.validate_max = function () {
            return true;
            return false;
        }

        this.validate_min = function () {
            return true;
            return false;
        }
    }
});
*/
//把规则rule放入到一个对象里面去，便于识别
/*
rule = {
    max: 100,
    min: 5,
    maxlength: 10,
    numeric: false,
}
*/
$(function() {
  "use strict";

  window.Validator = function(val, rule) {
    this.is_valid = function(new_val) {
      var key;
      if (new_val !== undefined) val = new_val; //判断用户输入值的变化情况
      /*如果不是必填项且用户未填写任何内容则直接判定为合法*/
      if (!rule.required && !val) {
        return true;
      }
      for (key in rule) {
        //防止重复检查
        if (key === "required") {
          continue; //迭代下一条规则
        }
        //调用rule中相对应的方法
        var r = this["validate_" + key]();
        if (!r) return false;
      }
      return true;
    };

    this.validate_max = function() {
      pre_max_min(); //把用户输入的东西转换成数字
      return val <= rule.max;
    };

    this.validate_min = function() {
      pre_max_min(); //把用户输入的东西转换成数字
      return val >= rule.min;
    };

    this.validate_maxlength = function() {
      pre_length();
      return val.length <= rule.maxlength;
    };

    this.validate_minlength = function() {
      pre_length();
      return val.length >= rule.minlength;
    };

    //判断是否为数字
    this.validate_numeric = function() {
      return $.isNumeric(val);
    };
    //判断是否为空字符串
    this.validate_required = function() {
      var real = $.trim(val); //去掉用户输入的空格
      if (!real && real !== 0) {
        return false;
      }
      return true;
    };

    //正则表达式匹配用户名
    this.validate_pattern = function() {
      var reg = new RegExp(rule.pattern); //通过RegExp来生成正则表达式对象实例，使用字符串来构造
      return reg.test(val);
    };
    /** 用于完成this.validate_max或this.validate_min的前置工作**/
    function pre_max_min() {
      val = parseFloat(val);
    }
    /** 用于完成this.validate_maxlength或this.validate_minlength的前置工作**/
    function pre_length() {
      val = val.toString();
    }
  };
});
