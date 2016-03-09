var stats = (function() {

  function _changeModifer(element, field) {
    var stat = parseInt(element.value, 10) || 0;
    var modifier = _calculateModifer(element);
    field.textContent = modifier;
  };

  function _calculateModifer(element) {
    var modifier = Math.floor((element.value - 10) / 2);
    return modifier;
  };

  function render() {
    var stats = helper.eA(".stats");
    for (var i = 0; i < stats.length; i++) {
      var score = stats[i].querySelector(".score");
      var modifier = stats[i].querySelector(".modifier");
      var scoreTemp = stats[i].querySelector(".score-temp");
      var Modtempifier = stats[i].querySelector(".modifier-temp");
      if (score.value !== "") {
        _changeModifer(score, modifier);
      } else {
        modifier.textContent = "";
      };
      if (scoreTemp.value !== "") {
        _changeModifer(scoreTemp, Modtempifier);
      } else {
        Modtempifier.textContent = "";
      };
    };
  };

  function bind() {
    var score = helper.eA(".stats .score");
    var scoreTemp = helper.eA(".stats .score-temp");
    for (var i = 0; i < score.length; i++) {
      score[i].addEventListener("input", function() {
        render();
        totalBlock.render();
      }, false);
    };
    for (var i = 0; i < scoreTemp.length; i++) {
      scoreTemp[i].addEventListener("input", function() {
        render();
        totalBlock.render();
      }, false);
    };
  };

  // exposed methods
  return {
    render: render,
    bind: bind
  };

})();
