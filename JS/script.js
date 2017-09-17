//language=JQuery-CSS
/**
 * Created by aorla on 16.09.2017.
 */
$('#button').on('click', function(){
    if($("#agree").is(':checked')) {
        return true;
    }
    else {
        window.alert('Дайте свое согласие на обработку данных!');
        return false;
    }
});