precision mediump float;

uniform float u_time;
uniform sampler2D text;

varying vec3 vUv;
varying float vWave;

void main() {
    float wave = vWave * 0.2;
    vec2 newUV = vec2(vUv.x / 0.6, vUv.y / 0.9) + vec2(0.5);
    
    float r = texture(text, newUV + wave).r;
    
    float g = texture(text, newUV).g;
    float b = texture(text, newUV).b;

    vec4 color = vec4(r, g, b, 1.0);
    gl_FragColor = color;
}