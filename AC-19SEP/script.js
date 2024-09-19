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

    // Genera el texto SVG para la línea utilizando el algoritmo de Bresenham
    crearSVG() {
        const puntos = this.#algoritmoBresenham();
        const lineas = puntos.map(([x, y]) => `<line x1="${x}" y1="${y}" x2="${x+1}" y2="${y+1}" stroke="black" stroke-width="1"/>`).join('');
        return lineas;
    }

    // Algoritmo de Bresenham para trazar la línea
    #algoritmoBresenham() {
        const puntos = [];
        const dx = Math.abs(this.#x2 - this.#x1);
        const dy = Math.abs(this.#y2 - this.#y1);
        const sx = (this.#x1 < this.#x2) ? 1 : -1;
        const sy = (this.#y1 < this.#y2) ? 1 : -1;
        let err = dx - dy;
        let x = this.#x1;
        let y = this.#y1;

        while (true) {
            puntos.push([x, y]);
            if (x === this.#x2 && y === this.#y2) break;
            const err2 = err * 2;
            if (err2 > -dy) {
                err -= dy;
                x += sx;
            }
            if (err2 < dx) {
                err += dx;
                y += sy;
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

    // Genera el texto SVG para la circunferencia usando un path
    crearSVG() {
        const pathData = this.#generarPathCircunferencia();
        return `<path d="${pathData}" stroke="black" stroke-width="1" fill="none"/>`;
    }

    // Genera los datos del path para la circunferencia
    #generarPathCircunferencia() {
        const numPoints = 100; // Número de puntos para aproximar la circunferencia
        let path = '';
        for (let i = 0; i <= numPoints; i++) {
            const theta = (i / numPoints) * 2 * Math.PI;
            const x = this.#cx + this.#r * Math.cos(theta);
            const y = this.#cy + this.#r * Math.sin(theta);
            if (i === 0) {
                path += `M${x} ${y}`; // Mover a la posición inicial
            } else {
                path += ` L${x} ${y}`; // Dibujar línea hasta el siguiente punto
            }
        }
        path += ' Z'; // Cierra el path
        return path;
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

    // Genera el texto SVG para la elipse
    crearSVG() {
        return `<ellipse cx="${this.#cx}" cy="${this.#cy}" rx="${this.#a}" ry="${this.#b}" stroke="black" stroke-width="1" fill="none"/>`;
    }
}

// Función para generar el contenido SVG y agregarlo al contenedor
function dibujarSVG() {
    const svgNamespace = 'http://www.w3.org/2000/svg'; // Espacio de nombres para SVG
    const svgCanvas = document.getElementById('svgCanvas'); // Obtener el contenedor del SVG

    // Crear instancias de las primitivas
    const linea = new Linea(50, 50, 200, 200);
    const circunferencia = new Circunferencia(300, 100, 50);
    const elipse = new Elipse(400, 300, 80, 50);

    // Generar el contenido SVG como una cadena
    const contenidoSVG = `
        <svg xmlns="${svgNamespace}" width="500" height="500">
            ${linea.crearSVG()}          <!-- Añadir la línea al SVG -->
            ${circunferencia.crearSVG()} <!-- Añadir la circunferencia al SVG -->
            ${elipse.crearSVG()}         <!-- Añadir la elipse al SVG -->
        </svg>
    `;

    // Insertar el contenido SVG en el contenedor
    svgCanvas.innerHTML = contenidoSVG;
}

// Llamada a la función para dibujar las primitivas
dibujarSVG();


