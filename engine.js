let canvas, ctx, width, height;
let pointer = { x: 0, y: 0, lastX: 0, lastY: 0, active: false, pressure: 1 };

const config = {
	persistence: 0.96,
	baseSize: 40,
	colors: ["#72B01D", "#3F7D20", "#F3EFF5"],
};

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function initFaceStream() {
	const stream = document.getElementById("face-stream");
	if (!stream) return;

	const faces = [
		"^W^",
		"O_O",
		"^_^",
		"^-^",
		">-<",
		"U_U",
		"OWO",
		"E_E",
		"T_T",
		"X_X",
	];
	let content = "";

	const repetitions = 6;

	for (let r = 0; r < repetitions; r++) {
		faces.forEach((face) => {
			content += face + "   ";
		});
	}

	stream.innerText = content;
}

function navigate(sectionId) {
	const sections = document.querySelectorAll(".content-section");
	const target = document.getElementById(sectionId);

	if (!target) return;

	if (!motionQuery.matches) {
		for (let i = 0; i < 15; i++) {
			setTimeout(injectRGBNoise, i * 20);
		}
	}

	sections.forEach((s) => s.classList.remove("active"));
	target.classList.add("active");

	window.history.pushState(null, null, `#${sectionId}`);
}

function init() {
	canvas = document.getElementById("mosh-buffer");
	if (!canvas) return;

	ctx = canvas.getContext("2d", { willReadFrequently: true });

	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;

	ctx.fillStyle = "#0D0A0B";
	ctx.fillRect(0, 0, width, height);
}

window.addEventListener("pointermove", (e) => {
	pointer.lastX = pointer.x;
	pointer.lastY = pointer.y;
	pointer.x = e.clientX;
	pointer.y = e.clientY;
	pointer.pressure = e.pressure || 1;
	pointer.active = true;
});

window.addEventListener("pointerdown", (e) => {
	pointer.x = pointer.lastX = e.clientX;
	pointer.y = pointer.lastY = e.clientY;
	pointer.active = true;
});

window.addEventListener("pointerup", () => (pointer.active = false));
window.addEventListener("pointercancel", () => (pointer.active = false));

function injectRGBNoise() {
	if (!canvas) return;
	const noiseWidth = Math.floor(Math.random() * 150) + 50;
	const noiseHeight = Math.floor(Math.random() * 60) + 10;
	const x = Math.random() * (width - noiseWidth);
	const y = Math.random() * (height - noiseHeight);

	const imgData = ctx.getImageData(x, y, noiseWidth, noiseHeight);
	const data = imgData.data;
	const mode = Math.floor(Math.random() * 3);

	for (let i = 0; i < data.length; i += 4) {
		if (data[i] + data[i + 1] + data[i + 2] > 20) {
			let r = data[i],
				g = data[i + 1],
				b = data[i + 2];
			switch (mode) {
				case 0:
					data[i] = g;
					data[i + 1] = b;
					data[i + 2] = r;
					break;
				case 1:
					data[i] = 255 - r;
					data[i + 1] = 255 - g;
					data[i + 2] = 255 - b;
					break;
				case 2:
					data[i] = (r * 1.5) % 255;
					data[i + 1] = (g * 0.5) % 255;
					data[i + 2] = (b * 2.0) % 255;
					break;
			}
		}
	}
	ctx.putImageData(imgData, x + (Math.random() * 20 - 10), y);
}

function applyMosh() {
	if (motionQuery.matches) return; // Kill loop if reduced motion is on

	const dx = pointer.x - pointer.lastX;
	const dy = pointer.y - pointer.lastY;
	const speed = Math.sqrt(dx * dx + dy * dy);

	ctx.globalAlpha = config.persistence;
	ctx.drawImage(canvas, 0, 0);

	if (pointer.active && speed > 0.5) {
		ctx.globalAlpha = 1.0;
		const dynamicSize =
			(config.baseSize * pointer.pressure) / (1 + speed * 0.05);
		for (let i = 0; i < 3; i++) {
			ctx.drawImage(
				canvas,
				pointer.x - dynamicSize / 2,
				pointer.y - dynamicSize / 2,
				dynamicSize,
				dynamicSize,
				pointer.x - dynamicSize / 2 + dx,
				pointer.y - dynamicSize / 2 + dy,
				dynamicSize,
				dynamicSize,
			);
		}
	}

	if (speed > 30) {
		for (let i = 0; i < 3; i++) injectRGBNoise();
	} else if (Math.random() > 0.9) {
		injectRGBNoise();
	}

	pointer.lastX = pointer.x;
	pointer.lastY = pointer.y;
	requestAnimationFrame(applyMosh);
}

function updateTime() {
	const timeDisplay = document.getElementById("local-time");

	if (!timeDisplay) {
		console.warn("System clock: Target element #local-time not found.");
		return;
	}

	const options = {
		timeZone: "America/Montevideo",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	};

	try {
		const uruguayTime = new Intl.DateTimeFormat("en-GB", options).format(
			new Date(),
		);
		timeDisplay.innerText = `LOCAL_TIME: ${uruguayTime} [UTC-3]`;
	} catch (e) {
		console.error("Clock sync error:", e);
	}
}

function startEngine() {
	init();

	document.querySelectorAll("nav a").forEach((link) => {
		link.addEventListener("click", (e) => {
			const href = link.getAttribute("href");
			if (href.startsWith("#")) {
				e.preventDefault();
				navigate(href.replace("#", ""));
			}
		});
	});

	initFaceStream();
	updateTime();
	setInterval(updateTime, 1000);

	if (window.location.hash) {
		navigate(window.location.hash.replace("#", ""));
	}

	if (!motionQuery.matches) {
		applyMosh();
	}
}

window.addEventListener("load", startEngine);
window.addEventListener("resize", init);

motionQuery.addEventListener("change", () => {
	location.reload();
});
