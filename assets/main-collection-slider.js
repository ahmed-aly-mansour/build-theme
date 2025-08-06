class MainCollectionMenu extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
    this.sectionId = this.getAttribute('data-section-id');

    // Store bound methods so add/removeEventListener match
    this.onSectionLoad = this.onSectionLoad.bind(this);
    this.onSectionUnload = this.onSectionUnload.bind(this);
  }

  connectedCallback() {
    this.init();
    document.addEventListener('shopify:section:load', this.onSectionLoad);
    document.addEventListener('shopify:section:unload', this.onSectionUnload);
  }

  disconnectedCallback() {
    this.destroy();
    document.removeEventListener('shopify:section:load', this.onSectionLoad);
    document.removeEventListener('shopify:section:unload', this.onSectionUnload);
  }

  init() {
    if (window.Swiper && this.sectionId) {
      const selector = `#main-collection-menu-${this.sectionId}`;
      const swiperEl = document.querySelector(selector);

      // Prevent duplicate swiper initialization
      if (!swiperEl || swiperEl.classList.contains('swiper-initialized')) return;

      this.swiper = new Swiper(selector, {
        slidesPerView: 'auto',
        autoHeight: false,
        centeredSlides: false,
        draggable: true,
        simulateTouch: true,
        touchRatio: 1,
        grabCursor: true,
        allowTouchMove: true,
        spaceBetween: 40,
        loop: false,
        watchOverflow: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: null, // no prev button
        },
        breakpoints: {
          400: {
            // slidesPerView: 4,
            spaceBetween: 40,
          },

          500: {
            // slidesPerView: 5,
            spaceBetween: 40,
          },

          900: {
            // slidesPerView: 10,
            spaceBetween: 40,
          },
          1024: {
            // slidesPerView: 10,
            spaceBetween: 92,
            navigation: {
              nextEl: null,
              prevEl: null, // no prev button
            }
          },
        }
      });
    }
  }

  destroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }

  onSectionLoad(e) {
    if (e.detail && e.detail.sectionId === this.sectionId) {
      this.destroy();
      this.init();
    }
  }

  onSectionUnload(e) {
    if (e.detail && e.detail.sectionId === this.sectionId) {
      this.destroy();
    }
  }
}

if (!customElements.get('main-collection-menu')) {
  customElements.define('main-collection-menu', MainCollectionMenu);
}
