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
    });
});