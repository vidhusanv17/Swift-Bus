import React, { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon, Circle, Fill, Stroke, Text } from 'ol/style';
import Overlay from 'ol/Overlay';
import { Bus, Stop, SOSAlert } from '../types';
import { useTranslation } from 'react-i18next';
import 'ol/ol.css';

interface MapProps {
  buses: Bus[];
  stops: Stop[];
  sosAlerts?: SOSAlert[];
}

const MapComponent: React.FC<MapProps> = ({ buses, stops, sosAlerts = [] }) => {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const [focusedStop, setFocusedStop] = useState<Stop | null>(null);

  // Listen for stop focus events
  useEffect(() => {
    const handleFocusStop = (event: CustomEvent) => {
      const { stop } = event.detail;
      setFocusedStop(stop);
      
      if (mapInstanceRef.current) {
        const view = mapInstanceRef.current.getView();
        view.animate({
          center: fromLonLat([stop.longitude, stop.latitude]),
          zoom: 15,
          duration: 1000
        });
        
        // Highlight the stop by creating a temporary overlay
        setTimeout(() => {
          const stopFeature = mapInstanceRef.current?.getAllLayers()
            .find(layer => layer instanceof VectorLayer && layer.get('name') === 'stops')
            ?.getSource()?.getFeatures()
            .find(feature => feature.get('data').id === stop.id);
          
          if (stopFeature) {
            // Temporarily change the style to highlight
            const originalStyle = stopFeature.getStyle();
            stopFeature.setStyle(new Style({
              image: new Circle({
                radius: 12,
                fill: new Fill({ color: '#EF4444' }),
                stroke: new Stroke({ color: '#DC2626', width: 3 }),
              }),
            }));
            
            // Restore original style after 3 seconds
            setTimeout(() => {
              stopFeature.setStyle(originalStyle);
            }, 3000);
          }
        }, 1000);
      }
    };

    const handleFocusRoute = (event: CustomEvent) => {
      const { routeId } = event.detail;
      
      // Find buses on this route
      const routeBuses = buses.filter(bus => bus.routeId === routeId);
      
      if (routeBuses.length > 0 && mapInstanceRef.current) {
        // Calculate bounds to fit all buses on the route
        const coordinates = routeBuses.map(bus => [bus.longitude, bus.latitude]);
        
        if (coordinates.length === 1) {
          // Single bus - center on it
          const view = mapInstanceRef.current.getView();
          view.animate({
            center: fromLonLat(coordinates[0]),
            zoom: 14,
            duration: 1000
          });
        } else {
          // Multiple buses - fit to bounds
          const extent = coordinates.reduce((acc, coord) => {
            const transformedCoord = fromLonLat(coord);
            return [
              Math.min(acc[0], transformedCoord[0]),
              Math.min(acc[1], transformedCoord[1]),
              Math.max(acc[2], transformedCoord[0]),
              Math.max(acc[3], transformedCoord[1])
            ];
          }, [Infinity, Infinity, -Infinity, -Infinity]);
          
          const view = mapInstanceRef.current.getView();
          view.fit(extent, {
            padding: [50, 50, 50, 50],
            duration: 1000
          });
        }
        
        // Highlight route buses
        setTimeout(() => {
          const busLayer = mapInstanceRef.current?.getAllLayers()
            .find(layer => layer instanceof VectorLayer && layer.get('name') === 'buses');
          
          if (busLayer) {
            const features = busLayer.getSource()?.getFeatures() || [];
            features.forEach(feature => {
              const bus = feature.get('data');
              if (bus.routeId === routeId) {
                const originalStyle = feature.getStyle();
                feature.setStyle(new Style({
                  image: new Circle({
                    radius: 15,
                    fill: new Fill({ color: '#F59E0B' }),
                    stroke: new Stroke({ color: 'white', width: 3 }),
                  }),
                  text: new Text({
                    text: '🚌',
                    font: '14px sans-serif',
                    offsetY: 1,
                  }),
                }));
                
                // Restore original style after 3 seconds
                setTimeout(() => {
                  feature.setStyle(originalStyle);
                }, 3000);
              }
            });
          }
        }, 1000);
      }
    };
    
    const handleFocusSOSAlert = (event: CustomEvent) => {
      const { alert } = event.detail;
      
      if (mapInstanceRef.current && alert.latitude !== 0 && alert.longitude !== 0) {
        const view = mapInstanceRef.current.getView();
        view.animate({
          center: fromLonLat([alert.longitude, alert.latitude]),
          zoom: 16,
          duration: 1000
        });
        
        // Highlight the SOS alert
        setTimeout(() => {
          const sosLayer = mapInstanceRef.current?.getAllLayers()
            .find(layer => layer instanceof VectorLayer && layer.get('name') === 'sos');
          
          if (sosLayer) {
            const features = sosLayer.getSource()?.getFeatures() || [];
            const sosFeature = features.find(feature => feature.get('data').id === alert.id);
            
            if (sosFeature) {
              const originalStyle = sosFeature.getStyle();
              sosFeature.setStyle(new Style({
                image: new Circle({
                  radius: 20,
                  fill: new Fill({ color: '#DC2626' }),
                  stroke: new Stroke({ color: 'white', width: 4 }),
                }),
                text: new Text({
                  text: '🆘',
                  font: '16px sans-serif',
                  offsetY: 1,
                }),
              }));
              
              // Restore original style after 3 seconds
              setTimeout(() => {
                sosFeature.setStyle(originalStyle);
              }, 3000);
            }
          }
        }, 1000);
      }
    };
    
    window.addEventListener('focusStop', handleFocusStop as EventListener);
    window.addEventListener('focusRoute', handleFocusRoute as EventListener);
    window.addEventListener('focusSOSAlert', handleFocusSOSAlert as EventListener);
    
    return () => {
      window.removeEventListener('focusStop', handleFocusStop as EventListener);
      window.removeEventListener('focusRoute', handleFocusRoute as EventListener);
      window.removeEventListener('focusSOSAlert', handleFocusSOSAlert as EventListener);
    };
  }, [buses]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create popup overlay
    const popup = new Overlay({
      element: popupRef.current!,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50],
    });

    overlayRef.current = popup;

    // Create map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([75.8573, 30.9010]), // Ludhiana, Punjab
        zoom: 8,
      }),
      overlays: [popup],
    });

    mapInstanceRef.current = map;

    // Create vector layers for different marker types
    const busLayer = new VectorLayer({
      source: new VectorSource(),
      name: 'buses',
    });

    const stopLayer = new VectorLayer({
      source: new VectorSource(),
      name: 'stops',
    });

    const sosLayer = new VectorLayer({
      source: new VectorSource(),
      name: 'sos',
    });

    map.addLayer(busLayer);
    map.addLayer(stopLayer);
    map.addLayer(sosLayer);

    // Add bus markers
    buses.forEach((bus) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([bus.longitude, bus.latitude])),
        data: bus,
        type: 'bus',
      });

      const color = bus.status === 'active' ? '#3B82F6' : 
                   bus.status === 'maintenance' ? '#EF4444' : '#6B7280';

      feature.setStyle(new Style({
        image: new Circle({
          radius: 12,
          fill: new Fill({ color }),
          stroke: new Stroke({ color: 'white', width: 2 }),
        }),
        text: new Text({
          text: '🚌',
          font: '12px sans-serif',
          offsetY: 1,
        }),
      }));

      busLayer.getSource()?.addFeature(feature);
    });

    // Add stop markers
    stops.forEach((stop) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([stop.longitude, stop.latitude])),
        data: stop,
        type: 'stop',
      });

      feature.setStyle(new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: '#10B981' }),
          stroke: new Stroke({ color: '#059669', width: 2 }),
        }),
      }));

      stopLayer.getSource()?.addFeature(feature);
    });

    // Add SOS markers
    sosAlerts.filter(alert => alert.status === 'active').forEach((alert) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([alert.longitude, alert.latitude])),
        data: alert,
        type: 'sos',
      });

      feature.setStyle(new Style({
        image: new Circle({
          radius: 15,
          fill: new Fill({ color: '#EF4444' }),
          stroke: new Stroke({ color: 'white', width: 3 }),
        }),
        text: new Text({
          text: '🆘',
          font: '14px sans-serif',
          offsetY: 1,
        }),
      }));

      sosLayer.getSource()?.addFeature(feature);
    });

    // Handle click events for popups
    map.on('click', (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      
      if (feature) {
        const data = feature.get('data');
        const type = feature.get('type');
        const coordinate = event.coordinate;

        let content = '';
        
        if (type === 'bus') {
          content = `
            <div class="p-3 bg-white rounded-lg shadow-lg min-w-[200px]">
              <h3 class="font-semibold text-gray-900 mb-2">${data.busNumber}</h3>
              <p class="text-sm text-gray-600 mb-1">Model: ${data.busModel}</p>
              <p class="text-sm text-gray-600 mb-1">${t('route')}: ${data.routeId}</p>
              <p class="text-sm text-gray-600 mb-1">${t('speed')}: ${data.speed} km/h</p>
              <p class="text-sm text-gray-600">
                ${t('status')}: 
                <span class="ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                  data.status === 'active' ? 'bg-green-100 text-green-800' :
                  data.status === 'maintenance' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }">
                  ${t(data.status)}
                </span>
              </p>
            </div>
          `;
        } else if (type === 'stop') {
          content = `
            <div class="p-3 bg-white rounded-lg shadow-lg min-w-[200px]">
              <h3 class="font-semibold text-gray-900 mb-2">${data.name}</h3>
              <p class="text-sm text-gray-600 mb-1">Code: ${data.code}</p>
              <p class="text-sm text-gray-600 mb-2">${t('routes')}: ${data.routes.join(', ')}</p>
              <div class="mb-2">
                <p class="text-xs text-gray-500 mb-1">Amenities:</p>
                <div class="flex flex-wrap gap-1">
                  ${data.amenities.map((amenity: string) => 
                    `<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">${amenity}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
          `;
        } else if (type === 'sos') {
          content = `
            <div class="p-3 bg-white rounded-lg shadow-lg min-w-[200px]">
              <h3 class="font-semibold text-red-600 mb-2">🆘 ${data.assistanceType.charAt(0).toUpperCase() + data.assistanceType.slice(1)} Emergency</h3>
              <p class="text-sm text-gray-600 mb-1">User: ${data.userName}</p>
              <p class="text-sm text-gray-600 mb-1">Phone: ${data.phoneNumber}</p>
              <p class="text-sm text-gray-600 mb-1">Location: ${data.emergencyLocation}</p>
              ${data.busNumber ? `<p class="text-sm text-gray-600 mb-1">Bus: ${data.busNumber}</p>` : ''}
              <p class="text-sm text-gray-600 mb-1">Priority: <span class="font-medium text-red-700">${data.priority.toUpperCase()}</span></p>
              <p class="text-sm text-gray-600 mb-1">
                Time: ${data.timestamp.toLocaleTimeString()}
              </p>
              <p class="text-sm text-gray-600">Description: ${data.description}</p>
            </div>
          `;
        }

        popupRef.current!.innerHTML = content;
        popup.setPosition(coordinate);
      } else {
        popup.setPosition(undefined);
      }
    });

    return () => {
      map.setTarget(undefined);
    };
  }, [buses, stops, sosAlerts, t]);

  return (
    <div className="h-full w-full relative map-container">
      <div ref={mapRef} className="h-full w-full" />
      
      {/* Popup element */}
      <div ref={popupRef} className="ol-popup"></div>
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">{t('legend')}</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
            <span className="text-gray-700">{t('activeBus')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
            <span className="text-gray-700">{t('maintenance')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-500 rounded-full border-2 border-white"></div>
            <span className="text-gray-700">{t('inactive')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full border border-green-600"></div>
            <span className="text-gray-700">{t('busStop')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-xs">🆘</div>
            <span className="text-gray-700">SOS Alert</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ol-popup {
          position: absolute;
          background-color: white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          padding: 0;
          border-radius: 10px;
          border: 1px solid #cccccc;
          bottom: 12px;
          left: -50px;
          min-width: 200px;
        }
        .ol-popup:after, .ol-popup:before {
          top: 100%;
          border: solid transparent;
          content: " ";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
        }
        .ol-popup:after {
          border-top-color: white;
          border-width: 10px;
          left: 48px;
          margin-left: -10px;
        }
        .ol-popup:before {
          border-top-color: #cccccc;
          border-width: 11px;
          left: 48px;
          margin-left: -11px;
        }
      `}</style>
    </div>
  );
};

export default MapComponent;