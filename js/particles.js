const particleLayer = document.querySelector(".particle-layer");

if (particleLayer) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    particleLayer.appendChild(canvas);

    let width = 0;
    let height = 0;
    let particles = [];

    const particleCount = () => {
        if (window.innerWidth < 768) {
            return 40;
        }

        if (window.innerWidth < 1200) {
            return 70;
        }

        return 110;
    };

    const resizeCanvas = () => {
        width = particleLayer.clientWidth;
        height = particleLayer.clientHeight;

        const ratio = window.devicePixelRatio || 1;

        canvas.width = width * ratio;
        canvas.height = height * ratio;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        particles = [];

        for (let i = 0; i < particleCount(); i++) {
            particles.push(createParticle());
        }
    };

    const createParticle = () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 0.8,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -(Math.random() * 0.35 + 0.1),
        opacity: Math.random() * 0.45 + 0.15
    });

    const draw = particle => {
        context.beginPath();
        context.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        context.fillStyle = `rgba(255,122,0,${particle.opacity})`;
        context.fill();
    };

    const update = particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.y < -10) {
            particle.y = height + 10;
            particle.x = Math.random() * width;
        }

        if (particle.x < -10) {
            particle.x = width + 10;
        }

        if (particle.x > width + 10) {
            particle.x = -10;
        }
    };

    const connect = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 110) {
                    continue;
                }

                context.beginPath();
                context.moveTo(particles[i].x, particles[i].y);
                context.lineTo(particles[j].x, particles[j].y);

                context.strokeStyle = `rgba(255,122,0,${0.08 - distance / 1800})`;
                context.lineWidth = 1;
                context.stroke();
            }
        }
    };

    const render = () => {
        context.clearRect(0, 0, width, height);

        particles.forEach(particle => {
            update(particle);
            draw(particle);
        });

        connect();

        requestAnimationFrame(render);
    };

    resizeCanvas();
    render();

    window.addEventListener("resize", resizeCanvas);
}