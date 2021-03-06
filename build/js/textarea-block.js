var textareaBlock = (function() {

  var storeInputTimer = null;

  function _store(textarea) {
    var textareaBlock = helper.getClosest(textarea, ".js-textarea-block");
    var textareaBlockOptions = helper.makeObject(textareaBlock.dataset.textareaBlockOptions);
    var data = textarea.innerHTML;
    if (data == "<div><br></div>" || data == "<br>" || data == "<br><br>" || data == "<br><br><br>") {
      data = "";
    };
    if (textareaBlockOptions.path) {
      if (textareaBlockOptions.clone) {
        helper.setObject({
          path: textareaBlockOptions.path,
          object: sheet.getCharacter(),
          clone: textareaBlockOptions.clone,
          newValue: data
        });
      } else {
        helper.setObject({
          path: textareaBlockOptions.path,
          object: sheet.getCharacter(),
          newValue: data
        });
      };
    };
  };

  function delayUpdate(element) {
    _store(element);
    sheet.storeCharacters();
    totalBlock.render();
    if (display.state()) {
      display.clear();
      display.render();
    };
  };

  function _focus(element) {
    var textareaBlock = helper.getClosest(element, ".js-textarea-block");
    if (element == document.activeElement) {
      helper.addClass(textareaBlock, "is-focus");
    } else {
      helper.removeClass(textareaBlock, "is-focus");
    };
  };

  function clear() {
    var all_textareaBlock = helper.eA(".js-textarea-block");
    for (var i = 0; i < all_textareaBlock.length; i++) {
      all_textareaBlock[i].querySelector(".js-textarea-block-field").innerHTML = "";
    };
  };

  function bind(textareaBlock) {
    if (textareaBlock) {
      _bind_textareaBlock(textareaBlock);
    } else {
      var all_textareaBlock = helper.eA(".js-textarea-block");
      for (var i = 0; i < all_textareaBlock.length; i++) {
        var options = helper.makeObject(all_textareaBlock[i].dataset.inputBlockOptions);
        if (!options.clone) {
          _bind_textareaBlock(all_textareaBlock[i]);
        };
      };
    };
  };

  function _bind_textareaBlock(textareaBlock) {
    var field = textareaBlock.querySelector(".js-textarea-block-field");
    if (field) {
      field.addEventListener("input", function() {
        clearTimeout(storeInputTimer);
        storeInputTimer = setTimeout(delayUpdate, 300, this);
        sheet.storeCharacters();
      }, false);
      field.addEventListener("focus", function() {
        _focus(this);
      }, false);
      field.addEventListener("blur", function() {
        _store(this);
        _focus(this);
        sheet.storeCharacters();
      }, false);
      field.addEventListener("paste", function(event) {
        helper.pasteStrip(event);
      });
    };
  };

  function render(textareaBlock) {
    if (textareaBlock) {
      _render_textareaBlock(textareaBlock);
    } else {
      var all_textareaBlock = helper.eA(".js-textarea-block");
      for (var i = 0; i < all_textareaBlock.length; i++) {
        _render_textareaBlock(all_textareaBlock[i]);
      };
    };
  };

  function _render_textareaBlock(textareaBlock) {
    var textareaBlockField = textareaBlock.querySelector(".js-textarea-block-field");
    var options = helper.makeObject(textareaBlock.dataset.textareaBlockOptions);
    var data;
    if (options.path) {
      if (options.clone) {
        data = helper.getObject({
          object: sheet.getCharacter(),
          path: options.path,
          clone: options.clone
        });
      } else {
        data = helper.getObject({
          object: sheet.getCharacter(),
          path: options.path
        });
      };
      textareaBlockField.innerHTML = data;
    };
  };

  // exposed methods
  return {
    render: render,
    bind: bind,
    clear: clear
  };

})();
