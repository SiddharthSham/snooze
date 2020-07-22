import anime from 'animejs';
// import LocomotiveScroll from 'locomotive-scroll';
import * as THREE from 'three';

const textureimg = require('../static/mecode.png');
import vertex from '../shader/vertex.glsl';
import fragment from '../shader/fragment.glsl';

// ----------------------------------

// const startScroller = () => {
//   const scroll = new LocomotiveScroll({
//     smooth: true,
//     inertia: 0.5
//   });
//   return scroll
// }

// ----------------------------------

import {
  MathUtils
} from './utils/mathutils'

const lerp = MathUtils.lerp

import {
  Scroller
} from './animations/scroller';


const bounds = {
  vw: window.innerWidth,
  vh: window.innerHeight
}

// ----------------------------------


document.addEventListener('DOMContentLoaded', () => {
  init();
})

window.addEventListener('load', () => {
  let tl = anime.timeline()

  tl.add({
    targets: '#sid',
    translateX: [0, '-100px'],
    opacity: [1, 0],
    easing: 'easeOutExpo',
    duration: 1000
  }, 0)

  tl.add({
    targets: '#sham',
    translateX: [0, '100px'],
    opacity: [1, 0],
    easing: 'easeOutExpo',
    duration: 1000
  }, 0)

  tl.add({
    targets: '#loader',
    opacity: [1, 0],
    easing: 'easeInExpo',
    duration: 500,
    complete: () => {
      document.getElementById('loader').remove()
    }
  })

  tl.add({
    targets: '.text-element',
    translateY: ['110%', 0],
    delay: anime.stagger(50),
    easing: 'easeOutExpo',
    duration: 1500,
  })

})

// ----------------------------------

// 3d stuff

class Mesh {
  constructor() {
    window.addEventListener('resize', this.resize, {
      passive: true
    })
    this.mouse = {
      x: 0,
      y: 0
    }
    this.resize()
    this.scroll()
    this.listen()
    this.init()
  }

  resize() {
    this.bounds = {
      vw: window.innerWidth,
      vh: window.innerHeight
    }
  }

  scroll() {
    // this.scroll = startScroller();
  }

  listen() {
    window.addEventListener('mousemove', e => {
      this.mouse.x = e.clientX / this.bounds.vw
      this.mouse.y = e.clientY / this.bounds.vh
    }, {
      passive: true
    })
  }

  init() {
    const {
      vw,
      vh
    } = this.bounds
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, vw / vh, 1, 100)
    this.camera.position.z = 1.25
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })
    this.renderer.setSize(vw, vh)
    this.TEXTURE = new THREE.TextureLoader().load(textureimg)
    this.TEXTURE.anisotropy = 16
    this.TEXTURE.encoding = THREE.sRGBEncoding;

    // document.getElementById('parent').appendChild(this.renderer.domElement)
    document.body.appendChild(this.renderer.domElement)
    this.addMesh()
  }

  addMesh() {
    this.geometry = new THREE.PlaneGeometry(0.6, 0.9, 32, 32)
    this.material = new THREE.ShaderMaterial({
      // wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        u_time: {
          type: 'f',
          value: 0.0
        },
        text: {
          type: 't',
          value: this.TEXTURE
        },
        u_mouse: {
          type: 'vec2',
          value: new THREE.Vector2(1.0, 0.0)
        },
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  update() {
    this.renderer.render(this.scene, this.camera)
    this.mesh.material.uniforms.u_time.value += 0.016
  }
}



const init = () => {

  const imganim = new Mesh()
  const s = new Scroller()
  window.addEventListener('resize', () => {
    imganim.resize()
  })

  let lastFrameTime = 0;
  let delta
  const render = elapsedTime => {

    delta = elapsedTime - (lastFrameTime || 0);
    window.requestAnimationFrame(render)
    if (lastFrameTime && (delta < 16)) return
    lastFrameTime = elapsedTime;

    imganim.update()
    s.update()
  }

  window.requestAnimationFrame(render)
}