/*
var validator = {};

validator.validate_min = function (val, min) {
    ... return true;
    ... return false;
}

validator.validate_min = function (val, min) {
    ... return true;
    ... return false;
}
//上面代码的过于重复、复杂，不利于理解
//我们的需求：程序自动进行验证，对代码进行优化
if (input.validator.is_valid()){

}//进行模块化设计，把验证的功能放到一个文件里面

/*选中页面中所有的input[data-rule]*/

/*解析每一个input的验证规则*/

/*验证（程序的核心）*/
/*
var name_validator = new Validator(user_input, rule);//每次创建一个对象，根据每次传入的值都会有不同的对象产生
name_validator.is_valid();
*/

/*
$(function() {
  "use strict";
  var validator = new Validator("", {
    max: 100,
    min: 10,
    maxlength: 5,
    pattern: '^[a-zA-Z0-9]*$'
  });

  // var result = validator.validate_max();
  // var result = validator.validate_min();
  // var result = validator.validate_maxlength();
  // var result = validator.validate_numeric();
  // var result = validator.validate_required();
  var result = validator.validate_pattern();

  console.log("result: ", result);
});
*/

$(function() {
  "use strict";
  // var test = new Input('#test');
  // var valid = test.validator.is_valid();
  // console.log('valid:', valid);
  /*选中页面中所有的input[data-rule]*/
  var $inputs = $("[data-rule]"),
    $form = $("#signup"),
    inputs = [];
  /* jQuery的each方法属于迭代方法 */
  $inputs.each(function(index, node) {
    /* 解析每一个input的验证规则 */
    var tmp = new Input(node); //规则的解释在parse_rule()里面完成
    inputs.push(tmp);
  });
  $form.on("submit", function(e) {
    e.preventDefault();
    $inputs.trigger("blur");
    for (var i = 0; i < inputs.length; i++) {
      var item = inputs[i];
      var r = item.validator.is_valid();
      if (!r) {
        alert("invalid");
        return;
      }
    }
    alert("注册成功！");
  });
  function signup() {
    //$.post('/api/signup', {...frames});
  }
  //console.log("inputs:", inputs);
});
