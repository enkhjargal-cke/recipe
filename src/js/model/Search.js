import axios from "axios";
require("@babel/polyfill");
export default class Search {
    constructor(query) {
        this.query = query;
    }
    async doSearch() {
        try {
            let result = await axios(
                `https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result= result.data.recipes;
            return this.result;

        } catch (error) {

        }
    }

}