define([
    'camera',
    'vec3'
],
    function (camera, vec3) {

        var orthographicCamera = (function () {
            var constr = function(/*vec3*/center,/*vec3*/direction,/*vec3*/up,/*number*/size) {
                camera.call(this);

                this.center = new vec3(center);
                this.direction = direction;
                // normalize direction
                this.direction.normalize();
                this.up = new vec3(up);
                // normalize up TODO and it must be modified to be orthonormal to the direction
                this.up.normalize();
                this.size = size;
//                this.horizontal = new vec3();

                // deduce third basis vector, the horizontal vector of the image plane,
                // is deduced from the direction and the up vector (hint: remember vector algebra and cross products)

            };
            constr.prototype = Object.create(camera.prototype);
            constr.prototype.constructor = orthographicCamera;

            constr.prototype.generateRay = function(/*vec2*/point) {
            };

            return constr;

        })();

        return orthographicCamera;
    }
);