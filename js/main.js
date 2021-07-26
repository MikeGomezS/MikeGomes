
const d = document;


/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
})

sr.reveal(`.header`,{
    origin: 'top',
})


// sr.reveal(`.personal, .media, .address`,{
//     origin: 'top',
//     interval: 100,
//     reset: true,
// })

// sr.reveal(`.right`,{
//     origin: 'right',
//     interval: 100,
//     reset: true,
// })

// sr.reveal(`.left`,{
//     origin: 'left',
//     interval: 100,
//     reset: true,
// })


/*==================== VALIDACION FORMULARIO ====================*/

function contactFormValidations() {
    const $form = d.querySelector('.contact-form'),
        $inputs = d.querySelectorAll('.contact-form [required]');

    // console.log($inputs);

    $inputs.forEach((input) => {
        const $span = d.createElement('span');
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add('contact-form-error', 'none');
        input.insertAdjacentElement('afterend', $span);

    });

    d.addEventListener('keyup', (e) => {
        if (e.target.matches('.contact-form [required]')) {
            const $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern;


            if (pattern && $input.value !== '') {
                const regex = new RegExp(pattern);
                return !regex.exec($input.value)
                    ? d.getElementById($input.name).classList.add('is-active')
                    : d.getElementById($input.name).classList.remove('is-active')
            }

            if (!pattern) {
                // console.log('El input NO tiene patrón');
                return $input.value === ''
                    ? d.getElementById($input.name).classList.add('is-active')
                    : d.getElementById($input.name).classList.remove('is-active')
            }
        }
    });

    d.addEventListener('submit', (e) => {
        e.preventDefault();

        const $loader = d.querySelector('.contact-form-loader'),
            $reponse = d.querySelector('.contact-form-response');

        $loader.classList.remove('none');

        fetch("https://formsubmit.co/ajax/mikes13719@gmail.com", {
            method: "POST",
            body: new FormData(e.target),
          })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      
            .then((json) => {
              $laoder.classList.add("none");
              $enviado.classList.remove("none");
              $enviado.innerHTML = `<p>${json.message} </p>`;
              $formulario.reset();
            })
            .catch((err) => {
              let message = err.statusText || "Ocurrió un error al enviar el formulario, intenta nuevamente";
              $enviado.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
            })
            .finally(() =>
              setTimeout(() => {
                $loader.classList.add('none');
                $form.reset();
                $reponse.classList.remove('none');
                setTimeout(() => $reponse.classList.add('none'), 2000);
                $enviado.innerHTML = "";
              }, 2000)
            );
        // setTimeout(() => {
        //     $loader.classList.add('none');
        //     $reponse.classList.remove('none');
        //     $form.reset();

        //     setTimeout(() => $reponse.classList.add('none'), 2000);
        // }, 3000);
    });
}


/*==================== MENU ====================*/
function hamburgerMenu(panelBtn, panel, menuLink) {

    d.addEventListener('click', (e) => {
        if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) { // Cualquier elemento hijo que esté en el área del botón, incluidas las 3 rayitas de la hamburguesa
            d.querySelector(panel).classList.toggle('is-active');
            d.querySelector(panelBtn).classList.toggle('is-active');
        }

        if (e.target.matches(menuLink)|| e.target.matches(`${menuLink} *`)) {
            d.querySelector(panel).classList.remove('is-active'); // Se repliega el panel
            d.querySelector(panelBtn).classList.remove('is-active'); // Se resetea el botón
        }
    });
}

/*==================== scrollSpy ====================*/

function scrollSpy() {
    const $sections = d.querySelectorAll('section[spy1]');
    const cb = (entries) => {

        entries.forEach((entry) => {

            const id = entry.target.getAttribute("id");

            if (entry.isIntersecting) {
                d.querySelector(`a[spy1][href="#${id}"]`).classList.add('active');
                d.querySelector(`a[spy2][href="#${id}"]`).classList.add('active');
                
            }else{
                d.querySelector(`a[spy1][href="#${id}"]`).classList.remove('active');
                d.querySelector(`a[spy2][href="#${id}"]`).classList.remove('active')
            }
        });
    };


    const observer = new IntersectionObserver(cb, {
        rootMargin: '-50%'
        // threshold: [ 0.5, 0.75]
    });
    // console.log(observer);

    $sections.forEach((el) => observer.observe(el));
}

/*==================== THEME ====================*/
const ls = localStorage;

function darkTheme(btn1, btn2, btn3, btn4, btn5, btn6, classColor1, classColor2, classColor3, classColor4, classColor5, classColor6) {
    const $selectors = d.querySelectorAll('[data-theme]');


    const Color1Mode = () => {
        $selectors.forEach((element) => element.classList.add(classColor1));
        $selectors.forEach((element) => element.classList.remove(classColor2));
        $selectors.forEach((element) => element.classList.remove(classColor3));
        $selectors.forEach((element) => element.classList.remove(classColor4));
        $selectors.forEach((element) => element.classList.remove(classColor5));
        $selectors.forEach((element) => element.classList.remove(classColor6));
    };
    const Color2Mode = () => {
        $selectors.forEach((element) => element.classList.remove(classColor1));
        $selectors.forEach((element) => element.classList.add(classColor2));
        $selectors.forEach((element) => element.classList.remove(classColor3));
        $selectors.forEach((element) => element.classList.remove(classColor4));
        $selectors.forEach((element) => element.classList.remove(classColor5));
        $selectors.forEach((element) => element.classList.remove(classColor6));
    };
    const Color3Mode = () => {
        $selectors.forEach((element) => element.classList.remove(classColor1));
        $selectors.forEach((element) => element.classList.remove(classColor2));
        $selectors.forEach((element) => element.classList.add(classColor3));
        $selectors.forEach((element) => element.classList.remove(classColor4));
        $selectors.forEach((element) => element.classList.remove(classColor5));
        $selectors.forEach((element) => element.classList.remove(classColor6));
    };
    const Color4Mode = () => {
        $selectors.forEach((element) => element.classList.remove(classColor1));
        $selectors.forEach((element) => element.classList.remove(classColor2));
        $selectors.forEach((element) => element.classList.remove(classColor3));
        $selectors.forEach((element) => element.classList.add(classColor4));
        $selectors.forEach((element) => element.classList.remove(classColor5));
        $selectors.forEach((element) => element.classList.remove(classColor6));
    };
    const Color5Mode = () => {
        $selectors.forEach((element) => element.classList.remove(classColor1));
        $selectors.forEach((element) => element.classList.remove(classColor2));
        $selectors.forEach((element) => element.classList.remove(classColor3));
        $selectors.forEach((element) => element.classList.remove(classColor4));
        $selectors.forEach((element) => element.classList.add(classColor5));
        $selectors.forEach((element) => element.classList.remove(classColor6));
    };
    const Color6Mode = () => {
        $selectors.forEach((element) => element.classList.remove(classColor1));
        $selectors.forEach((element) => element.classList.remove(classColor2));
        $selectors.forEach((element) => element.classList.remove(classColor3));
        $selectors.forEach((element) => element.classList.remove(classColor4));
        $selectors.forEach((element) => element.classList.remove(classColor5));
        $selectors.forEach((element) => element.classList.add(classColor6));
    };


    d.addEventListener('click', (e) => {

        if (e.target.matches(btn1)) {
            Color1Mode();
        }
        if (e.target.matches(btn2)) {
            Color2Mode();
        }
        if (e.target.matches(btn3)) {
            Color3Mode();
        }
        if (e.target.matches(btn4)) {
            Color4Mode();
        }
        if (e.target.matches(btn5)) {
            Color5Mode();
        }
        if (e.target.matches(btn6)) {
            Color6Mode();
        }
    });

    // d.addEventListener('DOMContentLoaded', (e) => {
    //     if (!ls.getItem('theme')) ls.setItem('theme', 'light');

    //     ls.getItem('theme') === 'light'
    //         ? ligthMode()
    //         : darkMode();
    // });
}


/*====================  ====================*/
contactFormValidations();
hamburgerMenu('.panel-btn', '.panel', '.menu_item');
scrollSpy();
darkTheme('.color1','.color2','.color3','.color4','.color5','.color6', 'color1-mode', 'color2-mode', 'color3-mode', 'color4-mode', 'color5-mode', 'color6-mode');