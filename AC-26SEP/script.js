// Clase Punto
class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Método para crear un punto usando una línea muy corta
    dibujar(svgCanvas) {
        const punto = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        punto.setAttribute('x1', this.x);
        punto.setAttribute('y1', this.y);
        punto.setAttribute('x2', this.x + 1);  // Pequeño desplazamiento en x
        punto.setAttribute('y2', this.y + 1);  // Pequeño desplazamiento en y
        punto.setAttribute('stroke', 'black');
        punto.setAttribute('stroke-width', 2);  // Grosor ajustado para que parezca un punto
        svgCanvas.appendChild(punto);
    }
}

// Clase SVGDrawer para manejar el dibujo usando puntos
class SVGDrawer {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
    }

    // Dibujar una línea como una secuencia de puntos
    dibujarLinea(x1, y1, x2, y2, numPuntos = 100) {
        for (let i = 0; i <= numPuntos; i++) {
            const t = i / numPuntos;
            const x = x1 + t * (x2 - x1);
            const y = y1 + t * (y2 - y1);
            new Punto(x, y).dibujar(this.svgCanvas);
        }
    }

    // Dibujar una circunferencia usando puntos
    dibujarCircunferencia(cx, cy, r, numPuntos = 100) {
        for (let i = 0; i <= numPuntos; i++) {
            const theta = (i / numPuntos) * 2 * Math.PI;
            const x = cx + r * Math.cos(theta);
            const y = cy + r * Math.sin(theta);
            new Punto(x, y).dibujar(this.svgCanvas);
        }
    }

    // Dibujar una elipse usando puntos
    dibujarElipse(cx, cy, a, b, numPuntos = 100) {
        for (let i = 0; i <= numPuntos; i++) {
            const theta = (i / numPuntos) * 2 * Math.PI;
            const x = cx + a * Math.cos(theta);
            const y = cy + b * Math.sin(theta);
            // Dibuja los puntos de la elipse, pero no el centro
            if (i > 0) { // Evitar dibujar el punto central
                new Punto(x, y).dibujar(this.svgCanvas);
            }
        }
    }

    // Dibujar un solo punto
    dibujarPunto(x, y) {
        new Punto(x, y).dibujar(this.svgCanvas);
    }
}

// Crear el SVG
const svgCanvas = document.getElementById('svgCanvas');

// Instanciar la clase SVGDrawer
const drawer = new SVGDrawer(svgCanvas);

// Dibujar las primitivas usando puntos
drawer.dibujarLinea(50, 50, 200, 200);
drawer.dibujarCircunferencia(300, 100, 50);
drawer.dibujarElipse(400, 300, 80, 50);


