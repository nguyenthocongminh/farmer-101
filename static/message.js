function getMessage(fruit, probability) {
    /** [1] > 0.9
     *  [2] 0.75
     *  [3] 0.4
     *  ... Không kết luận
     * @type {string[][]}
     */
    let color = {
        'Apple': '#ff6767',
        'Banana': '#eeea1c',
        'Orange': '#fe9c00',
        'Grape': '#bb63dd',
        'Pineapple': '#b89858',
    };

    let trans = {
        'Apple': 'Táo',
        'Banana': 'Chuối',
        'Orange': 'Cam',
        'Grape': 'Nho',
        'Pineapple': 'Dứa',
    };

    let fruit_html = '<span class="font-weight-bold" style="color: ' + color[fruit] + '">' + trans[fruit] + '</span>';

    let callback_message = [
        [
            'Khá là chắc kèo, ' + fruit_html + ' đây rồi!',
            'Chắc chắn là ' + fruit_html + ", làm sao mà sai được!",
            fruit_html + ', tôi đã lừa anh em bao giờ chưa?'
        ],
        [
            'Có khả năng cao đây là ' + fruit_html + '...',
            fruit_html + ', chắc là thế...',
            'Có vẻ đây là ' + fruit_html + '...',
        ],
        [
            'Hình như đây là ' + fruit_html + ', đúng không?',
            'Có phải ' + fruit_html + ' đây không?',
            fruit_html + ', phải không ta?',
        ],
        [
            'Xin lỗi, cái này nằm ngoài khả năng của tôi...',
            'Hình như có gì đó sai sai...',
            'Anh em đưa cái gì cho tôi thế này?'
        ]
    ];

    let mess_case = Math.floor(Math.random() * Math.floor(3));

    if (probability > 0.9) {
        return callback_message[0][mess_case];
    }
    if (probability > 0.75) {
        return callback_message[1][mess_case];
    }
    if (probability > 0.4) {
        return callback_message[2][mess_case];
    }
    return callback_message[3][mess_case];
}