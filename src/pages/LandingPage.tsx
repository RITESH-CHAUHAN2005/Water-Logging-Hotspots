import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CloudRain, 
  MapPin, 
  Users, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Target
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CloudRain className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">Delhi WaterWatch</span>
          </div>
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Target className="h-4 w-4" />
            Ward-Level Flood Management
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Delhi WaterWatch
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
            A ward-driven, citizen-powered flood monitoring and monsoon preparedness system
          </p>
          
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            Empowering communities to report, track, and respond to water-logging incidents with unprecedented local accountability
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Start Here
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              Report
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              Monitor
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              Prepare
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Problem</h2>
            </div>
            
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                Delhi faces recurring water-logging issues during monsoons, causing severe disruption to daily life, 
                traffic, and public safety. Despite multiple agencies involved, the response is often <strong>reactive rather than proactive</strong>.
              </p>
              <p>
                Current systems lack <strong>ward-level accountability</strong>. Citizens have no clear channel to report issues, 
                and local authorities struggle to track hotspots or preparedness gaps at a granular level.
              </p>
              <p>
                Without real-time, location-specific data, the city operates blindly during critical weather events, 
                leading to delayed responses and preventable crises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Overview Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Solution</h2>
            <p className="text-lg text-gray-600">
              Delhi WaterWatch creates a three-tier accountability system connecting citizens, ward administrators, and city authorities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Citizen Card */}
            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Citizen</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Report water-logging issues with precise location data. Track status and receive alerts about local flooding risks.
                </p>
              </CardContent>
            </Card>

            {/* Ward Admin Card */}
            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Ward Admin</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Manage local hotspots, respond to citizen reports, and maintain ward-level preparedness metrics.
                </p>
              </CardContent>
            </Card>

            {/* City Authority Card */}
            <Card className="border-2 hover:border-blue-300 transition-colors">
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">City Authority</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Monitor city-wide preparedness, identify high-risk zones, and coordinate cross-ward emergency response.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">
              Built for precision, accountability, and rapid response
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ward-Specific Reporting</h3>
              <p className="text-sm text-gray-600">Granular location tracking for precise accountability</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="p-3 bg-red-100 rounded-full mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Alerts</h3>
              <p className="text-sm text-gray-600">Instant notifications for critical flooding events</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">GIS-Based Hotspot Mapping</h3>
              <p className="text-sm text-gray-600">Visual intelligence for high-risk zones</p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="p-3 bg-purple-100 rounded-full mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Local Accountability</h3>
              <p className="text-sm text-gray-600">Clear ownership at ward administrative level</p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors sm:col-span-2 lg:col-span-4">
              <div className="p-3 bg-orange-100 rounded-full mb-4">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Preparedness-Focused Monitoring</h3>
              <p className="text-sm text-gray-600">Proactive metrics tracking before monsoon season hits</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Helps Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">How It Helps</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 items-start p-6 bg-white rounded-lg border">
                <div className="flex-shrink-0">
                  <div className="h-3 w-3 bg-blue-600 rounded-full mt-1"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Faster Response</h3>
                  <p className="text-gray-600">Ward admins receive immediate alerts and can mobilize local resources within minutes</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-6 bg-white rounded-lg border">
                <div className="flex-shrink-0">
                  <div className="h-3 w-3 bg-blue-600 rounded-full mt-1"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Better Preparedness</h3>
                  <p className="text-gray-600">Pre-monsoon checklists and historical data help wards get ready before the rains</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-6 bg-white rounded-lg border">
                <div className="flex-shrink-0">
                  <div className="h-3 w-3 bg-blue-600 rounded-full mt-1"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Clear Accountability</h3>
                  <p className="text-gray-600">Every ward has designated administrators responsible for their zone's flood management</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-6 bg-white rounded-lg border">
                <div className="flex-shrink-0">
                  <div className="h-3 w-3 bg-blue-600 rounded-full mt-1"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Improved Public Safety</h3>
                  <p className="text-gray-600">Citizens stay informed about risks in their area and can plan accordingly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Be part of a smarter flood response system
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join citizens, ward administrators, and city authorities working together to make Delhi flood-resilient
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
              Start Here
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CloudRain className="h-5 w-5 text-blue-400" />
            <span className="text-white font-semibold">Delhi WaterWatch</span>
          </div>
          <p className="text-sm">Ward-level flood monitoring and monsoon preparedness</p>
          <p className="text-xs mt-4 text-gray-500">Built for civic accountability and public safety</p>
        </div>
      </footer>
    </div>
  );
}
