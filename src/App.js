import React from "react";
import { Routes, Route } from "react-router-dom";

import GalleryMaverick from "./components/EventGallery/GalleryMaverick";
import GalleryESummit from "./components/EventGallery/GalleryESummit";
import GalleryHultPrize from "./components/EventGallery/GalleryHultPrize";
import GalleryICamp from "./components/EventGallery/GalleryICamp";
import GalleryBuildSchool from "./components/EventGallery/GalleryBuildSchool.jsx";
import GalleryLifeAtEcell from "./components/EventGallery/GalleryLifeAtEcell";
// import EsummitApp from "../src/esummit/EsummitApp";

import HomePage from "./HomePage";
import AboutUS from "./components/Aboutus/AboutUs";
import BlogApp from "./components/blog/BlogApp";
import EventsApp from "./components/events/EventsApp";
import Gallery from "./components/GalleryPage/Gallery";
import Cohort from "./Cohort/Cohort";
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import NotFound from "./components/404page/NotFound";
import  {ESummit} from "../src/ComingSoon/ESummit.jsx";
import  {BuildSchool} from "./ComingSoon/BuildSchool.jsx";
import  {ICamp} from "./ComingSoon/ICamp.jsx";
import  {HultPrize}  from "./ComingSoon/HultPrize.jsx";
import {Maverick} from "./ComingSoon/Mavericks.jsx";
import Contact from "./components/contact/Contact";
// import EventGallery from "./components/EventGallery/EventGallery";

function App() {
  return (
    <>
      <ScrollToTop />
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUS />} />
          <Route path="/blogs" element={<BlogApp />} />
          <Route path="/esummit/*" element={<ESummit />} />
          <Route path="/i-camp/" element={<ICamp />} />
          <Route path="/hult-prize/" element={<HultPrize />} />
          <Route path="/build-school/" element={<BuildSchool />} />
          <Route path="/maverick/" element={<Maverick/>}/>
          <Route path="/events" element={<EventsApp />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/cohort" element={<Cohort/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/gallery/maverick" element={<GalleryMaverick />} />
          <Route path="/gallery/esummit" element={<GalleryESummit />} />
          <Route path="/gallery/hult-prize" element={<GalleryHultPrize />} />
          <Route path="/gallery/i-camp" element={<GalleryICamp />} />
          <Route path="/gallery/build-school" element={<GalleryBuildSchool />} />
          <Route path="/gallery/life-at-ecell" element={<GalleryLifeAtEcell />} />
        </Routes>
      </PageTransition>
    </>
  );
}

export default App;
