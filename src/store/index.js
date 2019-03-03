// 彙整所有 Vuex 檔
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import $ from 'jquery';
Vue.use(Vuex);

// google試算表
// https://spreadsheets.google.com/feeds/list/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/od6/public/values?alt=json
// 範例 https://spreadsheets.google.com/feeds/cells/文件KEY/第幾張工作表/public/values?alt=json
// 'https://spreadsheets.google.com/feeds/cells/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/1/public/values?alt=json'
// 'https://spreadsheets.google.com/feeds/list/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/1/public/values?alt=json'

export default new Vuex.Store({
    strict: true, // 嚴謹模式
    state: {
        musical: [],
        categories: [],
    },
    actions: { //操作行為
        // payload(這裡的 status) 載荷
        // 非同步行為寫在這 Ajax
        getMusical(context) {
            const url = 'https://spreadsheets.google.com/feeds/list/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/1/public/values?alt=json';
            axios.get(url).then((response) => {
                context.commit('MUSICAL', response.data.feed.entry);
                context.commit('CATEGORIES', response.data.feed.entry);  
                console.log(this.musical);
            })
        },
    },
    mutations: { //操作資料狀態,建議使用常數 - 都大寫
        // 第一個參數總是 state
        // 同步行為寫在這
        MUSICAL(state, payload) {
            state.musical = payload;
        },
        CATEGORIES(state, payload) {
            const categories = new Set();
            payload.forEach((item) => {
                // console.log('分類', item.gsx$分類.$t)
                categories.add(item.gsx$分類.$t);
            });
            state.categories = Array.from(categories);
        },
    },
    getters: {
        musical: state => state.musical,
        categories: state => state.categories,
    }
});