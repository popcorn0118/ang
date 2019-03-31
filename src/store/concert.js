
import axios from 'axios';

export default {
    namespaced: true,
    state: {
        concert: [],
        categories: [],
        concertArr: [],
        markColor: []
    },
    actions: { //操作行為
        // payload(這裡的 status) 載荷
        // 非同步行為寫在這 Ajax
        getConcert(context) {
            const url = `https://spreadsheets.google.com/feeds/list/${process.env.APIPATH}/2/public/values?alt=json`;
            axios.get(url).then((response) => {
                context.commit('CONCERT', response.data.feed.entry);
                context.commit('CATEGORIES', response.data.feed.entry);  
                context.commit('CONCERTARR', response.data.feed.entry);
                context.commit('MARK_COLOR', response.data.feed.entry);  
                console.log(this.concert, response);
            })
        },
    },
    mutations: { //操作資料狀態,建議使用常數 - 都大寫
        // 第一個參數總是 state
        // 同步行為寫在這
        CONCERT(state, payload) {
            payload = payload.sort(function(a, b) {
                return a.gsx$演出日期.$t < b.gsx$演出日期.$t ? 1 : -1;
            })
            // // payload.reverse()
            state.concert = payload;
            console.log(payload)
        },
        // CATEGORIES(state, payload) {
        //     const categories = new Set();
        //     payload.forEach((item) => {
        //         console.log('演唱會名稱', item.gsx$演唱會名稱.$t)
        //         categories.add(item.gsx$演唱會名稱.$t);
        //     });
        //     state.categories = Array.from(categories);
        // },
        CATEGORIES(state, payload) {
            const categories = new Set();
            payload.forEach((item) => {
                console.log('演唱會名稱', item.gsx$演唱會名稱.$t)
                categories.add(item.gsx$演唱會名稱.$t);
            });
            state.categories = Array.from(categories);
        },
        CONCERTARR(state, payload) {
            const concertArr = new Set();
            payload.forEach((item) => {
                concertArr.add(
                    {
                        latLng: [parseFloat(item.gsx$經度.$t), parseFloat(item.gsx$緯度.$t)],
                        name: `${item.gsx$演出日期.$t} - ${item.gsx$演出城市.$t}，${item.gsx$人數.$t}`,
                        style: { fill: item.gsx$顏色.$t.toString()},
                        concert: item.gsx$演唱會名稱.$t
                    }
                );
            });
            state.concertArr = Array.from(concertArr);
        },
        MARK_COLOR(state, payload) {
            const markColor = new Set();
            payload.forEach((item) => {
                markColor.add({color: item.gsx$顏色.$t, categories: item.gsx$演唱會名稱.$t});
            });
            state.markColor = Array.from(markColor);
        },
    },
    getters: {
        concert: state => state.concert,
        categories: state => state.categories,
        concertArr: state => state.concertArr,
        markColor: state => state.markColor,
    }
};