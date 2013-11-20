define([
    'vec3'
],
    function (vec3) {

        var ray = (function () {

            var constr = function () {
                var argv = Array.prototype.slice.call(arguments).length;

                if (argv === 1) {
                    // constr(ray)
                    this.direction = new vec3(arguments[0].getDirection());
                    this.origin = new vec3(arguments[0].getOrigin());
                } else if (argv === 2) {
                    // constr(direction,origin)
                    this.direction = new vec3(arguments[0]);
                    this.origin = new vec3(arguments[1]);
                }
                this.direction.normalize();
            };

            constr.prototype.constructor = ray;

            constr.prototype.getDirection = function () {
                return new vec3(this.direction);
            };

            constr.prototype.getOrigin = function () {
                return new vec3(this.origin);
            };

            constr.prototype.pointAtParameter = function (/*number*/t) {
                return this.origin + this.direction * t;
            };

            constr.prototype.write = function () {
                console.log("Ray <"+ this.getOrigin().write()+", "+this.getDirection().write()+">");
            };

            return constr;

        })();

        return ray;
    }
);