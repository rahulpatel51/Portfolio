document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-links li")

  // Toggle navigation
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active")

    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })

    // Burger animation
    burger.classList.toggle("toggle")
  })

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Form submission
  const form = document.getElementById("contact-form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    alert("Thank you for your message! I will get back to you soon.")
    form.reset()
  })

  // Intersection Observer for animations
  const sections = document.querySelectorAll("section")
  const options = {
    root: null,
    threshold: 0.1,
    rootMargin: "-150px",
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
        observer.unobserve(entry.target)
      }
    })
  })

  sections.forEach((section) => {
    observer.observe(section)
  })

  // Typing effect for hero section
  const heroText = document.querySelector(".hero h1")
  const text = heroText.textContent
  heroText.textContent = ""

  function typeWriter(text, i = 0) {
    if (i < text.length) {
      heroText.textContent += text.charAt(i)
      i++
      setTimeout(() => typeWriter(text, i), 100)
    }
  }

  typeWriter(text)

  // Skills animation
  const skills = document.querySelectorAll(".skill")
  skills.forEach((skill, index) => {
    skill.style.animation = `fadeIn 0.5s ease forwards ${index / 7 + 0.5}s`
  })

  // Project cards hover effect
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.05)"
    })
    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)"
    })
  })

  // 3D effect for hero section
  const hero3D = document.getElementById("hero-3d")
  let scene, camera, renderer, stars, starGeo

  function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.z = 1
    camera.rotation.x = Math.PI / 2

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    hero3D.appendChild(renderer.domElement)

    starGeo = new THREE.Geometry()
    for (let i = 0; i < 6000; i++) {
      star = new THREE.Vector3(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300)
      star.velocity = 0
      star.acceleration = 0.02
      starGeo.vertices.push(star)
    }

    const sprite = new THREE.TextureLoader().load("star.png")
    const starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite,
    })

    stars = new THREE.Points(starGeo, starMaterial)
    scene.add(stars)

    animate()
  }

  function animate() {
    starGeo.vertices.forEach((p) => {
      p.velocity += p.acceleration
      p.y -= p.velocity

      if (p.y < -200) {
        p.y = 200
        p.velocity = 0
      }
    })
    starGeo.verticesNeedUpdate = true
    stars.rotation.y += 0.002

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  init()

  // Particle.js background
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 },
      },
      opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
      size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  })
})

const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    fetch("https://script.google.com/macros/s/AKfycby2tL-CVimKEZ7FU-r2LcGv8tgMVpLaq_ds9BT5R83gwC8Y_2xpCPxRFEMLDQUcn-vG/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert("Thank you for your message! I will get back to you soon.");
        form.reset();
    })
    .catch(error => console.error("Error:", error));
});
