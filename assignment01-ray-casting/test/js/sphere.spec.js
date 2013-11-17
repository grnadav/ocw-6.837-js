define([
    'vec3',
    'ray',
    'hit',
    'object3d',
    'sphere'
], function (vec3, ray, hit, object3d, sphere) {

    describe('sphere', function () {
        it('should inherit from object3d', function () {
            var s = new sphere(new vec3(), 1, new vec3());
            expect(s).to.be.a(object3d);
            expect(s).to.be.a(sphere);
        });

        it('should detect intersection with ray and update hit', function () {
            var center = new vec3(0, 0, 0),
                radius = 1,
                color = new vec3(10, 11, 12),
                spr = new sphere(center, radius, color),
                direction = new vec3(1, 0, 0),
                origin = new vec3(-3, 0, 0),
                hit1 = new hit(),

                ray1 = new ray(direction, origin),
                isHit = spr.intersect(ray1, hit1, 0);

                expect(isHit).to.be(true);
                expect(hit1.getT()).to.be(2);
                expect(hit1.getColor().r()).to.be(10);
                expect(hit1.getColor().g()).to.be(11);
                expect(hit1.getColor().b()).to.be(12);
        });

        it('should detect non-intersection with ray and not update hit', function () {
            var center = new vec3(0, 0, 0),
                radius = 1,
                color = new vec3(10, 11, 12),
                spr = new sphere(center, radius, color),
                direction = new vec3(-1, 0, 0),
                origin = new vec3(-3, 0, 0),
                hit1 = new hit(),

                ray1 = new ray(direction, origin),
                isHit = spr.intersect(ray1, hit1, 0);

            expect(isHit).to.be(false);
            expect(hit1.getT()).to.be(Infinity);
        });

    });
});