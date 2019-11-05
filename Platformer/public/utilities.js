function lerp(x, x1, speed = 0.1) {
    let dif = x1 - x;
    if (dif < 0.001 && dif > -0.001) return x;
    return x + dif * speed;
}

function distSqr(x1, y1, x2, y2) {
    let x = x1 - x2, y = y1 - y2;
    return x * x + y * y;
}