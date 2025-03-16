// Cargar proyectos dinámicamente
document.addEventListener("DOMContentLoaded", function () {
    fetch("projects.json")
        .then((response) => response.json())
        .then((projects) => {
            const disenoContainer = document.getElementById("diseno-projects");
            const fotografiaContainer = document.getElementById("fotografia-projects");

            projects.forEach((project) => {
                const projectElement = document.createElement("div");
                projectElement.classList.add("project");

                projectElement.innerHTML = `
                    <a href="${project.link}">
                        <img src="${project.images[0]}" alt="${project.title}">
                        <div class="project-name">${project.title}</div>
                        <div class="project-date">${project.date}</div>
                    </a>
                `;

                if (project.category === "diseno") {
                    disenoContainer.appendChild(projectElement);
                } else if (project.category === "fotografia") {
                    fotografiaContainer.appendChild(projectElement);
                }
            });
        })
        .catch((error) => console.error("Error cargando proyectos:", error));
});
// Navegación móvil
function abrir() {
    document.getElementById('mobile-menu').classList.add('active');  // Activa el menú
}

function cerrar() {
    document.getElementById('mobile-menu').classList.remove('active');  // Desactiva el menú
}

// Desactivar clic derecho en toda la página
document.addEventListener('contextmenu', function (e) {
    e.preventDefault(); // Prevenir el menú contextual
});

// Activar efecto al hacer scroll
document.addEventListener('scroll', () => {
    const introSection = document.querySelector('.intro-section');
    if (window.scrollY > 0) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

// Lógica específica para burn-in.html (ajuste de galería)
if (document.querySelector('.gallery')) {
    window.addEventListener('load', () => {
        const gallery = document.querySelector('.gallery');
        const images = document.querySelectorAll('.gallery img');
        const gap = 10; // El mismo valor que el gap en CSS (en píxeles)

        // Calculamos la relación de aspecto de cada imagen
        const aspectRatios = Array.from(images).map(img => img.naturalWidth / img.naturalHeight);

        // Calculamos el ancho total que ocuparían las imágenes si tuvieran la misma altura
        const totalWidth = aspectRatios.reduce((sum, ratio) => sum + ratio, 0);

        // Calculamos el ancho disponible para las imágenes (restamos el gap)
        const availableWidth = gallery.clientWidth - (images.length - 1) * gap;

        // Ajustamos el ancho de cada imagen en función de su relación de aspecto
        images.forEach((img, index) => {
            const width = (aspectRatios[index] / totalWidth) * availableWidth;
            img.style.width = `${width}px`;
        });
    });
}