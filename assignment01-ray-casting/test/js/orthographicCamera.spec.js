define([
    'vec2',
    'vec3',
    'camera',
    'orthographicCamera'
], function (vec2, vec3, camera, orthographicCamera) {

    describe('orthographicCamera', function () {
        it('should inherit from camera', function () {
            var s = new orthographicCamera(new vec3(), new vec3(), new vec3(), 0);
            expect(s).to.be.a(camera);
            expect(s).to.be.a(orthographicCamera);
        });

    });
});