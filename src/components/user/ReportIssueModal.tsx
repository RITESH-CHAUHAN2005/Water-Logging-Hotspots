import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, MapPin, Send, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { ROHINI_WARD_BOUNDARY, ROHINI_CENTER, isNearSensitiveArea } from '@/data/mockData';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon URLs
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    description: '',
    latitude: '',
    longitude: '',
    image: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);

  // Block field workers from reporting
  if (user?.role === 'field_worker') {
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      toast.error('Please enter a description');
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      toast.error('Please enter location coordinates');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Save report to localStorage
      const reports = JSON.parse(localStorage.getItem('userReports') || '[]');
      
      const reportLat = parseFloat(formData.latitude);
      const reportLng = parseFloat(formData.longitude);
      const ward = user?.ward || 'Rohini';
      
      // Check if report is near sensitive area
      const sensitiveCheck = isNearSensitiveArea(reportLat, reportLng, ward);
      
      // Determine priority based on sensitive area proximity
      let priority: 'Low' | 'Medium' | 'High' | 'Critical' = 'Medium';
      let priorityReason = '';
      
      if (sensitiveCheck.isNear && sensitiveCheck.nearestArea) {
        priority = 'High';
        priorityReason = `Near Sensitive Area (${sensitiveCheck.nearestArea.type})`;
      }
      
      const newReport = {
        id: Date.now(),
        userId: user?.id,
        user: user?.name || 'Anonymous',
        description: formData.description,
        location: `${ward}, Delhi (${formData.latitude}, ${formData.longitude})`,
        ward,
        wardNo: user?.wardNo || 8,
        latitude: reportLat,
        longitude: reportLng,
        status: 'Pending',
        priority,
        priorityReason,
        nearSensitiveArea: sensitiveCheck.isNear,
        sensitiveAreaInfo: sensitiveCheck.nearestArea,
        date: new Date().toISOString(),
        image: formData.image ? URL.createObjectURL(formData.image) : null,
      };

      reports.push(newReport);
      localStorage.setItem('userReports', JSON.stringify(reports));

      // Trigger update event
      window.dispatchEvent(new Event('reportsUpdated'));

      toast.success('Report submitted successfully!');
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        description: '',
        latitude: '',
        longitude: '',
        image: null,
      });
      
      // Close modal
      onClose();
    }, 1500);
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      toast.loading('Getting your location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          setFormData({ ...formData, latitude: lat, longitude: lng });
          toast.dismiss();
          toast.success('Location captured successfully!');
        },
        (error) => {
          toast.dismiss();
          toast.error('Unable to get location. Please enter manually.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Main Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg glass-card rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Report Waterlogging</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Spotted an issue? Let us know. Your report helps everyone.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the location and severity of the waterlogging..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[100px] resize-none bg-secondary/30 border-border/50 focus:border-primary"
                    required
                  />
                </div>

                {/* Location Section */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Location Coordinates *</Label>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowMapPicker(true)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Pick on Map
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={getCurrentLocation}
                    >
                      <MapIcon className="h-4 w-4 mr-2" />
                      Use Current
                    </Button>
                  </div>

                  {/* Coordinate Inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude" className="text-xs text-muted-foreground">
                        Latitude
                      </Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        placeholder="e.g., 28.6139"
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                        className="bg-secondary/30 border-border/50 focus:border-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude" className="text-xs text-muted-foreground">
                        Longitude
                      </Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        placeholder="e.g., 77.2090"
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                        className="bg-secondary/30 border-border/50 focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Upload Image */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-medium">
                    Upload Image (Optional)
                  </Label>
                  <div className="relative">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-border/50 bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                    >
                      <Camera className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {formData.image ? formData.image.name : 'Choose File'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formData.image ? 'File selected' : 'No file chosen'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-base shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Submit Report
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Map Picker Modal */}
          {showMapPicker && (
            <MapPickerModal
              onClose={() => setShowMapPicker(false)}
              onSelect={(lat, lng) => {
                setFormData({
                  ...formData,
                  latitude: lat.toFixed(6),
                  longitude: lng.toFixed(6),
                });
                setShowMapPicker(false);
                toast.success('Location selected from map!');
              }}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}

// Helper function to check if point is inside polygon using proper ray casting
function isPointInPolygon(point: L.LatLng, polygon: L.LatLng[]): boolean {
  const x = point.lng;
  const y = point.lat;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;

    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

// Map Picker Modal Component
interface MapPickerModalProps {
  onClose: () => void;
  onSelect: (lat: number, lng: number) => void;
}

function MapPickerModal({ onClose, onSelect }: MapPickerModalProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Rohini area with zoomed-in view
    const map = L.map(mapContainerRef.current, {
      preferCanvas: true, // Better performance
    }).setView([28.7250, 77.1000], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Draw Rohini ward boundary as NON-INTERACTIVE (doesn't capture clicks)
    const wardPolygon = L.polygon(ROHINI_WARD_BOUNDARY as L.LatLngExpression[], {
      color: '#3b82f6',
      fillOpacity: 0,
      weight: 3,
      dashArray: '10, 5',
      interactive: false, // KEY: This prevents polygon from capturing clicks
    }).addTo(map);
    
    // Store polygon coordinates for validation
    const polygonCoords = (wardPolygon.getLatLngs()[0] as L.LatLng[]);

    // Handle map clicks (NOT polygon clicks)
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const clickPoint = L.latLng(lat, lng);
      
      // Validate if click is inside the ward boundary
      const inside = isPointInPolygon(clickPoint, polygonCoords);
      
      console.log('Map clicked at:', lat, lng, '| Inside ward:', inside);
      
      if (!inside) {
        // Show orange marker for invalid clicks (outside boundary)
        if (markerRef.current) {
          markerRef.current.remove();
        }
        
        markerRef.current = L.marker([lat, lng], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: #ef4444; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.5);"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          })
        })
          .addTo(map)
          .bindPopup(`<b>❌ Outside Ward</b><br/>Lat: ${lat.toFixed(6)}<br/>Lng: ${lng.toFixed(6)}<br/><span style="color: #ef4444; font-size: 11px;">Please click inside the blue boundary</span>`)
          .openPopup();
        
        toast.error('Please click inside the Rohini ward boundary (blue line)', {
          duration: 2500,
        });
        return;
      }
      
      // Valid click inside boundary
      toast.success('Location selected! ✓', { duration: 1000 });
      setSelectedPosition({ lat, lng });

      // Remove existing marker
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Add GREEN marker for valid selection
      markerRef.current = L.marker([lat, lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: #22c55e; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.5);"></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        })
      })
        .addTo(map)
        .bindPopup(`<b>✓ Selected Location</b><br/>Lat: ${lat.toFixed(6)}<br/>Lng: ${lng.toFixed(6)}`)
        .openPopup();
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Map Modal */}
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-background rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Pick Location on Map</h3>
            <p className="text-xs text-muted-foreground">Click anywhere on the map to select coordinates</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Map Container */}
        <div
          ref={mapContainerRef}
          className="w-full h-[500px]"
        />

        {/* Footer */}
        <div className="p-4 border-t border-border/50 bg-secondary/20 flex items-center justify-between">
          <div className="text-sm">
            {selectedPosition ? (
              <span className="text-foreground">
                <span className="font-semibold">Selected:</span>{' '}
                {selectedPosition.lat.toFixed(6)}, {selectedPosition.lng.toFixed(6)}
              </span>
            ) : (
              <span className="text-muted-foreground">Click on map to select a location</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedPosition) {
                  onSelect(selectedPosition.lat, selectedPosition.lng);
                } else {
                  toast.error('Please select a location on the map');
                }
              }}
              disabled={!selectedPosition}
              className="gradient-primary"
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
