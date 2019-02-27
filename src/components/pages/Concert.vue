<template>
<div>
    <div class="container">
        <Category />
    </div>
</div>  
</template>

<script>
import Category from '@C/Category'
export default {
    name: 'Concert',
    data () {
        return {
        }
    },
    components: {
        Category
    }
}
</script>
