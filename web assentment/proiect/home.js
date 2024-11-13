$(document).ready(function () {
   
    const savedColor = localStorage.getItem('backgroundColor') || '#f0f8ff';
    $('body').css('background-color', savedColor);


    $('#setColorButton').on('click', function () {
        const selectedColor = $('#colorPicker').val();

       
        if (selectedColor !== '#f0f8ff') {
            localStorage.setItem('backgroundColor', selectedColor);
            $('body').css('background-color', selectedColor);
        } else {
            
            localStorage.removeItem('backgroundColor');
            $('body').css('background-color', '#f0f8ff');
        }
    });

   
    $('#visitStoreButton').on('click', function () {
        window.location.href = 'store.html';
    });
});
