/**
 * Jane Beauty Bar - Navigation Logic
 * Autor: Anica Janezic
 */

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const meni = document.querySelector(".meni");
  const navLinks = document.querySelectorAll(".meni a");
  const submenuItem = document.querySelector(".has-submenu");

  // 1. LOGIKA ZA HAMBURGER (MOBILNI)
  if (hamburger && meni) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      meni.classList.toggle("active");

      // Sprečava skrolovanje pozadine kad je meni otvoren
      if (meni.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });
  }

  // 2. LOGIKA ZA TABLET (OTVARANJE PODMENIJA NA DODIR)
  if (submenuItem) {
    submenuItem.addEventListener("click", function (e) {
      // Važi samo za tablete (601px - 1024px)
      if (window.innerWidth <= 1024 && window.innerWidth > 600) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle("active-submenu");
      }
    });
  }

  // 3. ZATVARANJE NA KLIK VAN MENIJA
  document.addEventListener("click", (e) => {
    if (submenuItem && !submenuItem.contains(e.target)) {
      submenuItem.classList.remove("active-submenu");
    }
  });

  // 4. ZATVARANJE MENIJA KADA SE KLIKNE NA KONKRETAN LINK
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const parentLi = link.parentElement;

      // Ne zatvaraj meni ako je kliknuto na "USLUGE" koje imaju podmeni
      if (parentLi.classList.contains("has-submenu")) {
        return;
      }

      // Za sve ostale linkove, zatvori navigaciju
      if (hamburger && meni) {
        hamburger.classList.remove("active");
        meni.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });
});

