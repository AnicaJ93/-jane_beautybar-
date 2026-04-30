document.addEventListener("DOMContentLoaded", function () {
  // 1. Selektujemo sve potrebne elemente
  const slike = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const btnZatvori = document.querySelector(".close-lightbox");
  const btnNapred = document.querySelector(".next-btn");
  const btnNazad = document.querySelector(".prev-btn");

  let trenutniIndeks = 0;

  // 2. Funkcija koja menja sliku
  function osveziSliku(indeks) {
    if (indeks >= slike.length) indeks = 0;
    if (indeks < 0) indeks = slike.length - 1;

    trenutniIndeks = indeks;
    const novaPutanja = slike[trenutniIndeks].getAttribute("href");
    lightboxImg.src = novaPutanja;
  }

  // 3. Otvaranje slike na klik
  slike.forEach((slika, indeks) => {
    slika.addEventListener("click", function (e) {
      e.preventDefault();
      trenutniIndeks = indeks;
      osveziSliku(trenutniIndeks);
      lightbox.style.display = "flex";
    });
  });

  // 4. Komande za dugmad
  btnNapred.onclick = function (e) {
    e.stopPropagation();
    osveziSliku(trenutniIndeks + 1);
  };

  btnNazad.onclick = function (e) {
    e.stopPropagation();
    osveziSliku(trenutniIndeks - 1);
  };

  btnZatvori.onclick = function () {
    lightbox.style.display = "none";
  };

  // 5. Zatvaranje na klik sa strane
  lightbox.onclick = function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  };

  // 6. Bonus: Komande na tastaturi
  document.onkeydown = function (e) {
    if (lightbox.style.display === "flex") {
      if (e.keyCode === 39) osveziSliku(trenutniIndeks + 1); // Desno
      if (e.keyCode === 37) osveziSliku(trenutniIndeks - 1); // Levo
      if (e.keyCode === 27) lightbox.style.display = "none"; // Esc
    }
  };
});
