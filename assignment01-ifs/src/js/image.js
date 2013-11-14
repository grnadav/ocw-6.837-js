define([
    'vec3'
],
    function (vec3) {

        var image = (function () {
            var constr = function (/*number*/width, /*number*/height) {
                this._width = width;
                this._height = height;

                this.data = [];
                for (var x = 0; x < width * height; x++) {
                    this.data[x] = new vec3();
                }
            };

            // ACCESSORS
            function width() {
                return this._width;
            }

            function height() {
                return this._height;
            }

            function getPixel(/*number*/x, /*number*/y) {
                return this.data[y * this._width + x];
            }

            // =========
            // MODIFIERS
            function setAllPixels(/*vec3*/color) {
                var colorCopy = new vec3(color);
                for (var i = 0; i < this._width * this._height; i++) {
                    this.data[i] = colorCopy;
                }
            }

            function setPixel(/*number*/
                              x, /*number*/
                              y, /*vec3*/
                              color) {
                var colorCopy = new vec3(color);
                this.data[y * this._width + x] = colorCopy;
            }

// ===========
// LOAD & SAVE
//            static
//            Image * LoadPPM(
//            const char
//            *
//            filename
//            )
//            ;
//            void SavePPM(
//            const char
//            *
//            filename
//            )
//            const ;
//            static
//            Image * LoadTGA(
//            const char
//            *
//            filename
//            )
//            ;
//            void SaveTGA(
//            const char
//            *
//            filename
//            )
//            const ;

            constr.prototype = {
                constructor: image,

                width: width,
                height: height,
                getPixel: getPixel,
                setAllPixels: setAllPixels,
                setPixel: setPixel
            };

            return constr;

        })();

        return image;
    }
);