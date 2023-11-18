const url = 'http://localhost:5000/upload'

function showImage(input) {
    var image = document.getElementById('uploadedImage');
    image.src = URL.createObjectURL(input.files[0]);
    var drop = document.getElementById('dropArea');
    drop.style.display = "none";
    drop.style.marginTop = "0px";
    drop.style.marginBottom = "0px";
    image.style.width = "224px";
    image.style.height = "224px";
    image.style.marginInline = "auto";
    image.style.marginTop = "50px";
    image.style.marginBottom = "50px";
    image.style.padding = "20px";
    image.style.border = "2px dashed #54838E";
    image.style.alignContent = "center";
    image.style.display = "grid";
    image.style.textAlign = "center";
    var container = document.getElementById('uploadedImageContainer');
    container.style.display = "block";
}

function triggerFileInput() {
    var input = document.getElementById('imageInput');
    input.click();
}

function handleFileSelect() {
    var input = document.getElementById('imageInput');
    var dropArea = document.getElementById('dropArea');
    var file = input.files[0];

    if (file) {
        // Update the drop area text
        dropArea.innerHTML = '<p>' + file.name + '</p>';
    }

    showImage(input);
}

function handleDragOver(event) {
    event.preventDefault();
    var dropArea = document.getElementById('dropArea');
    dropArea.style.border = '2px dashed #aaa';
}

function handleDrop(event) {
    event.preventDefault();
    var dropArea = document.getElementById('dropArea');
    var input = document.getElementById('imageInput');
    
    // Update the drop area text
    dropArea.innerHTML = '<p>' + event.dataTransfer.files[0].name + '</p>';

    // Update the input element with the dropped file
    input.files = event.dataTransfer.files;

    // Reset the drop area border
    dropArea.style.border = '2px dashed #54838E';

    showImage(input);
}

async function getInfo() {
    var image = document.getElementById('uploadedImage');
    var model = await tf.loadLayersModel('./modelo_reducido/model.json');

    // Check if a file is selected
    if (image) {
        let tensorImg = tf.browser.fromPixels(image).resizeNearestNeighbor([150, 150]).toFloat().expandDims();
        prediction = await model.predict(tensorImg).data();
    } else {
        // Handle case when no file is selected
        alert('Selecciona una imagen para obtener información.');
    }
}