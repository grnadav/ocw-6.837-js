define([
    'object3d',
    'vec3'
],
    function (object3d, vec3) {

        var sphere = (function () {
            var constr = function (/*vec3*/center, /*number*/radius, /*vec3*/color) {
                object3d.call(this, color);

                this.center = new vec3(center);
                this.radius = radius;
            };
            constr.prototype = Object.create(object3d.prototype);
            constr.prototype.constructor = sphere;

            constr.prototype.intersect = function (/*ray*/r, /*hit*/h, /*number*/tmin) {
                // Find if the ray’s origin is outside the sphere
                var R = r.getOrigin(),
                    D = r.getDirection(),
                    RO = new vec3(),
                    tp,
                    ROLength;

                vec3.sub(RO, this.center, R);
                tp = RO.dot3(D);
                ROLength = RO.length();

                if (tp < 0) {
                    // ray is outside the sphere
                    return false;
                }

                if (ROLength * ROLength - tp * tp) {
                    // no hit
                    return false;
                }

                var a = 1,
                    b = 2 * D.dot3(R),
                    c = R.dot3(R) - this.radius * this.radius,
                    d, tminus, tplus, sqr = b * b - 4 * a * c;

                if (sqr <= 0) {
                    return false;
                }

                d = Math.sqrt(sqr);
                tminus = (-1*b - d) / (2 * a);
                tplus = (-1*b + d) / (2 * a);

                if (tminus > tmin && tminus < h.getT()) {
                    // new closer hit
                    h.set(tminus, this.color);
                }
                if (tplus > tmin && tplus < h.getT()) {
                    // new closer hit
                    h.set(tplus, this.color);
                }

                return true;

            };

            return constr;

        })();

        return sphere;
    }
);