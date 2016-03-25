var quickNav = (function() {

  function render() {
    window.onscroll = function() {
      var quickNav = helper.e("#quick-nav");
      var quickNavLinks = helper.eA(".quick-link");
      var sections = helper.eA("section");
      var menu = 70;
      if (helper.e("#statistics").getBoundingClientRect().top <= menu) {
        helper.addClass(quickNav, "pinned");
      } else {
        helper.removeClass(quickNav, "pinned");
      };
      for (var i = 0; i < sections.length; i++) {
        // console.log(sections[i].id + " top = " + sections[i].getBoundingClientRect().top + " | bottom = " + sections[i].getBoundingClientRect().bottom);
        if (sections[i].getBoundingClientRect().top <= menu && sections[i].getBoundingClientRect().bottom > menu) {
          helper.addClass(quickNavLinks[i], "active");
          helper.addClass(sections[i], "pinned");
        } else {
          helper.removeClass(quickNavLinks[i], "active");
          helper.removeClass(sections[i], "pinned");
        };
      };
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        var lastQuickLink = helper.e(".quick-link.notes");
        for (var i = 0; i < quickNavLinks.length; i++) {
          helper.removeClass(quickNavLinks[i], "active");
        };
        helper.addClass(lastQuickLink, "active");
      };
    };
  };

  // exposed methods
  return {
    render: render
  }

})();