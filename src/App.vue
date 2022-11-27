<template>
  <div class="container-fluid">
    <div class="row">
      <Header></Header>
      <Aside>
        <!--<component is="h1" class="display-1"> anything inside component </component>-->
        <Widgets>
          <Widget>
            <Layers></Layers>
          </Widget>
          <Widget>
            <Attributes></Attributes>
          </Widget>
          <Widget>
            <Styles></Styles>
          </Widget>
        </Widgets>
      </Aside>
      <Main>
        <Content>
          <Editor></Editor>
        </Content>
      </Main>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

// test
import Element from './components/editor/components/Element.vue';

// Css
import bootstrapCSS from '../node_modules/bootstrap/dist/css/bootstrap.css';
import fontawesomeCSS from '../node_modules/font-awesome/css/font-awesome.css';

// level 1 - Components
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Main from './components/Main.vue';
import Aside from './components/Aside.vue';

// level 2 - Components
import Content from './components/Content.vue';
import Widgets from './components/editor/components/Widgets.vue';

// level 3 - Components
import Widget from './components/editor/components/Widget.vue';
import Editor from './components/editor/Editor.vue';

// level 4 - components
import Layers from './components/editor/components/widgets/Layers.vue';
import Styles from './components/editor/components/widgets/Styles.vue';
import Attributes from './components/editor/components/widgets/Attributes.vue';


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
    Editor: Editor,
    Widgets: Widgets,
    Widget: Widget,
    Layers: Layers,
    Styles: Styles,
    Attributes: Attributes
  }
}
</script>
