define([
    'vectors',

    'vec2'
], function(vectors, vec2) {
    describe('vectors', function() {
        it('should expose vec2 constructor', function() {
            expect(vectors.vec2).to.be(vec2);
        });
    });
});