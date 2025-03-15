const fs = require('fs');
const path = require('path');

// Leer el archivo projects.json
const projects = JSON.parse(fs.readFileSync('projects.json', 'utf8'));

// Plantilla de proyecto (basada en burnin.html)
const projectTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Menú móvil -->
    <div id="mobile-menu">
        <a class="close" href="#" onClick="cerrar()"><img src="img/icons8-close.svg" width="30px" alt="x"></a>
        <a href="index.html">Graphic Design</a>
        <a href="photography.html">Photography</a>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Intro Section -->
        <div class="intro-section">    
            <a class="ivan" href="index.html">Iván Vallés/ Junior Art director</a>    
            <button class="burger" aria-label="Toggle navigation" onClick="abrir()">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </button>
            <div id="links">
                <a class="gd" href="index.html">Graphic Design </a>
                <a href="photography.html">Photography</a>
            </div>
        </div>

        <!-- Cuerpo del proyecto -->
        <div class="cuerpo">
            <h1>{{title}}</h1>
            {{#description}}
            <p>{{.}}</p>
            {{/description}}
            <div class="container">
                {{#images}}
                <img src="{{.}}" alt="{{title}}" class="image">
                {{/images}}
            </div>
        </div>

        <!-- Footer -->
        <footer>
            <p>© 2024 Iván Vallés Lorente. All rights reserved.</p>
        </footer>
    </div>

    <script>
        // Navegación móvil
        function abrir() {
            document.getElementById('mobile-menu').classList.add('active');
        }

        function cerrar() {
            document.getElementById('mobile-menu').classList.remove('active');
        }

        // Desactivar clic derecho
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        // Ajustar imágenes
        window.addEventListener('load', adjustImages);
        window.addEventListener('resize', adjustImages);
    </script>
</body>
</html>
`;

// Generar archivos HTML para cada proyecto
projects.forEach(project => {
    let html = projectTemplate
        .replace(/{{title}}/g, project.title)
        .replace(/{{#description}}([\s\S]*?){{\/description}}/g, (match, content) => {
            return project.description.map(desc => `<p>${desc}</p>`).join('');
        })
        .replace(/{{#images}}([\s\S]*?){{\/images}}/g, (match, content) => {
            return project.images.map(img => `<img src="${img}" alt="${project.title}" class="image">`).join('');
        });

    // Guardar el archivo HTML
    fs.writeFileSync(path.join(__dirname, project.link), html);
    console.log(`Archivo generado: ${project.link}`);
});// JavaScript Document