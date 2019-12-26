(function () {
    let form = $("form#predict-form");
    let resultHolder = document.getElementById("result");
    let label_placeholder = document.getElementById("label-img-placeholder");

    let loadingImg = document.getElementById('loading');
    let loadingImgHolder = document.createElement('div');
    loadingImgHolder.className = 'css-loading-img';
    loadingImgHolder.innerHTML = '<img src="' + loadingImg.src + '">';

    let canvas = document.getElementById('preview');
    let context = canvas.getContext("2d");
    let file_input = document.getElementById('image'); // input file
    let img = new Image();

    file_input.onchange = function (evt) {
        resultHolder.innerHTML = 'Đang chờ ... ';

        let files = evt.target.files; // FileList object
        let file = files[0];
        if (file.type.match('image.*')) {
            label_placeholder.innerText = file.name;
            let reader = new FileReader();
            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
            reader.onload = function (evt) {
                if (evt.target.readyState == FileReader.DONE) {
                    img.src = evt.target.result;
                    let size = 500;
                    img.onload = function (e) {
                        if (img.height > img.width) {
                            size = 300;
                        }
                        let ratio = img.width / img.height;
                        context.canvas.width = size;
                        context.canvas.height = size / ratio;
                        context.drawImage(img, 0, 0, size, size / ratio);
                        resultHolder.scrollIntoView();
                    }
                }
                form.submit();
            }
        } else {
            alert("not an image");
        }
    };

    form.submit(function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        let url = $(this).attr('action');
        resultHolder.innerHTML = loadingImgHolder.outerHTML;

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            success: function (data) {
                if (data['success']) {
                    let out_result = '<p>' + getMessage(data['highest_probability'][0], data['highest_probability'][1]) + '</p>';
                    out_result += '<p>( ' + data['highest_probability'][1] + ' )</p>';

                    resultHolder.innerHTML = out_result;
                } else {
                    resultHolder.innerHTML = 'Có lỗi xảy ra, hãy thử lại';
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
})();