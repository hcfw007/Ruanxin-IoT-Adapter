import Vue from 'vue'

Vue.mixin({
  methods: {
    checkProduct() {
      if (!localStorage.getItem('currentProduct')) {
        this.$toast('请先在产品列表界面选择产品！', {
          customCss: {
            'background-color': '#909399',
            color: '#fff'
          }
        })
        this.$router.push('/deviceAccess/productList')
      } else {
        this.currentProduct = JSON.parse(localStorage.getItem('currentProduct'))
      }
    }
  }
})
