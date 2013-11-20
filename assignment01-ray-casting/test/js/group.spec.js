define([
    'vec3',
    'ray',
    'hit',
    'object3d',
    'sphere',
    'group'
], function (vec3, ray, hit, object3d, sphere, group) {

    describe('group', function () {
        it('should inherit from object3d', function () {
            var s = new group(2);
            expect(s).to.be.a(object3d);
            expect(s).to.be.a(group);
        });

        it('should detect no intersection when there is zero objects in the group', function() {
            var gr = new group(0),
                direction = new vec3(1, 0, 0),
                origin = new vec3(-3, 0, 0),
                ray1 = new ray(direction, origin),
                hit1 = new hit();

            var isIntersect = gr.intersect(ray1, hit1, 0);

            expect(isIntersect).to.be(false);
        });

        it('should detect intersection when there is a single objects in the group', function() {
            var gr = new group(1),

                center = new vec3(0, 0, 0),
                radius = 1,
                color = new vec3(10, 11, 12),
                spr = new sphere(center, radius, color),
                direction = new vec3(1, 0, 0),
                origin = new vec3(-3, 0, 0),
                hit1 = new hit(),

                ray1 = new ray(direction, origin),
                isHit;

            gr.addObject(0, spr);
            isHit = gr.intersect(ray1, hit1, 0);

            expect(isHit).to.be(true);
            expect(hit1.getT()).to.be(2);
            expect(hit1.getColor().r()).to.be(10);
            expect(hit1.getColor().g()).to.be(11);
            expect(hit1.getColor().b()).to.be(12);
        });

        it('should detect intersection when there is are 2 objects in the group', function() {
            var gr = new group(1),

                center = new vec3(0, 0, 0),
                radius = 1,
                color = new vec3(10, 11, 12),
                spr = new sphere(center, radius, color),

                center1 = new vec3(4, 0, 0),
                radius1 = 1,
                color1 = new vec3(13, 14, 15),
                spr1 = new sphere(center1, radius1, color1),

                direction = new vec3(1, 0, 0),
                origin = new vec3(-3, 0, 0),
                hit1 = new hit(),

                ray1 = new ray(direction, origin),
                isHit;

            gr.addObject(0, spr);
            gr.addObject(0, spr1);
            isHit = gr.intersect(ray1, hit1, 0);

            expect(isHit).to.be(true);
            expect(hit1.getT()).to.be(2);
            expect(hit1.getColor().r()).to.be(10);
            expect(hit1.getColor().g()).to.be(11);
            expect(hit1.getColor().b()).to.be(12);
        });

    });
});