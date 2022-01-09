import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail";

const wedRoutes = () => {
  return (
    <Routes>
      <Route path="/:catgory/search/:keyword" element={() => <Catalog />} />
      <Route path="/:catgory/:id" element={() => <Detail />} />
      <Route path="/:catgory" element={() => <Catalog />} />
      <Route path="/" element={() => <Home />} />
    </Routes>
  );
};

export default wedRoutes;
