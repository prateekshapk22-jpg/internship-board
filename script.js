const grid = document.querySelector("#internshipGrid");
const searchInput = document.querySelector("#search");
const domainSelect = document.querySelector("#domain");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const errorState = document.querySelector("#errorState");
const status = document.querySelector("#status");
const clearFilters = document.querySelector("#clearFilters");
const emptyClearButton = document.querySelector("#emptyClearButton");
const retryButton = document.querySelector("#retryButton");

let internships = [];

async function loadInternships() {
  showLoading();
  try {
    const response = await fetch("data/internships.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    if (!Array.isArray(data)) throw new Error("Invalid internship data");
    internships = data;
    populateDomains();
    render();
    hideStates();
  } catch (error) {
    console.error(error);
    grid.innerHTML = "";
    status.hidden = true;
    emptyState.hidden = true;
    errorState.hidden = false;
  }
}

function showLoading() {
  errorState.hidden = true;
  emptyState.hidden = true;
  status.hidden = false;
  status.textContent = "Loading internships…";
}

function hideStates() {
  status.hidden = true;
  errorState.hidden = true;
}

function populateDomains() {
  const domains = [...new Set(internships.map(item => item.domain).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));

  domainSelect.innerHTML = '<option value="all">All domains</option>';
  domains.forEach(domain => {
    const option = document.createElement("option");
    option.value = domain;
    option.textContent = domain;
    domainSelect.appendChild(option);
  });
}

function getFilteredInternships() {
  const query = searchInput.value.trim().toLowerCase();
  const domain = domainSelect.value;

  return internships.filter(item => {
    const searchable = [
      item.title, item.company, item.domain, item.location, item.type, item.description,
      ...(item.tags || [])
    ].join(" ").toLowerCase();

    const matchesSearch = !query || searchable.includes(query);
    const matchesDomain = domain === "all" || item.domain === domain;
    return matchesSearch && matchesDomain;
  });
}

function render() {
  const results = getFilteredInternships();
  grid.innerHTML = "";

  results.forEach(item => grid.appendChild(createCard(item)));

  resultCount.textContent =
    `${results.length} internship${results.length === 1 ? "" : "s"} found`;

  emptyState.hidden = results.length !== 0;
}

function createCard(item) {
  const article = document.createElement("article");
  article.className = "card";

  const top = document.createElement("div");
  top.className = "card-top";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = item.domain;

  top.appendChild(badge);
  article.appendChild(top);

  const title = document.createElement("h3");
  title.textContent = item.title;
  article.appendChild(title);

  const company = document.createElement("p");
  company.className = "company";
  company.textContent = item.company;
  article.appendChild(company);

  const meta = document.createElement("div");
  meta.className = "meta";

  [item.location, item.type, item.duration].filter(Boolean).forEach(value => {
    const span = document.createElement("span");
    span.textContent = value;
    meta.appendChild(span);
  });

  article.appendChild(meta);

  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = item.description;
  article.appendChild(description);

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const link = document.createElement("a");
  link.className = "apply-link";
  link.href = item.applyUrl || "#";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "View opportunity";
  link.setAttribute("aria-label", `View ${item.title} at ${item.company}`);

  actions.appendChild(link);
  article.appendChild(actions);

  return article;
}

function resetFilters() {
  searchInput.value = "";
  domainSelect.value = "all";
  render();
  searchInput.focus();
}

searchInput.addEventListener("input", render);
domainSelect.addEventListener("change", render);
clearFilters.addEventListener("click", resetFilters);
emptyClearButton.addEventListener("click", resetFilters);
retryButton.addEventListener("click", loadInternships);

loadInternships();
