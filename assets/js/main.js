<<<<<<< HEAD
//==============================
// CARREGAR COMPONENTES
//==============================

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        element.innerHTML = await response.text();

    } catch (error) {

        console.error("Erro ao carregar:", file);

    }

}

//==============================
// CURSOR
//==============================

function initCursor() {

    const cursor = document.querySelector(".cursor");

    if (!cursor) return;

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

    document.querySelectorAll("a, button, .service-card").forEach(item => {

        item.addEventListener("mouseenter", () => {

            cursor.classList.add("hover");

        });

        item.addEventListener("mouseleave", () => {

            cursor.classList.remove("hover");

        });

    });

}

//==============================
// PARTÍCULAS
//==============================

function createParticles() {

    const snow = document.createElement("div");

    snow.id = "snow";

    document.body.appendChild(snow);

    for (let i = 0; i < 30; i++) {

        const particle = document.createElement("span");

        particle.className = "snow";

        particle.style.left = Math.random() * 100 + "vw";

        particle.style.animationDuration = (8 + Math.random() * 8) + "s";

        particle.style.animationDelay = Math.random() * 10 + "s";

        particle.style.opacity = Math.random() * 0.7 + 0.2;

        particle.style.transform = `scale(${Math.random() * 2 + 0.5})`;

        snow.appendChild(particle);

    }

}

//==============================
// INICIAR SITE
//==============================

window.onload = async () => {

    await loadComponent("navbar", "assets/components/navbar.html");

    await loadComponent("header", "assets/components/header.html");

    await loadComponent("cards", "assets/components/cards.html");

    await loadComponent("contato", "assets/pages/contato.html");

    await loadComponent("footer", "assets/components/footer.html");

    initCursor();

    createParticles();

=======
//==============================
// CARREGAR COMPONENTES
//==============================

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        element.innerHTML = await response.text();

    } catch (error) {

        console.error("Erro ao carregar:", file);

    }

}

//==============================
// CURSOR
//==============================

function initCursor() {

    const cursor = document.querySelector(".cursor");

    if (!cursor) return;

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

    document.querySelectorAll("a, button, .service-card").forEach(item => {

        item.addEventListener("mouseenter", () => {

            cursor.classList.add("hover");

        });

        item.addEventListener("mouseleave", () => {

            cursor.classList.remove("hover");

        });

    });

}

//==============================
// PARTÍCULAS
//==============================

function createParticles() {

    const snow = document.createElement("div");

    snow.id = "snow";

    document.body.appendChild(snow);

    for (let i = 0; i < 30; i++) {

        const particle = document.createElement("span");

        particle.className = "snow";

        particle.style.left = Math.random() * 100 + "vw";

        particle.style.animationDuration = (8 + Math.random() * 8) + "s";

        particle.style.animationDelay = Math.random() * 10 + "s";

        particle.style.opacity = Math.random() * 0.7 + 0.2;

        particle.style.transform = `scale(${Math.random() * 2 + 0.5})`;

        snow.appendChild(particle);

    }

}

//==============================
// INICIAR SITE
//==============================

window.onload = async () => {

    await loadComponent("navbar", "assets/components/navbar.html");

    await loadComponent("header", "assets/components/header.html");

    await loadComponent("cards", "assets/components/cards.html");

    await loadComponent("contato", "assets/pages/contato.html");

    await loadComponent("footer", "assets/components/footer.html");

    initCursor();

    createParticles();

>>>>>>> 376630f8cc9561add2abd3463d9dde4049b5fb7a
};