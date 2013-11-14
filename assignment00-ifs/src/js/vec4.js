define([
    'vec3'
],
    function (vec3) {

        var vec4 = (function () {
            var constr = function (d1, d2, d3, d4) {
                // base case of creation without values
                var argv = Array.prototype.slice.call(arguments).length;
                d1 = d1 || 0;
                d2 = d2 || 0;
                d3 = d3 || 0;
                d4 = d4 || 0;
                // handle overloading

                // vec4(float,float,float,float)
                if (argv === 0 || (argv === 4 && typeof d1 === 'number' && typeof d2 === 'number' && typeof d3 === 'number' && typeof d4 === 'number')) {
                    this[0] = d1;
                    this[1] = d2;
                    this[2] = d3;
                    this[3] = d4;
                }

                // vec4(vec4)
                if (argv === 1 && d1 instanceof vec4) {
                    this[0] = d1[0];
                    this[1] = d1[1];
                    this[2] = d1[2];
                    this[3] = d1[3];
                }

                // vec4(vec4, vec4)
                if (argv === 2 && d1 instanceof vec4 && d2 instanceof vec4) {
                    this[0] = d1[0] - d2[0];
                    this[1] = d1[1] - d2[1];
                    this[2] = d1[2] - d2[2];
                    this[3] = d1[3] - d2[3];
                }

                // vec4(vec3, float)
                if (argv === 2 && d1 instanceof vec3 && typeof d2 === 'number') {
                    this[0] = d1[0];
                    this[1] = d1[1];
                    this[2] = d1[2];
                    this[3] = d2;
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

            function w() {
                return this[3];
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

            function a() {
                return this[3];
            }

            // ACCESSORS
            function length() {
                return Math.sqrt(this[0] * this[0] +
                    this[1] * this[1] +
                    this[2] * this[2] +
                    this[3] * this[3]);
            }

            // MODIFIERS
            function set(d1, d2, d3, d4) {
                this[0] = d1;
                this[1] = d2;
                this[2] = d3;
                this[3] = d4;
            }

            function scale(s1, s2, s3, s4) {
                this[0] *= s1;
                this[1] *= s2;
                this[2] *= s3;
                this[3] *= s4;
            }

            function divide(d1, d2, d3, d4) {
                this[0] /= d1;
                this[1] /= d2;
                this[2] /= d3;
                this[3] /= d4;
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
                this[3] = -this[3];
            }

            function divideByW() {
                if (this[3] != 0) {
                    this[0] /= this[3];
                    this[1] /= this[3];
                    this[2] /= this[3];
                } else {
                    this[0] = this[1] = this[2] = 0;
                }
                this[3] = 1;
            }

            // OPERATIONS
            function dot2(v) {
                return this[0] * v[0] +
                    this[1] * v[1];
            }

            function dot3(v) {
                return this[0] * v[0] +
                    this[1] * v[1] +
                    this[2] * v[2];
            }

            function dot4(v) {
                return this[0] * v[0] +
                    this[1] * v[1] +
                    this[2] * v[2] +
                    this[3] * v[3];
            }


            // STATIC OPERATIONS
            constr.add = function (a, b, c) {
                a[0] = b[0] + c[0];
                a[1] = b[1] + c[1];
                a[2] = b[2] + c[2];
                a[3] = b[3] + c[3];
            }

            constr.sub = function (a, b, c) {
                a[0] = b[0] - c[0];
                a[1] = b[1] - c[1];
                a[2] = b[2] - c[2];
                a[3] = b[3] - c[3];
            }

            constr.copyScale = function (a, b, c) {
                a[0] = b[0] * c;
                a[1] = b[1] * c;
                a[2] = b[2] * c;
                a[3] = b[3] * c;
            }

            constr.addScale = function (a, b, c, d) {
                a[0] = b[0] + c[0] * d;
                a[1] = b[1] + c[1] * d;
                a[2] = b[2] + c[2] * d;
                a[3] = b[3] + c[3] * d;
            }

            constr.average = function (a, b, c) {
                a[0] = (b[0] + c[0]) * 0.5;
                a[1] = (b[1] + c[1]) * 0.5;
                a[2] = (b[2] + c[2]) * 0.5;
                a[3] = (b[3] + c[3]) * 0.5;
            }

            constr.weightedSum = function (a, b, c, d, e) {
                a[0] = b[0] * c + d[0] * e;
                a[1] = b[1] * c + d[1] * e;
                a[2] = b[2] * c + d[2] * e;
                a[3] = b[3] * c + d[3] * e;
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
                console.log(this[0], this[1], this[2], this[3]);
            }

            constr.prototype = {
                constructor: vec4,

                x: x,
                y: y,
                z: z,
                w: w,
                r: r,
                g: g,
                b: b,
                a: a,
                length: length,
                set: set,
                scale: scale,
                divide: divide,
                normalize: normalize,
                negate: negate,
                divideByW: divideByW,
                dot2: dot2,
                dot3: dot3,
                dot4: dot4,
                write: write
            }

            return constr;

        })();

        return vec4;
    }
);