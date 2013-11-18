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



    });
});