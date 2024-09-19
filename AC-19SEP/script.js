class Linea {
    #x1;
    #y1;
    #x2;
    #y2;
    #svg;

    constructor(x1, y1, x2, y2, svg) {
        this.#x1 = x1;
        this.#y1 = y1;
        this.#x2 = x2;
        this.#y2 = y2;
        this.#svg = svg;
    }

    dibujar() {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', this.#x1);
        line.setAttribute('y1', this.#y1);
        line.setAttribute('x2', this.#x2);
        line.setAttribute('y2', this.#y2);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', 1);
        this.#svg.appendChild(line);
    }
}

class Circunferencia {
    #cx;
    #cy;
    #r;
    #svg;

    constructor(cx, cy, r, svg) {
        this.#cx = cx;
        this.#cy = cy;
        this.#r = r;
        this.#svg = svg;
    }

    dibujar() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', this.#cx);
        circle.setAttribute('cy', this.#cy);
        circle.setAttribute('r', this.#r);
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('stroke-width', 1);
        circle.setAttribute('fill', 'none'); // Cambiar a 'black' para llenarla
        this.#svg.appendChild(circle);
    }
}

class Elipse {
    #cx;
    #cy;
    #a;
    #b;
    #svg;

    constructor(cx, cy, a, b, svg) {
        this.#cx = cx;
        this.#cy = cy;
        this.#a = a;
        this.#b = b;
        this.#svg = svg;
    }

    dibujar() {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('cx', this.#cx);
        ellipse.setAttribute('cy', this.#cy);
        ellipse.setAttribute('rx', this.#a);
        ellipse.setAttribute('ry', this.#b);
        ellipse.setAttribute('stroke', 'black');
        ellipse.setAttribute('stroke-width', 1);
        ellipse.setAttribute('fill', 'none'); // Cambiar a 'black' para llenarla
        this.#svg.appendChild(ellipse);
    }
}

// Uso de las clases
const svg = document.getElementById('svgCanvas');

const linea = new Linea(50, 50, 200, 200, svg);
linea.dibujar();

const circunferencia = new Circunferencia(300, 100, 50, svg);
circunferencia.dibujar();

const elipse = new Elipse(400, 300, 80, 50, svg);
elipse.dibujar();

