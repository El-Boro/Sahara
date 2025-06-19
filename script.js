document.addEventListener("DOMContentLoaded", () => {
  // Elementos de la verificación de edad
  const ageVerification = document.getElementById('age-verification');
  const mainContent = document.getElementById('main-content');
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');

  document.querySelectorAll('.event-card button').forEach(button => {
  button.addEventListener('click', function() {
    const link = this.getAttribute('data-link');
    if (link) {
      window.open(link, '_blank'); // Abre en nueva pestaña
      // window.location.href = link; // Para abrir en la misma pestaña
    }
  });
});

  // Manejar clic en "SÍ"
  yesBtn.addEventListener('click', () => {
    ageVerification.classList.add('hidden');
    setTimeout(() => {
      mainContent.style.display = 'block';
      document.body.classList.add('age-verified');
    }, 800);
  });

  // Manejar clic en "NO"
  noBtn.addEventListener('click', () => {
    ageVerification.classList.add('hidden');
    setTimeout(() => {
      window.location.href = 'https://www.tapintoyourbeer.com/agegate?destination=';
    }, 800);
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
    });
  });

  // Sistema de login
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    loginBtn.classList.add("hidden");
    profileBtn.classList.remove("hidden");
    document.getElementById("profile").classList.add("active");
    document.getElementById("login").classList.remove("active");
  });

  // Datos de usuario
  let userPoints = 240;
  const rewards = [];
  const codeList = [];
  
  // Manejo de códigos
  document.getElementById("codeForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("codeInput");
    const code = input.value.trim().toUpperCase();
    
    if (code.length >= 5 && /^[A-Z0-9]+$/.test(code) && !codeList.includes(code)) {
      userPoints += 10;
      codeList.push(code);
      document.getElementById("points").textContent = userPoints;
      
      document.getElementById("codeList").innerHTML = `
        <h3>Códigos ingresados:</h3>
        <ul>${codeList.map(c => `<li>${c}</li>`).join("")}</ul>
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
          <ul>${rewards.map(r => `<li>${r}</li>`).join("")}</ul>
        `;
      }
    } else {
      alert("Código inválido o ya ingresado. Por favor ingrese un código válido de al menos 5 caracteres alfanuméricos.");
    }
    
    input.value = "";
  });

  // Cargar top 10
  const rankingList = document.getElementById("rankingList");
  const rankingData = [
    { name: "Lucas Micucci", score: 980 },
    { name: "Lucía Gómez", score: 950 },
    { name: "Carlos Díaz", score: 920 },
    { name: "María López", score: 900 },
    { name: "Pedro Fernández", score: 870 },
    { name: "Ana Morales", score: 850 },
    { name: "Gonzalo Torres", score: 820 },
    { name: "Camila Romero", score: 800 },
    { name: "Martín Ruiz", score: 780 },
    { name: "Sofía Herrera", score: 760 },
  ];
  
  if (rankingList) {
    rankingList.innerHTML = rankingData.map(user => `
      <div class="ranking-entry">
        <span>${user.name}</span>
        <span>${user.score} pts</span>
      </div>
    `).join("");
  }

  // Función para reiniciar animaciones del proceso
  function restartProcessAnimations() {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
      // Resetear animación
      step.style.animation = 'none';
      step.style.opacity = '0';
      step.style.transform = 'translateY(20px)';
      
      // Forzar reflow
      void step.offsetWidth;
      
      // Reactivar animación con retrasos
      step.style.animation = '';
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
      day: "numeric"
    });
    dateSpan.textContent = formattedDate;
  }

  const saharaTitle = document.getElementById("sahara-title");
  const allTabs = document.querySelectorAll(".tab-content");

  saharaTitle.addEventListener("click", () => {
    allTabs.forEach(tab => tab.classList.remove("active"));
    document.getElementById("firstscreen").classList.add("active");
  });
});