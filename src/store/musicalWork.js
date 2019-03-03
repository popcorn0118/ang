
import axios from 'axios';

export default {
    namespaced: true,
    state: {
        musical: [],
        categories: [],
    },
    actions: { //操作行為
        // payload(這裡的 status) 載荷
        // 非同步行為寫在這 Ajax
        getMusical(context) {
            const url = `https://spreadsheets.google.com/feeds/list/${process.env.APIPATH}/1/public/values?alt=json`;
            console.log(url);
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
};