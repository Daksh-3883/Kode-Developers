document.addEventListener("DOMContentLoaded", () => {
  const showcase = document.getElementById("projectShowcase");

  if (!showcase) return;

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = (urlParams.get("project") || "").trim();

  const renderEmptyState = (message, detail) => {
    showcase.innerHTML = `
      <section class="empty-state">
        <h2>${message}</h2>
        <p>${detail}</p>
        <div class="project-cta__actions">
          <a href="projects.html" class="btn btn-primary">Back to Projects</a>
        </div>
      </section>
    `;
  };

  const renderProject = (project) => {
    if (!project) {
      renderEmptyState("Project not found", "The requested project could not be found in our showcase metadata.");
      return;
    }

    const techList = (project.technology || []).map((item) => `<span class="skill-pill">${item}</span>`).join("");
    const toolList = (project.tools || []).map((item) => `<span class="skill-pill">${item}</span>`).join("");
    const platformList = (project.platforms || []).map((item) => `<span class="skill-pill">${item}</span>`).join("");
    const featureList = (project.features || []).map((item) => `
      <article class="feature-card">
        <div class="feature-card__icon" aria-hidden="true">${item.icon || "•"}</div>
        <h4>${item.title || ""}</h4>
        <p>${item.description || ""}</p>
      </article>
    `).join("");

    const screenshotList = (project.screenshots || []).map((shot) => `
      <figure class="gallery-item">
        <img src="${shot.src || ""}" alt="${shot.alt || project.name || "Project preview"}" loading="lazy">
        ${shot.caption ? `<figcaption>${shot.caption}</figcaption>` : ""}
      </figure>
    `).join("");

    const technicalHighlights = (project.technicalHighlights || []).map((highlight) => `
      <li>
        <div class="project-info__label">${highlight.title || "Highlight"}</div>
        <div>${highlight.description || ""}</div>
      </li>
    `).join("");

    const contributors = (project.contributors || []).map((person) => `
      <li>
        <div class="contributor-card">
          <strong>${person.name || "Contributor"}</strong>
          <span>${person.role || ""}</span>
        </div>
      </li>
    `).join("");

    const links = [
      project.links?.live ? `<a href="${project.links.live}" target="_blank" rel="noreferrer noopener">Live Website</a>` : "",
      project.links?.repository ? `<a href="${project.links.repository}" target="_blank" rel="noreferrer noopener">Repository</a>` : ""
    ].filter(Boolean).map((link) => `<li>${link}</li>`).join("");

    const org = project.organization || {};
    const orgName = org.name || project.name || "Organization";
    const orgIndustry = org.industry || "";
    const orgDescription = org.description || "";
    const orgLocation = org.location || "";
    const orgOwner = org.owner || "";

    const projectName = project.name || "Project";
    const projectType = project.type || "";
    const projectCategory = project.category || "";
    const projectStatus = project.status || "";
    const projectTagline = project.tagline || "";
    const projectDescription = project.description || "";
    const challenge = project.challenge || "";
    const solution = project.solution || "";

    const orgHtml = orgName || orgIndustry || orgDescription || orgLocation || orgOwner ? `
      <div class="project-info">
        <h3>About the Organization</h3>
        <ul class="project-info__list">
          ${orgName ? `<li><span class="project-info__label">Name</span><span>${orgName}</span></li>` : ""}
          ${orgIndustry ? `<li><span class="project-info__label">Industry</span><span>${orgIndustry}</span></li>` : ""}
          ${orgDescription ? `<li><span class="project-info__label">Description</span><span>${orgDescription}</span></li>` : ""}
          ${orgLocation ? `<li><span class="project-info__label">Location</span><span>${orgLocation}</span></li>` : ""}
          ${orgOwner ? `<li><span class="project-info__label">Owner</span><span>${orgOwner}</span></li>` : ""}
        </ul>
      </div>
    ` : "";

    showcase.innerHTML = `
      <article class="project-showcase">
        <section class="project-hero">
          <div>
            <div class="project-hero__meta">
              ${projectCategory ? `<span class="project-chip">${projectCategory}</span>` : ""}
              ${projectStatus ? `<span class="project-chip">${projectStatus}</span>` : ""}
              ${projectType ? `<span class="project-chip">${projectType}</span>` : ""}
            </div>
            <h1>${projectName}</h1>
            ${projectTagline ? `<p class="project-hero__tagline">${projectTagline}</p>` : ""}
            <p class="project-hero__description">${projectDescription}</p>
            <div class="project-hero__actions">
              ${project.links?.live ? `<a class="btn btn-primary" href="${project.links.live}" target="_blank" rel="noreferrer noopener">Visit Live Site</a>` : ""}
              ${project.links?.repository ? `<a class="btn btn-secondary" href="${project.links.repository}" target="_blank" rel="noreferrer noopener">View Repository</a>` : ""}
              <a class="btn btn-secondary" href="projects.html">Back to Projects</a>
            </div>
          </div>
          <div class="project-hero__visual">
            <div class="project-screen">
              ${(project.screenshots && project.screenshots[0]) ? `<img src="${project.screenshots[0].src}" alt="${project.screenshots[0].alt || projectName}" loading="eager">` : ""}
            </div>
            ${(project.screenshots && project.screenshots[0] && project.screenshots[0].caption) ? `<p class="project-hero__caption">${project.screenshots[0].caption}</p>` : ""}
          </div>
        </section>

        ${projectDescription ? `
          <section class="showcase-section project-overview">
            <div class="section-heading">
              <h2>Project Overview</h2>
            </div>
            <div class="project-overview__body">
              <p>${projectDescription}</p>
            </div>
          </section>
        ` : ""}

        ${orgHtml ? `
          <section class="showcase-section">
            <div class="section-heading">
              <h2>About the Organization</h2>
            </div>
            <div class="project-grid-two">
              ${orgHtml}
            </div>
          </section>
        ` : ""}

        ${(challenge || solution) ? `
          <section class="showcase-section">
            <div class="section-heading">
              <h2>Challenge & Solution</h2>
            </div>
            <div class="project-grid-two">
              ${challenge ? `
                <div class="project-info">
                  <h3>The Challenge</h3>
                  <p>${challenge}</p>
                </div>
              ` : ""}
              ${solution ? `
                <div class="project-info">
                  <h3>The Solution</h3>
                  <p>${solution}</p>
                </div>
              ` : ""}
            </div>
          </section>
        ` : ""}

        ${featureList ? `
          <section class="showcase-section project-features">
            <div class="section-heading">
              <h2>Key Features</h2>
            </div>
            <div class="feature-grid">
              ${featureList}
            </div>
          </section>
        ` : ""}

        ${screenshotList ? `
          <section class="showcase-section project-gallery">
            <div class="section-heading">
              <h2>Website Gallery</h2>
            </div>
            <div class="gallery-grid">
              ${screenshotList}
            </div>
          </section>
        ` : ""}

        <section class="showcase-section project-tech">
          <div class="section-heading">
            <h2>Technology & Tools</h2>
          </div>
          <div class="project-grid-two">
            <div class="project-info">
              <h3>Technology Stack</h3>
              <div class="project-tech__list">
                ${techList || ""}
              </div>
            </div>
            <div class="project-info">
              <h3>Tools</h3>
              <div class="project-tech__list">
                ${toolList || ""}
              </div>
            </div>
          </div>
          ${platformList ? `
            <div class="project-info" style="margin-top:1rem;">
              <h3>Platforms</h3>
              <div class="project-tech__list">
                ${platformList}
              </div>
            </div>
          ` : ""}
        </section>

        ${technicalHighlights ? `
          <section class="showcase-section project-info">
            <div class="section-heading">
              <h2>Technical Highlights</h2>
            </div>
            <ul class="project-info__list">
              ${technicalHighlights}
            </ul>
          </section>
        ` : ""}

        <section class="showcase-section project-links">
          <div class="section-heading">
            <h2>Project Links</h2>
          </div>
          <ul class="project-links__list">
            ${links || ""}
          </ul>
        </section>

        <section class="showcase-section project-contributors">
          <div class="section-heading">
            <h2>Contributors</h2>
          </div>
          <ul class="project-contributors__list">
            ${contributors || ""}
          </ul>
        </section>

        ${orgOwner ? `
          <section class="showcase-section project-owner">
            <div class="section-heading">
              <h2>Client / Owner</h2>
            </div>
            <ul class="project-owner__list">
              <li><span class="project-info__label">Owner</span><span>${orgOwner}</span></li>
            </ul>
          </section>
        ` : ""}

        <section class="showcase-section project-cta">
          <div>
            <h3>Continue exploring</h3>
            <p>See more work from Kode Developers and browse the rest of our projects.</p>
          </div>
          <div class="project-cta__actions">
            <a class="btn btn-primary" href="projects.html">Browse Projects</a>
            <a class="btn btn-secondary" href="index.html">Back to Home</a>
          </div>
        </section>
      </article>
    `;
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("projects.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Unable to load project metadata");
      }
      const data = await response.json();
      const project = (data.projects || []).find((item) => item.id === projectId);
      renderProject(project);
    } catch (error) {
      renderEmptyState("Unable to load project data", "The project showcase is temporarily unavailable. Please try again later.");
    }
  };

  fetchProjects();
});
