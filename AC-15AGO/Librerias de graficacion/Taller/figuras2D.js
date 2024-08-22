const coordinateTypeSelect = document.getElementById('coordinateType');
const positionXInput = document.getElementById('positionX');
const positionYInput = document.getElementById('positionY');
const polarCoordsDiv = document.getElementById('polarCoords');
const radiusInput = document.getElementById('radius');
const angleInput = document.getElementById('angle');
const shapeSelect = document.getElementById('shape');
const polygonSidesInput = document.getElementById('polygonSides');

coordinateTypeSelect.addEventListener('change', function() {
    const coordinateType = coordinateTypeSelect.value;
    if (coordinateType === 'polar') {
        positionXInput.disabled = true;
        positionYInput.disabled = true;
        polarCoordsDiv.style.display = 'block';
    } else {
        positionXInput.disabled = false;
        positionYInput.disabled = false;
        polarCoordsDiv.style.display = 'none';
    }
});

shapeSelect.addEventListener('change', function() {
    if (shapeSelect.value === 'polygon') {
        polygonSidesInput.disabled = false;
    } else {
        polygonSidesInput.disabled = true;
    }
});

document.getElementById('createBtn').addEventListener('click', function() {
    const shape = shapeSelect.value;
    const size = parseInt(document.getElementById('size').value);
    const color = document.getElementById('color').value;
    const borderColor = document.getElementById('borderColor').value;
    const borderWidth = parseInt(document.getElementById('borderWidth').value);
    const borderStyle = document.querySelector('input[name="borderStyle"]:checked').value;
    const rounded = document.getElementById('rounded').checked;
    const type = document.getElementById('type').value;
    const sides = parseInt(document.getElementById('polygonSides').value);

    let posX, posY;

    if (coordinateTypeSelect.value === 'polar') {
        const radius = parseInt(radiusInput.value);
        const angle = parseInt(angleInput.value) * (Math.PI / 180);
        posX = Math.cos(angle) * radius;
        posY = Math.sin(angle) * radius;
    } else {
        posX = parseInt(positionXInput.value);
        posY = parseInt(positionYInput.value);
    }

    if (type === 'svg') {
        const svgWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let figure;

        svgWrapper.setAttribute('width', size);
        svgWrapper.setAttribute('height', size);
        svgWrapper.style.position = 'absolute';
        svgWrapper.style.left = posX + 'px';
        svgWrapper.style.top = posY + 'px';

        if (shape === 'circle') {
            figure = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            figure.setAttribute('cx', size / 2);
            figure.setAttribute('cy', size / 2);
            figure.setAttribute('r', size / 2);
        } else if (shape === 'polygon') {
            figure = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            const points = [];
            for (let i = 0; i < sides; i++) {
                const x = size / 2 + (size / 2) * Math.cos((2 * Math.PI * i) / sides);
                const y = size / 2 + (size / 2) * Math.sin((2 * Math.PI * i) / sides);
                points.push(`${x},${y}`);
            }
            figure.setAttribute('points', points.join(' '));
        } else if (shape === 'ellipse') {
            figure = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            figure.setAttribute('cx', size / 2);
            figure.setAttribute('cy', size / 2);
            figure.setAttribute('rx', size / 2);
            figure.setAttribute('ry', size / 4);
        } else if (shape === 'square' || shape === 'rectangle') {
            figure = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            figure.setAttribute('points', `0,0 ${size},0 ${size},${shape === 'rectangle' ? size / 2 : size} 0,${shape === 'rectangle' ? size / 2 : size}`);
        } else if (shape === 'triangle') {
            figure = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            figure.setAttribute('points', `0,${size} ${size},${size} ${size / 2},0`);
        }

        figure.setAttribute('fill', color);
        figure.setAttribute('stroke', borderColor);
        figure.setAttribute('stroke-width', borderWidth);
        figure.setAttribute('stroke-dasharray', borderStyle === 'dashed' ? '4' : borderStyle === 'dotted' ? '1,2' : '0');

        if (rounded) {
            figure.setAttribute('rx', size / 10);
            figure.setAttribute('ry', size / 10);
        }

        svgWrapper.appendChild(figure);
        document.getElementById('svg-container').appendChild(svgWrapper);

    } else if (type === 'canvas') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = size;
        canvas.height = shape === 'rectangle' ? size / 2 : size;

        canvas.style.position = 'absolute';
        canvas.style.left = posX + 'px';
        canvas.style.top = posY + 'px';

        ctx.fillStyle = color;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;

        if (borderStyle === 'dashed') {
            ctx.setLineDash([6, 6]);
        } else if (borderStyle === 'dotted') {
            ctx.setLineDash([2, 2]);
        }

        ctx.beginPath();

        if (shape === 'circle') {
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        } else if (shape === 'polygon') {
            ctx.moveTo(size / 2 + (size / 2) * Math.cos(0), size / 2 + (size / 2) * Math.sin(0));
            for (let i = 1; i <= sides; i++) {
                ctx.lineTo(
                    size / 2 + (size / 2) * Math.cos((2 * Math.PI * i) / sides),
                    size / 2 + (size / 2) * Math.sin((2 * Math.PI * i) / sides)
                );
            }
            ctx.closePath();
        } else if (shape === 'ellipse') {
            ctx.ellipse(size / 2, size / 2, size / 2, size / 4, 0, 0, Math.PI * 2);
        } else if (shape === 'square' || shape === 'rectangle') {
            ctx.rect(0, 0, size, shape === 'rectangle' ? size / 2 : size);
        } else if (shape === 'triangle') {
            ctx.moveTo(0, size);
            ctx.lineTo(size, size);
            ctx.lineTo(size / 2, 0);
            ctx.closePath();
        }

        if (rounded) {
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
        }

        ctx.fill();
        ctx.stroke();

        document.getElementById('canvas-container').appendChild(canvas);
    }
});

document.getElementById('clearBtn').addEventListener('click', function() {
    const svgContainer = document.getElementById('svg-container');
    const canvasContainer = document.getElementById('canvas-container');

    while (svgContainer.firstChild) {
        svgContainer.removeChild(svgContainer.firstChild);
    }
    while (canvasContainer.firstChild) {
        canvasContainer.removeChild(canvasContainer.firstChild);
    }
});
