// 彙整所有 Vuex 檔
import Vue from 'vue';
import Vuex from 'vuex';

import musicalWorkModules from './musicalWork';
import dramaWorkModules from './dramaWork';

Vue.use(Vuex);

// google試算表
// https://spreadsheets.google.com/feeds/list/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/od6/public/values?alt=json
// 範例 https://spreadsheets.google.com/feeds/cells/文件KEY/第幾張工作表/public/values?alt=json
// 'https://spreadsheets.google.com/feeds/cells/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/1/public/values?alt=json'
// 'https://spreadsheets.google.com/feeds/list/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/1/public/values?alt=json'

export default new Vuex.Store({
    strict: true, // 嚴謹模式
    modules: {
        musicalWorkModules,
        dramaWorkModules,
      },
});