import Swiper from 'swiper';
import { Grid, Navigation } from 'swiper/modules';

Swiper.use([Grid, Navigation]);

class FeaturedProducts extends HTMLElement {
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
      const selector = `#featured-products-${this.sectionId}`;
      const swiperEl = document.querySelector(selector);

      // Prevent duplicate swiper initialization
      if (!swiperEl || swiperEl.classList.contains('swiper-initialized')) return;

      this.swiper = new Swiper(swiperEl, {
        slidesPerView: 2,
        grid: {
          rows: 2,
        },
        autoHeight: true,
        // breakpoints: {
        //   300: {
        //     slidesPerView: 2,
        //     grid: {
        //       rows: 2,
        //     },
        //   },
        //   700: {
        //     slidesPerView: 4,
        //     grid: {
        //       rows: 1,
        //     },
        //   },
        // },
        loop: false,
        watchOverflow: false,
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

if (!customElements.get('featured-products')) {
  customElements.define('featured-products', FeaturedProducts);
}
