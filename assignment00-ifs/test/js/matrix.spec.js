define([
    'vec2',
    'vec3',
    'vec4',
    'matrix'
], function(vec2, vec3, vec4, matrix) {

    function round2dig(x) {
        return parseInt(x*100)/100;
    }

    describe('matrix', function() {
        it('should create a 0-matrix when no params provided to constr.', function() {
            var m = new matrix();
            for (var x=0; x<4; x++) {
                for (var y=0; y<4; y++) {
                    expect(m[x][y]).to.be(0);
                }
            }
        });

        it('should create a copy of matrix when matrix provided to constr.', function() {
            var m1 = new matrix(),
                m2;
            m1[0][0] = 1;
            m1[1][3] = 4;

            m2 = new matrix(m1);
            expect(m1!==m2).to.be(true);
            expect(m2[0][0]).to.be(1);
            expect(m2[1][3]).to.be(4);
        });

        it('should #clear should zero the matrix', function() {
            var m = new matrix();
            m[0][0] = 1;
            m[1][3] = 4;

            m.clear();
            for (var x=0; x<4; x++) {
                for (var y=0; y<4; y++) {
                    expect(m[x][y]).to.be(0);
                }
            }
        });

        it('should #glMat should return array of flat matrix value', function() {
            var m = new matrix();
            m[0][0] = 1;
            m[1][3] = 4;

            var arr = m.glMat();
            expect(arr.length).to.be(16);
            expect(arr[0]).to.be(1);
            expect(arr[3*4+1]).to.be(4);
        });

        it('should #get to return value of cell in matrix', function() {
            var m = new matrix();
            m[0][0] = 1;
            m[1][3] = 4;

            expect(m.get(3,1)).to.be(4);
        });

        it('should #set to set value of cell in matrix', function() {
            var m = new matrix();

            m[1][3] = 4;
            m.set(3,1, 5);

            expect(m.get(3,1)).to.be(5);
        });

        it('should #setToIdentity to reset matrix to identity matrix', function() {
            var m = new matrix();

            m[1][3] = 4;
            m.setToIdentity();

            for (var x=0; x<4; x++) {
                for (var y=0; y<4; y++) {
                    if (x===y) {
                        expect(m[x][y]).to.be(1);
                    } else {
                        expect(m[x][y]).to.be(0);
                    }
                }
            }
        });

        it('should #transpose matrix if no input matrix provided', function() {
            var m = new matrix();

            m[1][3] = 4;
            m.transpose();

            expect(m[1][3]).to.be(0);
            expect(m[3][1]).to.be(4);
        });

        it('should #transpose provided matrix if provided, not affect current matrix', function() {
            var m = new matrix(), m2 = new matrix();

            m[1][2] = 5;
            m2[1][3] = 4;
            m.transpose(m2);

            expect(m[1][2]).to.be(5);
            expect(m2[3][1]).to.be(4);
            expect(m2[1][3]).to.be(0);
        });

        it('should #inverse provided matrix if provided, not affect current matrix', function() {
            var m = new matrix(), m2 = new matrix();

            m2.read([1,0,2,3,
                     2,4,0,0,
                     0,3,6,1,
                     5,1,1,4]);

            // expected:
//            -0.55 -0.19  0.12  0.39
//             0.28  0.34 -0.06 -0.19
//            -0.25 -0.20  0.23  0.13
//             0.69  0.20 -0.19 -0.22

            m.inverse(m2);

            expect(m[0][0]).to.be(0);
            expect(round2dig(m2[0][0])).to.be(-0.55);
            expect(round2dig(m2[1][1])).to.be(0.34);
        });

        it('should calculate determinant for 4x4 matrix', function() {
            var m = new matrix();

            expect(m.det4x4(1,0,2,3,
                            2,4,0,0,
                            0,3,6,1,
                            5,1,1,4)).to.be(-166);

        });

        it('should calculate determinant for 3x3 matrix', function() {
            var m = new matrix();

            expect(m.det3x3(1,0,2,
                            2,4,0,
                            0,3,6)).to.be(36);
        });

        it('should calculate determinant for 2x2 matrix', function() {
            var m = new matrix();

            expect(m.det2x2(1,3,
                            2,4)).to.be(-2);
        });

        it('should multiply matrix by scalar', function() {
            var m = new matrix(), m2;

            m.read([1, 2, 3, 4,
                    5, 6, 7, 8,
                    9, 10,11,12,
                    13,14,15,16]);
            m2 = new matrix(m);
            m2.mul(m2, 2);

            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 4; x++) {
                    expect(m2[y][x]).to.be(m[y][x]*2);
                }
            }
        });

        it('should expose static #makeTranslation that creates a translation matrix', function() {
            var v = new vec3(1,2,3),
                m;

            m = matrix.makeTranslation(v);
            expect(m[0][0]).to.be(1);
            expect(m[1][1]).to.be(1);
            expect(m[2][2]).to.be(1);
            expect(m[3][3]).to.be(1);

            expect(m[0][3]).to.be(1);
            expect(m[1][3]).to.be(2);
            expect(m[2][3]).to.be(3);
        });

        it('should expose static #makeScale that creates a translation matrix from scalar', function() {
            var m;

            m = matrix.makeScale(3);
            expect(m[0][0]).to.be(3);
            expect(m[1][1]).to.be(3);
            expect(m[2][2]).to.be(3);
            expect(m[3][3]).to.be(1);
        });

        it('should expose static #makeScale that creates a translation matrix from vec3', function() {
            var m, v = new vec3(1,2,3);

            m = matrix.makeScale(v);
            expect(m[0][0]).to.be(1);
            expect(m[1][1]).to.be(2);
            expect(m[2][2]).to.be(3);
            expect(m[3][3]).to.be(1);
        });

        it('should expose static #makeXRotation that creates a x-rotation matrix', function() {
            var m;

            m = matrix.makeXRotation(45);
            expect(m).to.be.a(matrix);
            // TODO how to test this properly?
        });

        it('should expose static #makeYRotation that creates a y-rotation matrix', function() {
            var m;

            m = matrix.makeYRotation(45);
            expect(m).to.be.a(matrix);
            // TODO how to test this properly?
        });

        it('should expose static #makeZRotation that creates a z-rotation matrix', function() {
            var m;

            m = matrix.makeZRotation(45);
            expect(m).to.be.a(matrix);
            // TODO how to test this properly?
        });

        it('should expose static #makeAxisRotation that creates a rotation matrix', function() {
            var m;

            m = matrix.makeAxisRotation(new vec3(1,2,3), 45);
            expect(m).to.be.a(matrix);
            // TODO how to test this properly?
        });

        it('should expose #transform that transforms a vec2 point with the matrix', function() {
            var m = new matrix(), v2 = new vec2(2,3), vres;

            m.read([1,0,2,3,
                    2,4,0,0,
                    0,3,6,1,
                    5,1,1,4]);

            m.transform(v2);

            /*
            zeros of v2 are implicit
            | 1 0 2 3 | |2|    |7 |
            | 2 4 0 0 | |3|    |16|
            | 0 3 6 1 | |1|  =
            | 5 1 1 4 | |1|
             */


            expect(v2).to.be.a(vec2); // does not affect it's type
            expect(v2[0]).to.be(7);
            expect(v2[1]).to.be(16);

        });

        it('should expose #transform that transforms a vec3 point with the matrix', function() {
            var m = new matrix(), v2 = new vec3(2,3,4);

            m.read([1,0,2,3,
                2,4,0,0,
                0,3,6,1,
                5,1,1,4]);

            m.transform(v2);

            /*
             zeros of v2 are implicit
             | 1 0 2 3 | |2|    |13|
             | 2 4 0 0 | |3|    |16|
             | 0 3 6 1 | |4|  = |34|
             | 5 1 1 4 | |1|
             */


            expect(v2).to.be.a(vec3); // does not affect it's type
            expect(v2[0]).to.be(13);
            expect(v2[1]).to.be(16);
            expect(v2[2]).to.be(34);

        });

        it('should expose #transform that transforms a vec4 point with the matrix', function() {
            var m = new matrix(), v2 = new vec4(2,3,4,5);

            m.read([1,0,2,3,
                2,4,0,0,
                0,3,6,1,
                5,1,1,4]);

            m.transform(v2);

            /*
             zeros of v2 are implicit
             | 1 0 2 3 | |2|    |25|
             | 2 4 0 0 | |3|    |16|
             | 0 3 6 1 | |4|  = |38|
             | 5 1 1 4 | |5|    |37|
             */


            expect(v2).to.be.a(vec4); // does not affect it's type
            expect(v2[0]).to.be(25);
            expect(v2[1]).to.be(16);
            expect(v2[2]).to.be(38);
            expect(v2[3]).to.be(37);

        });


        it('should expose #transformDirection that transforms a vec4 point with the matrix and ignore translation', function() {
            var m = new matrix(), v2 = new vec3(2,3,4);

            m.read([1,0,2,3,
                2,4,0,0,
                0,3,6,1,
                5,1,1,4]);

            m.transformDirection(v2);

            /*
             zeros of v2 are implicit
             | 1 0 2 3 | |2|    |10|
             | 2 4 0 0 | |3|    |16|
             | 0 3 6 1 | |4|  = |33|
             | 5 1 1 4 | |0|
             */


            expect(v2).to.be.a(vec3); // does not affect it's type
            expect(v2[0]).to.be(10);
            expect(v2[1]).to.be(16);
            expect(v2[2]).to.be(33);

        });

        it('should #read fill matrix with array values', function() {
            var m = new matrix(),
                vals = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
            m.read(vals);

            for (var x=0; x<4; x++) {
                for (var y=0; y<4; y++) {
                    expect(m[x][y]).to.be(vals[x*4+y]);
                }
            }
        });

        it('should #read3x3 fill matrix with array values and pad 1s', function() {
            var m = new matrix(),
                vals = [[2,3,4], [5,6,7], [8,9,10]];
            m.read3x3(vals);

            for (var y = 0,posY=0; y < 4; y++) {
                if (y == 2) continue;
                for (var x = 0,posX=0; x < 4; x++) {
                    if (x == 2) continue;
                    expect(m[y][x]).to.be(vals[posY][posX]);
                    posX++;
                }
                posY++;
            }

            for (var x=0; x<4; x++) {
                expect(m[2][x]).to.be(0);
                expect(m[x][2]).to.be(0);
            }

        });



    });
});