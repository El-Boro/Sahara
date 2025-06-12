document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabs button");
  const contents = document.querySelectorAll(".tab-content");
  const loginBtn = document.querySelector('[data-tab="login"]');
  const profileBtn = document.querySelector('[data-tab="profile"]');

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      contents.forEach((content) => content.classList.remove("active"));
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    loginBtn.classList.add("hidden");
    profileBtn.classList.remove("hidden");
    document.getElementById("profile").classList.add("active");
    document.getElementById("login").classList.remove("active");
  });

  const rankingData = [
    { name: "Juan Pérez", score: 980 },
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

  const rankingList = document.getElementById("rankingList");
  rankingData.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} - ${user.score} pts`;
    rankingList.appendChild(li);
  });

  let userPoints = 240;
  const rewards = [];
  const codeList = [];
  document.getElementById("codeForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("codeInput");
    const code = input.value.trim().toUpperCase();
    if (code.length >= 5 && /^[A-Z0-9]+$/.test(code) && !codeList.includes(code)) {
      userPoints += 10;
      codeList.push(code);
      document.getElementById("points").textContent = userPoints;

      let codeListDiv = document.getElementById("codeList");
      codeListDiv.innerHTML = "<h3>Códigos ingresados:</h3><ul>" +
        codeList.map(c => `<li>${c}</li>`).join("") + "</ul>";

      const rewardList = document.getElementById("rewardsList");
      if (userPoints >= 250 && !rewards.includes("1 cerveza gratis")) {
        rewards.push("1 cerveza gratis");
      }
      if (userPoints >= 300 && !rewards.includes("Kit Sahara exclusivo")) {
        rewards.push("Kit Sahara exclusivo");
      }
      if (rewards.length > 0) {
        rewardList.innerHTML = "<h3>Recompensas:</h3><ul>" +
          rewards.map(r => `<li>${r}</li>`).join("") + "</ul>";
      }
    }
    input.value = "";
  });
});

// Cargar top 10 en modo más vistoso
const ranking = document.getElementById("rankingList");
if (ranking) {
  const data = [
    { name: "Juan Pérez", score: 980 },
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
  ranking.innerHTML = data.map(u => 
    `<div class="ranking-entry"><span>${u.name}</span><span>${u.score} pts</span></div>`
  ).join("");
}
