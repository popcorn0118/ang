<template>
<div>
    <!-- <img src="@IMG/1.jpg" alt="123"> -->
    <main class="demo-2 loading">
        <div class="slideshow">
            <div class="slides" ref="slides">
                <div class="slide slide--current">
                    <div class="slide__img" style="background-image: url('../../../static/img/1.jpg')"></div>
                    <h2 class="slide__title">Concert</h2>
                    <p class="slide__desc">2018~2019 旅程世界巡迴演唱會</p>
                    <router-link to="concert" class="slide__link">More</router-link>
                </div>
                <div class="slide">
                    <div class="slide__img" :style="{ backgroundImage: `url(${img})`}"></div>
                    <h2 class="slide__title text-primary">Angela</h2>
                    <p class="slide__desc">Angela Chang 張韶涵</p>
                    <a class="btn btn-primary " href="#" role="button">Link</a>
                    <a class="slide__link" href="#" style="display:none">Explore destinations</a>
                </div>
            </div>
            <nav class="slidenav">
                <button class="slidenav__item slidenav__item--prev"><i class="fas fa-chevron-up"></i></button>
                <button class="slidenav__item slidenav__item--next"><i class="fas fa-chevron-up"></i></button>
            </nav>
        </div>
    </main>
    <div class="menuBtn" :class="{is_active: is_menu}">
        <a href="" @click.prevent="menuToggle">
            <span></span>
        </a>
    </div>
    <div class="container navBar" :class="{is_active: is_menu}">
        <ul class="row text-white" @click.prevent="menuUp">
            <li class="col-lg-4">
                <router-link to="musicalWork">
                    <i class="fas fa-music"></i>
                    音樂作品 × Musical Work
                </router-link>
            </li>
            <li class="col-lg-4">
                <router-link to="concert">
                    <i class="fas fa-microphone"></i>
                    演唱會 × Concert
                </router-link>
            </li>
            <li class="col-lg-4">
                <router-link to="dramaWork">
                    <i class="far fa-eye"></i>
                    影視作品 × Drama Work
                </router-link>
            </li>
        </ul>
        <Community />
    </div>
</div>  
</template>
<style lang="scss">
@import '../assets/css/base.css';
// .slide__img {
//     background-image: url('../assets/img/2.jpg')
// }
</style>
<script>
import Community from '@C/Community';
// import $ from 'jquery'
// import '../../static/js/anime.min.js'
// import '../../static/js/demo2.js'
// import { IMG } from '@IMG'
// $(function(){
//     $('.flex').jFlex({
//         autoplay: true
//     })
// })
export default {
    name: 'Nav',
    data () {
        return {
            img: 'https://video.nextmag.com.tw/photo/2016/08/24/%E5%BC%B5%E9%9F%B6%E6%B6%B5%E3%80%88%E5%85%A8%E9%9D%A2%E6%B7%AA%E9%99%B7%E3%80%89MV%E5%90%83%E7%9B%A1%E8%8B%A6%E9%A0%AD%E3%80%82_OP_%E5%A4%A9%E6%B6%B5%E6%8F%90%E4%BE%9B_CP__1472028423655_625750_ver1.0.jpg',
            is_menu: false
        }
    },
    methods: {
        menuToggle() {
            !this.is_menu ? this.is_menu = true : this.is_menu = false
        },
        menuUp() {
            this.is_menu = false;
        }
    },
    mounted () {
        /* eslint-disable */
        // console.log($)
        {
            // From https://davidwalsh.name/javascript-debounce-function.
            function debounce(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this, args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            };
            
            class Slideshow {
                constructor(el) {
                    this.DOM = {};
                    this.DOM.el = el;
                    this.settings = {
                        animation: {
                            slides: {
                                duration: 600,
                                easing: 'easeOutQuint'
                            },
                            shape: {
                                duration: 300,
                                easing: {in: 'easeOutQuad', out: 'easeOutQuad'}
                            }
                        },
                        frameFill: '#111'
                    }
                    this.init();
                }
                init() {
                    this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slides > .slide'));
                    this.slidesTotal = this.DOM.slides.length;
                    this.DOM.nav = this.DOM.el.querySelector('.slidenav');
                    this.DOM.nextCtrl = this.DOM.nav.querySelector('.slidenav__item--next');
                    this.DOM.prevCtrl = this.DOM.nav.querySelector('.slidenav__item--prev');
                    this.current = 0;
                    this.createFrame(); 
                    this.initEvents();
                }
                createFrame() {
                    this.rect = this.DOM.el.getBoundingClientRect();
                    this.frameSize = this.rect.width/12;
                    this.paths = {
                        initial: this.calculatePath('initial'),
                        final: this.calculatePath('final')
                    };
                    this.DOM.svg = document.createElementNS('https://www.w3.org/2000/svg', 'svg');
                    this.DOM.svg.setAttribute('class', 'shape');
                    this.DOM.svg.setAttribute('width','100%');
                    this.DOM.svg.setAttribute('height','100%');
                    this.DOM.svg.setAttribute('viewbox',`0 0 ${this.rect.width} ${this.rect.height}`);
                    this.DOM.svg.innerHTML = `<path fill="${this.settings.frameFill}" d="${this.paths.initial}"/>`;
                    this.DOM.el.insertBefore(this.DOM.svg, this.DOM.nav);
                    this.DOM.shape = this.DOM.svg.lastElementChild;
                }
                updateFrame() {
                    this.paths.initial = this.calculatePath('initial');
                    this.paths.final = this.calculatePath('final');
                    this.DOM.svg.setAttribute('viewbox',`0 0 ${this.rect.width} ${this.rect.height}`);
                    this.DOM.shape.setAttribute('d', this.isAnimating ? this.paths.final : this.paths.initial);
                }
                calculatePath(path = 'initial') {
                    if ( path === 'initial' ) {
                        return `M 0,0 0,${this.rect.height} ${this.rect.width},${this.rect.height} ${this.rect.width},0 0,0 Z M 0,0 ${this.rect.width},0 ${this.rect.width},${this.rect.height} 0,${this.rect.height} Z`;
                    }
                    else {
                        return {
                            next: `M 0,0 0,${this.rect.height} ${this.rect.width},${this.rect.height} ${this.rect.width},0 0,0 Z M ${this.frameSize},${this.frameSize} ${this.rect.width-this.frameSize},${this.frameSize/2} ${this.rect.width-this.frameSize},${this.rect.height-this.frameSize/2} ${this.frameSize},${this.rect.height-this.frameSize} Z`,
                            prev: `M 0,0 0,${this.rect.height} ${this.rect.width},${this.rect.height} ${this.rect.width},0 0,0 Z M ${this.frameSize},${this.frameSize/2} ${this.rect.width-this.frameSize},${this.frameSize} ${this.rect.width-this.frameSize},${this.rect.height-this.frameSize} ${this.frameSize},${this.rect.height-this.frameSize/2} Z`
                        }
                    }
                }
                initEvents() {
                    this.DOM.nextCtrl.addEventListener('click', () => this.navigate('next'));
                    this.DOM.prevCtrl.addEventListener('click', () => this.navigate('prev'));
                    
                    window.addEventListener('resize', debounce(() => {
                        this.rect = this.DOM.el.getBoundingClientRect();
                        this.updateFrame();
                    }, 20));
                    
                    document.addEventListener('keydown', (ev) => {
                        const keyCode = ev.keyCode || ev.which;
                        if ( keyCode === 37 ) {
                            this.navigate('prev');
                        }
                        else if ( keyCode === 39 ) {
                            this.navigate('next');
                        }
                    });
                }
                navigate(dir = 'next') {
                    if ( this.isAnimating ) return false;
                    this.isAnimating = true;

                    const animateShapeIn = anime({
                        targets: this.DOM.shape,
                        duration: this.settings.animation.shape.duration,
                        easing: this.settings.animation.shape.easing.in,
                        d: dir === 'next' ? this.paths.final.next : this.paths.final.prev
                    });

                    const animateSlides = () => {
                        return new Promise((resolve, reject) => {
                            const currentSlide = this.DOM.slides[this.current];
                            anime({
                                targets: currentSlide,
                                duration: this.settings.animation.slides.duration,
                                easing: this.settings.animation.slides.easing,
                                translateX: dir === 'next' ? -1*this.rect.width : this.rect.width,
                                complete: () => {
                                    currentSlide.classList.remove('slide--current');
                                    resolve();
                                }
                            });
                
                            this.current = dir === 'next' ? 
                                this.current < this.slidesTotal-1 ? this.current + 1 : 0 :
                                this.current > 0 ? this.current - 1 : this.slidesTotal-1; 
                            
                            const newSlide = this.DOM.slides[this.current];
                            newSlide.classList.add('slide--current');
                            anime({
                                targets: newSlide,
                                duration: this.settings.animation.slides.duration,
                                easing: this.settings.animation.slides.easing,
                                translateX: [dir === 'next' ? this.rect.width : -1*this.rect.width,0]
                            });
                
                            const newSlideImg = newSlide.querySelector('.slide__img');
                            newSlideImg.style.transformOrigin = dir === 'next' ? '-10% 50%' : '110% 50%';
                            anime.remove(newSlideImg);
                            anime({
                                targets: newSlideImg,
                                duration: this.settings.animation.slides.duration*4,
                                easing: 'easeOutElastic',
                                elasticity: 350,
                                scale: [1.2,1],
                                rotate: [dir === 'next' ? 4 : -4,0]
                            });
                
                            anime({
                                targets: [newSlide.querySelector('.slide__title'), newSlide.querySelector('.slide__desc'), newSlide.querySelector('.slide__link')],
                                duration: this.settings.animation.slides.duration,
                                easing: this.settings.animation.slides.easing,
                                delay: (t,i,total) => dir === 'next' ? i*100+750 : (total-i-1)*100+750,
                                translateY: [dir === 'next' ? 300 : -300,0],
                                rotate: [15,0],
                                opacity: [0,1]
                            });
                        });
                    };

                    const animateShapeOut = () => {
                        anime({
                            targets: this.DOM.shape,
                            duration: this.settings.animation.shape.duration,
                            delay: 150,
                            easing: this.settings.animation.shape.easing.out,
                            d: this.paths.initial,
                            complete: () => this.isAnimating = false
                        });
                    }

                    animateShapeIn.finished.then(animateSlides).then(animateShapeOut);
                }
            };

            new Slideshow(document.querySelector('.slideshow'));
            // imagesLoaded('.slide__img', { background: true }, () => document.body.classList.remove('loading'));
        };
    },
    components: {
        Community
    }
}
</script>