import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {MainLayout} from './layouts/MainLayout';
import {MonitorPage} from "./pages/Monitor/index.jsx";
import {PresetsPage} from "./pages/Presets/index.jsx";
import {PresetPage} from "./pages/Preset/index.jsx";
import {ConfigPage} from "./pages/Config/index.jsx";


import {WsService} from './service/WsService';

const wsService = new WsService();
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainLayout />}>
                  <Route index element={<MonitorPage />} />
                  <Route path="presets" element={<PresetsPage />} />
                  <Route path="presets/:id" element={<PresetPage />} />
                  <Route path="config" element={<ConfigPage />} />
                  <Route path="debug" element={<ConfigPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
