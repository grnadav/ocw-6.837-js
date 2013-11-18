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

        it('should generate rays', function() {
            var center = new vec3(0,0,0),
                up = new vec3(0,1,0),
                direction = new vec3(0,0,1),
                size = 3,
                orthCam = new orthographicCamera(center, direction, up, size),
                point = new vec2(0,0),
                ray;

            ray = orthCam.generateRay(point);

            expect(ray.getOrigin().x()).to.be(1.5);
            expect(ray.getOrigin().y()).to.be(-1.5);
            expect(ray.getOrigin().z()).to.be(0);

            expect(ray.getDirection().x()).to.be(0);
            expect(ray.getDirection().y()).to.be(0);
            expect(ray.getDirection().z()).to.be(1);
        });

        it('should generate rays and normalize input', function() {
            var center = new vec3(0,0,0),
                up = new vec3(0,4,0),
                direction = new vec3(0,0,6),
                size = 3,
                orthCam = new orthographicCamera(center, direction, up, size),
                point = new vec2(0,0),
                ray;

            ray = orthCam.generateRay(point);

            expect(ray.getOrigin().x()).to.be(1.5);
            expect(ray.getOrigin().y()).to.be(-1.5);
            expect(ray.getOrigin().z()).to.be(0);

            expect(ray.getDirection().x()).to.be(0);
            expect(ray.getDirection().y()).to.be(0);
            expect(ray.getDirection().z()).to.be(1);
        });

    });
});