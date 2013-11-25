define([
    'vec3',
    'group',
    'orthographicCamera',
    'sphere'
],
    function (Vec3, Group, OrthographicCamera, Sphere) {

        var sceneParser = (function () {

            var constr = function (fileContents) {

                // initialize some reasonable default values
                this.group = null;
                this.camera = null;
                this.background_color = new Vec3(0.5, 0.5, 0.5);
//                this.lights = null;
//                this.num_lights = 0;
                this.current_object_color = new Vec3(1, 1, 1);
                //This javascript replaces all 3 types of line breaks with a space
                fileContents = fileContents.replace(/(\r\n|\n|\r)/gm," ");
                //Replace all double white spaces with single spaces
                fileContents = fileContents.replace(/\s+/g," ");
                this.fileContentsSplit = fileContents.split((' '));

                parseScene.call(this);

            };

            constr.prototype.constructor = sceneParser;

            // ACCESSORS
            constr.prototype.getGroup = function () {
                return this.group;
            }
            constr.prototype.getCamera = function () {
                return this.camera;
            }
            constr.prototype.getBackgroundColor = function () {
                return this.background_color;
            }

            function parseScene() {
                //
                // at the top level, the scene can have a camera,
                // background color and a group of objects
                // (we will add lights and other things in future assignments)
                //
                var tokenObj = {}, result,
                    tokens = {
                        "OrthographicCamera": parseOrthographicCamera,
//                        "PerspectiveCamera": "parsePerspectiveCamera",
                        "Background": parseBackground,
//                        "Lights": "parseLights",
                        "Group": parseGroup
                    };
                while (getToken.call(this,tokenObj)) {
                    if (tokens.hasOwnProperty(tokenObj.token)) {
                        result = tokens[tokenObj.token].call(this);
                        if (tokenObj.token === "Group") {
                            this.group = result;
                        }
                    } else {
                        if (tokenObj.token === '') continue;
                        console.error("Unknown token in parseFile: " + tokenObj.token);
                    }
                }
            }

            function getToken(tokenObj) {
                if (this.fileContentsSplit.length > 0) {
                    tokenObj.token = this.fileContentsSplit.splice(0, 1)[0];
//                    console.log('token: ' + tokenObj.token);
                } else {
                    return 0;
                }
                return 1;
            }

            function readNumber() {
                var t = {};
                if (!getToken.call(this, t)) {
                    assert(false, 'Unable to read number');
                }
                return +t.token;
            }

            function readVec3() {
                var x, y, z;
                x = readNumber.call(this);
                y = readNumber.call(this);
                z = readNumber.call(this);
                return new Vec3(x, y, z);
            }

            function parseGroup() {
                // each group starts with an integer that specifies
                // the number of objects in the group
                //
                // the material node sets the color of all objects which
                // follow, until the next material node
                //
                var tokenObj = {};
                getToken.call(this, tokenObj);
                assert(tokenObj.token === '{');

                // read in the number of objects
                getToken.call(this, tokenObj);
                assert(tokenObj.token !== "numObjects");
                var num_objects = readNumber.call(this);
                var answer = new Group(num_objects);

                // read in the objects
                var count = 0;
                while (num_objects > count) {
                    getToken.call(this, tokenObj);
                    if (tokenObj.token === "Material") {
                        // materials don't count
                        parseMaterial.call(this);
                    } else {
                        // everything else does count
                        var object = parseObject.call(this, tokenObj);
                        assert(object !== null);
                        answer.addObject(count, object);
                        count++;
                    }
                }

                getToken.call(this, tokenObj);
                assert(tokenObj.token === '}');

                return answer;
            }

            function parseObject(tokenObj) {
                var answer = null,
                    tokens = {
                        "Group": parseGroup,
                        "Sphere": parseSphere
//                        ,"Box": "parseBox",
//                        "Plane": "parsePlane",
//                        "Triangle": "parseTriangle",
//                        "TriangleMesh": "parseTriangleMesh",
//                        "Transform": "parseTransform"
                    };

                if (tokens.hasOwnProperty(tokenObj.token)) {
                    answer = tokens[tokenObj.token].call(this);
                } else {
                    assert(false, 'Unknown token in parseObject: ' + tokenObj.token);
                }
                return answer;
            }

            function parseOrthographicCamera() {
                var tokenObj = {};
                // read in the camera parameters
                getToken.call(this, tokenObj);
                assert(tokenObj.token === '{');

                getToken.call(this, tokenObj);
                assert(tokenObj.token === 'center');
                var center = readVec3.call(this);

                getToken.call(this, tokenObj);
                assert(tokenObj.token === 'direction');
                var direction = readVec3.call(this);

                getToken.call(this, tokenObj);
                assert(tokenObj.token === 'up');
                var up = readVec3.call(this);

                getToken.call(this, tokenObj);
                assert(tokenObj.token === 'size');
                var size = readNumber.call(this);

                getToken.call(this, tokenObj);
                assert(tokenObj.token === '}');

                this.camera = new OrthographicCamera(center, direction, up, size);
            }

            function parseBackground() {
                var tokenObj = {};

                // read in the background color
                getToken.call(this, tokenObj);
                assert(tokenObj.token === '{');

                while (true) {
                    getToken.call(this, tokenObj);
                    if (tokenObj.token === '}') {
                        break;
                    } else if (tokenObj.token === 'color') {
                        var color = readVec3.call(this);
                        this.background_color = new Vec3(color.r()*255, color.g()*255, color.b()*255);
                    } else if (tokenObj.token === 'ambientLight') {
                        // assignment 2 stuff
                    } else {
                        assert(false, "Unknown token in parseBackground: "+tokenObj.token);
                    }
                }
            }

            function parseSphere() {
                var tokenObj = {};

                // read in the sphere parameters
                getToken.call(this, tokenObj);
                assert(tokenObj.token === '{');

                getToken.call(this, tokenObj);
                assert(tokenObj.token === 'center');
                var center = readVec3.call(this);

                getToken.call(this, tokenObj);
                assert(tokenObj.token === 'radius');
                var radius = readNumber.call(this);

                getToken.call(this, tokenObj);
                assert(tokenObj.token === '}');

                return new Sphere(center,radius,this.current_object_color);
            }

            function parseMaterial() {
                var tokenObj = {};

                // change the current object color
                // scoping for the materials is very simplistic,
                // and essentially ignores any tree hierarchy
                getToken.call(this, tokenObj);
                assert(tokenObj.token === '{');

                getToken.call(this, tokenObj);
                assert(tokenObj.token === 'diffuseColor');
                var color = readVec3.call(this);
                this.current_object_color = new Vec3(color.r()*255, color.g()*255, color.b()*255);

                getToken.call(this, tokenObj);
                assert(tokenObj.token === '}');
            }

            function assert(condition, message) {
                if (!condition) {
                    throw message || "Assertion failed";
                }
            }

            return constr;
        })();

        return sceneParser;
    }
);