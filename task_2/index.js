const formElement = document.forms['formElement'];

formElement.addEventListener('focusin', (evt) => {
    const activeElement = formElement.querySelector('.focused');
    if (activeElement === evt.target) {
        activeElement.classList.remove('focused');
    }

    evt.target.classList.add('focused');
});

formElement.addEventListener('focusout', (evt) => {
    const activeElement = formElement.querySelector('.focused');
    if (activeElement === evt.target) {
        activeElement.classList.remove('focused');
    }
});