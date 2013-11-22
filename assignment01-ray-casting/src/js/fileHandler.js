define([], function () {

    // code taken originally from here:
    // http://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/

    /**
     * Remove event's element
     * @private
     * @param {HTMLEvent} event
     */
    function destroyClickedElement(event) {
        document.body.removeChild(event.target);
    }

    /**
     * Save content to file and download it
     * @public
     * @param {string} blob - what to write in the file
     * @param {string} type - file type, e.g. 'text.plain', or 'image/png'
     * @param {string} fileNameToSaveAs
     */
    function saveAsFile(blob, type, fileNameToSaveAs) {
        type = type || 'image/png';
        var textFileAsBlob = new Blob([blob], {type: type});

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();
    }

    /**
     * Load file contents
     * @public
     * @param {HTMLElement} fileInputEl - HTML file input element
     * @param {function} cb - callback function(fileContent)
     * @returns {boolean} - false if requirements not met, else true
     */
    function loadFile(fileInputEl, cb) {
        if (!fileInputEl || !fileInputEl.files || !fileInputEl.files[0] || !cb) {
            return false;
        }
        var fileToLoad = fileInputEl.files[0];

        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            cb(textFromFileLoaded);
        };
        fileReader.readAsText(fileToLoad, "UTF-8");
        return true;
    }

    return {
        saveAsFile: saveAsFile,
        loadFile: loadFile
    };
});