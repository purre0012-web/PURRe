const timelineContainer = document.querySelector(".timeline");

if (timelineContainer && typeof purre !== "undefined") {
    timelineContainer.innerHTML = "";

    purre.timeline.forEach((item, index) => {
        const article = document.createElement("article");
        article.className = "timeline-item";
        article.dataset.fade = "";

        article.innerHTML = `
            <span class="timeline-year">${item.year}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;

        article.style.transitionDelay = `${index * 120}ms`;

        timelineContainer.appendChild(article);
    });
}

const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            timelineObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.2
    }
);

timelineItems.forEach(item => {
    item.classList.remove("is-visible");
    timelineObserver.observe(item);
});

const currentYear = new Date().getFullYear();

document.querySelectorAll("[data-company-age]").forEach(element => {
    element.textContent = currentYear - purre.company.founded;
});