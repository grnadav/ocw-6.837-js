define([],
    function () {

        var vec2 = (function () {
            var constr = function(d1, d2) {
                // base case of creation without values
                d1 = d1 || 0;
                d2 = d2 || 0;
                // handle overloading

                // vec2(float,float)
                if (typeof d1 === 'number' && typeof d2 === 'number') {
                    this[0] = d1;
                    this[1] = d2;
                }

                // vec2(vec2)
                if (d1 instanceof vec2 && typeof d2 === 'number') {
                    this[0] = d1[0];
                    this[1] = d1[1];
                }

                // vec2(vec2, vec2)
                if (d1 instanceof vec2 && d2 instanceof vec2) {
                    this[0] = d1[0] - d2[0];
                    this[1] = d1[1] - d2[1];
                }

            };


            function x() {
                return this[0];
            }

            function y() {
                return this[1];
            }

            // ACCESSORS
            function length() {
                return Math.sqrt(this[0] * this[0] + this[1] * this[1]);
            }

            // MODIFIERS
            function set(d1, d2) {
                this[0] = d1;
                this[1] = d2;
            }

            function scale(s1, s2) {
                this[0] *= s1;
                this[1] *= s2;
            }

            function divide(d1, d2) {
                this[0] /= d1;
                this[1] /= d2;
            }

            function negate() {
                this[0] = -this[0];
                this[1] = -this[1];
            }

            // OPERATIONS
            function dot2(v) {
                return this[0] * v[0] + this[1] * v[1];
            }

            // STATIC OPERATIONS
            function add(a, b, c) {
                a[0] = b[0] + c[0];
                a[1] = b[1] + c[1];
            }

            function sub(a, b, c) {
                a[0] = b[0] - c[0];
                a[1] = b[1] - c[1];
            }

            function copyScale(a, b, c) {
                a[0] = b[0] * c;
                a[1] = b[1] * c;
            }

            function addScale(a, b, c, d) {
                a[0] = b[0] + c[0] * d;
                a[1] = b[1] + c[1] * d;
            }

            function average(a, b, c) {
                a[0] = (b[0] + c[0]) * 0.5;
                a[1] = (b[1] + c[1]) * 0.5;
            }

            function weightedSum(a, b, c, d, e) {
                a[0] = b[0] * c + d[0] * e;
                a[1] = b[1] * c + d[1] * e;
            }

            // INPUT / OUTPUT
            function write() {
                console.log(this[0], this[1]);
            }

            constr.prototype = {
                constructor: vec2,

                x: x,
                y: y,
                length: length,
                set: set,
                scale: scale,
                divide: divide,
                negate: negate,
                dot2: dot2,
                add: add,
                sub: sub,
                copyScale: copyScale,
                addScale: addScale,
                average: average,
                weightedSum: weightedSum,
                write: write
            }

            return constr;

        })();

        return vec2;
    }
);