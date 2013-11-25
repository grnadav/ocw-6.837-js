require.config({
    baseUrl: "src/js"
});
require([
    'fileHandler',
    'sceneParser',
    'matrix',
    'image',
    'vec2',
    'vec3',
    'hit',
    'canvasRenderer'
], function (fileHandler, sceneParser, matrix, Image, Vec2, Vec3, Hit, canvasRenderer) {
    var isFileLoadedSuccesfully = false;

    var scene;

    document.querySelector('#file-input-load-button').addEventListener('click', loadFile);
    document.querySelector('#build').addEventListener('click', build);

    function loadFile() {
        fileHandler.loadFile(document.querySelector('#file-input'), fileLoaded);
    }

    function fileLoaded(content) {
        if (content) {
            // TODO make sure content is valid first
            isFileLoadedSuccesfully = true;
        }

        scene = new sceneParser(content);

    }

    function build() {
        if (!isFileLoadedSuccesfully) {
            alert('load file first');
        }

        var x, y, ray, hit,
            size = +document.querySelector('#size-input').value,
            image = new Image(size, size),
            canvasEl = document.querySelector('#output'),
            cvRenderer = new canvasRenderer(canvasEl),
            color, t, tDepth,
            isDepthImage = document.querySelector('#is-depth-image-input').checked,
            depthImageMin = +document.querySelector('#is-depth-true-min-input').value,
            depthImageMax = +document.querySelector('#is-depth-true-max-input').value,
            depthMinMax = depthImageMax - depthImageMin;


        var wx, wy;
        for (x = 0; x < size; x++) {
            for (y = 0; y < size; y++) {
                wx = x/size;
                wy = y/size;

                hit = new Hit(Infinity, scene.getBackgroundColor());
                ray = scene.getCamera().generateRay(new Vec2(wx, wy));
                scene.getGroup().intersect(ray, hit);

                color = hit.getColor();
                if (isDepthImage) {
                    t = hit.getT();
                    tDepth = parseInt((depthImageMax - t) / depthMinMax * 255);
                    if (tDepth > 255) tDepth = 255;
                    if (tDepth < 0) tDepth = 0;
                    color = new Vec3(tDepth, tDepth, tDepth);
                }
                image.setPixel(x, y, color);
            }
        }

        cvRenderer.render(image);
    }

});