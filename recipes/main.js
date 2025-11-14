import recipes from "./recipes.mjs";

const container = document.getElementById("recipes");
const form = document.getElementById("searchForm");
const input = document.getElementById("search");

function drawStars(rating) {
  let out = "";
  for (let i = 1; i <= 5; i++)
    out += `<span aria-hidden="true" class="${i <= rating ? "icon-star" : "icon-star-empty"}">${i <= rating ? "⭐" : "☆"}</span>`;
  return out;
}

function render(recipesArray) {
  container.innerHTML = recipesArray
    .map(
      (r, i) => `
    <article class="recipe-card">
      <img src="${r.image}" alt="${r.name}" ${i === 0 ? 'fetchpriority="low"' : 'loading="lazy"'}>
      <div class="recipe-info">
        <div class="recipe-tags">
          ${(r.tags || []).map(tag => `<span class="recipe-tag">${tag}</span>`).join(" ")}
        </div>
        <div class="recipe-title">${r.name}</div>
        <span class="recipe-rating rating" role="img" aria-label="Rating: ${r.rating} out of 5 stars">${drawStars(r.rating)}</span>
        <div class="recipe-desc">${r.description || ""}</div>
      </div>
    </article>
    `
    )
    .join("");
}

form.onsubmit = e => {
  e.preventDefault();
  const value = input.value.trim().toLowerCase();
  render(
    val
      ? recipes.filter(r =>
          r.name.toLowerCase().includes(value) ||
          (r.description && r.description.toLowerCase().includes(value)) ||
          (Array.isArray(r.tags) ? r.tags.some(t => t.toLowerCase().includes(value)) : false)
        )
      : recipes
  );
};
input.oninput = () => form.onsubmit(new Event("submit"));

render(recipes);
