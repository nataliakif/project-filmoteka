const refs = {
    openModalFooterLink: document.querySelector('[data-action="open-modal"]'),
    closeModalFooterBtn: document.querySelector('[data-action="close-modal"]'),
    backdrop: document.querySelector('.js-backdrop'),
}

refs.openModalFooterLink.addEventListener('click', onOpenLink);
refs.closeModalFooterBtn.addEventListener('click', onCloseLink);
refs.backdrop.addEventListener('click', onBackdropClick);



function onOpenLink() {
    document.body.classList.add('show-modal')
    window.addEventListener('keydown', onCloseEscKey)
}

function onCloseLink() {
    document.body.classList.remove('show-modal')
    window.remoweEventListener('keydown', onCloseEscKey)

}

function onBackdropClick(e) {
    if (e.currentTarget === e.target) {
        onCloseLink()
    }
}

function onCloseEscKey(e) {
    const ESC_KEY_CODE = 'Escape';
    if (e.code === ESC_KEY_CODE) {
        onCloseLink()
    }
}
document.querySelector('.footer__link').addEventListener("click", function(event) {
    event.preventDefault();
    return false;
}, false);