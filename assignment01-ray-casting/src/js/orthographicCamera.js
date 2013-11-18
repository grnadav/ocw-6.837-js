define([
    'camera',
    'vec2',
    'vec3',
    'ray'
],
    function (camera, vec2, vec3, ray) {

        var orthographicCamera = (function () {
            var constr = function(/*vec3*/center,/*vec3*/direction,/*vec3*/up,/*number*/size) {
                camera.call(this);

                this.center = new vec3(center);
                this.direction = direction;
                // normalize direction
                this.direction.normalize();
                this.up = new vec3(up);
                // normalize up and it must be modified to be orthonormal to the direction
                this.up.normalize();
                this.size = size;

                this.horizontal = new vec3();
                // calculate the horizontal vector
                vec3.cross3(this.horizontal, this.direction, this.up);
                this.horizontal.normalize();
                // make sure up is perpendicular to the rest
                // deduce third basis vector, the horizontal vector of the image plane,
                // is deduced from the direction and the up vector (hint: remember vector algebra and cross products)
                // TODO: needed?
                vec3.cross3(this.up, this.horizontal,this.direction);
            };
            constr.prototype = Object.create(camera.prototype);
            constr.prototype.constructor = orthographicCamera;

            constr.prototype.generateRay = function(/*vec2*/point) {
                var originRay = new vec3(),
                    yMove = point.y()*this.size-this.size/2,
                    xMove = point.x()*this.size-this.size/2;

                vec3.addScale(originRay, this.center, this.up, yMove);
                vec3.addScale(originRay, originRay, this.horizontal, xMove);

                return new ray(this.direction, originRay);
            };

            return constr;

        })();

        return orthographicCamera;
    }
);