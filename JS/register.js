//language=JQuery-CSS
/**
 * Created by aorla on 16.09.2017.
 */
"use strict";
licence();

// обработка ответа не работает
// $(document).ready(function() {
//     $('html').on('submit', 'form', function() {
//         $(this).html('Идет обработка данных, пожалуйста подождите');
//         $.post($(this).attr('action'), $(this).serialize()).done(function(data) {
//             var data = JSON.parse(data);
//             $(this).html(data.message);
//         })
//         return false;
//     })
// });


// Проверка чекбокса
function licence() {
    $('#button').on('click', function () {
        if ($("#agree").is(':checked')) {
            return true;
        }
        else {
            window.alert('Дайте свое согласие на обработку данных!');
            return false;
        }
    });
}
