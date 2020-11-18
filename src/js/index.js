import Search from "./model/Search";
import Recipe from "./model/Recipe";
import {elements, renderLoader, clearLoader} from "./view/base"
import {renderRecipe, clearRecipe} from "./view/recipeView"
import * as searchView from "./view/searchView"

/**
 Web app tolow
 -Хайлтын query, үр дүн
 -Тухайн үзүүлж байгаа жор
 -Лайкласан жорууд
 -Захиалж байгаа жорын найрлагууд
 */

const state = {};

/*
    Хайлтын controller = Model ==> Controller <== View

 */
const controllerSearch = async () => {
    // 1. Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
    const query = searchView.getInput();

    if (query) {
        // 2. Шинээр хайлтын обьектыг үүсгэж өгнө.
        state.search = new Search(query);
        // 3. Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ.
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv);
        // 4. Хайлыг гүйцэтгэнэ.
        await state.search.doSearch();
        // 5. Хайлын үр дүнг дэлгэцэнд үзүүлнэ.
        clearLoader();
        if (state.search.result === undefined) {
            alert('Хайлтаар илэрцгүй...')
        } else {
            searchView.renderRecipes(state.search.result);
        }
    }
}

elements.searchForm
    .addEventListener('submit', e => {
        e.preventDefault();
        controllerSearch();
    });
elements.pageButtons
    .addEventListener('click', e => {
        const btn = e.target.closest('.btn-inline');
        if (btn) {
            const gotoPageNumber = parseInt(btn.dataset.goto)
            searchView.clearSearchResult();
            searchView.renderRecipes(state.search.result, gotoPageNumber);
        }
    });
/*
    Жорын controller = Model ==> Controller <== View
 */
const controlRecipe = async () => {
    // 1. URL- аас ID-г салгаж авна
    const id = window.location.hash.replace('#', '');
    // 2. Жорын моделийг үүсгэж өгнө.
    state.recipe = new Recipe(id);
    // 3. UI дэлгэцийг бэлтгэнэ.
    clearRecipe();
    renderLoader(elements.recipeDiv);

    // 4. Жороо татаж авна.
    await state.recipe.getRecipe();
    // 5. Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно.
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    // 6. Жороо дэлгэцэнд гаргана.
    renderRecipe(state.recipe);
}
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

