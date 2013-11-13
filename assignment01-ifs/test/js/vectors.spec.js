define([
    'vectors',

    'vec2',
    'vec3'
], function(vectors, vec2, vec3) {
    describe('vectors', function() {
        it('should expose vec2 constructor', function() {
            expect(vectors.vec2).to.be(vec2);
        });

        it('should expose vec3 constructor', function() {
            expect(vectors.vec3).to.be(vec3);
        });
    });
});