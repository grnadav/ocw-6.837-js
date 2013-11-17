define([
    'vec2'
], function(vec2) {
    describe('vec2', function() {
        it('should create a vec2 class with number values', function() {
            var v1 = new vec2(0,1);
            expect(v1[0]).to.be(0);
            expect(v1[1]).to.be(1);
        });

        it('should create a vec2 class without values as 0 vector', function() {
            var v1 = new vec2();
            expect(v1[0]).to.be(0);
            expect(v1[1]).to.be(0);
        });

        it('should create a vec2 class with another vector', function() {
            var v1 = new vec2(1,2),
                v2 = new vec2(v1);
            expect(v2[0]).to.be(1);
            expect(v2[1]).to.be(2);
        });

        it('should create a vec2 class with 2 other vectors, as subtraction vector', function() {
            var v1 = new vec2(6,8),
                v2 = new vec2(1,2),
                v3 = new vec2(v1,v2);
            expect(v3[0]).to.be(5);
            expect(v3[1]).to.be(6);
        });

        it('should expose "x" function as value[0]', function() {
            var v1 = new vec2(0,1);
            expect(v1.x()).to.be(0);
        });

        it('should expose "y" function as value[1]', function() {
            var v1 = new vec2(0,1);
            expect(v1.y()).to.be(1);
        });

        it('should expose "length" function as length of vector', function() {
            var v1 = new vec2(3,4);
            expect(v1.length()).to.be(5);
        });

        it('should expose "set" function as setter', function() {
            var v1 = new vec2(3,4);
            v1.set(1,2);
            expect(v1[0]).to.be(1);
            expect(v1[1]).to.be(2);
        });

        it('should expose "scale" function as linear scaling', function() {
            var v1 = new vec2(3,4);
            v1.scale(2,3);
            expect(v1[0]).to.be(6);
            expect(v1[1]).to.be(12);
        });

        it('should expose "divide" function as linear dividing', function() {
            var v1 = new vec2(2,6);
            v1.divide(2,3);
            expect(v1[0]).to.be(1);
            expect(v1[1]).to.be(2);
        });

        it('should expose "negate" function as vector negation', function() {
            var v1 = new vec2(2,3);
            v1.negate();
            expect(v1[0]).to.be(-2);
            expect(v1[1]).to.be(-3);
        });

        it('should expose "dot2" function as vector linear multiplication', function() {
            var v1 = new vec2(2,3),
                v2 = new vec2(3,4);

            var mul = v1.dot2(v2);
            expect(mul).to.be(18);
        });

        it('should expose "add" static function as vector addition into third vector', function() {
            var v1 = new vec2(2,3),
                v2 = new vec2(3,4);

            var v3 = new vec2();
            vec2.add(v3, v1,v2);
            expect(v3[0]).to.be(5);
            expect(v3[1]).to.be(7);
        });

        it('should expose "sub" static function as vector sub into third vector', function() {
            var v1 = new vec2(2,3),
                v2 = new vec2(3,4);

            var v3 = new vec2();
            vec2.sub(v3, v1,v2);
            expect(v3[0]).to.be(-1);
            expect(v3[1]).to.be(-1);
        });

        it('should expose "copyScale" static function as copy and scalar multiplication into third vector', function() {
            var v1 = new vec2(2,3);

            var v3 = new vec2();
            vec2.copyScale(v3, v1, 2);
            expect(v3[0]).to.be(4);
            expect(v3[1]).to.be(6);
        });

        it('should expose "addScale" static function as copy and scalar multiplication and addition into third vector', function() {
            var v1 = new vec2(2,3),
                v2 = new vec2(4,5);

            var v3 = new vec2();
            vec2.addScale(v3, v1, v2, 2);
            expect(v3[0]).to.be(10);
            expect(v3[1]).to.be(13);
        });

        it('should expose "average" static function as copy and average of 2 vectors into third vector', function() {
            var v1 = new vec2(2,3),
                v2 = new vec2(4,5);

            var v3 = new vec2();
            vec2.average(v3, v1, v2);
            expect(v3[0]).to.be(3);
            expect(v3[1]).to.be(4);
        });

        it('should expose "weightedSum" static function as copy and weighed sum of 2 vectors into third vector', function() {
            var v1 = new vec2(2,3),
                v2 = new vec2(4,5);

            var v3 = new vec2();
            vec2.weightedSum(v3, v1, 2, v2, 3);
            expect(v3[0]).to.be(16);
            expect(v3[1]).to.be(21);
        });

        it('should expose "write" function as printer of vector to console.log', function() {
            var v1 = new vec2(2,3),
                origConsole = console.log,
                printed;

            console.log = function() {
                printed = Array.prototype.slice.call(arguments).join(',');
            }

            v1.write();
            expect(printed).to.eql('2,3');

            console.log = origConsole;
        });
    });
});