// Clase Punto con encapsulamiento
class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    setX(x) {
        this.#x = x;
    }

    setY(y) {
        this.#y = y;
    }
}

// Función para dibujar el polígono y las conexiones al centroide
function dibujarPoligono(ctx, puntos, centro) {
    if (puntos.length === 0) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpiar canvas
    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());

    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].getX(), puntos[i].getY());
    }
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Opcional: Rellenar el polígono con un color semitransparente
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
    ctx.fill();

    // Dibujar las conexiones desde cada punto al centroide
    ctx.beginPath();
    puntos.forEach(punto => {
        ctx.moveTo(punto.getX(), punto.getY());
        ctx.lineTo(centro.x, centro.y);
    });
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Dibujar el centroide
    ctx.beginPath();
    ctx.arc(centro.x, centro.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

// Función para calcular el producto cruzado
function productoCruz(p1, p2, p3) {
    const x1 = p2.getX() - p1.getX();
    const y1 = p2.getY() - p1.getY();
    const x2 = p3.getX() - p2.getX();
    const y2 = p3.getY() - p2.getY();
    return (x1 * y2) - (y1 * x2);
}

// Función para determinar si el polígono es convexo
function esConvexo(puntos) {
    if (puntos.length < 4) return true; // Triángulo siempre convexo

    let signo = 0;
    const n = puntos.length;

    for (let i = 0; i < n; i++) {
        const p0 = puntos[i];
        const p1 = puntos[(i + 1) % n];
        const p2 = puntos[(i + 2) % n];
        const cross = productoCruz(p0, p1, p2);

        if (cross !== 0) {
            if (signo === 0) {
                signo = cross > 0 ? 1 : -1;
            } else {
                if ((cross > 0 && signo === -1) || (cross < 0 && signo === 1)) {
                    return false; // Es cóncavo
                }
            }
        }
    }
    return true; // Es convexo
}

// Función para calcular la orientación de tres puntos
function orientacion(a, b, c) {
    const val = (b.getX() - a.getX()) * (c.getY() - a.getY()) - 
                (b.getY() - a.getY()) * (c.getX() - a.getX());
    if (val === 0) return 0; // Colinear
    return (val > 0) ? 1 : 2; // 1: Horario, 2: Anti-horario
}

// Función para verificar si dos segmentos de línea se cruzan
function segmentosCruzan(p1, p2, p3, p4) {
    const o1 = orientacion(p1, p2, p3);
    const o2 = orientacion(p1, p2, p4);
    const o3 = orientacion(p3, p4, p1);
    const o4 = orientacion(p3, p4, p2);

    // Condiciones generales
    if (o1 !== o2 && o3 !== o4) {
        return true;
    }

    // Casos especiales (no implementados para simplicidad)
    return false;
}

// Función para verificar que las líneas no se crucen
function noCruzanLineas(puntos) {
    const n = puntos.length;
    for (let i = 0; i < n; i++) {
        const p1 = puntos[i];
        const p2 = puntos[(i + 1) % n];

        for (let j = i + 1; j < n; j++) {
            // Evitar líneas adyacentes y la misma línea
            if (Math.abs(i - j) <= 1 || (i === 0 && j === n - 1)) {
                continue;
            }

            const p3 = puntos[j];
            const p4 = puntos[(j + 1) % n];

            if (segmentosCruzan(p1, p2, p3, p4)) {
                return false;
            }
        }
    }
    return true;
}

// Función para calcular el centroide de los puntos
function calcularCentroide(puntos) {
    let sumaX = 0;
    let sumaY = 0;
    const n = puntos.length;

    for (let i = 0; i < n; i++) {
        sumaX += puntos[i].getX();
        sumaY += puntos[i].getY();
    }

    return {
        x: sumaX / n,
        y: sumaY / n
    };
}

// Función para ordenar los puntos por ángulo desde el centroide
function ordenarPuntosPorAngulo(puntos) {
    const centro = calcularCentroide(puntos);

    // Calcular el ángulo de cada punto respecto al centro
    puntos.sort((a, b) => {
        const angA = Math.atan2(a.getY() - centro.y, a.getX() - centro.x);
        const angB = Math.atan2(b.getY() - centro.y, b.getX() - centro.x);
        return angA - angB;
    });

    return puntos;
}

// Función para generar un polígono aleatorio simple
function generarPoligonoAleatorio(numPuntos, canvasWidth, canvasHeight, margen = 50) {
    const puntos = [];

    for (let i = 0; i < numPuntos; i++) {
        const x = Math.random() * (canvasWidth - 2 * margen) + margen;
        const y = Math.random() * (canvasHeight - 2 * margen) + margen;
        puntos.push(new Punto(x, y));
    }

    // Ordenar los puntos por ángulo para evitar cruces
    ordenarPuntosPorAngulo(puntos);

    return puntos;
}

// Función principal para generar, verificar y dibujar el polígono
function generarYDibujarPoligono() {
    const canvas = document.getElementById('canvas');
    if (!canvas.getContext) {
        alert('Tu navegador no soporta Canvas.');
        return;
    }
    const ctx = canvas.getContext('2d');

    const numPuntosInput = document.getElementById('numPuntos');
    let numPuntos = parseInt(numPuntosInput.value);
    if (isNaN(numPuntos) || numPuntos < 3) numPuntos = 5; // Valor por defecto

    let puntos;
    let intentos = 0;
    const maxIntentos = 100;

    // Intentar generar un polígono que no cruce líneas
    do {
        puntos = generarPoligonoAleatorio(numPuntos, canvas.width, canvas.height);
        intentos++;
        if (intentos > maxIntentos) {
            alert('No se pudo generar un polígono simple después de varios intentos.');
            return;
        }
    } while (!noCruzanLineas(puntos));

    // Calcular el centroide
    const centro = calcularCentroide(puntos);

    // Dibujar el polígono y las conexiones al centroide
    dibujarPoligono(ctx, puntos, centro);

    // Determinar si es convexo o cóncavo
    const tipo = esConvexo(puntos) ? 'Convexo' : 'Cóncavo';
    document.getElementById('resultado').innerText = `El polígono es: ${tipo}`;
}

// Función para inicializar eventos
function init() {
    const generarBtn = document.getElementById('generarBtn');
    generarBtn.addEventListener('click', generarYDibujarPoligono);

    // Generar un polígono al cargar la página
    generarYDibujarPoligono();
}

// Ejecutar la inicialización después de cargar la página
window.onload = init;


