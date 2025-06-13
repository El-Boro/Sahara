document.addEventListener("DOMContentLoaded", () => {
      // Elementos de la verificación de edad
      const ageVerification = document.getElementById('age-verification');
      const mainContent = document.getElementById('main-content');
      const yesBtn = document.getElementById('yes-btn');
      const noBtn = document.getElementById('no-btn');

      // Manejar clic en "SÍ"
      yesBtn.addEventListener('click', () => {
        // Animación de salida de la pantalla de verificación
        ageVerification.classList.add('hidden');
        
        // Después de la animación, mostrar el contenido principal
        setTimeout(() => {
          mainContent.style.display = 'block';
        }, 800);
      });

      // Manejar clic en "NO"
      noBtn.addEventListener('click', () => {
        // Animación de salida
        ageVerification.classList.add('hidden');
        
        // Redirigir a otra página después de la animación
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
        });
      });

      // Sistema de login
      document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Ocultar botón de login y mostrar perfil
        loginBtn.classList.add("hidden");
        profileBtn.classList.remove("hidden");
        
        // Cambiar a la pestaña de perfil
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
        
        // Validar código: mínimo 5 caracteres alfanuméricos, único
        if (code.length >= 5 && /^[A-Z0-9]+$/.test(code) && !codeList.includes(code)) {
          // Actualizar puntos
          userPoints += 10;
          codeList.push(code);
          document.getElementById("points").textContent = userPoints;
          
          // Mostrar códigos ingresados
          document.getElementById("codeList").innerHTML = `
            <h3>Códigos ingresados:</h3>
            <ul>${codeList.map(c => `<li>${c}</li>`).join("")}</ul>
          `;
          
          // Verificar recompensas
          if (userPoints >= 250 && !rewards.includes("1 cerveza gratis")) {
            rewards.push("1 cerveza gratis");
          }
          if (userPoints >= 300 && !rewards.includes("Kit Sahara exclusivo")) {
            rewards.push("Kit Sahara exclusivo");
          }
          
          // Mostrar recompensas
          if (rewards.length > 0) {
            document.getElementById("rewardsList").innerHTML = `
              <h3>Recompensas:</h3>
              <ul>${rewards.map(r => `<li>${r}</li>`).join("")}</ul>
            `;
          }
        } else {
          // Código inválido o duplicado
          alert("Código inválido o ya ingresado. Por favor ingrese un código válido de al menos 5 caracteres alfanuméricos.");
        }
        
        // Limpiar campo de entrada
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
    });