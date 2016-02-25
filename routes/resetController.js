(function(module) {
    var resetController = {};

    resetController.index = function() {
        console.log("resetController called...");

        // TODO: Restore the status to a default state
        localStorage.clear();


        $('#hero').hide();
        $('#arena').hide();
    };

    module.resetController = resetController;
})(window);
