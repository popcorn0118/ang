// 彙整所有 Vuex 檔
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import $ from 'jquery';
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true, // 嚴謹模式
    state: {
     
    },
    actions: { //操作行為
        // payload(這裡的 status) 載荷
        // 非同步行為寫在這 Ajax
        
    },
    mutations: { //操作資料狀態,建議使用常數 - 都大寫
        // 第一個參數總是 state
        // 同步行為寫在這
        
    },
    getters: {

    }
});