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

            constr.prototype.intersect = function (/*ray*/r, /*hit*/h, /*number*/tmin) {
                var isIntersect = false, tmpIntersect;
                for (var i=0; i<this.objects.length; i++) {
                    tmpIntersect = this.objects[i].intersect(r,h,tmin);
                    isIntersect = isIntersect ? true : tmpIntersect;
                }
                return isIntersect;
            };

            return constr;

        })();

        return group;
    }
);