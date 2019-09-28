<template>
    <div>
        123
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import Category from 'Category';
export default {
    name: 'MusicalWork',
    data () {
        return {
            searchText: '',
            isActive: false,
            is_menu: false
        }
    },
    created() {
        this.getMusical();
    },
    methods: {
        ...mapActions('musicalWorkModules', ['getMusical']),
        isActiveClick(index) {
            console.log(index)
            this.isActive = index
        },
        categoryToggle() {
            !this.is_menu ? this.is_menu = true : this.is_menu = false
        },
        categoryUp() {
            this.is_menu = false;
        }
        
    },
    computed: {
        ...mapGetters('musicalWorkModules', ['musical', 'categories']),
        filterMusicalData() {
            const vm = this;
            if (vm.searchText) {
                    return vm.musical.filter((item) => {
                    const data = item.gsx$分類.$t.toLowerCase().includes(vm.searchText.toLowerCase()) ||
                                 item.gsx$專輯名稱.$t.toLowerCase().includes(vm.searchText.toLowerCase()) ||
                                 item.gsx$曲目.$t.toLowerCase().includes(vm.searchText.toLowerCase())
                    return data;
                });
            }
            return this.musical;
        },
    },
    components: {
        // Category
    }
}
</script>

<style lang="scss">
// @import '../../assets/css/rotate.css';
</style>
