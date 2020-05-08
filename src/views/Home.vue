<template>
    <div class="home">
        {{msg}}
    </div>
</template>

<script>
    import axios from 'axios'
    import api from '../assets/config/api'

    export default {
        name: 'Home',
        data(){
            return{
                msg: ""
            }
        },
        components: {},
        async mounted()
        {
            let result = await axios.get(api.IndexUrl);
            console.log(result);
            this.msg = result.data;
        }
    }
</script>
