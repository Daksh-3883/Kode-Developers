document.addEventListener("DOMContentLoaded", () => {
  const page = document.getElementById("pipelinePage");
  if (!page) return;

  const list = value => Array.isArray(value) ? value : [];
  const safe = value => String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));
  const number = value => Number(value || 0).toLocaleString();
  const percent = (value, total) => total ? `${((value / total) * 100).toFixed(1)}%` : "0%";
  const imagePath = name => `../docs/Assets/Pictures/Dataset%20pipeline/${name}`;
  const archivePath = "../docs/Assets/Dataset%20pipeline/Dataset-Pipeline-main.zip";
  const externalLink = (url, label, primary = false) => url ? `<a class="pipeline-btn ${primary ? "pipeline-btn--primary" : ""}" href="${safe(url)}" target="_blank" rel="noopener noreferrer">${safe(label)} <span aria-hidden="true">-&gt;</span></a>` : "";
  const objectEntries = value => Object.entries(value || {});

  function empty(title, detail) {
    page.innerHTML = `<section class="pipeline-empty"><p class="pipeline-kicker">Showcase unavailable</p><h1>${safe(title)}</h1><p>${safe(detail)}</p><a class="pipeline-btn pipeline-btn--primary" href="projects.html">Back to Projects <span aria-hidden="true">-&gt;</span></a></section>`;
  }

  function render(project) {
    if (!project) return empty("Project not found", "Dataset Pipeline could not be found in the project metadata.");
    const run = project.recordedRun || {};
    const merge = run.merge || {};
    const dedupe = run.deduplication || {};
    const finalDataset = run.finalDataset || {};
    const exportRun = run.export || {};
    const links = list(project.projectLinks).length ? project.projectLinks : objectEntries(project.links).map(([type, url]) => ({ type, label: type, url }));
    const totalMerged = (merge.accepted || 0) + (merge.rejected || 0);
    const maxLanguage = Math.max(...Object.values(run.languageDistribution || {}), 1);
    const languageRows = objectEntries(run.languageDistribution).sort(([, first], [, second]) => second - first).map(([language, count]) => `<li><div class="bar-label"><span>${safe(language)}</span><strong>${number(count)}</strong></div><div class="bar-track"><span style="width:${(count / maxLanguage) * 100}%"></span></div></li>`).join("");
    const rejectionRows = objectEntries(run.rejectionBreakdown).filter(([, value]) => !Array.isArray(value)).map(([label, count]) => `<li><span>${safe(label.replace(/([A-Z])/g, " $1"))}</span><strong>${number(count)}</strong></li>`).join("");
    const tokenRows = list(run.rejectionBreakdown?.tokenLimitRejections).map(item => `<tr><td>${number(item.tokens)}</td><td>${number(item.count)}</td></tr>`).join("");
    const stageCards = list(project.pipelineStages).sort((first, second) => first.order - second.order).map(stage => `<li class="stage-card"><span class="stage-number">${String(stage.order).padStart(2, "0")}</span><div><h3>${safe(stage.name)}</h3><p>${safe(stage.description)}</p></div></li>`).join("");
    const datasetRows = list(project.datasets).map(dataset => `<tr><th scope="row">${safe(dataset.name)}</th><td>${safe(dataset.source)}</td><td>${safe(dataset.approximateSize)}</td><td>${safe(dataset.language)}</td><td><span class="status">${safe(dataset.status)}</span>${dataset.note ? `<small>${safe(dataset.note)}</small>` : ""}</td></tr>`).join("");
    const features = list(project.features).map((feature, index) => `<article class="pipeline-card"><span class="card-index">${String(index + 1).padStart(2, "0")}</span><h3>${safe(feature.title)}</h3><p>${safe(feature.description)}</p></article>`).join("");
    const quality = list(project.qualityControls).map(item => `<li><span aria-hidden="true">+</span>${safe(item)}</li>`).join("");
    const processing = list(project.processingFeatures).map(item => `<li>${safe(item)}</li>`).join("");
    const schema = list(project.unifiedSchema?.internalFields).map(item => `<span>${safe(item)}</span>`).join("");
    const config = list(project.configuration?.configurableAreas).map(item => `<li>${safe(item)}</li>`).join("");
    const stageImage = imagePath("Workflow.png");
    const githubImage = imagePath("Pipeline(github).png");
    const colabImage = imagePath("Pipeline(colab).png");

    page.innerHTML = `<article class="pipeline-showcase">
      <section class="pipeline-hero pattern-grid" aria-labelledby="pipeline-title">
        <div class="pipeline-hero__copy"><p class="pipeline-kicker">${safe(project.type)} / ${safe(project.category)}</p><div class="pipeline-tags">${list(project.projectTags).slice(0, 6).map(tag => `<span>${safe(tag)}</span>`).join("")}</div><h1 id="pipeline-title">${safe(project.name)}</h1><p class="pipeline-tagline">${safe(project.tagline)}</p><p class="pipeline-lead">${safe(project.description)}</p><div class="pipeline-actions">${links.map((link, index) => externalLink(link.url, link.label, index === 0)).join("")}<a class="pipeline-btn pipeline-btn--quiet" href="#overview">Read the case study <span aria-hidden="true">-&gt;</span></a></div></div>
        <figure class="pipeline-hero__image"><img src="${stageImage}" alt="Dataset Pipeline workflow, schema, and recorded run overview" loading="eager"><figcaption><span>DATASET PIPELINE</span><span>WORKFLOW / SCHEMATIC</span></figcaption></figure>
      </section>

      <section class="pipeline-section" id="overview"><div class="pipeline-heading"><div><p class="pipeline-kicker">01 / The brief</p><h2>Turning varied sources into dependable training data.</h2></div><span class="heading-code">${safe(project.organization?.name)}</span></div><div class="brief-grid"><article><span class="brief-label">Challenge</span><p>${safe(project.challenge)}</p></article><article class="brief-solution"><span class="brief-label">Solution</span><p>${safe(project.solution)}</p></article></div></section>

      <section class="pipeline-section" id="architecture"><div class="pipeline-heading"><div><p class="pipeline-kicker">02 / Pipeline architecture</p><h2>Eleven deliberate passes, one coherent dataset.</h2></div><span class="heading-code">${number(list(project.pipelineStages).length)} STAGES</span></div><ol class="stage-list">${stageCards}</ol><figure class="pipeline-wide-image"><img src="${stageImage}" alt="Detailed Dataset Pipeline architecture workflow" loading="lazy"><figcaption>Workflow, schema, results, and tooling captured from the project.</figcaption></figure></section>

      <section class="pipeline-section" id="datasets"><div class="pipeline-heading"><div><p class="pipeline-kicker">03 / Configured sources</p><h2>Datasets are selected, adapted, and inspected at the edge.</h2></div><span class="heading-code">${number(project.currentConfiguration?.configuredDatasetCount)} CONFIGURED</span></div><div class="table-wrap"><table><caption class="sr-only">Configured Dataset Pipeline datasets</caption><thead><tr><th scope="col">Dataset</th><th scope="col">Source</th><th scope="col">Approx. size</th><th scope="col">Language</th><th scope="col">Status</th></tr></thead><tbody>${datasetRows}</tbody></table></div><p class="pipeline-note">${safe(project.currentConfiguration?.importantNote)}</p></section>

      <section class="pipeline-section" id="results"><div class="pipeline-heading"><div><p class="pipeline-kicker">04 / Recorded run</p><h2>Measured output, with the rejection story intact.</h2></div><span class="heading-code">${safe(run.label)}</span></div><p class="pipeline-note pipeline-note--top">${safe(run.note)}</p><div class="metric-grid"><div><span>Accepted after merge</span><strong>${number(merge.accepted)}</strong><small>${percent(merge.accepted, totalMerged)} of merged input</small></div><div><span>Rejected at merge</span><strong>${number(merge.rejected)}</strong><small>${percent(merge.rejected, totalMerged)} of merged input</small></div><div><span>Unique after dedupe</span><strong>${number(dedupe.unique)}</strong><small>${number(dedupe.removed)} duplicates removed</small></div><div><span>Final tokens</span><strong>${number(finalDataset.totalTokens)}</strong><small>${number(finalDataset.averageTokens)} average per sample</small></div></div><div class="results-grid"><article class="data-panel"><div class="panel-heading"><h3>Language distribution</h3><span>${number(finalDataset.samples)} samples</span></div><ul class="bar-list">${languageRows}</ul></article><article class="data-panel"><div class="panel-heading"><h3>Rejection breakdown</h3><span>Recorded counts</span></div><ul class="rejection-list">${rejectionRows}</ul><div class="split-stat"><span>Training / validation</span><strong>${number(exportRun.training)} / ${number(exportRun.validation)}</strong><small>${safe(project.split?.trainingPercentage)}% / ${safe(project.split?.validationPercentage)}% split</small></div></article></div><div class="results-foot"><span>Shortest sample: <strong>${number(finalDataset.shortestSampleTokens)} tokens</strong></span><span>Longest sample: <strong>${number(finalDataset.longestSampleTokens)} tokens</strong></span><span>Deduplication scope: <strong>${safe(project.deduplication?.configuration?.scope)}</strong></span></div></section>

      <section class="pipeline-section" id="processing"><div class="pipeline-heading"><div><p class="pipeline-kicker">05 / Processing controls</p><h2>Quality is a set of checks, not a guess.</h2></div></div><div class="technical-grid"><article class="data-panel"><div class="panel-heading"><h3>Quality controls</h3><span>${number(list(project.qualityControls).length)} checks</span></div><ul class="check-list">${quality}</ul></article><article class="data-panel"><div class="panel-heading"><h3>Processing capabilities</h3><span>${number(list(project.processingFeatures).length)} features</span></div><ul class="compact-list">${processing}</ul></article><article class="data-panel"><div class="panel-heading"><h3>Tokenization limits</h3><span>${safe(project.tokenization?.tokenizer)}</span></div><dl class="detail-list"><div><dt>Minimum</dt><dd>${number(project.tokenization?.minimumTokens)}</dd></div><div><dt>Maximum</dt><dd>${number(project.tokenization?.maximumTokens)}</dd></div><div><dt>Count includes</dt><dd>${safe(project.tokenization?.tokenCountIncludes)}</dd></div></dl></article></div></section>

      <section class="pipeline-section" id="technical"><div class="pipeline-heading"><div><p class="pipeline-kicker">06 / Technical details</p><h2>Configuration stays visible from schema to export.</h2></div></div><div class="tech-layout"><article class="data-panel schema-panel"><div class="panel-heading"><h3>Unified internal schema</h3><span>${number(list(project.unifiedSchema?.internalFields).length)} fields</span></div><div class="schema-fields">${schema}</div><div class="export-lines"><span>Default: <strong>${safe(project.unifiedSchema?.defaultTrainingExport?.format)}</strong> / ${safe(project.unifiedSchema?.defaultTrainingExport?.fields?.join(" + "))}</span><span>Alternate: <strong>${safe(project.unifiedSchema?.alternateFormat?.type)}</strong> / ${safe(project.unifiedSchema?.alternateFormat?.structure?.join(" + "))}</span></div></article><article class="data-panel"><div class="panel-heading"><h3>${safe(project.observability?.title)}</h3><span>Traceable</span></div><p>${safe(project.observability?.description)}</p><div class="observability-columns"><div><span class="brief-label">Outputs</span><p>${safe(project.observability?.logging?.outputs?.join(" / "))}</p></div><div><span class="brief-label">Rejection categories</span><p>${safe(project.observability?.rejectionReporting?.categories?.join(" / "))}</p></div></div></article><article class="data-panel"><div class="panel-heading"><h3>Configuration surface</h3><span>${project.configuration?.customizable ? "Customizable" : "Fixed"}</span></div><ul class="compact-list compact-list--columns">${config}</ul></article></div></section>

      <section class="pipeline-section" id="capabilities"><div class="pipeline-heading"><div><p class="pipeline-kicker">07 / What makes it useful</p><h2>Designed for repeatable preparation.</h2></div></div><div class="feature-grid">${features}</div></section>

      <section class="pipeline-section" id="explore"><div class="pipeline-heading"><div><p class="pipeline-kicker">08 / Explore the build</p><h2>From source code to execution.</h2></div></div><div class="explore-grid"><figure class="explore-card"><img src="${githubImage}" alt="Dataset Pipeline GitHub repository" loading="lazy"><figcaption><strong>Repository</strong><span>Inspect the implementation on GitHub.</span>${externalLink(project.links?.repository, "Open GitHub")}</figcaption></figure><figure class="explore-card"><img src="${colabImage}" alt="Dataset Pipeline running in Google Colab" loading="lazy"><figcaption><strong>Experimentation</strong><span>Run and inspect the pipeline in Colab.</span>${externalLink(project.links?.colab, "Open Colab")}</figcaption></figure></div></section>

      <section class="pipeline-section pipeline-download" id="download"><div class="download-copy"><p class="pipeline-kicker">09 / Download the project</p><h2>Take the complete pipeline with you.</h2><p>Download the packaged project files and explore the configuration, processing code, and supporting resources locally.</p></div><div class="download-action"><a class="pipeline-btn pipeline-btn--primary" href="${archivePath}" download="Dataset-Pipeline-main.zip">Download ZIP <span aria-hidden="true">-&gt;</span></a><span>Dataset-Pipeline-main.zip</span></div></section>

      <section class="pipeline-section contribution-section"><div class="contribution-copy"><p class="pipeline-kicker">10 / Contribution</p><h2>Built by ${safe(project.company?.name || project.organization?.name)}.</h2><p>${safe(project.company?.relationship)}. ${list(project.contributors).map(person => `${safe(person.name)} contributes ${safe(person.role)}.`).join(" ")}</p></div><div class="contributor-list">${list(project.contributors).map(person => `<div><strong>${safe(person.name)}</strong><span>${safe(person.role)}</span></div>`).join("")}</div></section>
      <section class="pipeline-cta"><div><p class="pipeline-kicker">Keep exploring</p><h2>Open the pipeline and see the decisions in context.</h2></div><div class="pipeline-actions">${links.map(link => externalLink(link.url, link.label, true)).join("")}<a class="pipeline-btn pipeline-btn--quiet" href="projects.html">Back to Projects <span aria-hidden="true">-&gt;</span></a></div></section>
    </article>`;
    activateReveals();
  }

  function activateReveals() {
    const sections = document.querySelectorAll(".pipeline-section, .pipeline-cta");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return sections.forEach(section => section.classList.add("is-visible"));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    sections.forEach(section => observer.observe(section));
  }

  fetch("pipeline.json", { cache: "no-store" }).then(response => { if (!response.ok) throw new Error("Unable to load pipeline metadata"); return response.json(); }).then(render).catch(() => empty("Unable to load project data", "The Dataset Pipeline showcase is temporarily unavailable. Please try again later."));
});