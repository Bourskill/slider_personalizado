const preloaderContainer = document.querySelector("#preloader-container");
window.addEventListener('load', function () {
  setTimeout(() => {
    preloaderContainer.style.animation = "opacitys 1s linear forwards";
    setTimeout(() => {
      preloaderContainer.style.display = 'none';
    }, 1000);
  }, 1000);
});




//////////////////////////////////////// CARRUSEL
const flickity = new Flickity('.carousel', {
  cellAlign: 'left',
  contain: true,
  wrapAround: true,
  autoPlay: 6000,
  pauseAutoPlayOnHover: true,
  fade: true,
  adaptiveHeight: true,
  lazyLoad: true,
  setGallerySize: false,
  selectedAttraction: 0.015,
  imagesLoaded: true,
  percentPosition: false
});

let innerWidth = window.innerWidth;
const parallaxFactor = 0.6;

function updateCarousel() {
  innerWidth = window.innerWidth;
  flickity.slides.forEach(function (slide, i) {
    const container = slide.cells[0].element;
    const containerRect = container.getBoundingClientRect();
    const opacity = 1 - Math.abs(containerRect.x) / innerWidth;
    const image = container.querySelector('img');
    const parallax = -containerRect.x * parallaxFactor;

    container.style.opacity = Math.max(0, Math.min(1, opacity));
    image.style.transform = 'translateX(' + parallax + 'px)';
  });
}

function handleResize() {
  debounce(function() {
    window.requestAnimationFrame(updateCarousel);
    flickity.reloadCells();
  }, 250)();
}

function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

flickity.on('scroll', updateCarousel);

flickity.on('dragEnd', function () {
  flickity.playPlayer();
});

window.addEventListener('resize', handleResize);
















