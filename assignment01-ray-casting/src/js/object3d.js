define([
    'ray',
    'hit',
    'vec3'
],
    function (ray, hit, vec3) {

        var object3d = (function () {

            var constr = function(/*vec3*/color) {
                color = color || new vec3();
                this.color = new vec3(color);
            };

            constr.prototype.constructor = object3d;

            constr.prototype.intersect = function(/*ray*/r, /*hit*/h, /*number*/tmin) {
                throw 'cannot use base class object3d';
            };

            return constr;

        })();

        return object3d;
    }
);