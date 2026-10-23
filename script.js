"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation — guarded so this works on every page.
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", event => {
      if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  // Automatic copyright year.
  document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

  // Articles for the home page's creative journal.
  const articles = {
    "1": { category: "CREATIVE DIRECTION", title: "Every great brand has a story. Make yours impossible to ignore.", intro: "A memorable brand does more than communicate a product. It gives people a reason to care.", sections: [
      { heading: "Start with a clear idea", body: "Before choosing visuals, define the one thing your audience should remember. A focused idea makes creative decisions easier and gives the final work a consistent direction." },
      { heading: "Build an emotional connection", body: "People often remember how a story made them feel. Use authentic details, thoughtful pacing and imagery that supports the message rather than distracting from it." },
      { heading: "Make every frame count", body: "Typography, sound, lighting, composition and color all contribute to the story. Each element should serve the same central idea." }] },
    "2": { category: "FILMMAKING", title: "Finding the right visual language for your brand.", intro: "The way a story looks shapes how an audience understands it. Your visual approach should begin with the message, not a trend.", sections: [
      { heading: "Define the feeling", body: "Decide whether the story should feel energetic, intimate, premium, playful or documentary-like. This gives the creative team a useful starting point." },
      { heading: "Choose your visual tools", body: "Camera movement, framing, lighting, color and editing rhythm can each change the audience's experience. Choose them deliberately." },
      { heading: "Stay consistent", body: "A coherent visual language helps campaigns feel connected across films, photographs, social content and other brand touchpoints." }] },
    "3": { category: "BRAND STRATEGY", title: "What makes an advertising campaign memorable?", intro: "Strong advertising combines a clear message with a distinctive creative idea and an understanding of its audience.", sections: [
      { heading: "Clarity comes first", body: "An audience should be able to understand what is being communicated. Too many competing messages can weaken even a beautiful campaign." },
      { heading: "Create a point of difference", body: "Find an angle that reflects the brand's character instead of copying what everyone else is doing." },
      { heading: "Connect every execution", body: "A consistent central idea makes a campaign recognizable across different formats and channels." }] },
    "4": { category: "PRODUCTION", title: "From first brief to final frame: planning creative work.", intro: "A strong production process gives creative ideas the structure they need to become successful deliverables.", sections: [
      { heading: "Understand the brief", body: "Clarify the audience, objectives, deliverables, timeline and practical constraints before production starts." },
      { heading: "Agree on the direction", body: "Document the concept, visual references, key messages and essential details so everyone understands the intended result." },
      { heading: "Plan the delivery", body: "Allow time for production, feedback, revisions, final exports and quality checks. Good planning reduces avoidable surprises." }] }
  };

  const articleLinks = document.querySelectorAll("[data-article]");
  if (articleLinks.length) {
    const dialog = document.createElement("dialog");
    dialog.className = "article-dialog";
    dialog.setAttribute("aria-labelledby", "dialogTitle");
    dialog.innerHTML = `<div class="dialog-header"><span id="dialogCategory" class="eyebrow"></span><button class="dialog-close" type="button" aria-label="Close article">✕</button></div><div class="dialog-content"><h2 id="dialogTitle"></h2><p id="dialogIntro" class="dialog-intro"></p><div id="dialogBody"></div><a class="dialog-contact" href="index.html#contact">Discuss a project with us ↗</a></div>`;
    document.body.appendChild(dialog);
    const category = dialog.querySelector("#dialogCategory");
    const title = dialog.querySelector("#dialogTitle");
    const intro = dialog.querySelector("#dialogIntro");
    const body = dialog.querySelector("#dialogBody");
    function openArticle(id) {
      const article = articles[id];
      if (!article) return;
      category.textContent = article.category;
      title.textContent = article.title;
      intro.textContent = article.intro;
      body.replaceChildren();
      article.sections.forEach(section => {
        const sectionEl = document.createElement("section");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        h3.textContent = section.heading;
        p.textContent = section.body;
        sectionEl.append(h3, p);
        body.appendChild(sectionEl);
      });
      dialog.showModal();
    }
    articleLinks.forEach(link => link.addEventListener("click", event => {
      const id = link.dataset.article;
      if (!articles[id]) return;
      event.preventDefault();
      closeMenu();
      openArticle(id);
    }));
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".dialog-contact").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  }

  // Portfolio content. Add new project objects to this array to grow the Our Work page.
  const projects = [
    { category: "FILM / CONCEPT", title: "The Golden Frame", description: "A cinematic concept exploring light, texture and premium visual storytelling.", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85", tags: ["Film", "Creative direction"] },
    { category: "BRAND CAMPAIGN", title: "A Story in Every Detail", description: "A campaign direction built around thoughtful composition and a consistent brand mood.", image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=85", tags: ["Advertising", "Brand"] },
    { category: "VISUAL STORY", title: "Ideas in Motion", description: "An editorial visual concept for translating an idea into a memorable experience.", image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=85", tags: ["Visuals", "Storytelling"] }
  ];
  const portfolioGrid = document.getElementById("portfolioGrid");
  if (portfolioGrid) {
    projects.forEach(project => {
      const card = document.createElement("article");
      card.className = "project-card";
      const img = document.createElement("img");
      img.src = project.image;
      img.alt = project.title;
      img.loading = "lazy";
      const copy = document.createElement("div");
      copy.className = "project-copy";
      const eyebrow = document.createElement("span");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = project.category;
      const h2 = document.createElement("h2");
      h2.textContent = project.title;
      const p = document.createElement("p");
      p.textContent = project.description;
      const tags = document.createElement("div");
      tags.className = "project-meta";
      project.tags.forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        tags.appendChild(span);
      });
      copy.append(eyebrow, h2, p, tags);
      card.append(img, copy);
      portfolioGrid.appendChild(card);
    });
    const count = document.getElementById("projectCount");
    if (count) count.textContent = `${projects.length} STARTER PROJECTS`;
  }

  // Front-end demo account UI only. Do not use this as production authentication.
  const authForm = document.getElementById("authForm");
  if (authForm) {
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const nameField = document.getElementById("nameField");
    const fullName = document.getElementById("fullName");
    const password = document.getElementById("password");
    const submit = document.getElementById("authSubmit");
    const message = document.getElementById("authMessage");
    const status = document.getElementById("accountStatus");
    const logout = document.getElementById("logoutButton");
    let mode = "login";

    function showMode(nextMode) {
      mode = nextMode;
      const signup = mode === "signup";
      nameField.hidden = !signup;
      fullName.required = signup;
      password.autocomplete = signup ? "new-password" : "current-password";
      submit.textContent = signup ? "Create account ↗" : "Log in ↗";
      loginTab.setAttribute("aria-selected", String(!signup));
      signupTab.setAttribute("aria-selected", String(signup));
      message.textContent = "";
    }
    loginTab.addEventListener("click", () => showMode("login"));
    signupTab.addEventListener("click", () => showMode("signup"));

    function renderAccount() {
      try {
        const user = JSON.parse(localStorage.getItem("averynzaDemoUser") || "null");
        status.textContent = user ? `Demo account active: ${user.email}` : "";
        logout.hidden = !user;
      } catch (_) { status.textContent = ""; }
    }
    authForm.addEventListener("submit", event => {
      event.preventDefault();
      const email = authForm.email.value.trim().toLowerCase();
      const pass = password.value;
      try {
        const user = JSON.parse(localStorage.getItem("averynzaDemoUser") || "null");
        if (mode === "signup") {
          if (pass.length < 8) { message.textContent = "Use at least 8 characters."; return; }
          // Demo only: intentionally not storing the password.
          const profile = { name: fullName.value.trim(), email };
          localStorage.setItem("averynzaDemoUser", JSON.stringify(profile));
          message.textContent = "Demo account created in this browser. Production authentication is not enabled.";
        } else if (user && user.email === email) {
          message.textContent = "Demo profile found. This prototype does not verify passwords; connect a secure auth provider before launch.";
        } else {
          message.textContent = "No matching demo profile found in this browser. Choose Sign up to create a demo profile.";
        }
        renderAccount();
      } catch (_) {
        message.textContent = "Browser storage is unavailable. Please enable it to use this demo.";
      }
    });
    logout.addEventListener("click", () => {
      localStorage.removeItem("averynzaDemoUser");
      message.textContent = "Demo profile signed out.";
      renderAccount();
    });
    renderAccount();
  }

  // Payment request form: creates a draft request email; it does not charge money.
  const paymentForm = document.getElementById("paymentForm");
  if (paymentForm) {
    paymentForm.addEventListener("submit", event => {
      event.preventDefault();
      const reference = paymentForm.projectRef.value.trim();
      const amount = paymentForm.amount.value;
      const email = paymentForm.payerEmail.value.trim();
      const method = paymentForm.querySelector('input[name="method"]:checked')?.value || "razorpay";
      const methodLabels = { razorpay: "Razorpay / UPI / Cards", bank: "Bank transfer", paypal: "PayPal / international" };
      const subject = encodeURIComponent(`Payment setup request — ${reference}`);
      const body = encodeURIComponent(`Hello Averynza Studios,\n\nPlease send payment instructions for this project invoice.\nInvoice reference: ${reference}\nInvoice amount: INR ${amount}\nPayer email: ${email}\nPreferred method: ${methodLabels[method]}\n\nThank you.`);
      document.getElementById("paymentMessage").textContent = "Opening your email app to request verified payment instructions. No payment has been taken.";
      window.location.href = `mailto:averynzastudios@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
