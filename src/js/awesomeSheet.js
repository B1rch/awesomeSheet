(function() {

  // --------------------------------------------------------------------------
  // vars
  // --------------------------------------------------------------------------

  var stats_strScore = e(".stats.str .score");
  var stats_dexScore = e(".stats.dex .score");
  var stats_conScore = e(".stats.con .score");
  var stats_intScore = e(".stats.int .score");
  var stats_wisScore = e(".stats.wis .score");
  var stats_chaScore = e(".stats.cha .score");

  var stats_strMod = e(".stats.str .modifier");
  var stats_dexMod = e(".stats.dex .modifier");
  var stats_conMod = e(".stats.con .modifier");
  var stats_intMod = e(".stats.int .modifier");
  var stats_wisMod = e(".stats.wis .modifier");
  var stats_chaMod = e(".stats.cha .modifier");

  var stats_strScoreTemp = e(".stats.str .score-temp");
  var stats_dexScoreTemp = e(".stats.dex .score-temp");
  var stats_conScoreTemp = e(".stats.con .score-temp");
  var stats_intScoreTemp = e(".stats.int .score-temp");
  var stats_wisScoreTemp = e(".stats.wis .score-temp");
  var stats_chaScoreTemp = e(".stats.cha .score-temp");

  var stats_strModTemp = e(".stats.str .modifier-temp");
  var stats_dexModTemp = e(".stats.dex .modifier-temp");
  var stats_conModTemp = e(".stats.con .modifier-temp");
  var stats_intModTemp = e(".stats.int .modifier-temp");
  var stats_wisModTemp = e(".stats.wis .modifier-temp");
  var stats_chaModTemp = e(".stats.cha .modifier-temp");

  // --------------------------------------------------------------------------
  // helper functions
  // --------------------------------------------------------------------------

  // get element by class or id
  function e(selector) {
    return document.querySelector(selector);
  };

  // get all elements by class or id
  function eA(selector) {
    return document.querySelectorAll(selector);
  };

  // toggle class
  function toggleClass(element, theClassName) {
    element.classList.toggle(theClassName);
  };

  // add class
  function addClass(element, theClassName) {
    element.classList.add(theClassName);
  };

  // remove class
  function removeClass(element, theClassName) {
    element.classList.remove(theClassName);
  };

  // get parent element
  function getClosest(element, selector) {
    var firstChar = selector.charAt(0);
    // Get closest match
    for (; element && element !== document; element = element.parentNode) {
      // If selector is a class
      if (firstChar === '.') {
        if (element.classList.contains(selector.substr(1))) {
          return element;
        };
      };
      // If selector is an ID
      if (firstChar === '#') {
        if (element.id === selector.substr(1)) {
          return element;
        };
      };
      // If selector is a data attribute
      if (firstChar === '[') {
        if (element.hasAttribute(selector.substr(1, selector.length - 2))) {
          return element;
        };
      };
      // If selector is a tag
      if (element.tagName.toLowerCase() === selector) {
        return element;
      };
    };
    return false;
  };

  // check value
  function checkValue(element) {
    var value = parseInt(element.value, 10) || 0;
    return value;
  };

  // delay function
  function delayFunction(functionToDelay, time) {
    window.setTimeout(functionToDelay, time);
  };

  // --------------------------------------------------------------------------
  // local store
  // --------------------------------------------------------------------------

  // local storage add
  function localStoreAdd(key, data) {
    if (localStorage.getItem) {
      localStorage.setItem(key, data);
    };
  };

  // local storage remove
  function localStoreRemove(key) {
    if (localStorage.getItem) {
      localStorage.removeItem(key);
    };
  };

  // local storage read
  function localStoreRead(key) {
    if (localStorage.getItem(key) == "") {
      localStorage.removeItem(key);
    } else if (localStorage.getItem(key)) {
      return localStorage.getItem(key);
    };
  };

  // --------------------------------------------------------------------------
  // current character
  // --------------------------------------------------------------------------

  var currentCharacterCount;
  var currentCharacter;

  function setCharacterCount() {
    // if there is a character count read it or set it to 1
    if (localStoreRead("current-character-count")) {
      currentCharacterCount = localStoreRead("current-character-count");
    } else {
      currentCharacterCount = 1;
      localStoreAdd("current-character-count", currentCharacterCount);
    };
  };

  function setCharacter() {
    // if there is a character in local storage read it or use an external js file
    if (localStoreRead("character-" + currentCharacterCount)) {
      currentCharacter = JSON.parse(localStoreRead("character-" + currentCharacterCount));
    } else {
      // currentCharacter = new Object();
      currentCharacter = nif;
    };
  };

  function read_inputAndTextarea() {
    // iterate over the character object and find id for element and populate the value
    for (var i in currentCharacter) {
      if (i.substring(0, 8) == "textarea") {
        e("#" + i).innerHTML = currentCharacter[i];
      };
    };
    for (var i in currentCharacter) {
      if (i.substring(0, 5) == "input") {
        e("#" + i).value = currentCharacter[i];
      };
    };
  };

  function store_currentCharacter() {
    localStoreAdd("character-" + currentCharacterCount, JSON.stringify(currentCharacter));
    // console.log(currentCharacter);
  };

  // --------------------------------------------------------------------------
  // nav
  // --------------------------------------------------------------------------

  var nav = e("nav");
  var nav_toggle = e("nav .toggle-nav");
  var nav_clearAll = e(".clear-all");
  var nav_toggleFullscreen = e(".toggle-fullscreen");

  function toggleFullScreen() {
    var icon = nav_toggleFullscreen.querySelector("span");
    var root = window.document;
    var rootElement = root.documentElement;
    var requestFullScreen = rootElement.requestFullscreen || rootElement.mozRequestFullScreen || rootElement.webkitRequestFullScreen || rootElement.msRequestFullscreen;
    var cancelFullScreen = root.exitFullscreen || root.mozCancelFullScreen || root.webkitExitFullscreen || root.msExitFullscreen;
    if (!root.fullscreenElement && !root.mozFullScreenElement && !root.webkitFullscreenElement && !root.msFullscreenElement) {
      requestFullScreen.call(rootElement);
      toggleClass(nav_toggleFullscreen, "active");
      toggleClass(icon, "icon-fullscreen-exit");
      toggleClass(icon, "icon-fullscreen");
    } else {
      cancelFullScreen.call(root);
      toggleClass(nav_toggleFullscreen, "active");
      toggleClass(icon, "icon-fullscreen-exit");
      toggleClass(icon, "icon-fullscreen");
    }
  };

  nav_toggleFullscreen.addEventListener("click", function() {
    toggleFullScreen();
  }, false);

  nav_clearAll.addEventListener("click", function() {
    createPrompt("Are you sure?", "All information will be removed. This can not be undone.", "clear all");
    removeClass(nav, "open");
  }, false);

  nav_toggle.addEventListener("click", function() {
    toggleClass(nav, "open");
  }, false);

  window.addEventListener('click', function(event) {
    if (event.target != nav && getClosest(event.target, "nav") != nav) {
      removeClass(nav, "open");
    };
  });

  // --------------------------------------------------------------------------
  // consumable block
  // --------------------------------------------------------------------------

  // limit input count to 0 to 100
  function minMaxCountLimit(element) {
    if (element.value <= 0) {
      element.value = "";
    } else if (element.value >= 100) {
      element.value = 100;
    };
  };

  // add consumable checks on total increase
  function addConsumableChecks(element) {
    var clone = getClosest(element, ".clone");
    var consumableCounts = clone.querySelector(".consumable-counts");
    var consumableTotal_value = parseInt(element.value, 10) || 0;
    var checkGroup = consumableCounts.querySelector(".check-group");
    var all_checks = consumableCounts.querySelectorAll(".check").length;
    // make check group
    function addCheckGroup() {
      var checkGroup = document.createElement("div");
      checkGroup.setAttribute("class", "check-group");
      consumableCounts.appendChild(checkGroup);
      // consumableCounts.insertBefore(checkGroup, consumableCounts.firstChild);
    };
    // if no check group is present and the input value is more than 0 make a check group
    if (!checkGroup) {
      if (consumableTotal_value > 0) {
        addCheckGroup();
      };
    };
    // while all the checks in the block is less than the consumable value add a check to the check group
    while (all_checks < consumableTotal_value) {
      var checkGroup = consumableCounts.lastChild;
      // if check group children is more than or equal to 10 make a new check group and make that the new target
      if (checkGroup.children.length >= 10) {
        addCheckGroup();
        checkGroup = consumableCounts.lastChild;
      };
      // make a check
      var check = document.createElement("span");
      check.setAttribute("class", "check");
      // add check to check group
      checkGroup.appendChild(check);
      all_checks++;
    };
    // while all the checks in the block is more than the consumable value remove a check to the check group
    while (all_checks > consumableTotal_value) {
      var checkGroup = consumableCounts.lastChild;
      // if check group children is more than 0 remove a check
      if (checkGroup.children.length > 0) {
        checkGroup.removeChild(checkGroup.lastChild);
      };
      // if check group children is less that or equal to 0 remove check group and set new check group as tatget  if it exists
      if (checkGroup.children.length <= 0) {
        checkGroup.remove();
        if (all_checks > 0) {
          checkGroup = consumableCounts.querySelector(".check-group");
        };
      };
      all_checks--;
    };
    toggleConsumableChecks(element);
  };

  // toggle consumable check when used value is changed
  function toggleConsumableChecks(element) {
    var clone = getClosest(element, ".clone");
    var consumableCounts = clone.querySelector(".consumable-counts");
    var consumableUsed = clone.querySelector(".consumable-used");
    var consumableUsed_value = parseInt(consumableUsed.value, 10) || 0;
    var all_checks = consumableCounts.querySelectorAll(".check");
    var remainingUses = all_checks.length - consumableUsed_value;
    // add used class to all checks
    for (var i = 0; i < all_checks.length; i++) {
      addClass(all_checks[i], "used");
    };
    // remove used class from remaing checks
    for (var i = 0; i < remainingUses; i++) {
      removeClass(all_checks[i], "used");
    };
  };

  function update_consumableTotal() {
    var all_consumableTotal = eA(".consumable-total");
    for (var i = 0; i < all_consumableTotal.length; i++) {
      addConsumableChecks(all_consumableTotal[i]);
    };
  };

  function update_consumableUsed() {
    var all_consumableUsed = eA(".consumable-used");
    for (var i = 0; i < all_consumableUsed.length; i++) {
      toggleConsumableChecks(all_consumableUsed[i]);
    };
  };

  // --------------------------------------------------------------------------
  // clone 
  // --------------------------------------------------------------------------

  // add listners to all clone block controls
  function addListenerTo_all_cloneBlock() {
    var consumablesCloneAdd = e(".consumables .clone-add");
    var consumablesCloneRemove = e(".consumables .clone-remove");
    var attacksCloneAdd = e(".attacks .clone-add");
    var attacksCloneRemove = e(".attacks .clone-remove");
    consumablesCloneAdd.addEventListener("click", function() {
      cloneBlockAdd(".consumables");
      createSnackBar("Consumables block added.", false, false);
    }, false);
    consumablesCloneRemove.addEventListener("click", function() {
      changeCloneState(".consumables");
    }, false);
    attacksCloneAdd.addEventListener("click", function() {
      cloneBlockAdd(".attacks");
      createSnackBar("Attack block added.", false, false);
    }, false);
    attacksCloneRemove.addEventListener("click", function() {
      changeCloneState(".attacks");
    }, false);
  };

  // clone a block where needed
  function cloneBlockAdd(blockToClone) {
    var cloneBlock = e(blockToClone);
    var cloneControls = cloneBlock.querySelector(".clone-controls");
    var cloneTarget = cloneBlock.querySelector(".clone-target");
    var all_clone = cloneTarget.querySelectorAll(".clone");
    var all_clone_count = all_clone.length;
    // advance count
    all_clone_count++;
    // log count in local storage
    if (blockToClone == ".consumables") {
      currentCharacter["clone-consumable-count"] = all_clone_count;
      store_currentCharacter();
    };
    if (blockToClone == ".attacks") {
      currentCharacter["clone-attack-count"] = all_clone_count;
      store_currentCharacter();
    };
    // create div wrapper element
    var newNode = document.createElement("div");
    newNode.setAttribute("class", "clone");
    newNode.setAttribute("data-clone-count", all_clone_count);
    // insert div
    if (all_clone_count <= 99) {
      cloneTarget.appendChild(newNode);
      // what to go inside the clone
      var newConsumable =
        '<div class="row">' +
        '<div class="col-xs-8">' +
        '<div class="input-block">' +
        '<label class="input-label" for="input-consumable-' + all_clone_count + '">Item</label>' +
        '<input class="input-field" id="input-consumable-' + all_clone_count + '" type="text" tabindex="3">' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-4">' +
        '<div class="row no-gutter">' +
        '<div class="col-xs-6">' +
        '<div class="input-block">' +
        '<label class="input-label" for="input-consumable-total-' + all_clone_count + '">Total</label>' +
        '<input class="input-field consumable-total" id="input-consumable-total-' + all_clone_count + '" type="number" tabindex="3">' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-6">' +
        '<div class="input-block">' +
        '<label class="input-label" for="input-consumable-used-' + all_clone_count + '">Used</label>' +
        '<input class="input-field consumable-used" id="input-consumable-used-' + all_clone_count + '" type="number" tabindex="3">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<div class="consumable-counts clearfix"></div>' +
        '<div class="clone-delete-controls">' +
        '<button class="button button-primary button-small button-icon" id="remove-consumable-' + all_clone_count + '" tabindex="3"><span class="icon-close"></span> Remove</button>' +
        '</div>' +
        '</div>' +
        '</div>';
      var newAttack =
        '<div class="row no-gutter">' +
        '<div class="col-xs-6">' +
        '<div class="input-block">' +
        '<label class="input-label" for="input-weapon-' + all_clone_count + '">Weapon</label>' +
        '<input class="input-field" id="input-weapon-' + all_clone_count + '" type="text" tabindex="3">' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-3">' +
        '<div class="input-block">' +
        '<label class="input-label" for="input-attack-' + all_clone_count + '">Attack</label>' +
        '<input class="input-field" id="input-attack-' + all_clone_count + '" type="text" tabindex="3">' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-3">' +
        '<div class="input-block">' +
        '<label class="input-label" for="input-damage-' + all_clone_count + '">Damage</label>' +
        '<input class="input-field" id="input-damage-' + all_clone_count + '" type="text" tabindex="3">' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-4">' +
        '<div class="input-block">' +
        '<label class="input-label" for="input-range-' + all_clone_count + '">Range</label>' +
        '<input class="input-field" id="input-range-' + all_clone_count + '" type="text" tabindex="3">' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-4">' +
        '<div class="input-block">' +
        '<label class="input-label" for="input-ammo-' + all_clone_count + '">Ammo</label>' +
        '<input class="input-field" id="input-ammo-' + all_clone_count + '" type="text" tabindex="3">' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-4">' +
        '<div class="input-block">' +
        '<label class="input-label" for="input-critical-' + all_clone_count + '">Critical</label>' +
        '<input class="input-field" id="input-critical-' + all_clone_count + '" type="text" tabindex="3">' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<div class="clone-delete-controls">' +
        '<button class="button button-primary button-small button-icon" id="remove-attack-' + all_clone_count + '" tabindex="3"><span class="icon-close"></span> Remove</button>' +
        '</div>' +
        '</div>' +
        '</div>';
      // add div contents
      if (blockToClone == ".consumables") {
        newNode.innerHTML = newConsumable;
      };
      if (blockToClone == ".attacks") {
        newNode.innerHTML = newAttack;
      };
    };
    // add listners to new elements
    function addListenerTo_newNode_input_focus(element) {
      if (element) {
        element.addEventListener("input", function() {
          inputBlock_focus(element);
        }, false);
        element.addEventListener("focus", function() {
          inputBlock_focus(element);
        }, false);
        element.addEventListener("blur", function() {
          inputBlock_focus(element);
        }, false);
      };
    };

    function addListenerTo_newNode_input_store(element) {
      if (element) {
        element.addEventListener("input", function() {
          store_inputBlock(element);
        }, false);
        element.addEventListener("focus", function() {
          store_inputBlock(element);
        }, false);
        element.addEventListener("blur", function() {
          store_inputBlock(element);
        }, false);
      };
    };

    function addListenerTo_newNode_input_minMax(element) {
      if (element) {
        element.addEventListener("input", function() {
          minMaxCountLimit(element);
        }, false);
        element.addEventListener("focus", function() {
          minMaxCountLimit(element);
        }, false);
        element.addEventListener("blur", function() {
          minMaxCountLimit(element);
        }, false);
      };
    };

    function addListenerTo_newNode_input_checks(element) {
      if (element) {
        element.addEventListener("input", function() {
          addConsumableChecks(element);
        }, false);
        element.addEventListener("focus", function() {
          addConsumableChecks(element);
        }, false);
        element.addEventListener("blur", function() {
          addConsumableChecks(element);
        }, false);
      };
    };

    function addListenerTo_newNode_input_toggleChecks(element) {
      if (element) {
        element.addEventListener("input", function() {
          toggleConsumableChecks(element);
        }, false);
        element.addEventListener("focus", function() {
          toggleConsumableChecks(element);
        }, false);
        element.addEventListener("blur", function() {
          toggleConsumableChecks(element);
        }, false);
      };
    };

    function addListenerTo_newNode_consumableRemove_button(element) {
      if (element) {
        element.addEventListener("click", function() {
          cloneBlockRemove(element, blockToClone);
        }, false);
      };
    };
    if (blockToClone == ".consumables") {
      // find inputs
      if (newNode.querySelector("#input-consumable-" + all_clone_count)) {
        var newNode_consumableName_input = newNode.querySelector("#input-consumable-" + all_clone_count);
      };
      if (newNode.querySelector("#input-consumable-total-" + all_clone_count)) {
        var newNode_consumableTotal_input = newNode.querySelector("#input-consumable-total-" + all_clone_count);
      };
      if (newNode.querySelector("#input-consumable-used-" + all_clone_count)) {
        var newNode_consumableUsed_input = newNode.querySelector("#input-consumable-used-" + all_clone_count);
      };
      if (newNode.querySelector("#remove-consumable-" + all_clone_count)) {
        var newNode_consumableRemove_button = newNode.querySelector("#remove-consumable-" + all_clone_count);
      };
      // add listners to consumable name
      addListenerTo_newNode_input_focus(newNode_consumableName_input);
      addListenerTo_newNode_input_store(newNode_consumableName_input);
      // add listners to consumable total
      addListenerTo_newNode_input_focus(newNode_consumableTotal_input);
      addListenerTo_newNode_input_store(newNode_consumableTotal_input);
      addListenerTo_newNode_input_minMax(newNode_consumableTotal_input);
      addListenerTo_newNode_input_checks(newNode_consumableTotal_input);
      // add listners to consumable used
      addListenerTo_newNode_input_focus(newNode_consumableUsed_input);
      addListenerTo_newNode_input_store(newNode_consumableUsed_input);
      addListenerTo_newNode_input_minMax(newNode_consumableUsed_input);
      addListenerTo_newNode_input_toggleChecks(newNode_consumableUsed_input);
      // add listners to remove button
      addListenerTo_newNode_consumableRemove_button(newNode_consumableRemove_button);
    };
    if (blockToClone == ".attacks") {
      // find inputs
      if (newNode.querySelector("#input-weapon-" + all_clone_count)) {
        var newNode_attackWeapon_input = newNode.querySelector("#input-weapon-" + all_clone_count);
      };
      if (newNode.querySelector("#input-attack-" + all_clone_count)) {
        var newNode_attackAttack_input = newNode.querySelector("#input-attack-" + all_clone_count);
      };
      if (newNode.querySelector("#input-range-" + all_clone_count)) {
        var newNode_attackRange_input = newNode.querySelector("#input-range-" + all_clone_count);
      };
      if (newNode.querySelector("#input-ammo-" + all_clone_count)) {
        var newNode_attackAmmo_input = newNode.querySelector("#input-ammo-" + all_clone_count);
      };
      if (newNode.querySelector("#input-damage-" + all_clone_count)) {
        var newNode_attackDamage_input = newNode.querySelector("#input-damage-" + all_clone_count);
      };
      if (newNode.querySelector("#input-critical-" + all_clone_count)) {
        var newNode_attackCritical_input = newNode.querySelector("#input-critical-" + all_clone_count);
      };
      if (newNode.querySelector("#remove-attack-" + all_clone_count)) {
        var newNode_consumableRemove_button = newNode.querySelector("#remove-attack-" + all_clone_count);
      };
      // add listners to attack weapon
      addListenerTo_newNode_input_focus(newNode_attackWeapon_input);
      addListenerTo_newNode_input_store(newNode_attackWeapon_input);
      // add listners to attack attack
      addListenerTo_newNode_input_focus(newNode_attackAttack_input);
      addListenerTo_newNode_input_store(newNode_attackAttack_input);
      // add listners to attack range
      addListenerTo_newNode_input_focus(newNode_attackRange_input);
      addListenerTo_newNode_input_store(newNode_attackRange_input);
      // add listners to attack ammo
      addListenerTo_newNode_input_focus(newNode_attackAmmo_input);
      addListenerTo_newNode_input_store(newNode_attackAmmo_input);
      // add listners to attack damage
      addListenerTo_newNode_input_focus(newNode_attackDamage_input);
      addListenerTo_newNode_input_store(newNode_attackDamage_input);
      // add listners to attack critical
      addListenerTo_newNode_input_focus(newNode_attackCritical_input);
      addListenerTo_newNode_input_store(newNode_attackCritical_input);
      // add listners to remove button
      addListenerTo_newNode_consumableRemove_button(newNode_consumableRemove_button);
    };
  };

  function cloneBlockRemove(element, blockToRemove) {
    var cloneBlock = getClosest(element, ".clone-block");
    var cloneTarget = cloneBlock.querySelector(".clone-target");
    var cloneToRemove = getClosest(element, ".clone");
    var cloneToRemove_input = cloneToRemove.querySelectorAll("input");
    // remove block
    cloneToRemove.remove();
    // remove clone inputs from current character
    for (var i = 0; i < cloneToRemove_input.length; i++) {
      // if (currentCharacter[cloneToRemove_input[i].id]) {
        delete currentCharacter[cloneToRemove_input[i].id];
        store_currentCharacter();
      // };
    };
    // recount remaining blocks and length
    var all_clone = cloneTarget.querySelectorAll(".clone");
    var all_clone_count = all_clone.length;
    // if clone count is 0 restore clone block state or start recounting and renumbering clone blocks
    if (all_clone_count == 0) {
      changeCloneState(blockToRemove);
    } else {
      // renumber remaining block count
      for (var i = 0; i < all_clone_count; i++) {
        // start a count
        var newCount = i + 1;
        // renumber the clone
        all_clone[i].dataset.cloneCount = newCount;
      };
      // recount remaining blocks and length
      all_clone = cloneTarget.querySelectorAll(".clone");
      all_clone_count = all_clone.length;
      // all clone blocks are reprocessed
      for (var i = 0; i < all_clone_count; i++) {
        // start a count
        var newCount = i + 1;
        var all_inputs = all_clone[i].querySelectorAll("input");
        var all_label = all_clone[i].querySelectorAll("label");
        // change all input ids
        for (var q = 0; q < all_inputs.length; q++) {
          // remove local strage for this input
          remove_inputBlock(all_inputs[q]);
          // make new id
          var currentId = all_inputs[q].id;
          var currentId_noNumber = currentId.replace(/\d+/g, '');
          var newId = currentId_noNumber + newCount;
          all_inputs[q].id = newId;
          // store local storage for this input
          store_inputBlock(all_inputs[q]);
        };
        // change all label for attributes
        for (var x = 0; x < all_label.length; x++) {
          var currentFor = all_label[x].htmlFor;
          var currentFor_noNumber = currentFor.replace(/\d+/g, '');
          var newFor = currentFor_noNumber + newCount;
          all_label[x].htmlFor = newFor;
        };
      };
    };
    // set or remove clone counts
    if (blockToRemove == ".consumables") {
      currentCharacter["clone-consumable-count"] = all_clone_count;
      store_currentCharacter();
    };
    if (blockToRemove == ".attacks") {
      currentCharacter["clone-attack-count"] = all_clone_count;
      store_currentCharacter();
    };
    // if count is 0 or less remove count
    if (all_clone_count <= 0) {
      if (blockToRemove == ".consumables") {
        delete currentCharacter["clone-consumable-count"];
        store_currentCharacter();
      };
      if (blockToRemove == ".attacks") {
        delete currentCharacter["clone-attack-count"];
        store_currentCharacter();
      };
    };
    // snack bar message
    if (blockToRemove == ".consumables") {
      createSnackBar("Consumables block removed.", false, false);
    };
    if (blockToRemove == ".attacks") {
      createSnackBar("Attack block removed.", false, false);
    };
  };

  function changeCloneState(cloneBlockType) {
    var cloneBlock = e(cloneBlockType);
    var cloneControls = cloneBlock.querySelector(".clone-controls");
    var cloneRemove = cloneControls.querySelector(".clone-remove");
    var cloneDeleteControls = cloneBlock.querySelectorAll(".clone-delete-controls");
    var cloneTarget = cloneBlock.querySelector(".clone-target");
    var all_clone = cloneTarget.querySelectorAll(".clone");
    var all_clone_count = all_clone.length;
    // change clone remove button
    toggleClass(cloneRemove, "active");
    toggleClass(cloneRemove, "button-primary");
    toggleClass(cloneRemove, "button-secondary");
    // change clone block state
    if (cloneBlock.dataset.deleteCloneState == "true") {
      removeClass(cloneBlock, "delete-state");
      cloneBlock.dataset.deleteCloneState = "false";
    } else if (cloneBlock.dataset.deleteCloneState == "false") {
      addClass(cloneBlock, "delete-state");
      cloneBlock.dataset.deleteCloneState = "true";
    };
    // if clone count us 0 remove restore all classes to normal
    if (all_clone_count == 0) {
      removeClass(cloneBlock, "delete-state");
      cloneBlock.dataset.deleteCloneState = "false";
      removeClass(cloneRemove, "active");
      removeClass(cloneRemove, "button-primary");
      addClass(cloneRemove, "button-secondary");
    };
  };

  function read_cloneBlocks() {
    var consumables_cloneCount = currentCharacter["clone-consumable-count"];
    var attacks_cloneCount = currentCharacter["clone-attack-count"];
    for (var i = 0; i < consumables_cloneCount; i++) {
      cloneBlockAdd(".consumables");
    };
    for (var i = 0; i < attacks_cloneCount; i++) {
      cloneBlockAdd(".attacks");
    };
  };

  // --------------------------------------------------------------------------
  // hidable block
  // --------------------------------------------------------------------------

  function addListenerTo_all_hidableBlock() {
    var all_hidableBlock = eA(".hidable-block");
    for (var i = 0; i < all_hidableBlock.length; i++) {
      var hidableToggle = all_hidableBlock[i].querySelector(".hidable-toggle");
      hidableToggle.addEventListener("click", function() {
        toggleAllHidable(this);
      }, false);
    };
  };

  function toggleAllHidable(element) {
    var buttonLable = element.textContent;
    var icon = element.querySelector(".icon");
    var text = element.querySelector(".text");
    var hidableBlock = getClosest(element, ".hidable-block");
    var all_hidable = hidableBlock.querySelectorAll(".hidable");
    var all_hidableOnEmptyInput = hidableBlock.querySelectorAll(".hidable-on-empty-input");
    var all_hideableOnEmptyTextarea = hidableBlock.querySelectorAll(".hidable-on-empty-textarea");
    // if hide button data all hidden is true remove all hidden classes and change date hidden to false
    if (hidableBlock.dataset.allHidden == "true") {
      for (var i = 0; i < all_hidable.length; i++) {
        removeClass(all_hidable[i], "hidden");
      };
      for (var i = 0; i < all_hidableOnEmptyInput.length; i++) {
        removeClass(all_hidableOnEmptyInput[i], "hidden");
      };
      for (var i = 0; i < all_hideableOnEmptyTextarea.length; i++) {
        removeClass(all_hideableOnEmptyTextarea[i], "hidden");
      };
      hidableBlock.dataset.allHidden = "false";
      toggleClass(icon, "icon-unfold-less");
      toggleClass(icon, "icon-unfold-more");
      text.textContent = "Hide";
      // if hide button data all hidden is false loop through all hidable and hide all with empty inputs and change date hidden to true 
    } else if (hidableBlock.dataset.allHidden == "false") {
      for (var i = 0; i < all_hidableOnEmptyInput.length; i++) {
        var input = all_hidableOnEmptyInput[i].querySelector(".input-field");
        if (input.value == null || input.value == "") {
          addClass(all_hidableOnEmptyInput[i], "hidden");
        };
      };
      for (var i = 0; i < all_hidable.length; i++) {
        addClass(all_hidable[i], "hidden");
      };
      for (var i = 0; i < all_hideableOnEmptyTextarea.length; i++) {
        var textarea = all_hideableOnEmptyTextarea[i].querySelector(".textarea");
        if (textarea.textContent == null || textarea.textContent == "") {
          addClass(all_hideableOnEmptyTextarea[i], "hidden");
        };
      };
      hidableBlock.dataset.allHidden = "true";
      toggleClass(icon, "icon-unfold-less");
      toggleClass(icon, "icon-unfold-more");
      text.textContent = "Show";
    };
  };

  // --------------------------------------------------------------------------
  // stats
  // --------------------------------------------------------------------------

  // change mod
  function changeModifer(element, field) {
    var stat = checkValue(element);
    var modifier = calculateModifer(element);
    field.textContent = modifier;
  };

  // calculate mod
  function calculateModifer(element) {
    var modifier = Math.floor((element.value - 10) / 2);
    return modifier;
  };

  // update mods
  function update_scoreModifiers() {
    var stats = eA(".stats");
    for (var i = 0; i < stats.length; i++) {
      var score = stats[i].querySelector(".score");
      var modifier = stats[i].querySelector(".modifier");
      var Scoretemp = stats[i].querySelector(".score-temp");
      var Modtempifier = stats[i].querySelector(".modifier-temp");
      if (score.value !== "") {
        changeModifer(score, modifier);
      } else {
        modifier.textContent = "";
      };
      if (Scoretemp.value !== "") {
        changeModifer(Scoretemp, Modtempifier);
      } else {
        Modtempifier.textContent = "";
      };
    };
  };

  // add listeners to stats
  function addListenerTo_all_stats() {
    var score = eA(".stats .score");
    var Scoretemp = eA(".stats .score-temp");
    // primary scores
    for (var i = 0; i < score.length; i++) {
      score[i].addEventListener("input", function() {
        update_scoreModifiers();
        update_inputTotalBlock();
      }, false);
    };

    // temp scores
    for (var i = 0; i < Scoretemp.length; i++) {
      Scoretemp[i].addEventListener("input", function() {
        update_scoreModifiers();
        update_inputTotalBlock();
      }, false);
    };
  };

  // read stats
  function read_stats() {
    if (localStoreRead("stats-str")) {
      stats_strScore.value = localStoreRead("stats-str");
    };
    if (localStoreRead("stats-dex")) {
      stats_dexScore.value = localStoreRead("stats-dex");
    };
    if (localStoreRead("stats-con")) {
      stats_conScore.value = localStoreRead("stats-con");
    };
    if (localStoreRead("stats-int")) {
      stats_intScore.value = localStoreRead("stats-int");
    };
    if (localStoreRead("stats-wis")) {
      stats_wisScore.value = localStoreRead("stats-wis");
    };
    if (localStoreRead("stats-cha")) {
      stats_chaScore.value = localStoreRead("stats-cha");
    };
    if (localStoreRead("stats-strTemp")) {
      stats_strScoreTemp.value = localStoreRead("stats-strTemp");
    };
    if (localStoreRead("stats-dexTemp")) {
      stats_dexScoreTemp.value = localStoreRead("stats-dexTemp");
    };
    if (localStoreRead("stats-conTemp")) {
      stats_conScoreTemp.value = localStoreRead("stats-conTemp");
    };
    if (localStoreRead("stats-intTemp")) {
      stats_intScoreTemp.value = localStoreRead("stats-intTemp");
    };
    if (localStoreRead("stats-wisTemp")) {
      stats_wisScoreTemp.value = localStoreRead("stats-wisTemp");
    };
    if (localStoreRead("stats-chaTemp")) {
      stats_chaScoreTemp.value = localStoreRead("stats-chaTemp");
    };
  };

  // --------------------------------------------------------------------------
  // spells
  // --------------------------------------------------------------------------

  // add listeners to all spell know items
  function addListenerTo_all_spellKnownItem() {
    var all_spellKnownItem = eA(".spell-known-item");
    for (var i = 0; i < all_spellKnownItem.length; i++) {
      // stop addListenerTo_all_spellKnownItem from stacking event listeners on the same element
      var doesSpellHaveListener = all_spellKnownItem[i].dataset.eventListener;
      if (doesSpellHaveListener == "false") {
        all_spellKnownItem[i].dataset.eventListener = "true";
        all_spellKnownItem[i].addEventListener("click", function() {
          checkSpellListState_changeSpellKnowItem(this);
          store_knownList();
        }, false);
      };
    };
  };

  // reset data attributes on page reload
  // remove hidden class on page reload
  // this is needed after spells are populated from local storage 
  function update_all_spellKnownItem() {
    var all_spellKnownItem = eA(".spell-known-item");
    for (var i = 0; i < all_spellKnownItem.length; i++) {
      all_spellKnownItem[i].dataset.eventListener = "false";
      removeClass(all_spellKnownItem[i], "hidden");
    };
  };

  // add listeners to add new spell button
  function addListenerTo_all_addSpell() {
    var all_addSpell = eA(".add-spell");
    for (var i = 0; i < all_addSpell.length; i++) {
      all_addSpell[i].addEventListener("click", function() {
        addNewSpell(this);
        store_knownList();
      }, false);
    };
  };

  // add listeners to prepare spell button
  function addListenerTo_prepareSpell() {
    e("#spells .prepare-spell").addEventListener("click", function() {
      changeSpellState(this, "prepare");
      store_knownList();
    }, false);
  };

  // add listeners to unprepare spell button
  function addListenerTo_unprepareSpell() {
    e("#spells .unprepare-spell").addEventListener("click", function() {
      changeSpellState(this, "unprepare");
      store_knownList();
    }, false);
  };

  // add listeners to cast spell button
  function addListenerTo_castSpell() {
    e("#spells .cast-spell").addEventListener("click", function() {
      changeSpellState(this, "cast");
      store_knownList();
    }, false);
  };

  // add listeners to active spell button
  function addListenerTo_activeSpell() {
    e("#spells .active-spell").addEventListener("click", function() {
      changeSpellState(this, "active");
      store_knownList();
    }, false);
  };

  // add listeners to remove spell button
  function addListenerTo_removeSpell() {
    e("#spells .remove-spell").addEventListener("click", function() {
      changeSpellState(this, "remove");
      store_knownList();
    }, false);
  };

  // change states on all saved spell lists
  function changeSpellState(element, state) {
    var spellRoot = getClosest(element, "#spells");
    var prepareStateButton = spellRoot.querySelector(".prepare-spell");
    var unprepareStateButton = spellRoot.querySelector(".unprepare-spell");
    var castStateButton = spellRoot.querySelector(".cast-spell");
    var activeStateButton = spellRoot.querySelector(".active-spell");
    var removeStateButton = spellRoot.querySelector(".remove-spell");
    var all_spellStateControls = spellRoot.querySelectorAll(".spell-state-control");
    if (element.classList.contains("active")) {
      for (var i = 0; i < all_spellStateControls.length; i++) {
        removeClass(all_spellStateControls[i], "active");
      };
      spellRoot.dataset.prepareSpellState = "false";
      spellRoot.dataset.unprepareSpellState = "false";
      spellRoot.dataset.castSpellState = "false";
      spellRoot.dataset.activeSpellState = "false";
      spellRoot.dataset.deleteSpellState = "false";
      removeClass(spellRoot, "prepare-state");
      removeClass(spellRoot, "unprepare-state");
      removeClass(spellRoot, "cast-state");
      removeClass(spellRoot, "active-state");
      removeClass(spellRoot, "delete-state");
      removeClass(removeStateButton, "button-primary");
      addClass(removeStateButton, "button-secondary");
    } else {
      for (var i = 0; i < all_spellStateControls.length; i++) {
        removeClass(all_spellStateControls[i], "active");
      };
      addClass(element, "active");
      if (state == "prepare") {
        spellRoot.dataset.prepareSpellState = "true";
        spellRoot.dataset.unprepareSpellState = "false";
        spellRoot.dataset.castSpellState = "false";
        spellRoot.dataset.activeSpellState = "false";
        spellRoot.dataset.deleteSpellState = "false";
        addClass(spellRoot, "prepare-state");
        removeClass(spellRoot, "unprepare-state");
        removeClass(spellRoot, "cast-state");
        removeClass(spellRoot, "active-state");
        removeClass(spellRoot, "delete-state");
        removeClass(removeStateButton, "button-primary");
        addClass(removeStateButton, "button-secondary");
      } else if (state == "unprepare") {
        spellRoot.dataset.prepareSpellState = "false";
        spellRoot.dataset.unprepareSpellState = "true";
        spellRoot.dataset.castSpellState = "false";
        spellRoot.dataset.activeSpellState = "false";
        spellRoot.dataset.deleteSpellState = "false";
        removeClass(spellRoot, "prepare-state");
        addClass(spellRoot, "unprepare-state");
        removeClass(spellRoot, "cast-state");
        removeClass(spellRoot, "active-state");
        removeClass(spellRoot, "delete-state");
        removeClass(removeStateButton, "button-primary");
        addClass(removeStateButton, "button-secondary");
      } else if (state == "cast") {
        spellRoot.dataset.prepareSpellState = "false";
        spellRoot.dataset.unprepareSpellState = "false";
        spellRoot.dataset.castSpellState = "true";
        spellRoot.dataset.activeSpellState = "false";
        spellRoot.dataset.deleteSpellState = "false";
        removeClass(spellRoot, "prepare-state");
        removeClass(spellRoot, "unprepare-state");
        addClass(spellRoot, "cast-state");
        removeClass(spellRoot, "active-state");
        removeClass(spellRoot, "delete-state");
        removeClass(removeStateButton, "button-primary");
        addClass(removeStateButton, "button-secondary");
      } else if (state == "active") {
        spellRoot.dataset.prepareSpellState = "false";
        spellRoot.dataset.unprepareSpellState = "false";
        spellRoot.dataset.castSpellState = "false";
        spellRoot.dataset.activeSpellState = "true";
        spellRoot.dataset.deleteSpellState = "false";
        removeClass(spellRoot, "prepare-state");
        removeClass(spellRoot, "unprepare-state");
        removeClass(spellRoot, "cast-state");
        addClass(spellRoot, "active-state");
        removeClass(spellRoot, "delete-state");
        removeClass(removeStateButton, "button-primary");
        addClass(removeStateButton, "button-secondary");
      } else if (state == "remove") {
        spellRoot.dataset.prepareSpellState = "false";
        spellRoot.dataset.unprepareSpellState = "false";
        spellRoot.dataset.castSpellState = "false";
        spellRoot.dataset.activeSpellState = "false";
        spellRoot.dataset.deleteSpellState = "true";
        removeClass(spellRoot, "prepare-state");
        removeClass(spellRoot, "unprepare-state");
        removeClass(spellRoot, "cast-state");
        removeClass(spellRoot, "active-state");
        addClass(spellRoot, "delete-state");
        addClass(removeStateButton, "button-primary");
        removeClass(removeStateButton, "button-secondary");
      };
    };
  };

  // add listeners to add new spell input
  function addListenerTo_all_addSpell_input() {
    var all_addSpell = eA(".add-spell");
    for (var i = 0; i < all_addSpell.length; i++) {
      var newSpellRoot = getClosest(all_addSpell[i], ".new-spell");
      var all_addSpell_input = newSpellRoot.querySelector("input");
      all_addSpell_input.addEventListener("keypress", function() {
        addNewSpellOnEnter(this);
      }, false);
    };
  };

  // add new spell on input enter
  function addNewSpellOnEnter(element) {
    var keystroke = event.keyCode || event.which;
    if (keystroke == 13) {
      addNewSpell(element);
      store_knownList();
    };
  };

  // prepare or unprepare or cast or active or delete spell
  function checkSpellListState_changeSpellKnowItem(spell) {
    var spellRoot = getClosest(spell, "#spells");
    var spellLevel = getClosest(spell, ".spell-level").dataset.spellLevel;
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
      // spell.appendChild(preparedIcon);
      // spell.insertBefore(preparedIcon, spell.firstChild);
      spellMarks.insertBefore(preparedIcon, spellMarks.firstChild);
      if (spellMarks.children.length > 0) {
        addClass(spell, "button-primary");
        removeClass(spell, "button-tertiary");
        removeClass(spell, "hidable");
      };
    };
    // state unprepare
    if (unprepareState == "true") {
      if (spellMarks.firstChild) {
        spellMarks.firstChild.remove();
      };
      if (spellMarks.children.length <= 0) {
        removeClass(spell, "button-primary");
        addClass(spell, "button-tertiary");
        addClass(spell, "hidable");
      };
    };
    // state cast
    if (castState == "true") {
      var all_spellsMarks = spellMarks.children;
      var all_spellsCast = 0;
      for (var i = 0; i < all_spellsMarks.length; i++) {
        if (all_spellsMarks[i].classList.contains("icon-radio-button-checked")) {
          toggleClass(all_spellsMarks[i], "icon-radio-button-checked");
          toggleClass(all_spellsMarks[i], "icon-radio-button-unchecked");
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
        removeClass(spell, "button-primary");
        addClass(spell, "button-tertiary");
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
      var spellName = spell.dataset.spellName;
      var spellNameText = spell.textContent;
      var spellNameConverted = spellName.replace(/\s+/g, "-").toLowerCase();
      localStoreRemove("spell-saved-" + spellNameConverted);
      spell.remove();
      createSnackBar(spellNameText + " removed.", false, false);
    };
  };

  // make a spell button
  function createSpellButton(spellName) {
    var newSpell = document.createElement("button");
    newSpell.setAttribute("data-spell-name", spellName.replace(/\s+/g, "-").toLowerCase());
    newSpell.setAttribute("id", spellName.replace(/\s+/g, "-").toLowerCase());
    newSpell.setAttribute("data-event-listener", "false");
    newSpell.setAttribute("class", "spell-known-item button button-tertiary hidable");
    newSpell.textContent = spellName;
    var spellMarks = document.createElement("span");
    spellMarks.setAttribute("class", "spell-marks");
    newSpell.appendChild(spellMarks);
    var spellActive = document.createElement("span");
    spellActive.setAttribute("class", "spell-active");
    newSpell.appendChild(spellActive);
    return newSpell;
  };

  // store spell preparedList
  function store_knownList() {
    var all_spellKnownItems = eA(".spell-known-item");
    // spell object constructor
    var spell = function(spellName, spellLevel, spellPrepared, spellActive, spellCast) {
      this.name = spellName;
      this.level = spellLevel;
      this.prepared = spellPrepared || 0;
      this.active = spellActive || false;
      this.cast = spellCast || 0;
    };
    for (var i = 0; i < all_spellKnownItems.length; i++) {
      var name = all_spellKnownItems[i].textContent;
      var level = getClosest(all_spellKnownItems[i], ".spell-level").dataset.spellLevel;
      var prepared = all_spellKnownItems[i].querySelector(".spell-marks").children.length;
      var cast = all_spellKnownItems[i].querySelector(".spell-marks").querySelectorAll(".icon-radio-button-unchecked").length;
      var active = all_spellKnownItems[i].querySelector(".spell-active").children.length;
      if (active > 0) {
        active = true;
      } else {
        active = false;
      };
      var newSpell = new spell(name, level, prepared, active, cast);
      // add to current character object
      currentCharacter["spell-saved-" + newSpell.name.replace(/\s+/g, "-").toLowerCase()] = JSON.stringify(newSpell);
      // save to local storage
      store_currentCharacter();
    };
  };

  // read spell preparedList
  function read_spells() {
    var spellsStored = [];
    // iterate over all objects keys to file "spell-saved" then push those values to spellsStored
    for (var i in currentCharacter) {
      if (i.substring(0, 11) == "spell-saved") {
        spellsStored.push(JSON.parse(currentCharacter[i]));
      };
    };
    // read spells and add them to spell lists
    for (var i = 0; i < spellsStored.length; i++) {
      // read local storage
      var loadedSpell = spellsStored[i];
      // find spell list to add too
      var knownListToSaveTo = e(".spells-known.spell-level-" + loadedSpell.level);
      // append new spell to spell list or assign existing spell button as newSpell
      if (knownListToSaveTo.querySelector("#" + loadedSpell.name.replace(/\s+/g, "-").toLowerCase())) {
        var newSpell = knownListToSaveTo.querySelector("#" + loadedSpell.name.replace(/\s+/g, "-").toLowerCase());
      } else {
        // make new spell
        var newSpell = createSpellButton(loadedSpell.name);
        knownListToSaveTo.appendChild(newSpell);
      };
      // find spell mark parent
      var spellMarks = newSpell.querySelector(".spell-marks");
      var spellActive = newSpell.querySelector(".spell-active");
      // add spell marks
      if (loadedSpell.prepared > 0) {
        removeClass(newSpell, "hidable");
        removeClass(newSpell, "button-tertiary");
        addClass(newSpell, "button-primary");
        for (var j = 0; j < loadedSpell.prepared; j++) {
          var preparedIcon = document.createElement("span");
          preparedIcon.setAttribute("class", "icon icon-radio-button-checked");
          spellMarks.insertBefore(preparedIcon, spellMarks.firstChild);
        };
      };
      // cast spells if cast > 0
      if (loadedSpell.cast > 0) {
        var all_check = spellMarks.querySelectorAll(".icon-radio-button-checked");
        for (var j = 0; j < loadedSpell.cast; j++) {
          if (all_check[j]) {
            removeClass(all_check[j], "icon-radio-button-checked");
            addClass(all_check[j], "icon-radio-button-unchecked");
          };
        };
        if (loadedSpell.cast >= loadedSpell.prepared) {
          removeClass(newSpell, "button-primary");
          addClass(newSpell, "button-tertiary");
        };
      };
      // if spell is active
      if (loadedSpell.active) {
        var activeIcon = document.createElement("span");
        activeIcon.setAttribute("class", "icon icon-play-arrow");
        if (loadedSpell.prepared > 0) {
          if (spellActive.children.length > 0) {
            spellActive.firstChild.remove();
          } else {
            spellActive.appendChild(activeIcon);
          };
        };
      };
    };
  };

  // add new spell to known spells
  function addNewSpell(element) {
    var level = getClosest(element, ".spell-level").dataset.spellLevel;
    var newSpellRoot = getClosest(element, ".new-spell");
    var knownListToSaveTo = getClosest(element, ".spell-level").querySelector(".spells-known");
    var newSpellName = newSpellRoot.querySelector("input");
    var newSpellName_value = newSpellName.value;
    var newSpell = createSpellButton(newSpellName_value);
    // spell object constructor
    var spell = function(spellName, spellLevel, spellPrepared, spellActive, spellCast) {
      this.name = spellName;
      this.level = spellLevel;
      this.prepared = spellPrepared || 0;
      this.active = spellActive || false;
      this.cast = spellCast || 0;
    };
    // if input value is not empty
    if (newSpellName_value !== "") {
      //  if first character is not a number
      if (isNaN(newSpellName_value.charAt(0))) {
        knownListToSaveTo.appendChild(newSpell);
        // clear input field
        newSpellName.value = "";
        // make spell object
        var newSpell = new spell(newSpellName_value, parseInt(level, 10), 0, false, 0);
        // add to current character object
        currentCharacter["spell-saved-" + newSpell.name.replace(/\s+/g, "-").toLowerCase()] = JSON.stringify(newSpell);
        // save to local storage
        store_currentCharacter();
        createSnackBar(newSpellName_value + " added to spell level " + level + ".", false, false);
      } else {
        createSnackBar("Can't start with a number.", false, false);
      };
    };
    // add listners to spell
    addListenerTo_all_spellKnownItem();
  };

  // --------------------------------------------------------------------------
  // textarea
  // --------------------------------------------------------------------------

  // store textareas
  function store_textareas(element) {
    // collect all textarea classes
    currentCharacter[element.id] = element.innerHTML;
    // add all textarea to storage
    store_currentCharacter();
  };

  // read textareas
  function read_textarea() {
    var all_textareas = eA(".textarea");
    for (var i = 0; i < all_textareas.length; i++) {
      // collect all textarea classes
      var textareaId = all_textareas[i].id;
      // if inputBlock local store exists
      if (currentCharacter[textareaId]) {
        e("#" + textareaId).innerHTML = currentCharacter[textareaId];
      };
    };
  };

  // add listeners to textareas
  function addListenerTo_all_textareas() {
    var all_textareas = eA(".textarea");
    for (var i = 0; i < all_textareas.length; i++) {
      all_textareas[i].addEventListener("input", function() {
        store_textareas(this);
      }, false);
      all_textareas[i].addEventListener("focus", function() {
        store_textareas(this);
      }, false);
      all_textareas[i].addEventListener("blur", function() {
        store_textareas(this);
      }, false);
    };
  };

  // --------------------------------------------------------------------------
  // input blocks
  // --------------------------------------------------------------------------

  // add class to label when input is in focus
  function inputBlock_focus(element) {
    var inputBlockRoot = element.parentNode;
    var inputField = inputBlockRoot.querySelector(".input-field");
    var inputLabel;
    if (inputBlockRoot.querySelector(".input-label")) {
      var inputLabel = inputBlockRoot.querySelector(".input-label");
    };
    if (inputBlockRoot.querySelector(".input-label")) {
      if (inputField == document.activeElement) {
        addClass(inputLabel, "input-label-focus");
      } else {
        removeClass(inputLabel, "input-label-focus");
      };
    };
  };

  // update input totals
  function update_inputTotalBlock() {
    var all_inputTotalBlock = eA(".input-total-block");
    for (var i = 0; i < all_inputTotalBlock.length; i++) {
      var strBonus = 0;
      var dexBonus = 0;
      var conBonus = 0;
      var intBonus = 0;
      var wisBonus = 0;
      var chaBonus = 0;
      var babBonus = 0;
      var sizeBonus = 0;
      var specialSizeBonus = 0;
      var levelBonus = 0;
      var plusTenBonus = 0;
      var acArmor = 0;
      var acShield = 0;
      var acDeflect = 0;
      var acDodge = 0;
      var acNatural = 0;
      var total = all_inputTotalBlock[i].querySelector(".total");
      var total_value = parseInt(all_inputTotalBlock[i].querySelector(".total").textContent, 10) || 0;
      var all_inputField = all_inputTotalBlock[i].querySelectorAll(".input-field");
      var modifiers = [];
      var modifiers_total = 0;
      for (var q = 0; q < all_inputField.length; q++) {
        if (all_inputField.length > 0) {
          if (all_inputField[q].dataset.modifier == "true") {
            modifiers.push(parseInt(all_inputField[q].value, 10) || 0);
          };
        };
      };
      // if modifiers array has values total them 
      function totalAllModifiers() {
        if (modifiers.length > 0) {
          modifiers_total = modifiers.reduce(function(a, b) {
            return a + b;
          });
        };
      };
      totalAllModifiers();
      // str
      if (all_inputTotalBlock[i].dataset.strBonus == "true") {
        // if ability temp mod is empty
        if (stats_strModTemp.textContent == "") {
          strBonus = parseInt(stats_strMod.textContent, 10 || 0);
        } else {
          strBonus = parseInt(stats_strModTemp.textContent, 10 || 0);
        };
      };
      // dex
      if (all_inputTotalBlock[i].dataset.dexBonus == "true") {
        // if ability temp mod is empty
        if (stats_dexModTemp.textContent == "") {
          dexBonus = parseInt(stats_dexMod.textContent, 10 || 0);
        } else {
          dexBonus = parseInt(stats_dexModTemp.textContent, 10 || 0);
        };
      };
      // con
      if (all_inputTotalBlock[i].dataset.conBonus == "true") {
        // if ability temp mod is empty
        if (stats_conModTemp.textContent == "") {
          conBonus = parseInt(stats_conMod.textContent, 10 || 0);
        } else {
          conBonus = parseInt(stats_conModTemp.textContent, 10 || 0);
        };
      };
      // int
      if (all_inputTotalBlock[i].dataset.intBonus == "true") {
        // if ability temp mod is empty
        if (stats_intModTemp.textContent == "") {
          intBonus = parseInt(stats_intMod.textContent, 10 || 0);
        } else {
          intBonus = parseInt(stats_intModTemp.textContent, 10 || 0);
        };
      };
      // wis
      if (all_inputTotalBlock[i].dataset.wisBonus == "true") {
        // if ability temp mod is empty
        if (stats_wisModTemp.textContent == "") {
          wisBonus = parseInt(stats_wisMod.textContent, 10 || 0);
        } else {
          wisBonus = parseInt(stats_wisModTemp.textContent, 10 || 0);
        };
      };
      // cha
      if (all_inputTotalBlock[i].dataset.chaBonus == "true") {
        // if ability temp mod is empty
        if (stats_chaModTemp.textContent == "") {
          chaBonus = parseInt(stats_chaMod.textContent, 10 || 0);
        } else {
          chaBonus = parseInt(stats_chaModTemp.textContent, 10 || 0);
        };
      };
      // bab
      if (all_inputTotalBlock[i].dataset.babBonus == "true") {
        babBonus = parseInt(e("#input-base-attack").value, 10 || 0);
      };
      // size
      if (all_inputTotalBlock[i].dataset.sizeBonus == "true") {
        sizeBonus = parseInt(e("#input-size-bonus").value, 10 || 0);
      };
      // special size
      if (all_inputTotalBlock[i].dataset.specialSizeBonus == "true") {
        specialSizeBonus = parseInt(e("#input-special-size-bonus").value, 10 || 0);
      };
      // level
      if (all_inputTotalBlock[i].dataset.levelBonus == "true") {
        levelBonus = parseInt(e("#input-level").value, 10 || 0);
      };
      // ac armor
      if (all_inputTotalBlock[i].dataset.acArmor == "true") {
        acArmor = parseInt(e("#input-ac-armor").value, 10 || 0);
      };
      // ac shield
      if (all_inputTotalBlock[i].dataset.acShield == "true") {
        acShield = parseInt(e("#input-ac-shield").value, 10 || 0);
      };
      // ac deflect
      if (all_inputTotalBlock[i].dataset.acDeflect == "true") {
        acDeflect = parseInt(e("#input-ac-deflect").value, 10 || 0);
      };
      // ac dodge
      if (all_inputTotalBlock[i].dataset.acDodge == "true") {
        acDodge = parseInt(e("#input-ac-dodge").value, 10 || 0);
      };
      // ac natural
      if (all_inputTotalBlock[i].dataset.acNatural == "true") {
        acNatural = parseInt(e("#input-ac-natural").value, 10 || 0);
      };
      // 10
      if (all_inputTotalBlock[i].dataset.plusTenBonus == "true") {
        plusTenBonus = 10;
      };
      // check if any bonus is NaN
      if (isNaN(levelBonus)) {
        levelBonus = 0;
      };
      if (isNaN(strBonus)) {
        strBonus = 0;
      };
      if (isNaN(dexBonus)) {
        dexBonus = 0;
      };
      if (isNaN(conBonus)) {
        conBonus = 0;
      };
      if (isNaN(intBonus)) {
        intBonus = 0;
      };
      if (isNaN(wisBonus)) {
        wisBonus = 0;
      };
      if (isNaN(chaBonus)) {
        chaBonus = 0;
      };
      if (isNaN(babBonus)) {
        babBonus = 0;
      };
      if (isNaN(sizeBonus)) {
        sizeBonus = 0;
      };
      if (isNaN(specialSizeBonus)) {
        specialSizeBonus = 0;
      };
      if (isNaN(levelBonus)) {
        levelBonus = 0;
      };
      if (isNaN(plusTenBonus)) {
        plusTenBonus = 0;
      };
      if (isNaN(acArmor)) {
        acArmor = 0;
      };
      if (isNaN(acShield)) {
        acShield = 0;
      };
      if (isNaN(acDeflect)) {
        acDeflect = 0;
      };
      if (isNaN(acDodge)) {
        acDodge = 0;
      };
      if (isNaN(acNatural)) {
        acNatural = 0;
      };
      // grand total
      var grandTotal = modifiers_total + levelBonus + babBonus + sizeBonus + specialSizeBonus + plusTenBonus + strBonus + dexBonus + conBonus + intBonus + wisBonus + chaBonus + acArmor + acShield + acDeflect + acDodge + acNatural;
      total.textContent = grandTotal;
    };
  };

  // add listeners to inputBlock
  function addListenerTo_all_inputBlock() {
    var all_inputBlock = eA(".input-block");
    for (var i = 0; i < all_inputBlock.length; i++) {
      var inputLabel = all_inputBlock[i].querySelector(".input-field");
      inputLabel.addEventListener("input", function() {
        inputBlock_focus(this);
        store_inputBlock(this);
        update_inputTotalBlock();
      }, false);
      inputLabel.addEventListener("focus", function() {
        inputBlock_focus(this);
        store_inputBlock(this);
        update_inputTotalBlock();
      }, false);
      inputLabel.addEventListener("blur", function() {
        inputBlock_focus(this);
        store_inputBlock(this);
        update_inputTotalBlock();
      }, false);
    };
  };

  // store inputBlock
  function store_inputBlock(element) {
    // add to current character object
    currentCharacter[element.id] = element.value;
    // save to local storage
    store_currentCharacter();
  };

  // remove inputBlock
  function remove_inputBlock(element) {
    // collect all inputBlock classes
    var inputBlockId = element.id;
    // remove all inputBlock from storage
    localStoreRemove(inputBlockId);
  };

  // read inputBlock
  function read_inputBlock() {
    var all_inputBlock = eA(".input-block");
    for (var i = 0; i < all_inputBlock.length; i++) {
      // collect all inputBlock classes
      var inputBlockId = all_inputBlock[i].querySelector(".input-field").id;
      // if inputBlock local store exists
      if (currentCharacter[inputBlockId]) {
        e("#" + inputBlockId).value = currentCharacter[inputBlockId];
      };
    };
  };

  // --------------------------------------------------------------------------
  // snack bar
  // --------------------------------------------------------------------------

  function createSnackBar(message, close, undo, numberOfDice, whichDice, bonusModifier, rollName) {
    var element_snackBars = e(".snacks .snack-bars");
    // make snack bar elements
    var snackBar = document.createElement("div");
    snackBar.setAttribute("class", "snack-bar");
    snackBar.setAttribute("data-roll-name", rollName);
    snackBar.setAttribute("data-ammount-of-dice", numberOfDice);
    snackBar.setAttribute("data-dice", whichDice);
    snackBar.setAttribute("data-ammount-of-bonus", bonusModifier);
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    var col1 = document.createElement("div");
    col1.setAttribute("class", "col-xs-7");
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-xs-5");
    var snackClose = document.createElement("button");
    snackClose.setAttribute("class", "button button-dark button-small snack-clear");
    var snackUndo = document.createElement("button");
    snackUndo.setAttribute("class", "button button-dark button-small snack-undo");
    snackUndo.textContent = "Undo";
    var iconClose = document.createElement("span");
    iconClose.setAttribute("class", "icon-close");
    var snackMessage = document.createElement("p");
    snackMessage.setAttribute("class", "snack-message");
    snackMessage.textContent = message;
    snackClose.appendChild(iconClose);
    // connect elements
    if (close) {
      col2.appendChild(snackClose);
    };
    if (undo) {
      col2.appendChild(snackUndo);
    };
    col1.appendChild(snackMessage);
    row.appendChild(col1);
    row.appendChild(col2);
    // container.appendChild(row);
    snackBar.appendChild(row);
    // mark current snack bars for removal
    var allSnackBars = element_snackBars.querySelectorAll(".snack-bar");
    for (var i = 0; i < allSnackBars.length; i++) {
      var snackBarToRemove = allSnackBars[i];

      function removeReveal() {
        removeClass(snackBarToRemove, "reveal");
      };
      delayFunction(removeReveal, 100);

      function deleteSnackBar() {
        snackBarToRemove.remove();
      };
      delayFunction(deleteSnackBar, 400);
    };
    // append snack bar
    element_snackBars.appendChild(snackBar);
    // add listners
    addListenerTo_snackBar(snackBar);
    // reveal snack bar
    var revealSnackBar = function() {
      addClass(snackBar, "reveal");
    };
    delayFunction(revealSnackBar, 10);
    // auto clear snack bar
    var autoClearSnackBar = function() {
      // if the snack bar hasn't been dismised or undone
      if (snackBar) {
        clearSnackBar(snackBar);
      };
    };
    delayFunction(autoClearSnackBar, 5000);
  };

  // add listeners to snack bar buttons
  function addListenerTo_snackBar(element) {
    var formula_savedFormula = getClosest(element, ".snack-bar");
    var formula_savedFormula_clear = formula_savedFormula.querySelector(".snack-clear");
    var formula_savedFormula_undo = formula_savedFormula.querySelector(".snack-undo");
    // add listner to clear
    if (formula_savedFormula_clear) {
      formula_savedFormula_clear.addEventListener("click", function() {
        clearSnackBar(this);
      }, false);
    };
    // add listner to undo
    if (formula_savedFormula_undo) {
      formula_savedFormula_undo.addEventListener("click", function() {
        undoSnackBar(this);
        localStoreAdd("saved-formulas", element_formulas_list);
        checkListListState();
      }, false);
    };
  };

  // snack bar undo
  function undoSnackBar(element) {
    var snackBar = getClosest(element, ".snack-bar");
    var readSaved_name = snackBar.dataset.rollName;
    var readSaved_amountOfDice = parseInt(snackBar.dataset.ammountOfDice, 10);
    var readSaved_diceSides = parseInt(snackBar.dataset.dice, 10);
    var readSaved_amountOfBonus = parseInt(snackBar.dataset.ammountOfBonus, 10);
    if (readSaved_name == "nameless formula") {
      readSaved_name = "";
    };
    saveCurrentFormula(readSaved_amountOfDice, readSaved_diceSides, readSaved_amountOfBonus, readSaved_name);
    clearSnackBar(element);
  };

  // snack bar clear
  function clearSnackBar(element) {
    if (element) {
      var snackBar = getClosest(element, ".snack-bar");
    } else {
      var snackBar = e(".snack-bar");
    };
    if (snackBar) {
      function removeReveal() {
        removeClass(snackBar, "reveal");
      };
      delayFunction(removeReveal, 10);

      function deleteSnackBar() {
        snackBar.remove();
      };
      delayFunction(deleteSnackBar, 500);
    };
  };

  // --------------------------------------------------------------------------
  // prompt
  // --------------------------------------------------------------------------

  function createPrompt(heading, message, confirmAction) {
    var body = e("body");
    // make prmpt elements
    var promptShade = document.createElement("div");
    promptShade.setAttribute("class", "prompt prompt-shade");
    var prompt = document.createElement("div");
    prompt.setAttribute("class", "prompt prompt-modal");
    var container = document.createElement("div");
    container.setAttribute("class", "container");
    var row1 = document.createElement("div");
    row1.setAttribute("class", "row");
    var row2 = document.createElement("div");
    row2.setAttribute("class", "row");
    var col1 = document.createElement("div");
    col1.setAttribute("class", "col-xs-12");
    var col2 = document.createElement("div");
    col2.setAttribute("class", "col-xs-6");
    var col3 = document.createElement("div");
    col3.setAttribute("class", "col-xs-6");
    var promptMessage = document.createElement("div");
    promptMessage.setAttribute("class", "prompt-message");
    var promptHeading = document.createElement("h1");
    promptHeading.textContent = heading;
    var promptPara = document.createElement("p");
    promptPara.textContent = message;
    var promptAction = document.createElement("button");
    promptAction.setAttribute("class", "button button-primary button-block prompt-action");
    promptAction.textContent = "OK";
    var promptCencel = document.createElement("button");
    promptCencel.setAttribute("class", "button button-secondary button-block prompt-cancel");
    promptCencel.textContent = "Cancel";
    // connect elements
    promptMessage.appendChild(promptHeading);
    promptMessage.appendChild(promptPara);
    col1.appendChild(promptMessage);
    col2.appendChild(promptCencel);
    col3.appendChild(promptAction);
    row1.appendChild(col1);
    row2.appendChild(col2);
    row2.appendChild(col3);
    container.appendChild(row1);
    container.appendChild(row2);
    prompt.appendChild(container);
    // append prompt and shade
    if (!body.querySelector(".prompt.prompt-shade") && !body.querySelector(".prompt.prompt-modal")) {
      body.appendChild(promptShade);
      body.appendChild(prompt);

      function revealPrompt() {
        addClass(prompt, "reveal");
        addClass(promptShade, "reveal");
      };
      delayFunction(revealPrompt, 10);
      addListenerTo_prompt(confirmAction);
    };
  };

  function addListenerTo_prompt(confirmAction) {
    var promptShade = e(".prompt-shade");
    var promptModal = e(".prompt-modal");
    var promptAction = e(".prompt-modal .prompt-action");
    var promptCancel = e(".prompt-modal .prompt-cancel");
    promptShade.addEventListener('click', function() {
      removePrompt();
    });
    promptCancel.addEventListener('click', function() {
      removePrompt();
    });
    promptAction.addEventListener('click', function() {
      if (confirmAction == "clear all") {
        clearAwesomeSheet();
      };
    });
  };

  function removePrompt() {
    var promptShade = e(".prompt-shade");
    var promptModal = e(".prompt-modal");
    var promptCancel = e(".prompt-modal .prompt-cancel");
    if (promptShade && promptModal) {
      promptShade.style.opacity = 0;
      promptModal.style.opacity = 0;

      function fadeRemovePrompt() {
        promptShade.remove();
        promptModal.remove();
      }
      delayFunction(fadeRemovePrompt, 500);
    };
  };

  function clearAwesomeSheet() {
    localStorage.clear();
    document.location.reload(true);
    removePrompt();
  };

  // --------------------------------------------------------------------------
  // escape
  // --------------------------------------------------------------------------

  window.addEventListener("keydown", function(event) {
    if (event.keyCode == 27) {
      removePrompt();
      clearSnackBar();
    };
  }, false);

  // --------------------------------------------------------------------------
  // run on page load
  // --------------------------------------------------------------------------

  setCharacterCount();
  setCharacter();
  read_cloneBlocks();
  read_inputAndTextarea();
  read_stats();
  read_spells();
  read_textarea();
  read_inputBlock();
  update_all_spellKnownItem();
  update_scoreModifiers();
  update_inputTotalBlock();
  update_consumableTotal();
  update_consumableUsed();
  addListenerTo_all_spellKnownItem();
  addListenerTo_all_stats();
  addListenerTo_all_addSpell();
  addListenerTo_all_addSpell_input();
  addListenerTo_prepareSpell();
  addListenerTo_unprepareSpell();
  addListenerTo_castSpell();
  addListenerTo_activeSpell();
  addListenerTo_removeSpell();
  addListenerTo_all_hidableBlock();
  addListenerTo_all_textareas();
  addListenerTo_all_inputBlock();
  addListenerTo_all_cloneBlock();

})();
