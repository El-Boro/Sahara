document.addEventListener("DOMContentLoaded", () => {
  // Elementos de la verificación de edad
  const ageVerification = document.getElementById("age-verification");
  const mainContent = document.getElementById("main-content");

  document.querySelectorAll(".event-card button").forEach((button) => {
    button.addEventListener("click", function () {
      const link = this.getAttribute("data-link");
      if (link) {
        window.open(link, "_blank"); // Abre en nueva pestaña
        // window.location.href = link; // Para abrir en la misma pestaña
      }
    });
  });

  // Manejar clic en "SÍ"
  const checkDniBtn = document.getElementById("check-dni-btn");
  const dniInput = document.getElementById("dni-input");

  checkDniBtn.addEventListener("click", () => {
    const dniStr = dniInput.value.trim();
    const dni = parseInt(dniStr, 10);

    if (!isNaN(dni) && dniStr.length >= 7 && dniStr.length <= 8) {
      if (dni >= 48000000) {
        ageVerification.classList.add("hidden");
        setTimeout(() => {
          window.location.href =
            "https://www.tapintoyourbeer.com/agegate?destination=";
        }, 800);
      } else {
        ageVerification.classList.add("hidden");
        setTimeout(() => {
          mainContent.style.display = "block";
          document.body.classList.add("age-verified");
        }, 800);
      }
    } else {
      alert("Por favor ingresá un número de DNI válido de 7 u 8 cifras.");
    }
  });

  // Resto del código de la aplicación
  const tabs = document.querySelectorAll(".tabs button");
  const contents = document.querySelectorAll(".tab-content");
  const loginBtn = document.querySelector('[data-tab="login"]');
  const profileBtn = document.querySelector('[data-tab="profile"]');

  // Navegación por pestañas
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Desactivar todas las pestañas
      contents.forEach((content) => content.classList.remove("active"));

      // Activar la pestaña seleccionada
      document.getElementById(tab.dataset.tab).classList.add("active");

      // Reiniciar animaciones para la pestaña de proceso
      if (tab.dataset.tab === "process") {
        restartProcessAnimations();
      }

      // Actualizar posición en el ranking al entrar a la pestaña de ranking
      if (tab.dataset.tab === "ranking") {
        const sortedRanking = [...rankingData].sort(
          (a, b) => b.score - a.score
        );

        if (userLoggedIn) {
          let position =
            sortedRanking.findIndex((user) => userPoints >= user.score) + 1;

          document.getElementById("user-position").innerHTML = `
      Se encuentra en la posición #${position}<br>
      ¡Participas por un sorteo exclusivo de un viaje de esquí en Bariloche!
    `;
        } else {
          document.getElementById("user-position").innerHTML = `
      Se encuentra en la posición #0<br>
      ¡Inicia sesión para participar por sorteos exclusivos!
    `;
        }
      }
    });
  });

  // Sistema de login
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("usernameInput").value.trim();
    if (username.length === 0) return;

    loginBtn.classList.add("hidden");
    profileBtn.classList.remove("hidden");
    document.getElementById("profile").classList.add("active");
    document.getElementById("login").classList.remove("active");

    userLoggedIn = true;

    // Mostrar nombre y puntos en Mi Ranking
    document.getElementById("ranking-user-name").textContent = username;
    document.getElementById(
      "ranking-user-points"
    ).textContent = `${userPoints} pts`;

    // Ordenar ranking de mayor a menor por puntos
    const sortedRanking = [...rankingData].sort((a, b) => b.score - a.score);

    // Calcular posición comparando los puntos del usuario
    let position =
      sortedRanking.findIndex((user) => userPoints >= user.score) + 1;

    document.getElementById("user-position").innerHTML = `
  Se encuentra en la posición #${position}<br>
  ¡Participa por un sorteo exclusivo!
`;
  });

  // Datos de usuario
  let userPoints = 240;
  const rewards = [];
  const codeList = [];
  let userLoggedIn = false; // NUEVO

  // Mostrar posición por defecto si no se ha iniciado sesión
  const userPositionElement = document.getElementById("user-position");
  if (userPositionElement) {
    userPositionElement.innerHTML = `
    Se encuentra en la posición #0<br>
    ¡inicia sesión para poder participar en sorteos exclusivos!
  `;
  }

  // Manejo de códigos
  document.getElementById("codeForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("codeInput");
    const code = input.value.trim().toUpperCase();

    if (
      code.length >= 5 &&
      /^[A-Z0-9]+$/.test(code) &&
      !codeList.includes(code)
    ) {
      userPoints += 10;
      codeList.push(code);
      document.getElementById("points").textContent = userPoints;

      const rankingPts = document.getElementById("ranking-user-points");
      if (rankingPts) rankingPts.textContent = `${userPoints} pts`;

      document.getElementById("codeList").innerHTML = `
        <h3>Códigos ingresados:</h3>
        <ul>${codeList.map((c) => `<li>${c}</li>`).join("")}</ul>
      `;

      if (userPoints >= 250 && !rewards.includes("1 cerveza gratis")) {
        rewards.push("1 cerveza gratis");
      }
      if (userPoints >= 300 && !rewards.includes("Kit Sahara exclusivo")) {
        rewards.push("Kit Sahara exclusivo");
      }

      if (rewards.length > 0) {
        document.getElementById("rewardsList").innerHTML = `
          <h3>Recompensas:</h3>
          <ul>${rewards.map((r) => `<li>${r}</li>`).join("")}</ul>
        `;
      }
    } else {
      alert(
        "Código inválido o ya ingresado. Por favor ingrese un código válido de al menos 5 caracteres alfanuméricos."
      );
    }

    input.value = "";
  });

  // Cargar top 10
  const rankingList = document.getElementById("rankingList");
  const rankingData = [
    { name: "Lucas Micucci", score: 980 },
    { name: "Zahira Ramirez", score: 950 },
    { name: "Lucas Martinez", score: 920 },
    { name: "Camila Pantuso", score: 900 },
    { name: "Maximiliano Otharán", score: 870 },
    { name: "Julieta Riquelme", score: 850 },
    { name: "Nicolás Tricker", score: 820 },
    { name: "Tobías Jensen", score: 800 },
    { name: "Nicolás Montalivet", score: 780 },
    { name: "Lucas Luján", score: 760 },
    { name: "Valentina Ríos", score: 750 },
    { name: "Martina Ferreyra", score: 745 },
    { name: "Agustín Ramírez", score: 740 },
    { name: "Camila Ortiz", score: 735 },
    { name: "Juan Pablo Torres", score: 730 },
    { name: "Milagros Medina", score: 725 },
    { name: "Tomás Guzmán", score: 720 },
    { name: "Catalina Núñez", score: 715 },
    { name: "Mateo Herrera", score: 710 },
    { name: "Lucía Delgado", score: 705 },
    { name: "Franco Aguirre", score: 700 },
    { name: "Lautaro Sosa", score: 695 },
    { name: "Julieta Ibarra", score: 690 },
    { name: "Emilia Acosta", score: 685 },
    { name: "Facundo Vera", score: 680 },
    { name: "Sofía Salazar", score: 675 },
    { name: "Gonzalo Rivas", score: 670 },
    { name: "Bruno Carrizo", score: 665 },
    { name: "Renata Paredes", score: 660 },
    { name: "Ramiro Pereyra", score: 655 },
    { name: "Paula Blanco", score: 650 },
    { name: "Lucas Montenegro", score: 645 },
    { name: "Malena Cabrera", score: 640 },
    { name: "Benjamín Ocampo", score: 635 },
    { name: "Juliana Palacios", score: 630 },
    { name: "Sebastián Oliva", score: 625 },
    { name: "Martín Gutiérrez", score: 620 },
    { name: "Valeria Peña", score: 615 },
    { name: "Julián Bravo", score: 610 },
    { name: "Florencia Vargas", score: 605 },
    { name: "Andrea Castro", score: 600 },
    { name: "Maximiliano Rojas", score: 595 },
    { name: "Brenda Gómez", score: 590 },
    { name: "Federico Ponce", score: 585 },
    { name: "Daniela Sánchez", score: 580 },
    { name: "Cristian Barrios", score: 575 },
    { name: "Antonella Díaz", score: 570 },
    { name: "Ezequiel Ayala", score: 565 },
    { name: "Melina Figueroa", score: 560 },
    { name: "Ángel Correa", score: 555 },
    { name: "Tatiana Herrera", score: 550 },
    { name: "Iván Torres", score: 545 },
    { name: "Micaela Benítez", score: 540 },
    { name: "Ignacio Luna", score: 535 },
    { name: "Agustina Reynoso", score: 530 },
    { name: "Enzo Pereyra", score: 525 },
    { name: "Ailén Romero", score: 520 },
    { name: "Thiago Morales", score: 515 },
    { name: "Clara Domínguez", score: 510 },
    { name: "Axel Medina", score: 505 },
    { name: "Rocío Franco", score: 500 },
    { name: "Nahuel Navarro", score: 495 },
    { name: "Eva Aranda", score: 490 },
    { name: "Kevin Giménez", score: 485 },
    { name: "Luna Ferreira", score: 480 },
    { name: "Simón Cabrera", score: 475 },
    { name: "Zoe Roldán", score: 470 },
    { name: "Joaquín Leiva", score: 465 },
    { name: "Abril Suárez", score: 460 },
    { name: "Leonel Paredes", score: 455 },
    { name: "Josefina Molina", score: 450 },
    { name: "Tobías Vázquez", score: 445 },
    { name: "Emma Robles", score: 440 },
    { name: "Felipe Márquez", score: 435 },
    { name: "Lara Méndez", score: 430 },
    { name: "Matías Cáceres", score: 425 },
    { name: "Isabela Ríos", score: 420 },
    { name: "Damián Aguero", score: 415 },
    { name: "Alma Peralta", score: 410 },
    { name: "Abel Sánchez", score: 405 },
    { name: "Renzo Cruz", score: 400 },
    { name: "Josefina Esquivel", score: 395 },
    { name: "Camilo Domínguez", score: 390 },
    { name: "Candela Gaitán", score: 385 },
    { name: "Luciano Roldán", score: 380 },
    { name: "Martina Iglesias", score: 375 },
    { name: "Alan Bustos", score: 370 },
    { name: "Selena Ojeda", score: 365 },
    { name: "Nahuel Castro", score: 360 },
    { name: "Maite Ferreyra", score: 355 },
    { name: "Ulises Ibáñez", score: 350 },
    { name: "Melisa Ledesma", score: 345 },
    { name: "Ivana Torres", score: 340 },
    { name: "Nicolás Cordero", score: 335 },
    { name: "Victoria Sánchez", score: 330 },
    { name: "Elías Miranda", score: 325 },
    { name: "Gabriela Burgos", score: 320 },
    { name: "Rodrigo Toledo", score: 315 },
    { name: "Isabella Carranza", score: 310 },
    { name: "Brian Ledesma", score: 305 },
    { name: "Luisina Rodríguez", score: 300 },
    { name: "Lucio Arce", score: 295 },
    { name: "Yamila Ponce", score: 290 },
    { name: "Gabriel Cáceres", score: 285 },
    { name: "Bianca Lucero", score: 280 },
    { name: "Diego Alanis", score: 275 },
    { name: "Sol Villarreal", score: 270 },
    { name: "Bruno González", score: 265 },
    { name: "Miranda Paz", score: 260 },
    { name: "Axel Quiroga", score: 255 },
    { name: "Juana Luján", score: 250 },
    { name: "Manuel Prado", score: 245 },
    { name: "Camila Rivas", score: 240 },
  ];

  if (rankingList) {
    const top10 = rankingData.slice(0, 10); // Obtener solo los primeros 10

    rankingList.innerHTML = top10
      .map(
        (user, index) => `
      <div class="ranking-entry">
        <span>#${index + 1} - ${user.name}</span>
        <span>${user.score} pts</span>
      </div>
    `
      )
      .join("");
  }

  // Función para reiniciar animaciones del proceso
  function restartProcessAnimations() {
    const steps = document.querySelectorAll(".step");
    steps.forEach((step) => {
      // Resetear animación
      step.style.animation = "none";
      step.style.opacity = "0";
      step.style.transform = "translateY(20px)";

      // Forzar reflow
      void step.offsetWidth;

      // Reactivar animación con retrasos
      step.style.animation = "";
    });
  }

  const followForm = document.getElementById("followForm");
  const followCodeInput = document.getElementById("followCodeInput");

  if (followForm) {
    followForm.addEventListener("submit", (e) => {
      e.preventDefault(); // evita el refresh
      const code = followCodeInput.value.trim();

      if (code !== "") {
        // Oculta todas las secciones
        document.querySelectorAll(".tab-content").forEach((section) => {
          section.classList.remove("active");
        });

        // Muestra la sección de seguimiento
        document.getElementById("tracking").classList.add("active");
      }
    });
  }

  const dateSpan = document.getElementById("delivery-date");
  if (dateSpan) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    dateSpan.textContent = formattedDate;
  }

  const saharaTitle = document.getElementById("sahara-title");
  const allTabs = document.querySelectorAll(".tab-content");

  saharaTitle.addEventListener("click", () => {
    allTabs.forEach((tab) => tab.classList.remove("active"));
    document.getElementById("firstscreen").classList.add("active");
  });
});
