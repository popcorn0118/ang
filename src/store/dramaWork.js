
import axios from 'axios';

export default {
    namespaced: true,
    state: {
        drama: [],
        categories: [],
    },
    actions: { //操作行為
        // payload(這裡的 status) 載荷
        // 非同步行為寫在這 Ajax
        getDrama(context) {
            const url = `https://spreadsheets.google.com/feeds/list/${process.env.APIPATH}/3/public/values?alt=json`;
            axios.get(url).then((response) => {
                context.commit('DRAMA', response.data.feed.entry);
                context.commit('CATEGORIES', response.data.feed.entry);  
                // console.log(this.drama, response);
            })
        },
    },
    mutations: { //操作資料狀態,建議使用常數 - 都大寫
        // 第一個參數總是 state
        // 同步行為寫在這
        DRAMA(state, payload) {
            payload = payload.sort(function(a, b) {
                return a.gsx$首播日期.$t < b.gsx$首播日期.$t ? 1 : -1;
            })
            // payload.reverse()
            state.drama = payload;
            // console.log(payload)
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
        drama: state => state.drama,
        categories: state => state.categories,
    }
};