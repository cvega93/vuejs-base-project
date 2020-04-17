<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="email">
            <input type="password" v-model="password">
            <button type="submit">Login</button>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                email: 'v.cristianalfredo@gmail.com',
                password: 'latino01',
                submitted: false,
                loading: false,
                returnUrl: '',
                error: ''
            }
        },
        created() {
            this.returnUrl = this.$route.query.returnUrl || '/';
            if (Object.keys(this.$store.state.account.user).length) {
                this.$router.push({name: 'home'});
            }
        },
        methods: {
            handleSubmit() {
                this.submitted = true;
                const {email, password} = this;
                // stop here if form is invalid
                if (!(email && password)) {
                    this.loading = false;
                    return;
                }
                this.loading = true;
                this.$store.dispatch('account/login', {email: email, password: password}).then(res => {
                    this.loading = false;
                    this.$router.push({'name': 'home'});
                    console.log(res);
                    console.log('ACA RESPONSE LOGIN');
                });
            }
        }
    };
</script>
