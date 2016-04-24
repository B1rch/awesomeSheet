var skills = (function() {

  function _store(element) {
    console.log("skill trigger");
    var path = element.dataset.path;
    helper.updateObject(sheet.getCharacter(), path, element.textContent);
    sheet.storeCharacters();
  };

  function toggle(element) {
    console.log("skill trigger");
    var totalBlock = helper.getClosest(element, ".total-block");
    var stats = ["Str", "Dex", "Con", "Int", "Wis", "Cha", "Level", "Half Level", "Bab", " - "];
    var statIndex = stats.indexOf(element.textContent);
    var newStatIndex = statIndex + 1;
    if (newStatIndex >= stats.length) {
      newStatIndex = 0;
    };
    // console.log("statIndex = " + statIndex + " ||| " + "newStatIndex = " + newStatIndex);
    element.textContent = stats[newStatIndex];
    totalBlock.removeAttribute("data-" + stats[statIndex].replace(/\s+/g, "-").toLowerCase() + "-bonus");
    if (newStatIndex <= 8) {
      totalBlock.setAttribute("data-" + stats[newStatIndex].replace(/\s+/g, "-").toLowerCase() + "-bonus", "true");
    };
  };

  function bind() {
    console.log("skill trigger");
    var all_statSelect = helper.eA(".stat-select");
    for (var i = 0; i < all_statSelect.length; i++) {
      all_statSelect[i].addEventListener("click", function() {
        toggle(this);
        _store(this);
        totalBlock.render();
      }, false);
    };
  };

  function render() {
    console.log("skill trigger");
    var all_statSelect = helper.eA(".stat-select");
    for (var i = 0; i < all_statSelect.length; i++) {
      var totalBlock = helper.getClosest(all_statSelect[i], ".total-block");
      var path = all_statSelect[i].dataset.path;
      var stat = helper.getObject(sheet.getCharacter(), path);
      if (stat != " - " && stat != "undefined" && stat != "") {
        totalBlock.setAttribute("data-" + stat.replace(/\s+/g, "-").toLowerCase() + "-bonus", "true");
        all_statSelect[i].textContent = stat;
      };
    };
  };

  // exposed methods
  return {
    render: render,
    bind: bind
  };

})();
