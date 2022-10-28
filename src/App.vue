<template>
  <Header></Header>
  <Main>
    <Content>
      <img src="./assets/logo.png">
      <h1>Hello Lucas !</h1>
      <button @click="inc">Clicked {{ count }} times.</button>
      <p>{{ message }}</p>
    </Content>
  </Main>
  <Aside></Aside>
  <Footer></Footer>
</template>

<script>
import { ref } from 'vue';

// Css
import bootstrapCSS from '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Components
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Main from './components/Main.vue';
import Content from './components/Content.vue';
import Aside from './components/Aside.vue';


export default {
  setup: function () {
    const count = ref(0);

    const inc = () => {
      count.value++
    }

    return {
      count,
      inc,
      elementStyles
    };

  },
  data: function () {
    return {
      message: "Test"
    };
  },
  components: {
    Header: Header,
    Footer: Footer,
    Content: Content,
    Aside: Aside
  }
}
</script>
