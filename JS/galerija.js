document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const slike = Array.from(document.querySelectorAll(".gallery-item"));
  const btnNapred = document.querySelector(".next-btn");
  const btnNazad = document.querySelector(".prev-btn");
  const btnZatvori = document.querySelector(".close-lightbox");

  let trenutniIndeks = 0;

  // Funkcija koja menja sliku i osigurava da indeks ostane između 0 i 8
  function promeniSliku(noviIndeks) {
    // Matematika za 9 slika (kruženje: 8 + 1 ide na 0, 0 - 1 ide na 8)
    trenutniIndeks = (noviIndeks + slike.length) % slike.length;

    const novaPutanja = slike[trenutniIndeks].getAttribute("href");
    lightboxImg.src = novaPutanja;

    console.log("Prikazujem sliku broj:", trenutniIndeks + 1); // Pomoć za debagovanje
  }

  // Otvaranje lightbox-a na klik
  slike.forEach((slika, i) => {
    slika.addEventListener("click", function (e) {
      e.preventDefault();
      trenutniIndeks = i; // Postavljamo tačan indeks kliknute slike
      promeniSliku(trenutniIndeks);
      lightbox.style.display = "flex";
    });
  });

  // Navigacija - Koristimo 'onclick' da bismo pregazili sve stare event-e
  btnNapred.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    promeniSliku(trenutniIndeks + 1);
  };

  btnNazad.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    promeniSliku(trenutniIndeks - 1);
  };

  // Zatvaranje na X ili na klik sa strane
  const ugasi = () => {
    lightbox.style.display = "none";
  };
  btnZatvori.onclick = ugasi;
  lightbox.onclick = (e) => {
    if (e.target === lightbox) ugasi();
  };

  // Tastatura
  document.onkeydown = function (e) {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") promeniSliku(trenutniIndeks + 1);
      if (e.key === "ArrowLeft") promeniSliku(trenutniIndeks - 1);
      if (e.key === "Escape") ugasi();
    }
  };
});
  // --- DODATAK ZA SWIPE (PREVLAČENJE PRSTOM) ---
  let startX = 0;
  let endX = 0;

  lightbox.addEventListener("touchstart", function (e) {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", function (e) {
    endX = e.changedTouches[0].screenX;
    obradiSwipe();
  }, { passive: true });

  function obradiSwipe() {
    const pragOsetljivosti = 50; // Koliko piksela prst mora da se pomeri
    
    if (endX < startX - pragOsetljivosti) {
      // Prevlačenje ulevo -> sledeća slika
      promeniSliku(trenutniIndeks + 1);
    }
    
    if (endX > startX + pragOsetljivosti) {
      // Prevlačenje udesno -> prethodna slika
      promeniSliku(trenutniIndeks - 1);
    }
  }
