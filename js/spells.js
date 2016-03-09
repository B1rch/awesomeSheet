var spells = (function() {

  var _bind_spellControls = (function() {
    var all_addSpell = helper.eA(".add-spell");
    for (var i = 0; i < all_addSpell.length; i++) {
      all_addSpell[i].addEventListener("click", function() {
        _addNewSpell(helper.getClosest(this, ".new-spell").querySelector(".spell-name"));
        _updateSpells();
        sheet.storeCharacters();
      }, false);
    };
    for (var i = 0; i < all_addSpell.length; i++) {
      var newSpellRoot = helper.getClosest(all_addSpell[i], ".new-spell");
      var all_addSpell_input = newSpellRoot.querySelector("input");
      all_addSpell_input.addEventListener("keypress", function() {
        _addNewSpellOnEnter(this);
        _updateSpells();
        sheet.storeCharacters();
      }, false);
    };
    helper.e("#spells .prepare-spell").addEventListener("click", function() {
      _changeSpellState(this, "prepare");
    }, false);
    helper.e("#spells .unprepare-spell").addEventListener("click", function() {
      _changeSpellState(this, "unprepare");
    }, false);
    helper.e("#spells .cast-spell").addEventListener("click", function() {
      _changeSpellState(this, "cast");
    }, false);
    helper.e("#spells .active-spell").addEventListener("click", function() {
      _changeSpellState(this, "active");
    }, false);
    helper.e("#spells .remove-spell").addEventListener("click", function() {
      _changeSpellState(this, "remove");
    }, false);
  })();

  function _bind_spellKnownItem(element) {
    element.addEventListener("click", function() {
      _changeSpellKnowItem(this);
      sheet.storeCharacters();
    }, false);
  };

  function _changeSpellKnowItem(spell) {
    var spellRoot = helper.getClosest(spell, "#spells");
    var spellLevel = helper.getClosest(spell, ".spell-level").dataset.spellLevel;
    var prepareState = spellRoot.dataset.prepareSpellState;
    var unprepareState = spellRoot.dataset.unprepareSpellState;
    var castState = spellRoot.dataset.castSpellState;
    var activeState = spellRoot.dataset.activeSpellState;
    var deleteState = spellRoot.dataset.deleteSpellState;
    var spellMarks = spell.querySelector(".spell-marks");
    var spellActive = spell.querySelector(".spell-active");
    // state prepare
    if (prepareState == "true") {
      var preparedIcon = document.createElement("span");
      preparedIcon.setAttribute("class", "icon icon-radio-button-checked");
      spellMarks.insertBefore(preparedIcon, spellMarks.firstChild);
      if (spellMarks.children.length > 0) {
        helper.addClass(spell, "button-primary");
        helper.removeClass(spell, "button-tertiary");
        helper.removeClass(spell, "hidable");
      };
    };
    // state unprepare
    if (unprepareState == "true") {
      if (spellMarks.firstChild) {
        spellMarks.firstChild.remove();
      };
      if (spellMarks.children.length <= 0) {
        helper.removeClass(spell, "button-primary");
        helper.addClass(spell, "button-tertiary");
        helper.addClass(spell, "hidable");
      };
    };
    // state cast
    if (castState == "true") {
      var all_spellsMarks = spellMarks.children;
      var all_spellsCast = 0;
      for (var i = 0; i < all_spellsMarks.length; i++) {
        if (all_spellsMarks[i].classList.contains("icon-radio-button-checked")) {
          helper.toggleClass(all_spellsMarks[i], "icon-radio-button-checked");
          helper.toggleClass(all_spellsMarks[i], "icon-radio-button-unchecked");
          break
        };
      };
      // if no checked icons can be found change the var allSpellCast to true
      for (var i = 0; i < all_spellsMarks.length; i++) {
        if (all_spellsMarks[i].classList.contains("icon-radio-button-checked")) {
          all_spellsCast++;
        };
      };
      // allSpellCast to true change spell button class
      if (all_spellsCast <= 0) {
        helper.removeClass(spell, "button-primary");
        helper.addClass(spell, "button-tertiary");
      };
    };
    // state active
    if (activeState == "true") {
      var activeIcon = document.createElement("span");
      activeIcon.setAttribute("class", "icon icon-play-arrow");
      if (spellMarks.children.length > 0) {
        if (spellActive.children.length > 0) {
          spellActive.firstChild.remove();
        } else {
          spellActive.appendChild(activeIcon);
        };
      };
      if (spellMarks.children.length <= 0) {
        if (spellActive.children.length > 0) {
          spellActive.firstChild.remove();
        };
      };
    };
    // state delete
    if (deleteState == "true") {
      var spellNameText = spell.textContent;
      spell.remove();
      snack.render(spellNameText + " removed.", false, false);
    };
    _updateSpells();
  };

  function _addNewSpell(element) {
    var level = helper.getClosest(element, ".spell-level").dataset.spellLevel;
    var spallName = element.value;
    var newSpell = _createSpellObject(spallName, parseInt(level, 10), 0, false, 0);
    // if input value is not empty
    if (spallName !== "") {
      //  if first character is not a number
      if (isNaN(spallName.charAt(0))) {
        // add spell button to spell list
        // knownListToSaveTo.appendChild(newSpell);
        _render_spell([newSpell]);
        // clear input field
        element.value = "";
        // add spell to current character object
        sheet.getCharacter(sheet.getIndex()).spells.push(newSpell);
        // make a snack bar
        snack.render(spallName + " added to spell level " + level + ".", false, false);
      } else {
        // error if the name starts with a number
        snack.render("Name can't start with a number.", false, false);
      };
    };
  };

  function _addNewSpellOnEnter(element) {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 13) {
      _addNewSpell(element);
      sheet.storeCharacters();
    };
  };

  function _changeSpellState(element, state) {
    var spellRoot = helper.getClosest(element, "#spells");
    var prepareStateButton = spellRoot.querySelector(".prepare-spell");
    var unprepareStateButton = spellRoot.querySelector(".unprepare-spell");
    var castStateButton = spellRoot.querySelector(".cast-spell");
    var activeStateButton = spellRoot.querySelector(".active-spell");
    var removeStateButton = spellRoot.querySelector(".remove-spell");
    var all_spellStateControls = spellRoot.querySelectorAll(".spell-state-control");
    if (element.classList.contains("active")) {
      for (var i = 0; i < all_spellStateControls.length; i++) {
        helper.removeClass(all_spellStateControls[i], "active");
      };
      spellRoot.dataset.prepareSpellState = "false";
      spellRoot.dataset.unprepareSpellState = "false";
      spellRoot.dataset.castSpellState = "false";
      spellRoot.dataset.activeSpellState = "false";
      spellRoot.dataset.deleteSpellState = "false";
      helper.removeClass(spellRoot, "prepare-state");
      helper.removeClass(spellRoot, "unprepare-state");
      helper.removeClass(spellRoot, "cast-state");
      helper.removeClass(spellRoot, "active-state");
      helper.removeClass(spellRoot, "delete-state");
      helper.removeClass(removeStateButton, "button-primary");
      helper.addClass(removeStateButton, "button-secondary");
    } else {
      for (var i = 0; i < all_spellStateControls.length; i++) {
        helper.removeClass(all_spellStateControls[i], "active");
      };
      helper.addClass(element, "active");
      if (state == "prepare") {
        spellRoot.dataset.prepareSpellState = "true";
        spellRoot.dataset.unprepareSpellState = "false";
        spellRoot.dataset.castSpellState = "false";
        spellRoot.dataset.activeSpellState = "false";
        spellRoot.dataset.deleteSpellState = "false";
        helper.addClass(spellRoot, "prepare-state");
        helper.removeClass(spellRoot, "unprepare-state");
        helper.removeClass(spellRoot, "cast-state");
        helper.removeClass(spellRoot, "active-state");
        helper.removeClass(spellRoot, "delete-state");
        helper.removeClass(removeStateButton, "button-primary");
        helper.addClass(removeStateButton, "button-secondary");
      } else if (state == "unprepare") {
        spellRoot.dataset.prepareSpellState = "false";
        spellRoot.dataset.unprepareSpellState = "true";
        spellRoot.dataset.castSpellState = "false";
        spellRoot.dataset.activeSpellState = "false";
        spellRoot.dataset.deleteSpellState = "false";
        helper.removeClass(spellRoot, "prepare-state");
        helper.addClass(spellRoot, "unprepare-state");
        helper.removeClass(spellRoot, "cast-state");
        helper.removeClass(spellRoot, "active-state");
        helper.removeClass(spellRoot, "delete-state");
        helper.removeClass(removeStateButton, "button-primary");
        helper.addClass(removeStateButton, "button-secondary");
      } else if (state == "cast") {
        spellRoot.dataset.prepareSpellState = "false";
        spellRoot.dataset.unprepareSpellState = "false";
        spellRoot.dataset.castSpellState = "true";
        spellRoot.dataset.activeSpellState = "false";
        spellRoot.dataset.deleteSpellState = "false";
        helper.removeClass(spellRoot, "prepare-state");
        helper.removeClass(spellRoot, "unprepare-state");
        helper.addClass(spellRoot, "cast-state");
        helper.removeClass(spellRoot, "active-state");
        helper.removeClass(spellRoot, "delete-state");
        helper.removeClass(removeStateButton, "button-primary");
        helper.addClass(removeStateButton, "button-secondary");
      } else if (state == "active") {
        spellRoot.dataset.prepareSpellState = "false";
        spellRoot.dataset.unprepareSpellState = "false";
        spellRoot.dataset.castSpellState = "false";
        spellRoot.dataset.activeSpellState = "true";
        spellRoot.dataset.deleteSpellState = "false";
        helper.removeClass(spellRoot, "prepare-state");
        helper.removeClass(spellRoot, "unprepare-state");
        helper.removeClass(spellRoot, "cast-state");
        helper.addClass(spellRoot, "active-state");
        helper.removeClass(spellRoot, "delete-state");
        helper.removeClass(removeStateButton, "button-primary");
        helper.addClass(removeStateButton, "button-secondary");
      } else if (state == "remove") {
        spellRoot.dataset.prepareSpellState = "false";
        spellRoot.dataset.unprepareSpellState = "false";
        spellRoot.dataset.castSpellState = "false";
        spellRoot.dataset.activeSpellState = "false";
        spellRoot.dataset.deleteSpellState = "true";
        helper.removeClass(spellRoot, "prepare-state");
        helper.removeClass(spellRoot, "unprepare-state");
        helper.removeClass(spellRoot, "cast-state");
        helper.removeClass(spellRoot, "active-state");
        helper.addClass(spellRoot, "delete-state");
        helper.addClass(removeStateButton, "button-primary");
        helper.removeClass(removeStateButton, "button-secondary");
      };
    };
  };

  function _render_spell(array) {
    // read spells and add them to spell lists
    for (var i = 0; i < array.length; i++) {
      var spellObject = array[i];
      // find spell list to add too
      var knownListToSaveTo = helper.e(".spells-known.spell-level-" + spellObject.level);
      // append new spell to spell list
      var spellButton = _createSpellButton(spellObject.name);
      knownListToSaveTo.appendChild(spellButton);
      // find spell mark parent
      var spellMarks = spellButton.querySelector(".spell-marks");
      var spellActive = spellButton.querySelector(".spell-active");
      // add spell marks
      if (spellObject.prepared > 0) {
        helper.removeClass(spellButton, "hidable");
        helper.removeClass(spellButton, "button-tertiary");
        helper.addClass(spellButton, "button-primary");
        for (var j = 0; j < spellObject.prepared; j++) {
          var preparedIcon = document.createElement("span");
          preparedIcon.setAttribute("class", "icon icon-radio-button-checked");
          spellMarks.insertBefore(preparedIcon, spellMarks.firstChild);
        };
      };
      // cast spells if cast > 0
      if (spellObject.cast > 0) {
        var all_check = spellMarks.querySelectorAll(".icon-radio-button-checked");
        for (var j = 0; j < spellObject.cast; j++) {
          if (all_check[j]) {
            helper.removeClass(all_check[j], "icon-radio-button-checked");
            helper.addClass(all_check[j], "icon-radio-button-unchecked");
          };
        };
        if (spellObject.cast >= spellObject.prepared) {
          helper.removeClass(spellButton, "button-primary");
          helper.addClass(spellButton, "button-tertiary");
        };
      };
      // if spell is active
      if (spellObject.active) {
        var activeIcon = document.createElement("span");
        activeIcon.setAttribute("class", "icon icon-play-arrow");
        if (spellObject.prepared > 0) {
          if (spellActive.children.length > 0) {
            spellActive.firstChild.remove();
          } else {
            spellActive.appendChild(activeIcon);
          };
        };
      };
      _bind_spellKnownItem(spellButton);
    };
  };

  function _createSpellButton(spellName) {
    var spellButton = document.createElement("button");
    spellButton.setAttribute("data-spell-name", spellName.replace(/\s+/g, "-").toLowerCase());
    spellButton.setAttribute("id", spellName.replace(/\s+/g, "-").toLowerCase());
    spellButton.setAttribute("class", "spell-known-item button button-tertiary hidable");
    var spellNameSpan = document.createElement("span");
    spellNameSpan.setAttribute("class", "spell-name");
    spellNameSpan.textContent = spellName;
    spellButton.appendChild(spellNameSpan);
    var spellMarks = document.createElement("span");
    spellMarks.setAttribute("class", "spell-marks");
    spellButton.appendChild(spellMarks);
    var spellActive = document.createElement("span");
    spellActive.setAttribute("class", "spell-active");
    spellButton.appendChild(spellActive);
    return spellButton;
  };

  function _createSpellObject(spellName, spellLevel, spellPrepared, spellActive, spellCast) {
    return {
      name: this.name = spellName,
      level: this.level = spellLevel,
      prepared: this.prepared = spellPrepared || 0,
      active: this.active = spellActive || false,
      cast: this.cast = spellCast || 0
    };
  };

  function _updateSpells() {
    var all_spellKnownItems = helper.eA(".spell-known-item");
    var spells = [];
    for (var i = 0; i < all_spellKnownItems.length; i++) {
      var name = all_spellKnownItems[i].textContent;
      var level = parseInt(helper.getClosest(all_spellKnownItems[i], ".spell-level").dataset.spellLevel, 10) || 0;
      var prepared = all_spellKnownItems[i].querySelector(".spell-marks").children.length;
      var cast = all_spellKnownItems[i].querySelector(".spell-marks").querySelectorAll(".icon-radio-button-unchecked").length;
      var active = all_spellKnownItems[i].querySelector(".spell-active").children.length;
      if (active > 0) {
        active = true;
      } else {
        active = false;
      };
      var newSpell = new _createSpellObject(name, level, prepared, active, cast);
      // add to current character object
      spells.push(newSpell);
    };
    sheet.getCharacter(sheet.getIndex()).spells = spells;
  };

  function render() {
    // build an array of spell objects
    var all_spells = [];
    // iterate over all objects keys to find spells then push those values to all_spells
    if (sheet.getCharacter(sheet.getIndex()).spells) {
      for (var i in sheet.getCharacter(sheet.getIndex()).spells) {
        all_spells.push(sheet.getCharacter(sheet.getIndex()).spells[i]);
      };
    };
    _render_spell(all_spells);
  };

  // exposed methods
  return {
    render: render
  };

})();
