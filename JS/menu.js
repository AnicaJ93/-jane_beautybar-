/**
 * Jane Beauty Bar - Navigacioni meni
 * Autor: Anica Janezic
 */

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const meni = document.querySelector(".meni");
  const navLinks = document.querySelectorAll(".meni a");
  const submenuItem = document.querySelector(".has-submenu");

  // 1. OTVARANJE I ZATVARANJE MOBILNOG MENIJA
  if (hamburger && meni) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      hamburger.classList.toggle("active");
      meni.classList.toggle("active");

      // Zaključaj skrol pozadine dok je meni otvoren
      document.body.style.overflow = meni.classList.contains("active")
        ? "hidden"
        : "auto";
    });
  }

  // 2. LOGIKA ZA PODMENI (USLUGE) NA DODIR
  if (submenuItem) {
    submenuItem.addEventListener("click", function (e) {
      // Važi za telefone i tablete (ekrani manji od 1024px)
      if (window.innerWidth <= 1024) {
        // Ako podmeni još nije otvoren, prvi klik ga otvara
        if (!this.classList.contains("active-submenu")) {
          e.preventDefault();
          e.stopPropagation();
          this.classList.add("active-submenu");
        }
        // Drugi klik će normalno pratiti link ka usluge.html
      }
    });
  }

  // 3. ZATVARANJE NA KLIK BILO GDE VAN MENIJA
  document.addEventListener("click", (e) => {
    if (
      meni &&
      meni.classList.contains("active") &&
      !meni.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove("active");
      meni.classList.remove("active");
      document.body.style.overflow = "auto";
      if (submenuItem) submenuItem.classList.remove("active-submenu");
    }
  });

  // 4. AUTOMATSKO ZATVARANJE NAKON IZBORA LINKA
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const parentLi = link.parentElement;

      // Ne zatvaraj meni ako je kliknuto na "USLUGE" koje samo otvaraju podmeni
      if (
        parentLi.classList.contains("has-submenu") &&
        !parentLi.classList.contains("active-submenu")
      ) {
        return;
      }

      // Za sve ostale linkove (Početna, Galerija, Kontakt), zatvori sve
      if (hamburger && meni) {
        hamburger.classList.remove("active");
        meni.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });
});
