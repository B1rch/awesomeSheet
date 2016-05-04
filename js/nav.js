var nav = (function() {

  function _fullscreen() {
    var fullscreen = helper.e(".js-fullscreen");
    var root = window.document;
    var icon = fullscreen.querySelector("span");
    var rootElement = root.documentElement;
    var requestFullScreen = rootElement.requestFullscreen || rootElement.mozRequestFullScreen || rootElement.webkitRequestFullScreen || rootElement.msRequestFullscreen;
    var cancelFullScreen = root.exitFullscreen || root.mozCancelFullScreen || root.webkitExitFullscreen || root.msExitFullscreen;
    if (!root.fullscreenElement && !root.mozFullScreenElement && !root.webkitFullscreenElement && !root.msFullscreenElement) {
      requestFullScreen.call(rootElement);
      helper.toggleClass(fullscreen, "is-active");
      helper.toggleClass(icon, "icon-fullscreen-exit");
      helper.toggleClass(icon, "icon-fullscreen");
    } else {
      cancelFullScreen.call(root);
      helper.toggleClass(fullscreen, "is-active");
      helper.toggleClass(icon, "icon-fullscreen-exit");
      helper.toggleClass(icon, "icon-fullscreen");
    }
  };

  function _render_navCharacters(characterName, characterClass, characterLevel, characterIndex) {
    if (typeof characterName == "undefined" || characterName == "") {
      characterName = "New character";
    };
    if (typeof characterClass == "undefined" || characterClass == "") {
      characterClass = "Class";
    };
    if (typeof characterLevel == "undefined" || characterLevel == "") {
      characterLevel = "Level";
    };

    // define elements
    var uniqueId = helper.randomId(10);

    var navCharacter = document.createElement("li");
    navCharacter.setAttribute("class", "m-nav-character js-nav-character character-index-" + characterIndex);
    navCharacter.setAttribute("data-character-index", characterIndex);

    var input = document.createElement("input");
    input.setAttribute("id", characterName.replace(/\s+/g, "-").toLowerCase() + "-" + uniqueId);
    input.setAttribute("name", "js-nav-all-characters");
    input.setAttribute("class", "js-nav-character-select");
    input.setAttribute("type", "radio");
    input.setAttribute("tabindex", 10);

    var label = document.createElement("label");
    label.setAttribute("for", characterName.replace(/\s+/g, "-").toLowerCase() + "-" + uniqueId);
    label.setAttribute("class", "u-full-width");

    var nameSpan = document.createElement("span");
    nameSpan.setAttribute("class", "m-nav-characters-name js-nav-characters-name");
    nameSpan.textContent = helper.truncate(characterName, 30, true);

    var classSpan = document.createElement("span");
    classSpan.setAttribute("class", "m-nav-characters-class js-nav-characters-class");
    classSpan.textContent = helper.truncate(characterClass, 20, true) + " ";

    var levelSpan = document.createElement("span");
    levelSpan.setAttribute("class", "m-nav-characters-level js-nav-characters-level");
    levelSpan.textContent = helper.truncate(characterLevel, 10);

    // build module
    label.appendChild(nameSpan);
    label.appendChild(classSpan);
    label.appendChild(levelSpan);
    navCharacter.appendChild(input);
    navCharacter.appendChild(label);

    // bind
    _bind_characterOption(navCharacter);
    return navCharacter;
  };

  function _bind_characterOption(characterLink) {
    characterLink.addEventListener("click", function() {
      _switch_character(this);
      sheet.storeCharacters();
    }, false);
  };

  function _switch_character(characterLink) {
    var newIndex = characterLink.dataset.characterIndex;
    sheet.setIndex(newIndex);
    sheet.clear();
    sheet.render();
    characterLink.querySelector("input").checked = true;
    var name = sheet.getCharacter().basics.name;
    if (typeof name == "undefined" || name == "") {
      name = "New character";
    };
    snack.render(helper.truncate(name, 50, true) + " now active.", false, false);
  };

  function updateNavCharacters(input) {
    var inputType = input.dataset.characterNav;
    var inputValue = input.value;
    if (inputType == "name") {
      if (typeof inputValue == "undefined" || inputValue == "") {
        inputValue = "New character";
      };
      helper.e(".character-index-" + sheet.getIndex()).querySelector(".js-nav-characters-name").textContent = helper.truncate(inputValue, 30, true);
    } else if (inputType == "class") {
      if (typeof inputValue == "undefined" || inputValue == "") {
        inputValue = "Class";
      };
      helper.e(".character-index-" + sheet.getIndex()).querySelector(".js-nav-characters-class").textContent = helper.truncate(inputValue, 20, true) + " ";
    } else if (inputType == "level") {
      if (typeof inputValue == "undefined" || inputValue == "") {
        inputValue = "Level";
      };
      helper.e(".character-index-" + sheet.getIndex()).querySelector(".js-nav-characters-level").textContent = helper.truncate(inputValue, 10, false);
    };
  };

  function clear() {
    var all_navCharacters = helper.eA(".js-nav-characters");
    for (var i = 0; i < all_navCharacters.length; i++) {
      while (all_navCharacters[i].lastChild) {
        all_navCharacters[i].removeChild(all_navCharacters[i].lastChild);
      };
    };
  };

  function render() {
    var characters = sheet.getAllCharacters();
    var navCharacters = helper.e(".js-nav-characters");
    for (var i in characters) {
      var characterAnchor = _render_navCharacters(characters[i].basics.name, characters[i].basics.class, characters[i].basics.level, i);
      navCharacters.appendChild(characterAnchor);
    };
    var all_navCharacterSelect = helper.eA(".js-nav-character-select");
    all_navCharacterSelect[sheet.getIndex()].checked = true;
    render_quickNav();
  };

  function render_quickNav() {
    window.onscroll = function() {
      var quickNav = helper.e(".js-quick-nav");
      var quickNavLinks = helper.eA(".js-quick-nav-link");
      var all_section = helper.eA(".js-section");
      var menu = 60;
      for (var i = 0; i < all_section.length; i++) {
        // console.log(all_section[i].id + " top = " + all_section[i].getBoundingClientRect().top + " | bottom = " + all_section[i].getBoundingClientRect().bottom);
        var sectionHeading = all_section[i].querySelector(".js-section-heading");
        if (all_section[i].getBoundingClientRect().top <= menu && all_section[i].getBoundingClientRect().bottom > menu) {
          for (var j = 0; j < quickNavLinks.length; j++) {
            helper.removeClass(quickNavLinks[j], "is-active");
          };
          helper.addClass(quickNavLinks[i], "is-active");
          if (sectionHeading) {
            helper.addClass(all_section[i], "is-pinned");
            helper.addClass(sectionHeading, "is-pinned");
          };
        } else {
          helper.removeClass(quickNavLinks[i], "is-active");
          if (sectionHeading) {
            helper.removeClass(all_section[i], "is-pinned");
            helper.removeClass(sectionHeading, "is-pinned");
          };
        };
      };
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        var lastQuickLink = helper.e(".js-quick-nav-last-link");
        for (var i = 0; i < quickNavLinks.length; i++) {
          helper.removeClass(quickNavLinks[i], "is-active");
        };
        helper.addClass(lastQuickLink, "is-active");
      };
    };
  };

  function navClose() {
    helper.removeClass(helper.e(".js-nav"), "is-open");
    helper.removeClass(helper.e(".js-nav-toggle"), "is-open");
  };

  function navOpen() {
    helper.addClass(helper.e(".js-nav"), "is-open");
    helper.addClass(helper.e(".js-nav-toggle"), "is-open");
  };

  function navToggle() {
    helper.toggleClass(helper.e(".js-nav"), "is-open");
    helper.toggleClass(helper.e(".js-nav-toggle"), "is-open");
  };

  function remove() {
    var name;
    if (sheet.getCharacter().basics.name) {
      name = sheet.getCharacter().basics.name;
    } else {
      name = "New character";
    };
    prompt.render("Remove " + name + "?", "This character will be removed. This can not be undone.", "Confirm", sheet.removeCharacter);
  };

  function resize() {
    var nav = helper.e(".js-nav");
    var height = window.innerHeight - 120;
    nav.style.maxHeight = height + "px";
  };

  function bind() {
    var nav = helper.e(".js-nav");
    var navToggleElement = helper.e(".js-nav-toggle");
    var fullscreen = helper.e(".js-fullscreen");
    var clearAll = helper.e(".js-clear-all");
    var characterAdd = helper.e(".js-character-add");
    var characterRemove = helper.e(".js-character-remove");
    var characterExport = helper.e(".js-character-export");
    navToggleElement.addEventListener("click", function() {
      navToggle();
    }, false);
    fullscreen.addEventListener("click", function() {
      _fullscreen();
    }, false);
    clearAll.addEventListener("click", function() {
      prompt.render("Are you sure?", "All characters will be removed. This can not be undone.", "Confirm", sheet.destroy);
      navClose();
    }, false);
    characterExport.addEventListener("click", function() {
      sheet.print();
      navClose();
    }, false);
    characterAdd.addEventListener("click", function() {
      sheet.addCharacter();
      snack.render("New character added.", false, false);
    }, false);
    characterRemove.addEventListener("click", function() {
      remove();
      navClose();
    }, false);
    window.addEventListener('click', function(event) {
      if (event.target != nav && event.target != navToggleElement && helper.getClosest(event.target, ".js-nav") != nav && helper.getClosest(event.target, ".js-nav-toggle") != navToggleElement) {
        navClose();
      };
    }, false);
    window.addEventListener("keydown", function(event) {
      if (event.which == 8 && event.ctrlKey) {
        prompt.render("Are you sure?", "All characters will be removed. This can not be undone.", "Confirm", sheet.destroy);
        navClose();
      };
    }, false);
    window.addEventListener("keydown", function(event) {
      if (event.which == 69 && event.ctrlKey) {
        sheet.print();
        navClose();
      };
    }, false);
    window.addEventListener("keydown", function(event) {
      if (event.keyCode == 27) {
        navClose();
      };
    }, false);
    window.addEventListener("keydown", function(event) {
      if (event.keyCode == 77 && event.ctrlKey) {
        navToggle();
      };
    }, false);
    window.addEventListener("resize", function(event) {
      resize();
    }, false);
  };

  // exposed methods
  return {
    resize: resize,
    bind: bind,
    clear: clear,
    render: render,
    update: updateNavCharacters,
    open: navOpen,
    close: navClose,
    toggle: navToggle
  }

})();
