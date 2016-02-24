(function(module) {

    var video = {};
    Video.menu = [];

    function Video(opts) {
      Object.keys(opts).forEach(function(e, index, keys) {
        this[e] = opts[e];
      },this);
    };

    Video.hideVidWrapper = function() {
      $('#videoWrapper').hide();
    }

  module.Video = Video;
})(window)
