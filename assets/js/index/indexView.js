(function(module) {

    var indexView = {};

    indexView.render = function(hero) {
        $('#hero').hide();
        $('#arena').hide();
    };


    module.indexView = indexView;
})(window);
