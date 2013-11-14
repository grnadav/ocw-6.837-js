require.config({
    baseUrl: "src/js"
});
require([
    'fileHandler',
    'matrix',
    'ifs',
    'canvasRenderer'
], function(fileHandler, matrix, ifs, canvasRenderer) {
    var isFileLoadedSuccesfully = false;

    var numMat, probs, mats;

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

        // first line is number if matrices
        var splitContent = content.split('\n'),
            tmpLines = [],
            tmpLine,
            i, x, y, line= 1, mtx;

        numMat = parseInt(content[0]);
        probs = [];
        mats = [];

        // read probabilities and matrices
        for (i=0; i<numMat; i++) {
            // get probability of matrix
            probs.push(+splitContent[line]);
            line++;

            // 3 lines of matrix ahead. each is: x.xx y.yy z.zz
            mtx = new matrix();
            for (x=0; x<3; x++,line++) {
                tmpLine = splitContent[line].split(' ');
                for (y=0; y<3; y++) {
                    // convert string val to number
                    tmpLine[y] = +tmpLine[y];
                }
                tmpLines[x] = tmpLine;
            }
            mtx.read3x3(tmpLines);
            mtx.write3x3();
            mats.push(mtx);
        }

    }

    function build() {
        if (!isFileLoadedSuccesfully) {
            alert('load file first');
        }

        var ifsImage = new ifs(numMat, probs, mats),
            points = +document.querySelector('#points-input').value,
            iterations = +document.querySelector('#iterations-input').value;

        var img = ifsImage.renderImage(500,500, points, iterations, drawImage);
    }

    function drawImage(image) {
        var canvasEl = document.querySelector('#output'),
            cvRenderer = new canvasRenderer(canvasEl);

        cvRenderer.render(image);
    }
});