define([
    'matrix'
], function(matrix) {
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



    });
});