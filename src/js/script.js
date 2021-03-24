$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: false,
        speed: 1200,
        autospeed: 2000,
        prevArrow:'<button type="button" class="slick-prev"><img src="icons/left_arrow.png"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="icons/right_arrow.png"></button>',
        responsive: [
            { 
                breakpoint: 992,
                settings: {
                dots: true,
                dotsClass: 'slick-dots',
                arrows: false
                }
        }
    ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSLide(item){
        $(item).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSLide('.catalog-item__link');
    toggleSLide('.catalog-item__back');

    //Modal
    $('[data-modal=consultation]').on('click',function(){
        $('.overlay, #consultation').fadeIn('fast');
    });
    $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('fast');      
    });

    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
        });
    });

    function valideForms(form){
        $(form).validate({
            rules:{
                name: {
                    required: true,
                    minlength: 2
                },
                phone:"required",
                email:{
                    required:true,
                    email:true
                }
            },
            messages: {
                name: 
                {
                    required: "Пожалуйста, введите свое имя!",
                    minlength: jQuery.validator.format("Имя должно быть не мене {0} символов.")
                },
                phone: "Пожалуйста, введите номер телефона!",
                email: {
                    required: "Пожалуйста, введите свою почту!",
                    email: "Введите свою почту в формате name@example.com"
                }
            }
        });
    }
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            // $('#consultation, #order').fadeOut();
            // $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
});

