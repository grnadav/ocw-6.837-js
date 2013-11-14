define([
    'matrix',
    'vec2',
    'vec3',
    'image'
],
    function (matrix, vec2, vec3, image) {

        var ifs = (function () {
            var constr = function(n, probs, matrices) {
                this.n = n;
                this.probs = probs;
                this.matrices = matrices;

                this.stats = [];
                for (var i=0; i<n; i++) this.stats[i]=0;
            };

            function renderImage(width, height, points, iterations, progressCb) {
                var img = new image(width, height),
                    randMat, point, color = new vec3(200,200,200);

                progressCb = progressCb || (function() {});

//                For a number of random points (x0, y0)
//                    For k=0 to big_number
//                        Pick a random i between 0 and n-1
//                            (xk+1, yk+1)=fi(xk, yk)
//                            Display a dot at (xk, yk)

                for (var pts=0;pts<points; pts++) {
                    point = getRandomPoint();
                    for (var iters=0;iters<iterations; iters++) {
                        randMat = getRandomMatrix.call(this);
                        randMat.transform(point);
                    }
                    img.setPixel(parseInt(point.x()*width), parseInt(point.y()*width), color);
                    // report progress every 10%
//                    if (pts%(points/10) === 0) {
//                        progressCb(img);
//                    }
                }

                progressCb(img);
                console.log(this.stats);
                return img;
            }

            function getRandomPoint() {
                return new vec2(Math.random(), Math.random());
            }

            function getRandomMatrix() {
                var rand = Math.random(),
                    sum = 0,
                    i;

                for (i=0; i<this.n; i++) {
                    sum += this.probs[i];
                    if (rand < sum) {
                        this.stats[i]++;
                        return this.matrices[i];
                    }
                }
            }

            constr.prototype = {
                constructor: ifs,

                renderImage: renderImage
            };

            return constr;

        })();

        return ifs;
    }
);