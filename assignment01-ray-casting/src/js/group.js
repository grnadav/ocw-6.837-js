define([
    'object3d'
],
    function (object3d) {

        var group = (function () {
            var constr = function (/*number*/objCount) {
                object3d.call(this);

                this.objCount = objCount || 0;
                this.objects = [];
            };
            constr.prototype = Object.create(object3d.prototype);
            constr.prototype.constructor = group;

            constr.prototype.addObject = function (/*number*/index, /*object3d*/obj) {
                // intentionally keep in the obj array a ref to the object
                this.objects.splice(index, 0, obj);
            };

            return constr;

        })();

        return group;
    }
);