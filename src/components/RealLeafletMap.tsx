"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Truck, MapPin, Layers, Navigation, ZoomIn, ZoomOut } from "lucide-react";

interface RealLeafletMapProps {
  simulatedKm: number;
  originCity?: string;
  originAddress?: string;
  destCity?: string;
  destAddress?: string;
  orderCode?: string;
}

// Realistic GPS Waypoints along CT04 (Cao tốc Hà Nội - Hải Phòng) & Vành đai 3 Đông Anh
const ROUTE_WAYPOINTS: L.LatLngTuple[] = [
  [20.8521, 106.7725], // Cảng Đình Vũ (Hải Phòng)
  [20.8402, 106.7150], // Nút giao Đình Vũ / Đường 356
  [20.8250, 106.6300], // Nút giao Tràng Cát - Cao tốc 5B
  [20.8420, 106.5200], // Nút giao QL10 - Cao tốc Hà Nội - Hải Phòng
  [20.8750, 106.3950], // Cao tốc qua Gia Lộc - Hải Dương (45 km)
  [20.9385, 106.3142], // Nút giao Hải Dương (55 km)
  [20.9120, 106.1300], // Cao tốc qua Yên Mỹ - Hưng Yên (85 km)
  [20.9650, 105.9800], // Nút giao Văn Giang (Ecopark - 100 km)
  [20.9900, 105.9150], // Nút giao Cổ Linh / Cầu Thanh Trì
  [21.0450, 105.8600], // Cầu Đông Trù / Đường Trường Sa
  [21.1345, 105.7825], // KCN Thăng Long, Đông Anh, Hà Nội (120 km)
];

// Helper to interpolate coordinate along route based on ratio 0..1
function getInterpolatedPoint(ratio: number): { lat: number; lng: number } {
  if (ratio <= 0) return { lat: ROUTE_WAYPOINTS[0][0], lng: ROUTE_WAYPOINTS[0][1] };
  if (ratio >= 1) {
    const last = ROUTE_WAYPOINTS[ROUTE_WAYPOINTS.length - 1];
    return { lat: last[0], lng: last[1] };
  }

  const totalSegments = ROUTE_WAYPOINTS.length - 1;
  const targetIndex = ratio * totalSegments;
  const index = Math.floor(targetIndex);
  const segmentRatio = targetIndex - index;

  const start = ROUTE_WAYPOINTS[index];
  const end = ROUTE_WAYPOINTS[Math.min(index + 1, totalSegments)];

  return {
    lat: start[0] + (end[0] - start[0]) * segmentRatio,
    lng: start[1] + (end[1] - start[1]) * segmentRatio,
  };
}

export const RealLeafletMap: React.FC<RealLeafletMapProps> = ({
  simulatedKm,
  originCity = "Hải Phòng",
  originAddress = "Cảng Đình Vũ, Đông Hải 2, Hải An, Hải Phòng",
  destCity = "Hà Nội",
  destAddress = "KCN Thăng Long, Đông Anh, Hà Nội",
  orderCode = "FT202609180023",
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const truckMarkerRef = useRef<L.Marker | null>(null);
  const traveledPolylineRef = useRef<L.Polyline | null>(null);

  const [mapType, setMapType] = useState<"STREET" | "SATELLITE">("STREET");

  // Calculate current location along the route
  const progressRatio = Math.min(1, Math.max(0, simulatedKm / 120));
  const currentPos = getInterpolatedPoint(progressRatio);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Center map around Hai Duong (midpoint)
    const map = L.map(mapContainerRef.current, {
      center: [20.96, 106.28],
      zoom: 10,
      zoomControl: false,
    });
    mapInstanceRef.current = map;

    // Tile Layer: Street vs Satellite
    const streetUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tile = L.tileLayer(streetUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    tileLayerRef.current = tile;

    // Custom Icon Creators
    const createOriginIcon = () =>
      L.divIcon({
        className: "custom-leaflet-pin",
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
            <div style="background: #10B981; color: white; padding: 4px 8px; border-radius: 8px; font-size: 11px; font-weight: bold; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.2); border: 2px solid white; display: flex; align-items: center; gap: 4px;">
              <span>🟢 Hải Phòng (Cảng Đình Vũ)</span>
            </div>
            <div style="width: 14px; height: 14px; background: #10B981; border: 3px solid white; border-radius: 50%; margin-top: -2px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>
          </div>
        `,
        iconSize: [0, 0],
      });

    const createDestIcon = () =>
      L.divIcon({
        className: "custom-leaflet-pin",
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
            <div style="background: #EF4444; color: white; padding: 4px 8px; border-radius: 8px; font-size: 11px; font-weight: bold; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.2); border: 2px solid white; display: flex; align-items: center; gap: 4px;">
              <span>🔴 Hà Nội (KCN Thăng Long)</span>
            </div>
            <div style="width: 14px; height: 14px; background: #EF4444; border: 3px solid white; border-radius: 50%; margin-top: -2px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>
          </div>
        `,
        iconSize: [0, 0],
      });

    const createWaypointIcon = () =>
      L.divIcon({
        className: "custom-leaflet-pin",
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
            <div style="background: #2563EB; color: white; padding: 2px 6px; border-radius: 6px; font-size: 10px; font-weight: 600; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.2); border: 1.5px solid white;">
              <span>Hải Dương (55 km)</span>
            </div>
            <div style="width: 10px; height: 10px; background: #2563EB; border: 2px solid white; border-radius: 50%; margin-top: -2px;"></div>
          </div>
        `,
        iconSize: [0, 0],
      });

    const createTruckIcon = () =>
      L.divIcon({
        className: "custom-leaflet-truck",
        html: `
          <div style="transform: translate(-50%, -50%); position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 44px; height: 44px; background: rgba(37, 99, 235, 0.25); border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="background: #1E293B; color: white; border: 2px solid #38BDF8; border-radius: 12px; padding: 6px 9px; display: flex; align-items: center; gap: 6px; box-shadow: 0 8px 18px rgba(0,0,0,0.35); white-space: nowrap; z-index: 10;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
                <path d="M15 18H9"/>
                <path d="M19 18h2a1 1 0 0 0 1-1v-5.28a1 1 0 0 0-.29-.7l-3.42-3.43a1 1 0 0 0-.71-.29H14v10.7"/>
                <circle cx="7" cy="18" r="2"/>
                <circle cx="17" cy="18" r="2"/>
              </svg>
              <div style="line-height: 1.1;">
                <div style="font-size: 10px; font-weight: 800; color: #38BDF8;">Xe 29H-123.45</div>
                <div style="font-size: 9px; color: #94A3B8;">62 km/h • Đang chạy</div>
              </div>
            </div>
          </div>
        `,
        iconSize: [0, 0],
      });

    // 1. Draw Background Highway Route Polyline (Full route)
    L.polyline(ROUTE_WAYPOINTS, {
      color: "#1E293B",
      weight: 8,
      opacity: 0.8,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(map);

    L.polyline(ROUTE_WAYPOINTS, {
      color: "#3B82F6",
      weight: 4,
      dashArray: "6, 8",
      lineCap: "round",
    }).addTo(map);

    // 2. Traveled Polyline (Green highlight)
    const initialTraveledPoints: L.LatLngTuple[] = [
      ROUTE_WAYPOINTS[0],
      [currentPos.lat, currentPos.lng],
    ];
    const traveledPolyline = L.polyline(initialTraveledPoints, {
      color: "#10B981",
      weight: 5,
      opacity: 0.9,
    }).addTo(map);
    traveledPolylineRef.current = traveledPolyline;

    // 3. Add Waypoint Markers
    L.marker(ROUTE_WAYPOINTS[0], { icon: createOriginIcon() })
      .addTo(map)
      .bindPopup(`<b>${originCity}</b><br/>${originAddress}`);

    L.marker(ROUTE_WAYPOINTS[5], { icon: createWaypointIcon() })
      .addTo(map)
      .bindPopup("<b>Trạm trung chuyển Hải Dương</b><br/>Km 55 Cao tốc Hà Nội - Hải Phòng");

    L.marker(ROUTE_WAYPOINTS[ROUTE_WAYPOINTS.length - 1], { icon: createDestIcon() })
      .addTo(map)
      .bindPopup(`<b>${destCity}</b><br/>${destAddress}`);

    // 4. Add Truck Marker
    const truckMarker = L.marker([currentPos.lat, currentPos.lng], {
      icon: createTruckIcon(),
      zIndexOffset: 1000,
    }).addTo(map);
    truckMarkerRef.current = truckMarker;

    // 5. Fit bounds to route
    map.fitBounds(L.latLngBounds(ROUTE_WAYPOINTS), {
      padding: [40, 40],
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Truck Position and Traveled Polyline when simulatedKm changes
  useEffect(() => {
    if (!truckMarkerRef.current || !mapInstanceRef.current) return;

    const newPos = getInterpolatedPoint(progressRatio);
    truckMarkerRef.current.setLatLng([newPos.lat, newPos.lng]);

    // Update traveled line
    if (traveledPolylineRef.current) {
      const traveledPoints: L.LatLngTuple[] = [ROUTE_WAYPOINTS[0]];
      const totalSegments = ROUTE_WAYPOINTS.length - 1;
      const targetIndex = progressRatio * totalSegments;
      const index = Math.floor(targetIndex);

      for (let i = 1; i <= index && i < ROUTE_WAYPOINTS.length; i++) {
        traveledPoints.push(ROUTE_WAYPOINTS[i]);
      }
      traveledPoints.push([newPos.lat, newPos.lng]);
      traveledPolylineRef.current.setLatLngs(traveledPoints);
    }
  }, [simulatedKm, progressRatio]);

  // Handle Switch Map Style (Street / Satellite)
  const handleToggleMapType = (type: "STREET" | "SATELLITE") => {
    setMapType(type);
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    let newUrl = "";
    let attribution = "";

    if (type === "SATELLITE") {
      newUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      attribution = '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye';
    } else {
      newUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    }

    const newTile = L.tileLayer(newUrl, {
      maxZoom: 19,
      attribution,
    }).addTo(mapInstanceRef.current);

    // Bring tile to back so route polylines stay on top
    newTile.bringToBack();
    tileLayerRef.current = newTile;
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetBounds = () => {
    mapInstanceRef.current?.fitBounds(L.latLngBounds(ROUTE_WAYPOINTS), {
      padding: [40, 40],
    });
  };

  return (
    <div className="relative w-full h-full min-h-[480px] rounded-2xl overflow-hidden shadow-xs border border-slate-200">
      {/* Real Map Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[480px] z-0" />

      {/* Top Map Type Switcher Controls */}
      <div className="absolute top-4 right-4 z-[400] flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-200">
        <button
          onClick={() => handleToggleMapType("STREET")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mapType === "STREET"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Bản đồ đường bộ
        </button>
        <button
          onClick={() => handleToggleMapType("SATELLITE")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mapType === "SATELLITE"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Vệ tinh
        </button>
      </div>

      {/* Map Zoom Controls */}
      <div className="absolute top-16 right-4 z-[400] flex flex-col gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-200">
        <button
          onClick={handleZoomIn}
          title="Phóng to"
          className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Thu nhỏ"
          className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetBounds}
          title="Căn giữa toàn tuyến"
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all border-t border-slate-100"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Floating Stats on Map */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200 text-xs shadow-lg space-y-1.5 max-w-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-extrabold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Tốc độ di chuyển: 62 km/h
          </div>
          <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
            {simulatedKm} / 120 km
          </span>
        </div>
        <p className="text-slate-500 text-[11px] flex items-center gap-1">
          <Truck className="w-3.5 h-3.5 text-blue-600 inline" />
          <span>Vị trí hiện tại: <strong>Cao tốc Hà Nội - Hải Phòng (CT04)</strong></span>
        </p>
      </div>
    </div>
  );
};
