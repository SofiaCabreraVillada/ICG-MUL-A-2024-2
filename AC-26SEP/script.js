// Clase para crear y dibujar una línea en SVG usando el algoritmo de Bresenham
class Linea {
    #x1;
    #y1;
    #x2;
    #y2;

    constructor(x1, y1, x2, y2) {
        this.#x1 = x1;
        this.#y1 = y1;
        this.#x2 = x2;
        this.#y2 = y2;
    }

    // Genera un elemento SVG <polyline> utilizando el algoritmo de Bresenham
    crearElementoSVG() {
        const puntos = this.#algoritmoBresenham();
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        const puntosStr = puntos.map(([x, y]) => `${x},${y}`).join(' ');
        polyline.setAttribute('points', puntosStr);
        polyline.setAttribute('stroke', 'black');
        polyline.setAttribute('stroke-width', '1');
        polyline.setAttribute('fill', 'none');
        return polyline;
    }

    // Algoritmo de Bresenham para trazar la línea
    #algoritmoBresenham() {
        const puntos = [];
        let x1 = this.#x1;
        let y1 = this.#y1;
        const x2 = this.#x2;
        const y2 = this.#y2;

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            puntos.push([x1, y1]);
            if (x1 === x2 && y1 === y2) break;
            const err2 = 2 * err;
            if (err2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (err2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
        return puntos;
    }
}

// Clase para crear y dibujar una circunferencia en SVG usando la ecuación de la circunferencia
class Circunferencia {
    #cx;
    #cy;
    #r;

    constructor(cx, cy, r) {
        this.#cx = cx;
        this.#cy = cy;
        this.#r = r;
    }

    // Genera un elemento SVG <circle>
    crearElementoSVG() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', this.#cx);
        circle.setAttribute('cy', this.#cy);
        circle.setAttribute('r', this.#r);
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('stroke-width', '1');
        circle.setAttribute('fill', 'none');
        return circle;
    }
}

// Clase para crear y dibujar una elipse en SVG usando la ecuación de la elipse
class Elipse {
    #cx;
    #cy;
    #a;
    #b;

    constructor(cx, cy, a, b) {
        this.#cx = cx;
        this.#cy = cy;
        this.#a = a;
        this.#b = b;
    }

    // Genera un elemento SVG <ellipse>
    crearElementoSVG() {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('cx', this.#cx);
        ellipse.setAttribute('cy', this.#cy);
        ellipse.setAttribute('rx', this.#a);
        ellipse.setAttribute('ry', this.#b);
        ellipse.setAttribute('stroke', 'black');
        ellipse.setAttribute('stroke-width', '1');
        ellipse.setAttribute('fill', 'none');
        return ellipse;
    }
}

// Función para generar el contenido SVG y agregarlo al contenedor
function dibujarSVG() {
    const svgCanvas = document.getElementById('svgCanvas'); // Obtener el contenedor del SVG

    // Crear instancias de las primitivas
    const linea = new Linea(50, 50, 200, 200);
    const circunferencia = new Circunferencia(300, 100, 50);
    const elipse = new Elipse(400, 300, 80, 50);

    // Crear y añadir los elementos SVG al canvas
    svgCanvas.appendChild(linea.crearElementoSVG());
    svgCanvas.appendChild(circunferencia.crearElementoSVG());
    svgCanvas.appendChild(elipse.crearElementoSVG());
}

// Llamada a la función para dibujar las primitivas una vez que el DOM esté cargado
document.addEventListener('DOMContentLoaded', dibujarSVG);




