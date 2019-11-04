function lerp(x, x1, speed = 0.1) {
    let dif = x1 - x;
    if (dif < 0.001 && dif > -0.001) return x;
    return x + dif * speed;
}