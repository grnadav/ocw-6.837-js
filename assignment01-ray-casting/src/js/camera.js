define([
    'vec2'
],
    function (vec2) {

        var camera = (function () {

            var constr = function() {
            };

            constr.prototype.constructor = camera;

            constr.prototype.generateRay = function(/*vec2*/point) {
                throw 'cannot use base class camera';
            };

            return constr;

        })();

        return camera;
    }
);