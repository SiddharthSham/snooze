export const MathUtils = {
    lerp: (a, b, n) => (1 - n) * a + n * b,
    smoothstep: (x, a, b) => (x - a) / (b - a),
    cycle: (cur, min, max, step) => (cur + step > max) ? min : cur + step,
    map: (val, a, b, c, d) => (val - a) * (d - c) / (b - a) + c
}