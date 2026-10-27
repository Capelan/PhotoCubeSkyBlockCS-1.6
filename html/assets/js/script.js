const cube = document.getElementById("cube")

let rotX = 0,
    rotY = 0 // текущие углы

let dragging = false

let lastX = 0,
    lastY = 0

const SENS = 0.25 // чувствительность мыши

function apply() {
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`
}

// Мышь
document.addEventListener("mousedown", (e) => {
    dragging = true
    lastX = e.clientX
    lastY = e.clientY
    document.body.classList.add("dragging")
})

document.addEventListener("mouseup", () => {
    dragging = false
    document.body.classList.remove("dragging")
})

document.addEventListener("mousemove", (e) => {
    if (!dragging) return

    const dx = e.clientX - lastX
    const dy = e.clientY - lastY

    lastX = e.clientX
    lastY = e.clientY

    rotY += dx * SENS
    rotX -= dy * SENS

    // Ограничиваем обзор вверх/вниз
    rotX = Math.max(-89, Math.min(89, rotX))
    apply()
})

// Тач (для смартфона)
document.addEventListener(
    "touchstart", (e) => {
        if (e.touches.length !== 1) return
        dragging = true
        lastX = e.touches[0].clientX
        lastY = e.touches[0].clientY
    },
    { passive: true }
)

document.addEventListener("touchend", () => (dragging = false))

document.addEventListener(
    "touchmove", (e) => {
        if (!dragging || e.touches.length !== 1) return
        
        // Отменяем стандартный скролл страницы при перетаскивании куба
        if (e.cancelable) e.preventDefault(); 

        const t = e.touches[0]
        const dx = t.clientX - lastX;
        const dy = t.clientY - lastY;

        lastX = t.clientX
        lastY = t.clientY

        rotY += dx * SENS
        rotX -= dy * SENS

        rotX = Math.max(-89, Math.min(89, rotX))

        apply()
    },
    { passive: false }
)

// Колесо — изменение перспективы
const scene = document.querySelector(".scene")
let persp = 800

document.addEventListener(
    "wheel", (e) => {
        persp = Math.max(200, Math.min(2000, persp + e.deltaY * 0.5))
        scene.style.perspective = persp + "px"
    },
    { passive: true }
)

apply()