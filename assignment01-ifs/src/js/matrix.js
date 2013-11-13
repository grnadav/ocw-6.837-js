define([
    'vec2',
    'vec3',
    'vec4'
],
    function (vec2,vec3,vec4) {

        var matrix = (function () {

            var constr = function (m) {
                this.clear();
                // base case of creation without values
                var argv = Array.prototype.slice.call(arguments).length;
                // handle overloading
                if (argv === 1 && m instanceof matrix) {
                    for (var x = 0; x < 4; x++) {
                        for (var y = 0; y < 4; y++) {
                            this[x][y] = m[x][y];
                        }
                    }
                }
            };

            function clear() {
                // create 4x4 dimensional array data structure on this to make is later accessible as myMatrix[2][3]
                this[0] = [], this[1] = [], this[2] = [], this[3] = [];

                for (var y = 0; y < 4; y++) {
                    for (var x = 0; x < 4; x++) {
                        this[y][x] = 0;
                    }
                }
            }

            function glMat() {
                var ret = [], x, y;
                for (x = 0; x < 4; x++) {
                    for (y = 0; y < 4; y++) {
                        ret[x + y * 4] = this[x][y];
                    }
                }
                return ret;
            }

            function get(x, y) {
                return this[y][x];
            }

            function set(x, y, v) {
                this[y][x] = v;
            }

            function setToIdentity() {
                for (var y = 0; y < 4; y++) {
                    for (var x = 0; x < 4; x++) {
                        this[y][x] = +(x === y);
                    }
                }
            }

            function transpose(m) {
                // handle overloading
                if (!m) {
                    this.transpose(this);
                    return;
                }
                // be careful, <this> might be <m>
                var tmp = new matrix(m);
                for (var y = 0; y < 4; y++) {
                    for (var x = 0; x < 4; x++) {
                        m[y][x] = tmp[x][y];
                    }
                }
            }

            function inverse(/*undefined|number|matrix*/m, /*number*/epsilon) {
                epsilon = epsilon || 1e-08;
                // handle overloading
                if (m === undefined) {
                    return this.inverse(this, epsilon);
                } else if (typeof m === 'number') {
                    return this.inverse(this, m);
                }

                var a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4;
                a1 = m[0][0];
                b1 = m[0][1];
                c1 = m[0][2];
                d1 = m[0][3];
                a2 = m[1][0];
                b2 = m[1][1];
                c2 = m[1][2];
                d2 = m[1][3];
                a3 = m[2][0];
                b3 = m[2][1];
                c3 = m[2][2];
                d3 = m[2][3];
                a4 = m[3][0];
                b4 = m[3][1];
                c4 = m[3][2];
                d4 = m[3][3];

                var det = this.det4x4(a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4);

                if (Math.abs(det) < epsilon) {
                    console.log("Matrix::Inverse --- singular matrix, can't invert!\n");
                    return 0;
                }

                m[0][0] = this.det3x3(b2, b3, b4, c2, c3, c4, d2, d3, d4);
                m[1][0] = -this.det3x3(a2, a3, a4, c2, c3, c4, d2, d3, d4);
                m[2][0] = this.det3x3(a2, a3, a4, b2, b3, b4, d2, d3, d4);
                m[3][0] = -this.det3x3(a2, a3, a4, b2, b3, b4, c2, c3, c4);

                m[0][1] = -this.det3x3(b1, b3, b4, c1, c3, c4, d1, d3, d4);
                m[1][1] = this.det3x3(a1, a3, a4, c1, c3, c4, d1, d3, d4);
                m[2][1] = -this.det3x3(a1, a3, a4, b1, b3, b4, d1, d3, d4);
                m[3][1] = this.det3x3(a1, a3, a4, b1, b3, b4, c1, c3, c4);

                m[0][2] = this.det3x3(b1, b2, b4, c1, c2, c4, d1, d2, d4);
                m[1][2] = -this.det3x3(a1, a2, a4, c1, c2, c4, d1, d2, d4);
                m[2][2] = this.det3x3(a1, a2, a4, b1, b2, b4, d1, d2, d4);
                m[3][2] = -this.det3x3(a1, a2, a4, b1, b2, b4, c1, c2, c4);

                m[0][3] = -this.det3x3(b1, b2, b3, c1, c2, c3, d1, d2, d3);
                m[1][3] = this.det3x3(a1, a2, a3, c1, c2, c3, d1, d2, d3);
                m[2][3] = -this.det3x3(a1, a2, a3, b1, b2, b3, d1, d2, d3);
                m[3][3] = this.det3x3(a1, a2, a3, b1, b2, b3, c1, c2, c3);

                //m *= 1 / det;
                this.mul(m, 1 / det);
                return 1;
            }

            function det4x4(a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, d1, d2, d3, d4) {
                return a1 * this.det3x3(b2, b3, b4, c2, c3, c4, d2, d3, d4)
                    - b1 * this.det3x3(a2, a3, a4, c2, c3, c4, d2, d3, d4)
                    + c1 * this.det3x3(a2, a3, a4, b2, b3, b4, d2, d3, d4)
                    - d1 * this.det3x3(a2, a3, a4, b2, b3, b4, c2, c3, c4);

            }

            function det3x3(a1, a2, a3, b1, b2, b3, c1, c2, c3) {
                return a1 * this.det2x2(b2, b3, c2, c3)
                    - b1 * this.det2x2(a2, a3, c2, c3)
                    + c1 * this.det2x2(a2, a3, b2, b3);

            }

            function det2x2(a, b, c, d) {
                return a * d - b * c;
            }

            function mul(m, f) {
                for (var y = 0; y < 4; y++) {
                    for (var x = 0; x < 4; x++) {
                        m[y][x] *= f;
                    }
                }
                return m;
            }

            // TRANSFORMATIONS
            constr.makeTranslation = function (/*vec3*/v) {
                var t = new matrix();
                t.setToIdentity();
                t[0][3] = v.x();
                t[1][3] = v.y();
                t[2][3] = v.z();
                return t;
            };

            constr.makeScale = function (/*vec3|number*/v) {
                if (typeof v === 'number') {
                    return matrix.makeScale(new vec3(v, v, v));
                }
                var s = new matrix();
                s.setToIdentity();
                s[0][0] = v.x();
                s[1][1] = v.y();
                s[2][2] = v.z();
                s[3][3] = 1;
                return s;
            };

            constr.makeXRotation = function (/*number*/theta) {
                var rx = new matrix();
                rx.setToIdentity();
                rx[1][1] = Math.cos(theta);
                rx[1][2] = -Math.sin(theta);
                rx[2][1] = Math.sin(theta);
                rx[2][2] = Math.cos(theta);
                return rx;
            };

            constr.makeYRotation = function (/*number*/theta) {
                var ry = new matrix();
                ry.setToIdentity();
                ry[0][0] = Math.cos(theta);
                ry[0][2] = Math.sin(theta);
                ry[2][0] = -Math.sin(theta);
                ry[2][2] = Math.cos(theta);
                return ry;
            };

            constr.makeZRotation = function (/*number*/theta) {
                var rz = new matrix();
                rz.setToIdentity();
                rz[0][0] = Math.cos(theta);
                rz[0][1] = -Math.sin(theta);
                rz[1][0] = Math.sin(theta);
                rz[1][1] = Math.cos(theta);
                return rz;
            };

            constr.makeAxisRotation = function (/*vec3*/v, /*number*/theta) {
                var r = new matrix();
                r.setToIdentity();

                var x = v.x(), y = v.y(), z = v.z();

                var c = Math.cos(theta);
                var s = Math.sin(theta);
                var xx = x * x;
                var xy = x * y;
                var xz = x * z;
                var yy = y * y;
                var yz = y * z;
                var zz = z * z;

                r.set(0, 0, (1 - c) * xx + c);
                r.set(0, 1, (1 - c) * xy + z * s);
                r.set(0, 2, (1 - c) * xz - y * s);
                r.set(0, 3, 0);

                r.set(1, 0, (1 - c) * xy - z * s);
                r.set(1, 1, (1 - c) * yy + c);
                r.set(1, 2, (1 - c) * yz + x * s);
                r.set(1, 3, 0);

                r.set(2, 0, (1 - c) * xz + y * s);
                r.set(2, 1, (1 - c) * yz - x * s);
                r.set(2, 2, (1 - c) * zz + c);
                r.set(2, 3, 0);

                r.set(3, 0, 0);
                r.set(3, 1, 0);
                r.set(3, 2, 0);
                r.set(3, 3, 1);

                return r;
            };

            // Use to transform a point with a matrix
            // that may include translation
            function transform(/*vec4|vec3|vec2*/v) {

                // handle overloading
                var i, y, v2;
                if (v instanceof vec4) {
                    var answer = new vec4();
                    for (y = 0; y < 4; y++) {
                        answer[y] = 0;
                        for (i = 0; i < 4; i++) {
                            answer[y] += this[y][i] * v[i];
                        }
                    }
                    //v = answer;
                    for (i = 0; i < 4; i++) {
                        v[i] = answer[i];
                    }
                } else if (v instanceof vec3) {
                    v2 = new vec4(v.x(), v.y(), v.z(), 1);
                    this.transform(v2);
                    v.set(v2.x(), v2.y(), v2.z());
                } else if (v instanceof vec2) {
                    v2 = new vec4(v.x(), v.y(), 1, 1);
                    this.transform(v2);
                    v.set(v2.x(), v2.y());
                }

            }


            // Use to transform the direction of the ray
            // (ignores any translation)
            function transformDirection(/*vec3*/v) {
                var v2 = new vec4(v.x(), v.y(), v.z(), 0);
                this.transform(v2);
                v.set(v2.x(), v2.y(), v2.z());
            }

            // INPUT / OUTPUT
            function write() {
                for (var y = 0; y < 4; y++) {
                    for (var x = 0; x < 4; x++) {
                        var tmp = this[y][x];
                        if (Math.abs(tmp) < 0.00001) tmp = 0;
                        console.log(tmp);
                    }
                    console.log("\n");
                }
            }

            function write3x3() {
                for (var y = 0; y < 4; y++) {
                    if (y == 2) continue;
                    for (var x = 0; x < 4; x++) {
                        if (x == 2) continue;
                        var tmp = this[y][x];
                        if (Math.abs(tmp) < 0.00001) tmp = 0;
                        console.log(tmp);
                    }
                    console.log("\n");
                }
            }

            function read(input) {
                for (var x=0; x<4; x++) {
                    for (var y=0; y<4; y++) {
                        this[x][y] = input[x*4+y];
                    }
                }
            }
//
//            function read3x3(input) {
//
//            }


            constr.prototype = {
                constructor: matrix,

                clear: clear,
                glMat: glMat,
                get: get,
                set: set,
                setToIdentity: setToIdentity,
                transpose: transpose,
                inverse: inverse,
                det4x4: det4x4,
                det3x3: det3x3,
                det2x2: det2x2,
                mul: mul,
                transform: transform,
                transformDirection: transformDirection,
                write: write,
                read: read,
                write3x3: write3x3
            };

            return constr;

        })();

        return matrix;
    }
);