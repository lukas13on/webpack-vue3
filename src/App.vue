<template>
  <Header></Header>
  <Main> 
    <Content>
      <Editor></Editor>
    </Content>
  </Main>
  <Aside></Aside>
  <Footer></Footer>
</template>

<script>
import { ref } from 'vue';

// test
import Element from './components/editor/components/Element.vue';

// Css
import bootstrapCSS from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
 
// Components
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Main from './components/Main.vue';
import Content from './components/Content.vue';
import Aside from './components/Aside.vue';
import Editor from './components/editor/Editor.vue';


export default {
  setup: function () {
    const count = ref(0);

    const inc = () => {
      count.value++
    }

    return {
      count,
      inc
    };

  },
  data: function () {
    return {
      message: "Test lucas"
    };
  },
  components: {
    Header: Header,
    Footer: Footer,
    Content: Content,
    Aside: Aside,
    Main: Main,
    Element, Element,
    Editor: Editor
  }
}
</script>
