define([
    'vec3'
],
    function (vec3) {

        var hit = (function () {

            var constr = function (/*number*/t, /*vec3*/color) {
                this.set(t || Infinity, color || new vec3());
            };

            constr.prototype.constructor = hit;

            constr.prototype.getT = function () {
                return this.t;
            };

            constr.prototype.getColor = function () {
                return new vec3(this.color);
            };

            constr.prototype.set = function (/*number*/t, /*vec3*/color) {
                this.t = t;
                this.color = new vec3(color);
            };

            constr.prototype.write = function () {
                console.log("Hit <" + this.getT() + ", " + this.color.write() + ">");
            };

            return constr;

        })();

        return hit;
    }
);