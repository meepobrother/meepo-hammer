export function getAngle(a, b, c, d, e, f) {
    var aa = Math.round(180 * Math.asin(a) / Math.PI);
    var bb = Math.round(180 * Math.acos(b) / Math.PI);
    var cc = Math.round(180 * Math.asin(c) / Math.PI);
    var dd = Math.round(180 * Math.acos(d) / Math.PI);
    var deg = 0;
    if (aa == bb || -aa == bb) {
        deg = dd;
    } else if (-aa + bb == 180) {
        deg = 180 + cc;
    } else if (aa + bb == 180) {
        deg = 360 - cc || 360 - dd;
    }
    return deg >= 360 ? 0 : deg;
}

export function getEleAngle(ele: any) {
    let styles = window.getComputedStyle(ele);
    let matrix: string = styles.transform;
    matrix = matrix.replace('matrix(', '');
    matrix = matrix.replace(')', '');
    let matrixs: any[] = matrix.split(',');
    let angle = getAngle(matrixs[0], matrixs[1], matrixs[2], matrixs[3], matrixs[4], matrixs[5]);
    return angle;
}

export function getScale(a, b, c, d, e, f) {
    // x' = ax+cy+e = s*x+0*y+0 = s*x;
    // y' = bx+dy+f = 0*x+s*y+0 = s*y;
}