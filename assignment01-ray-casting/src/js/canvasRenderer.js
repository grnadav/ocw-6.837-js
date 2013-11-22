define([],
    function () {

        var canvasRenderer = (function () {
            var constr = function(canvasEl) {
                this.canvas = canvasEl;
                this.ctx = this.canvas.getContext('2d');

                // 6300 - Rotem Barak, stills only - maybe 6000
                // video - shooting 2 weeks before 4300
            };

            function setCanvasSize(width, height) {
                this.canvas.setAttribute('width', width+'px');
                this.canvas.setAttribute('height', height+'px');
            }

            function clear(width, height) {
                this.ctx.fillStyle = "white";
                this.ctx.fillRect(0, 0, width, height);
            }

            function setPixel(x,y,colorVec) {
                var colorStr = 'rgb('+colorVec.r()+','+colorVec.g()+','+colorVec.b()+')';
                this.ctx.fillStyle = colorStr;
                this.ctx.fillRect(x, y, 1, 1);
            }

            function render(image) {
                var x, y, pixel,
                    width = image.width(), height = image.height();
                setCanvasSize.call(this, width, height);
                clear.call(this, width, height);
                for (x=0; x<width; x++) {
                    for (y=0; y<height; y++) {
                        pixel = image.getPixel(x,y);
                        setPixel.call(this, x,y, pixel);
                    }
                }
            }

            constr.prototype = {
                constructor: canvasRenderer,

                render: render
            }

            return constr;

        })();

        return canvasRenderer;
    }
);