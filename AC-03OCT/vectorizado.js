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
}

// Función para dibujar el polígono
function dibujarPoligono(ctx, puntos) {
    if (puntos.length === 0) return;

    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());

    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].getX(), puntos[i].getY());
    }
    ctx.closePath();
    ctx.strokeStyle = 'black'; // Color del borde del polígono
    ctx.stroke();
}

// Función para dibujar los puntos
function dibujarPuntos(ctx, puntos) {
    ctx.fillStyle = 'blue'; // Color de los puntos
    puntos.forEach(punto => {
        ctx.beginPath();
        ctx.arc(punto.getX(), punto.getY(), 5, 0, 2 * Math.PI); // Radio de 5
        ctx.fill();
    });
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

// Función para dibujar conexiones desde los puntos al centroide
function dibujarConexionesAlCentroide(ctx, puntos, centro) {
    if (puntos.length === 0 || !centro) return;

    ctx.beginPath();
    puntos.forEach(punto => {
        ctx.moveTo(punto.getX(), punto.getY());
        ctx.lineTo(centro.x, centro.y);
    });
    ctx.strokeStyle = 'red'; // Color de las conexiones
    ctx.lineWidth = 1;       // Grosor de las conexiones
    ctx.stroke();
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

// Función para generar un polígono aleatorio simple
function generarPoligonoAleatorio(canvasWidth, canvasHeight, margen = 50) {
    const puntos = [];
    const numPuntos = Math.floor(Math.random() * (20 - 3 + 1)) + 3; // Entre 3 y 20 puntos

    for (let i = 0; i < numPuntos; i++) {
        const x = Math.random() * (canvasWidth - 2 * margen) + margen;
        const y = Math.random() * (canvasHeight - 2 * margen) + margen;
        puntos.push(new Punto(x, y));
    }

    // Ordenar los puntos por ángulo desde el centroide
    const centroide = calcularCentroide(puntos);
    puntos.sort((a, b) => Math.atan2(a.getY() - centroide.y, a.getX() - centroide.x) - Math.atan2(b.getY() - centroide.y, b.getX() - centroide.x));

    return puntos;
}

// Variables globales para almacenar el polígono y centroide
let currentPuntos = [];
let currentCentro = null;

// Función para generar y dibujar un polígono aleatorio
function generarYDibujarPoligono() {
    const canvas = document.getElementById('canvas');
    if (!canvas.getContext) {
        alert('Tu navegador no soporta Canvas.');
        return;
    }
    const ctx = canvas.getContext('2d');

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generar un polígono
    const puntos = generarPoligonoAleatorio(canvas.width, canvas.height);
    
    // Calcular el centroide
    const centro = calcularCentroide(puntos);

    // Almacenar el polígono y centroide en variables globales
    currentPuntos = puntos;
    currentCentro = centro;

    // Dibujar el polígono
    dibujarPoligono(ctx, puntos);
    // Dibujar los puntos
    dibujarPuntos(ctx, puntos);

    // Determinar si el polígono es convexo o cóncavo
    const tipo = esConvexo(puntos) ? 'Convexo' : 'Cóncavo';
    document.getElementById('resultado').innerText = `El polígono es: ${tipo}`;
}

// Función para dibujar las conexiones
function dibujarConexionesFunc() {
    if (currentPuntos.length === 0 || !currentCentro) {
        alert('Primero debes generar un polígono.');
        return;
    }

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    dibujarConexionesAlCentroide(ctx, currentPuntos, currentCentro);
}

// Función para inicializar eventos
function init() {
    const generarBtn = document.getElementById('btnDibujar');
    generarBtn.addEventListener('click', generarYDibujarPoligono);

    const conexionesBtn = document.getElementById('btnConexiones');
    conexionesBtn.addEventListener('click', dibujarConexionesFunc);
}

// Ejecutar la inicialización después de cargar la página
window.onload = init;



