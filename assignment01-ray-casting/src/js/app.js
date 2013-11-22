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


//        var count = 0;
        for (x = 0; x < 1; x += 1 / size) {
            for (y = 0; y < 1; y += 1 / size) {
                hit = new Hit(Infinity, scene.getBackgroundColor());
                ray = scene.getCamera().generateRay(new Vec2(x, y));
                scene.getGroup().intersect(ray, hit);
                color = hit.getColor();
                t = hit.getT();
//                if (t !== Infinity) {
//                    console.log('t:'+t + ' color: '+color.write());
//                    count++;
//                }
                if (isDepthImage) {
                    if (t >= depthImageMin && t <= depthImageMax) {
                        tDepth = parseInt((depthImageMax - t) / depthMinMax * 255);
                        color = new Vec3(tDepth, tDepth, tDepth);
                    } else {
                        color = new Vec3(scene.getBackgroundColor());
                    }

                }
                image.setPixel(parseInt(x * size), parseInt(y * size), new Vec3(color));
            }
        }

//        console.log('count:' + count);
        cvRenderer.render(image);
    }

});