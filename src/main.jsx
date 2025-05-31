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
import {createTheme, ThemeProvider} from "flowbite-react";

const theme = {
    accordion: {
        "root": {
            "base": "!border-green-100 !rounded-none divide-y divide-gray-200 border-gray-200",
            "flush": {
                "off": " border",
                "on": "border-b"
            }
        },
        "content": {
            "base": "p-4"
        },
        "title": {
            "arrow": {
                "base": "h-4 w-4 shrink-0",
                "open": {
                    "off": "",
                    "on": "rotate-180"
                }
            },
            "base": "!ring-0 flex w-full !rounded-none items-center justify-between p-5 text-left font-medium text-gray-500",
            "flush": {
                "off": "",
                "on": "bg-transparent"
            },
            "heading": "",
            "open": {
                "off": "bg-gray-100 p-2 px-4 text-gray-700 font-semibold text-sm",
                "on": "bg-gray-100 p-2 px-4 text-gray-700 font-semibold text-sm"
            }
        }
    }
};

const wsService = new WsService();
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
  </StrictMode>,
)
