export const buttonPreloader = (loading, buttonSelector) => {
    const preloader = document.querySelector(buttonSelector)
    if(loading){preloader.textContent = 'Сохраняю...'}
    else{preloader.textContent = 'Сохранить'}
}
export const pagePreloader = (loading) => {
    const preloadPage = document.querySelector('.lds-default')
    if(loading){preloadPage.style.display = 'inline-block'}
    else{preloadPage.style.display = 'none'}
}