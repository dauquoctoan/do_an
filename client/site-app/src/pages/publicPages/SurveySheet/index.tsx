import { lazy } from "react";
import {Input} from "antd";

const Contact = lazy(() => import("./components/ContactForm"));
const MiddleBlock = lazy(() => import("./components/MiddleBlock"));
const Container = lazy(() => import("./common/Container"));
const ScrollToTop = lazy(() => import("./common/ScrollToTop"));
const ContentBlock = lazy(() => import("./components/ContentBlock"));

const SurveySheet = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        title={'ngu vcl'}
        content={<div><Input /></div>}
        button={'sss'}
        icon="developer.svg"
        id="intro"
      />
      <MiddleBlock
        title={'ngu vcl'}
        content={'súc vật'}
        button={'sss'}
      />
      <ContentBlock
        type="left"
        title={'ngu vcl'}
        content={'súc vật'}
        section={'sss'}
        icon="graphs.svg"
        id="about"
      />
      <ContentBlock
        type="right"
        title={'ngu vcl'}
        content={'súc vật'}
        icon="product-launch.svg"
        id="mission"
      />
      <ContentBlock
        type="left"
        title={'ngu vcl'}
        content={'súc vật'}
        icon="waving.svg"
        id="product"
      />
      <Contact
        title={'ngu vcl'}
        content={'súc vật'}
        id="contact"
      />
    </Container>
  );
};

export default SurveySheet;
