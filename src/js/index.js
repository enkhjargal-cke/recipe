import Search from "./model/Search";

/**
    Web app tolow
    -Хайлтын query, үр дүн
    -Тухайн үзүүлж байгаа жор
    -Лайкласан жорууд
    -Захиалж байгаа жорын найрлагууд
 */

const state = {};
const  controllerSearch = async () => {
    // 1. Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
    const query = 'pizza';
    if (query) {
        // 2. Шинээр хайлтын обьектыг үүсгэж өгнө.
        state.search = new Search(query);
        // 3. Хайлт хийхэд зориулж дэлгэцийг бэлтгэнэ.
        // 4. Хайлыг гүйцэтгэнэ.
        await state.search.doSearch();
        // 5. Хайлын үр дүнг дэлгэцэнд үзүүлнэ.
        console.log(state.search.result)
    }

    console.log('clicked');
}

document.querySelector('.search')
    .addEventListener('submit', e => {
        e.preventDefault();
        controllerSearch();
});