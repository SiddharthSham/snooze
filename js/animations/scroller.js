import {
    MathUtils
} from '../utils/mathutils';

const lerp = MathUtils.lerp

const bounds = () => {
    return {
        vw: window.innerWidth,
        vh: window.innerHeight
    }
}

export class Scroller {
    constructor() {
        // select elements
        this.scrollWrapper = document.getElementById('scroll-wrapper')
        this.scrollContent = document.getElementById('scroll-content')
        this.body = document.body

        // init values
        this.curScroll = 0, this.targetScroll = 0

        // setup events
        this.listeners()
        this.style()
        this.resize()
    }

    // add event listener
    listeners() {
        window.addEventListener('scroll', event => {
            this.curScroll = document.documentElement.scrollTop
            this.shouldAnimate = true
        }, {
            passive: true
        })
        window.addEventListener('resize', () => {
            this.resize()
        }, {
            passive: true
        })
    }

    // style elements
    style() {
        this.scrollContent.style = `width: 100vw;
                                    min-height: 100vh;
                                    will-change: transform;`
        this.scrollWrapper.style = `position: fixed;`
    }

    // handle resize
    resize() {
        this.dim = bounds()
        this.scrollHeight = this.scrollContent.scrollHeight
        this.body.style.height = `${this.scrollHeight}px`;
    }

    // check if the current animations is complete
    animComplete() {
        return Math.round(this.curScroll) == Math.round(this.targetScroll)
    }

    // check if animation is ticking
    get isTicking() {
        return this.shouldAnimate || !this.animComplete()
    }

    // progress animation by one step
    // meant to be used with an external rAF loop
    update() {
        if (!this.shouldAnimate && this.animComplete()) return

        this.targetScroll = Math.max(lerp(this.targetScroll, this.curScroll, 0.1), 0.0001)
        this.scrollContent.style.transform = `translateY(${-1*this.targetScroll}px)`;

        this.shouldAnimate = false
    }
}