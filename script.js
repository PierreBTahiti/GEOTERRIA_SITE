const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
      mainNav.classList.remove("is-open");
    }
  });
}

const situations = {
  terrain: {
    kicker: "Mission type G1",
    title: "Terrain à bâtir : l'étude G1 de la loi ÉLAN",
    description: "Dans les zones exposées au retrait-gonflement des argiles (aléa moyen ou fort), la loi ÉLAN impose au vendeur d'un terrain constructible de fournir une étude géotechnique préalable. Elle signale les risques liés au sol avant que le projet ne soit dessiné.",
    secondaryDescription: "Vous pouvez vérifier l'exposition de votre parcelle sur le site public Géorisques (georisques.gouv.fr)."
  },
  hydrogeologie: {
    kicker: "Expertise hydrogéologique",
    title: "Je rencontre un problème d’eau sur le terrain",
    description: "Nappe proche, infiltration lente, ruissellement, source ou humidité persistante : une étude hydrogéologique aide à comprendre les circulations d’eau et leurs effets sur le projet.",
    secondaryDescription: "Selon la question, les investigations peuvent comprendre un suivi piézométrique, un essai de perméabilité ou un essai de pompage."
  },
  pollution: {
    kicker: "Expertise sites et sols pollués",
    title: "Mon terrain est potentiellement pollué",
    description: "Un ancien site industriel, une activité passée, des remblais ou une cuve peuvent justifier un diagnostic. L’objectif est de caractériser les sols et de vérifier leur compatibilité avec l’usage projeté.",
    secondaryDescription: "Le diagnostic s’appuie sur l’historique du site, les observations, les prélèvements et les analyses adaptées aux usages futurs."
  },
  construction: {
    kicker: "Mission type G2",
    title: "Concevoir des fondations adaptées à votre sol",
    description: "Une maison, une extension ou une piscine transmet des charges au terrain. Avant de construire, une étude de conception permet de choisir le bon type et la bonne profondeur de fondations. C'est le meilleur moyen d'éviter fissures et surcoûts en cours de chantier.",
    secondaryDescription: "Dans les zones concernées, le constructeur doit tenir compte d'une étude géotechnique ou appliquer des dispositions constructives forfaitaires."
  },
  desordres: {
    kicker: "Mission type G5",
    title: "Comprendre l'origine d'un désordre",
    description: "Des fissures peuvent avoir plusieurs causes : sécheresse, fuite, fondations, végétation. Un diagnostic géotechnique aide à identifier le mécanisme en jeu avant d'engager des réparations.",
    secondaryDescription: "Pour un dossier avec votre assureur, conservez photos datées, dates d'apparition et éventuels arrêtés de catastrophe naturelle."
  },
  professionnel: {
    kicker: "Mission type G3 / G4",
    title: "Un interlocuteur technique aux étapes clés du projet.",
    description: "Adaptation des fondations aux conditions rencontrées, supervision géotechnique d'exécution, échanges avec les bureaux d'études structure : nous pouvons en discuter selon votre opération.",
    secondaryDescription: "Missions G3 (étude et suivi d'exécution) et G4 (supervision) au sens de la norme NF P 94-500, selon le cadre contractuel."
  }
};

const situationButtons = document.querySelectorAll(".situation-option");
const situationDescription = document.querySelector("#situation-description");
let secondaryDescription = null;
if (situationDescription) {
  secondaryDescription = document.createElement("p");
  secondaryDescription.className = "situation-secondary-description";
  secondaryDescription.style.cssText = "margin: 0.35rem 0 1.5rem; padding: 0.75rem 1rem; border-left: 3px solid #c78b4b; background: #f3f0e9; font-family: Georgia, serif; font-size: 0.92em; line-height: 1.6;";
  situationDescription.insertAdjacentElement("afterend", secondaryDescription);
}

if (situationButtons.length) {
  situationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const situation = situations[button.dataset.situation];
      if (!situation) return;
      situationButtons.forEach((option) => {
        const selected = option === button;
        option.classList.toggle("is-active", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      document.querySelector("#situation-kicker").textContent = situation.kicker;
      document.querySelector("#situation-title").textContent = situation.title;
      situationDescription.textContent = situation.description;
      if (secondaryDescription) secondaryDescription.textContent = situation.secondaryDescription;
    });
  });

  const initialSituation = situations[document.querySelector(".situation-option.is-active")?.dataset.situation] || situations.terrain;
  if (situationDescription) situationDescription.textContent = initialSituation.description;
  if (secondaryDescription) secondaryDescription.textContent = initialSituation.secondaryDescription;
}

// Keep office addresses, service areas and map positions together for easy updates.
const agencyLocations = {
  "la-garde": {
    name: "Toulon",
    department: "83",
    region: "VAR · PROVENCE-ALPES-CÔTE D’AZUR",
    address: "42 Av. Irène et Jean Frédéric Joliot Curie, 83130 La Garde, France",
    area: "Toulon, Nice, St. Tropez, littoral méditerranéen et Corse",
    tel: "04 94 27 87 40",
    email: "contact@geoterria.fr",
    lat: 43.1416,
    lng: 6.0381
  },
  eguilles: {
    name: "Aix-en-Provence",
    department: "13",
    region: "BOUCHES-DU-RHÔNE · PROVENCE-ALPES-CÔTE D’AZUR",
    address: "320 rue Topaze Z.I Les Jalassières, 13510 EGUILLES, France",
    area: "Aix, Marseille, Provence, vallée du Rhône et jusqu’à Lyon",
    tel: "04 42 26 14 15",
    email: "contacteguilles@geoterria.com",
    lat: 43.5477,
    lng: 5.3585
  },
  toulouse: {
    name: "Toulouse",
    department: "31",
    region: "HAUTE-GARONNE · OCCITANIE",
    address: "24 Bd du libre Échange, 31650 Saint-Orens-de-Gameville, France",
    area: "Toulouse, Occitanie, Bordeaux et façade Atlantique",
    tel: "05 62 27 12 82",
    email: " kfagot@geoterria.com",
    lat: 43.5651,
    lng: 1.5268
  }
};

// Department codes grouped by agency. The selected agency is the only one highlighted.
const coverageDepartments = {
  "la-garde": ["04", "05", "06", "83", "2A", "2B"],
  eguilles: ["07", "13", "26", "30", "34", "43", "69", "84"],
  toulouse: ["09", "11", "12", "16", "19", "24", "31", "32", "33", "46", "47", "48", "65", "66", "81", "82", "87"]
};

const coverageStyles = {
  "la-garde": { color: "#3f8a73", fillColor: "#60aa91" },
  eguilles: { color: "#a86d48", fillColor: "#c48a62" },
  toulouse: { color: "#4d78a0", fillColor: "#6b99c1" }
};

let showCoverageForOffice = () => {};

const officeButtons = document.querySelectorAll(".office-pin");
if (officeButtons.length) {
  officeButtons.forEach((button) => {
    const office = agencyLocations[button.dataset.office];
    button.addEventListener("click", () => {
      const selectedOffice = agencyLocations[button.dataset.office];
      if (!selectedOffice) return;
      officeButtons.forEach((pin) => {
        const selected = pin === button;
        pin.setAttribute("aria-pressed", String(selected));
        pin.classList.toggle("is-active", selected);
      });
      document.querySelector("#office-region").textContent = selectedOffice.region;
      document.querySelector("#office-name").textContent = selectedOffice.name;
      document.querySelector("#office-address").textContent = selectedOffice.address;
      document.querySelector("#office-area").textContent = selectedOffice.area;
      document.querySelector("#office-tel").textContent = selectedOffice.tel;
      document.querySelector("#office-email").textContent = selectedOffice.email;
      showCoverageForOffice(button.dataset.office);
    });
  });

  const initialOffice = agencyLocations[document.querySelector(".office-pin.is-active")?.dataset.office] || agencyLocations["la-garde"];
  document.querySelector("#office-region").textContent = initialOffice.region;
  document.querySelector("#office-name").textContent = initialOffice.name;
  document.querySelector("#office-address").textContent = initialOffice.address;
  document.querySelector("#office-area").textContent = initialOffice.area;
  document.querySelector("#office-tel").textContent = initialOffice.tel;
  document.querySelector("#office-email").textContent = initialOffice.email;
}

if (window.L && document.querySelector("#leaflet-map")) {
  const map = L.map("leaflet-map", {
    scrollWheelZoom: true,
    zoomControl: false
  });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19
  }).addTo(map);

  const coverageLayers = {};
  showCoverageForOffice = (officeKey) => {
    Object.entries(coverageLayers).forEach(([key, layer]) => {
      if (key === officeKey) layer.addTo(map);
      else map.removeLayer(layer);
    });
  };

  fetch("https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson")
    .then((response) => {
      if (!response.ok) throw new Error(`GeoJSON request failed: ${response.status}`);
      return response.json();
    })
    .then((geojson) => {
      Object.entries(coverageDepartments).forEach(([officeKey, departmentCodes]) => {
        const style = coverageStyles[officeKey];
        coverageLayers[officeKey] = L.geoJSON(geojson, {
          filter: (feature) => departmentCodes.includes(String(feature.properties.code).toUpperCase()),
          style: {
            color: style.color,
            weight: 1.2,
            fillColor: style.fillColor,
            fillOpacity: 0.48
          }
        }).bindTooltip((layer) => {
          const code = String(layer.feature?.properties?.code || "").toUpperCase();
          return code ? `Département ${code}` : "Département";
        });
      });
      showCoverageForOffice(document.querySelector(".office-pin.is-active")?.dataset.office || "la-garde");
    })
    .catch((error) => console.warn("Impossible de charger les secteurs d’intervention.", error));

  const markers = Object.entries(agencyLocations).map(([key, office]) => {
    const marker = L.marker([office.lat, office.lng], {
      icon: L.divIcon({
        className: "office-marker-wrapper",
        html: `<span class="office-marker office-marker-${key}"></span>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      })
    }).addTo(map).bindTooltip(`Département ${office.department}`);
    marker.on("click", () => document.querySelector(`[data-office="${key}"]`)?.click());
    return marker;
  });
  map.fitBounds(L.latLngBounds([[41.2, -1.5], [46.6, 9.7]]).pad(0.04));
}

document.querySelectorAll("[data-other-target]").forEach((select) => {
  const detail = document.getElementById(select.dataset.otherTarget);
  const input = detail?.querySelector("input");
  if (!(select instanceof HTMLSelectElement) || !detail || !(input instanceof HTMLInputElement)) return;

  const updateDetail = () => {
    const showDetail = select.value === "other";
    detail.hidden = !showDetail;
    input.required = showDetail;
    if (!showDetail) input.value = "";
  };
  select.addEventListener("change", updateDetail);
  updateDetail();
});

const form = document.querySelector("#project-form");
if (form instanceof HTMLFormElement) {
  const formError = form.querySelector("#form-error");
  const formNotice = form.querySelector("#form-notice");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formNotice.hidden = true;
    const invalidControl = [...form.querySelectorAll("[required]")].find((control) => !control.checkValidity());
    if (invalidControl) {
      formError.textContent = invalidControl.type === "checkbox"
        ? "Votre accord est nécessaire pour traiter votre demande."
        : "Veuillez compléter les champs obligatoires avec des informations valides.";
      invalidControl.focus();
      return;
    }

    formError.textContent = "";
    formNotice.hidden = false;
    formNotice.textContent = "Démonstration terminée : vos informations n’ont pas été envoyées ni enregistrées. Connectez un service de traitement sécurisé avant toute mise en production.";
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
