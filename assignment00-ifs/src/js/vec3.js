define([],
    function () {

        var vec3 = (function () {
            var constr = function (d1, d2, d3) {
                // base case of creation without values
                var argv = Array.prototype.slice.call(arguments).length;
                d1 = d1 || 0;
                d2 = d2 || 0;
                d3 = d3 || 0;
                // handle overloading

                // vec3(float,float,float)
                if (argv === 0 || (argv === 3 && typeof d1 === 'number' && typeof d2 === 'number' && typeof d3 === 'number')) {
                    this[0] = d1;
                    this[1] = d2;
                    this[2] = d3;
                }

                // vec3(vec3)
                if (argv === 1 && d1 instanceof vec3) {
                    this[0] = d1[0];
                    this[1] = d1[1];
                    this[2] = d1[2];
                }

                // vec3(vec3, vec3)
                if (argv === 2 && d1 instanceof vec3 && d2 instanceof vec3) {
                    this[0] = d1[0] - d2[0];
                    this[1] = d1[1] - d2[1];
                    this[2] = d1[2] - d2[2];
                }

            };


            function x() {
                return this[0];
            }

            function y() {
                return this[1];
            }

            function z() {
                return this[2];
            }

            function r() {
                return this[0];
            }

            function g() {
                return this[1];
            }

            function b() {
                return this[2];
            }

            // ACCESSORS
            function length() {
                return Math.sqrt(this[0] * this[0] +
                    this[1] * this[1] +
                    this[2] * this[2]);
            }

            // MODIFIERS
            function set(d1, d2, d3) {
                this[0] = d1;
                this[1] = d2;
                this[2] = d3;
            }

            function scale(s1, s2, s3) {
                this[0] *= s1;
                this[1] *= s2;
                this[2] *= s3;
            }

            function divide(d1, d2, d3) {
                this[0] /= d1;
                this[1] /= d2;
                this[2] /= d3;
            }

            function normalize() {
                var l = this.length();
                if (l > 0) {
                    this[0] /= l;
                    this[1] /= l;
                    this[2] /= l;
                }
            }

            function negate() {
                this[0] = -this[0];
                this[1] = -this[1];
                this[2] = -this[2];
            }

            // OPERATIONS
            function dot3(v) {
                return this[0] * v[0] +
                    this[1] * v[1] +
                    this[2] * v[2];
            }

            // STATIC OPERATIONS
            constr.add = function (a, b, c) {
                a[0] = b[0] + c[0];
                a[1] = b[1] + c[1];
                a[2] = b[2] + c[2];
            }

            constr.sub = function (a, b, c) {
                a[0] = b[0] - c[0];
                a[1] = b[1] - c[1];
                a[2] = b[2] - c[2];
            }

            constr.copyScale = function (a, b, c) {
                a[0] = b[0] * c;
                a[1] = b[1] * c;
                a[2] = b[2] * c;
            }

            constr.addScale = function (a, b, c, d) {
                a[0] = b[0] + c[0] * d;
                a[1] = b[1] + c[1] * d;
                a[2] = b[2] + c[2] * d;
            }

            constr.average = function (a, b, c) {
                a[0] = (b[0] + c[0]) * 0.5;
                a[1] = (b[1] + c[1]) * 0.5;
                a[2] = (b[2] + c[2]) * 0.5;
            }

            constr.weightedSum = function (a, b, c, d, e) {
                a[0] = b[0] * c + d[0] * e;
                a[1] = b[1] * c + d[1] * e;
                a[2] = b[2] * c + d[2] * e;
            }

            constr.cross3 = function (c, v1, v2) {
                var x = v1[1] * v2[2] - v1[2] * v2[1];
                var y = v1[2] * v2[0] - v1[0] * v2[2];
                var z = v1[0] * v2[1] - v1[1] * v2[0];
                c[0] = x;
                c[1] = y;
                c[2] = z;
            }

            // INPUT / OUTPUT
            function write() {
                console.log(this[0], this[1], this[2]);
            }

            constr.prototype = {
                constructor: vec3,

                x: x,
                y: y,
                z: z,
                r: r,
                g: g,
                b: b,
                length: length,
                set: set,
                scale: scale,
                divide: divide,
                normalize: normalize,
                negate: negate,
                dot3: dot3,
                write: write
            }

            return constr;

        })();

        return vec3;
    }
);