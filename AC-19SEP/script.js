// Clase para crear y dibujar una línea en SVG
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

    // Genera el texto SVG para la línea
    crearSVG() {
        return `<line x1="${this.#x1}" y1="${this.#y1}" x2="${this.#x2}" y2="${this.#y2}" stroke="black" stroke-width="1"/>`;
    }
}

// Clase para crear y dibujar una circunferencia en SVG
class Circunferencia {
    #cx;
    #cy;
    #r;

    constructor(cx, cy, r) {
        this.#cx = cx;
        this.#cy = cy;
        this.#r = r;
    }

    // Genera el texto SVG para la circunferencia
    crearSVG() {
        return `<circle cx="${this.#cx}" cy="${this.#cy}" r="${this.#r}" stroke="black" stroke-width="1" fill="none"/>`;
    }
}

// Clase para crear y dibujar una elipse en SVG
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
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const svgCanvas = document.getElementById('svgCanvas');

    // Crear instancias de las primitivas
    const linea = new Linea(50, 50, 200, 200);
    const circunferencia = new Circunferencia(300, 100, 50);
    const elipse = new Elipse(400, 300, 80, 50);

    // Generar el contenido SVG como una cadena
    const contenidoSVG = `
        <svg xmlns="${svgNamespace}" width="500" height="500">
            ${linea.crearSVG()}
            ${circunferencia.crearSVG()}
            ${elipse.crearSVG()}
        </svg>
    `;

    // Insertar el contenido SVG en el contenedor
    svgCanvas.innerHTML = contenidoSVG;
}

// Llamada a la función para dibujar las primitivas
dibujarSVG();

