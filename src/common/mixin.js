export default{
    methods: {
        checkLogin(){
            if(!this.$store.state.uid){
                this.$toast('请登录')
                setTimeout((v) => {
                this.$router.push('/login')
                },1500);
                return false
            }
            return true
        }
    },
}