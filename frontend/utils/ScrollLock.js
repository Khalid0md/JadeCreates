const $body = document.querySelector('body');
let scrollPosition = 0;

export function enable() {
    const pad = window.innerWidth - document.documentElement.clientWidth;
    $body.style.paddingRight = pad + 'px';
    
    scrollPosition = window.pageYOffset;
    $body.style.overflow = 'hidden';
    $body.style.position = 'fixed';
    $body.style.top = `-${scrollPosition}px`;
    $body.style.width = '100%';
}

export function disable() {
    $body.style.paddingRight = '0px';
    $body.style.removeProperty('overflow');
    $body.style.removeProperty('position');
    $body.style.removeProperty('top');
    $body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}