/**
 * Created by aorla on 17.09.2017.
 */
"use strict";

// Работа кнопок 'закрыть'
$('.close1').on('click', function () {
    $(".partners").hide(600);
});
$('.close2').on('click', function () {
    $(".percent").hide(600);
    $(".compsByLocation").hide(600);
    $(".close2").hide(600);
});
//


// Получение списка компаний и партнеров
$.getJSON('http://codeit.pro/frontTestTask/company/getList',
    function (data) {
        var k;
        var r = 0;
        for (var i = 0; i < data.list.length; i++) {
            k = 0;
            k = data.list[i].partners.length;
            $('.compsList').append('<li class="listItems">' + data['list'][i].name + '</li>'); //Добавляем список компаний
        }

        for (i = 0; i < data.list.length; i++) {
            k = 0;
            k = data.list[i].partners.length;
            r = r + k;
        }
        r = r + data.list.length;
        $('.totalRound').append('<p class="number">' + r + '</p>');
        $(".totalRound").show();
        $('#loaderfirst').fadeOut(700);
        $('#loaderSecond').fadeOut(700);
        var $set = $('ul li');
        $('.compsList').on('click', '.listItems', function () { //выбрать строку
            var n=$set.index(this);
            $(".partners").show();
            $('.partnersList').empty(); //Очистить результат

            for (var j = 0; j < data.list[n].partners.length; j++) {
                $('.partnersList').append('<div id=item' + j + '></div>');
                        $('#item' + j).append('<p class="partnerName">' + data.list[n].partners[j].name + '</p>');
                        $('#item' + j).append('<p class="shares">' + data.list[n].partners[j].value + '% </p>');
                    }
        });
    });
//


// Вывод списка стран
$.getJSON('http://codeit.pro/frontTestTask/company/getList',
    function (data) { //
        $('.close2').hide(0);
    var countries = [];
        for (var i = 0; i < data.list.length; i++) {
            countries[i] = data.list[i].location.name;
        }
        var code = [];
        code = unique(countries); // убираем одинаковые страны
        for (i = 0; i < code.length; i++) {
            $('.locations').append('<li class="locationItems" id="' + code[i] + '">' + code[i] + '</li>');
        }
        $('#loaderThird').fadeOut(700);
        var $set = $('ul li');
            $('.locationItems').click(function() {
                $('.compsByLocation').empty();
                $('.percent').empty();
                $('.percent').show();
                $(".compsByLocation").show();
                $('.close2').show();
                var location;
                location = $(this).prop('id');
                $('.percent').append('<p class="lowerText">' + location + '</p>'); //
                var count = 0;
                for (var j = 0; j < data.list.length; j++) {
                    if(location === data.list[j].location.name ) {
                        $('.compsByLocation').append('<li>' + data.list[j].name + '</li>');
                        count++; // Считаем количество компаний в стране
                    }
                }
                $('.percent').append('<p class="percentNumber">' + count + '%' + '</p>');
            });
        });
//


// Получение списка новостей
$.getJSON('http://codeit.pro/frontTestTask/news/getList',
    function (data) {
        var inner = $('.carousel-inner');
            for (var i = 0; i < 10; i++) {
            if(i === 0) {
                inner.append('<div class="carousel-item active" id=' + i +  '></div>');
            }
            else {
                inner.append('<div class="carousel-item" id=' + i +  '></div>');
            }
            var item = $('#' + i);
                item.append("<h3>" + data['list'][i].author + "</h3>");
                item.append("<div class='format'>" + data['list'][i].description + "</div>");
                var date = new Date(data['list'][i].date *1000); // Дата в нормалный вид
                item.append("<p class='text'>" + convert(date) + "</p>");
                item.append("<a href='#' class='link'>" + data['list'][i].link + "</a>");
                item.append("<img class='image' src=" + data['list'][i].img +  "</img>");
        }
        $('#loaderFourth').fadeOut(700);
    });
//


// Конвертация даты
function convert(date) {
    var month;
    var year;
    var day;
    month = date.getMonth();
    month = month + 1;
    if (month < 10) month = "0" + month;
    year = date.getFullYear();
    day = date.getDate();
    return day + "/" + month + "/" + year;
}
//


// Сортировка алфавитом
    var isAscOrder = true;
    $('#alphabetSort').click(function () {
        var mylist = $('.partnersList');
        var listitems = mylist.children('div').get();
        listitems.sort(function (a, b) {
            var compA = $(a).text().toUpperCase();
            var compB = $(b).text().toUpperCase();
            return (isAscOrder ? 1 : -1) * ((compA < compB) ? -1 : (compA > compB) ? 1 : 0);
        });
        isAscOrder = !isAscOrder;
        $.each(listitems, function (idx, itm) {
            mylist.append(itm);
        });
    });
//


// Проверка уникальности
function unique(arr) {
    var result = [];
    nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            for (var j = 0; j < result.length; j++) {
                if (result[j] == str) continue nextInput;
            }
            result.push(str);
        }
    return result;
}
//


// Создание графика
$.getJSON('http://codeit.pro/frontTestTask/company/getList',
        function (data) {
            var countries = [];
            for (var i = 0; i < data.list.length; i++) {
                countries[i] = data.list[i].location.code;
            }
            countries = unique(countries); // убираем одинаковые страны
            for(var j = 0; j < countries.length; j++) {
                compsInCountry(countries[j]);
            }
});

function compsInCountry (countryName) {
    var count = 0;
    $.getJSON('http://codeit.pro/frontTestTask/company/getList',
        function (data) {
            for (var i = 0; i < data.list.length ; i++) {
                if (countryName === data.list[i].location.code) {
                    count++;
                }
            }
            $('#chart').append('<div class="percentItem i' + count + '">' + '<p>' + countryName + '</p><p class="num">' + count + '%</p>' +'</div>');
            $('.i' + count).css({"height": count + "%", "background": "#FFA500"});
        });
}
//




