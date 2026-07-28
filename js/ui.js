const ui = {
    navigation: document.querySelector(".nav-links"),
    heroTitle: document.querySelector(".hero h1"),
    heroText: document.querySelector(".hero p"),
    mission: document.querySelector("[data-mission]"),
    vision: document.querySelector("[data-vision]"),
    values: document.querySelector(".value-grid"),
    products: document.querySelector(".product-grid"),
    targets: document.querySelector(".target-grid"),
    distribution: document.querySelector(".distribution-grid"),
    marketing: document.querySelector(".marketing-grid"),
    footerTitle: document.querySelector(".site-footer h2"),
    footerText: document.querySelector(".site-footer p")
};

const createCard = text => {
    const card = document.createElement("div");
    card.className = "info-card";
    card.dataset.fade = "";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    card.appendChild(paragraph);

    return card;
};

const createProduct = product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.fade = "";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const flavour = document.createElement("p");
    flavour.textContent = product.flavor;

    card.append(image, title, flavour);

    return card;
};

if (typeof purre !== "undefined") {
    if (ui.heroTitle) {
        ui.heroTitle.innerHTML = `${purre.company.name}<span>${purre.company.motto}</span>`;
    }

    if (ui.heroText) {
        ui.heroText.textContent =
            "Affordable nutrition for every cat while helping shelters, rescuers and animals across Bangladesh.";
    }

    if (ui.mission) {
        ui.mission.textContent = purre.mission;
    }

    if (ui.vision) {
        ui.vision.textContent = purre.vision;
    }

    if (ui.footerTitle) {
        ui.footerTitle.textContent = purre.company.name;
    }

    if (ui.footerText) {
        ui.footerText.textContent = purre.company.slogan;
    }

    if (ui.values) {
        ui.values.innerHTML = "";
        purre.values.forEach(value => {
            ui.values.appendChild(createCard(value));
        });
    }

    if (ui.products) {
        ui.products.innerHTML = "";
        purre.products.forEach(product => {
            ui.products.appendChild(createProduct(product));
        });
    }

    if (ui.targets) {
        ui.targets.innerHTML = "";
        purre.targetCustomers.forEach(customer => {
            ui.targets.appendChild(createCard(customer));
        });
    }

    if (ui.distribution) {
        ui.distribution.innerHTML = "";
        purre.distribution.forEach(item => {
            ui.distribution.appendChild(createCard(item));
        });
    }

    if (ui.marketing) {
        ui.marketing.innerHTML = "";
        purre.marketing.forEach(item => {
            ui.marketing.appendChild(createCard(item));
        });
    }
}