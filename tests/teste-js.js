
const editor = document.getElementById("editor");
let selectedDiv = null;
let startX, startY, startWidth, startHeight, startLeft, startTop;
let isResizing = false;
let isMoving = false;
let selectedHandles = [];

function createResizeHandles(div) {
    const positions = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'];
    positions.forEach(position => {
        const handle = document.createElement('div');
        handle.classList.add('resize-handle', position);
        handle.addEventListener('mousedown', (e) => startResizing(e, div, position));
        div.appendChild(handle);
    });
}

function startResizing(e, div, position) {
    isResizing = true;
    selectedHandles = [position];
    startX = e.clientX;
    startY = e.clientY;
    startWidth = div.offsetWidth;
    startHeight = div.offsetHeight;
    startLeft = div.offsetLeft;
    startTop = div.offsetTop;
    e.stopPropagation();
}

function startMoving(e, div) {
    isMoving = true;
    selectedDiv = div;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = div.offsetLeft;
    startTop = div.offsetTop;
    e.stopPropagation();
}

function moveDiv(e) {
    if (isMoving && selectedDiv) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        selectedDiv.style.left = `${startLeft + dx}px`;
        selectedDiv.style.top = `${startTop + dy}px`;
    }
}

function resizeDiv(e) {
    if (isResizing && selectedDiv) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (selectedHandles.includes('e')) {
            selectedDiv.style.width = `${startWidth + dx}px`;
        }
        if (selectedHandles.includes('s')) {
            selectedDiv.style.height = `${startHeight + dy}px`;
        }
        if (selectedHandles.includes('w')) {
            selectedDiv.style.left = `${startLeft + dx}px`;
            selectedDiv.style.width = `${startWidth - dx}px`;
        }
        if (selectedHandles.includes('n')) {
            selectedDiv.style.top = `${startTop + dy}px`;
            selectedDiv.style.height = `${startHeight - dy}px`;
        }
    }
}

function stopMovingOrResizing() {
    isResizing = false;
    isMoving = false;
}

function selectDiv(e) {
    if (e.target !== selectedDiv) {
        selectedDiv && selectedDiv.classList.remove('selected');
        selectedDiv = e.target;
        selectedDiv.classList.add('selected');
        createResizeHandles(selectedDiv);
    }
}

editor.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('resizable-div')) {
        selectDiv(e);
    } else {
        selectedDiv && selectedDiv.classList.remove('selected');
        selectedDiv = null;
    }
});

editor.addEventListener('mousemove', (e) => {
    if (isResizing) {
        resizeDiv(e);
    }
    if (isMoving && selectedDiv) {
        moveDiv(e);
    }
});

editor.addEventListener('mouseup', stopMovingOrResizing);
editor.addEventListener('mouseleave', stopMovingOrResizing);