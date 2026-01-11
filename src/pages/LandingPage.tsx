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
  Target,
  Droplets,
  Waves,
  Navigation,
  User,
  Building,
  TrendingUpDown,
  MapPinned,
  Radio,
  Crosshair,
  ShieldCheck,
  Calendar,
  LineChart,
  Activity,
  Smartphone,
  Database,
  CloudCog
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation with Scroll Effect */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrollY > 50
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b'
          : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{
                duration: 0.5
              }}
              className="relative"
            >
              <img
                src="/logo.png"
                alt="Delhi WaterWatch Logo"
                className="w-12 h-12 object-contain"
              />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Delhi WaterWatch
            </span>
          </motion.div>
          <Link to="/login">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                className={`font-semibold transition-all duration-300 group ${scrollY > 50
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-blue-600 shadow-lg hover:shadow-xl'
                  }`}
                size="default"
              >
                <User className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                Sign In
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section with Water Background Image */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/water.jpg)' }}
          />
          {/* Dark Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-cyan-900/80 to-blue-800/85" />

          {/* Animated Gradient Overlay */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.7 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl"
            >
              <img
                src="/logo.png"
                alt="Delhi WaterWatch Logo"
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 object-contain drop-shadow-xl"
              />
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Delhi
              </span>{" "}
              <span className="relative text-white">
                WaterWatch
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-2xl md:text-3xl text-blue-50 mb-5 font-semibold max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
            >
              Ward-driven, citizen-powered waterlogging management &
              <span className="block text-cyan-300 font-bold">monsoon preparedness system</span>
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            >
              Empowering communities to report, track, and respond to water-logging incidents with unprecedented local accountability
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Link to="/login">
                <motion.div
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-14 py-8 text-xl font-black rounded-full shadow-2xl group relative overflow-hidden border-2 border-white/50"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative flex items-center gap-3">
                      Get Started Now
                      <Navigation className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats Pills */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm"
            >
              {[
                { icon: MapPinned, label: "Ward-Level Reporting", gradient: "from-blue-400 to-cyan-400" },
                { icon: Activity, label: "Real-Time Monitoring", gradient: "from-cyan-400 to-blue-400" },
                { icon: ShieldCheck, label: "Accountability System", gradient: "from-indigo-400 to-blue-400" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ scale: 1.15, y: -8 }}
                  className="flex items-center gap-3 px-7 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-xl"
                >
                  <div className={`p-2 bg-gradient-to-r ${item.gradient} rounded-full`}>
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-white drop-shadow-md">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Water Droplets */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: '120vh',
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
            className="absolute z-20"
            style={{
              left: `${10 + i * 10}%`,
              top: 0
            }}
          >
            <Droplets className="h-8 w-8 text-white/30" />
          </motion.div>
        ))}
      </section>

      {/* Problem Statement Section - Image Layout Design */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Row 1: The Problem - Text Left, Image Right */}
            <motion.div
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-6 items-stretch"
            >
              {/* Left Side - Content Card */}
              <motion.div
                variants={slideInLeft}
                className="bg-blue-800/40 backdrop-blur-sm rounded-2xl p-8 md:p-10 flex flex-col justify-center border border-blue-700/30 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-600/50 rounded-lg">
                    <AlertTriangle className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white">
                    The Problem
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-blue-50 leading-relaxed">
                  Delhi faces severe water-logging every monsoon, leading to major traffic congestion, property damage, and delayed emergency response. Many of the same locations flood year after year, yet response mechanisms remain slow, fragmented, and largely reactive instead of preventive.
                </p>
              </motion.div>

              {/* Right Side - Image */}
              <motion.div
                variants={slideInRight}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-[350px]"
              >
                <img
                  src="https://www.hindustantimes.com/ht-img/img/2025/07/29/550x309/CP_1753768131460_1753768148540.jpg"
                  alt="Severe waterlogging in Delhi during monsoon causing traffic congestion"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Row 2: What's Missing Today - Image Left, Text Right */}
            <motion.div
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-6 items-stretch"
            >
              {/* Left Side - Image */}
              <motion.div
                variants={slideInLeft}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-[350px] order-2 lg:order-1"
              >
                <img
                  src="whatsmissingtoday.png"
                  alt="Emergency response during flooding"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Right Side - Content Card */}
              <motion.div
                variants={slideInRight}
                className="bg-blue-700/40 backdrop-blur-sm rounded-2xl p-8 md:p-10 flex flex-col justify-center border border-blue-600/30 shadow-xl order-1 lg:order-2"
              >
                <h3 className="text-3xl md:text-4xl font-black text-cyan-300 mb-6">
                  What's Missing Today
                </h3>
                <p className="text-lg md:text-xl text-blue-50 leading-relaxed">
                  Current systems lack ward-level accountability, where execution actually happens. Waterlogging response usually starts after water-logging occurs, with no structured use of real-time citizen input. Additionally, there is no clear visibility into monsoon preparedness at the ward level, making it difficult to assess readiness or prioritize resources in advance.
                </p>
              </motion.div>
            </motion.div>

            {/* Row 3: Why This Matters - Text Left, Image Right */}
            <motion.div
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-6 items-stretch"
            >
              {/* Left Side - Content Card */}
              <motion.div
                variants={slideInLeft}
                className="bg-blue-800/40 backdrop-blur-sm rounded-2xl p-8 md:p-10 flex flex-col justify-center border border-blue-700/30 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-600/50 rounded-lg">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white">
                    Why This Matters
                  </h3>
                </div>
                <p className="text-lg md:text-xl text-blue-50 leading-relaxed">
                  Every monsoon, millions of citizens are affected across Delhi. With climate change increasing the frequency and intensity of extreme rainfall, these risks are only growing. Without a system that combines ward-level execution with city-level oversight, the same waterlogging problems continue to repeat year after year.
                </p>
              </motion.div>

              {/* Right Side - Image */}
              <motion.div
                variants={slideInRight}
                className="relative rounded-2xl overflow-hidden shadow-2xl h-[350px]"
              >
                <img
                  src="/whythismatters.png"
                  alt="People wading through flood water"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <motion.div
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg"
              >
                <Waves className="h-4 w-4" />
                System Overview
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                Overview
              </h2>
            </motion.div>

            {/* Overview Content */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <p className="text-xl md:text-2xl text-white leading-relaxed text-center">
                <span className="font-black text-cyan-300">Delhi Water Watch</span> is a <span className="text-cyan-300 font-bold">ward-driven, citizen-powered</span> waterlogging management and monsoon preparedness system.
              </p>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mt-6 text-center">
                It transforms waterlogging response from <span className="text-blue-200 font-bold">centralized & reactive</span> to <span className="text-green-300 font-bold">ward-level & proactive</span>, enabling faster action, accountability, and data-driven urban decision-making.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Today Section */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(59, 130, 246, 0.1) 35px, rgba(59, 130, 246, 0.1) 70px)' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <motion.div
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-500 to-gray-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg"
              >
                <AlertTriangle className="h-4 w-4" />
                Current System Challenges
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                How It Works Today
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                (Existing Government System)
              </p>
            </motion.div>

            {/* Process Steps */}
            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  step: "01",
                  icon: User,
                  title: "Citizen Reports",
                  description: "A citizen reports a water-logging issue via a centralized portal / helpline (MCD, 311, etc.)",
                  color: "from-slate-500 to-slate-600",
                  bgColor: "bg-slate-50"
                },
                {
                  step: "02",
                  icon: Database,
                  title: "City-Level Storage",
                  description: "The complaint is stored in a city-level system without ward-level ownership.",
                  color: "from-slate-600 to-gray-600",
                  bgColor: "bg-slate-100"
                },
                {
                  step: "03",
                  icon: Users,
                  title: "Manual Forwarding",
                  description: "Reports are manually forwarded to field departments.",
                  color: "from-gray-600 to-slate-700",
                  bgColor: "bg-gray-50"
                },
                {
                  step: "04",
                  icon: AlertTriangle,
                  title: "Delayed Action",
                  description: "Action usually begins after water-logging becomes severe.",
                  color: "from-slate-700 to-gray-700",
                  bgColor: "bg-slate-100"
                },
                {
                  step: "05",
                  icon: Clock,
                  title: "Limited Updates",
                  description: "Citizens receive limited or delayed status updates.",
                  color: "from-gray-700 to-slate-600",
                  bgColor: "bg-gray-50"
                },
                {
                  step: "06",
                  icon: MapPin,
                  title: "No Prioritization",
                  description: "There is no prioritization based on sensitive locations.",
                  color: "from-slate-600 to-gray-500",
                  bgColor: "bg-slate-50"
                },
                {
                  step: "07",
                  icon: CloudCog,
                  title: "No Feedback Loop",
                  description: "Once resolved, the complaint is closed with no feedback or learning loop.",
                  color: "from-gray-500 to-slate-500",
                  bgColor: "bg-gray-100"
                },
                {
                  step: "08",
                  icon: TrendingUp,
                  title: "Recurring Issues",
                  description: "The same locations flood every year with no preparedness assessment.",
                  color: "from-slate-500 to-gray-600",
                  bgColor: "bg-slate-50"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group relative"
                >
                  <div className={`h-full p-6 rounded-2xl ${item.bgColor} border-2 border-gray-200 hover:border-slate-400 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                    {/* Step Number */}
                    <div className="absolute top-4 right-4">
                      <span className={`text-5xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity`}>
                        {item.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex p-3 bg-gradient-to-r ${item.color} rounded-xl shadow-md mb-4`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg font-black text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bottom Gradient Bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Problem Summary */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 bg-gradient-to-r from-slate-100 to-gray-100 border-l-4 border-slate-500 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-slate-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">
                    Result
                  </h3>
                  <p className="text-lg text-slate-800 leading-relaxed">
                    Reactive handling, slow response, and weak accountability.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How Delhi WaterWatch Works Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/waterr.jpg)' }}
          />
          {/* Dark Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-cyan-900/90" />

          {/* Animated Gradient Overlay */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent"
          />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <motion.div
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg"
              >
                <Shield className="h-4 w-4" />
                Your Solution
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                How Delhi WaterWatch Works
              </h2>
            </motion.div>

            {/* Process Steps */}
            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {[
                {
                  step: "01",
                  icon: Smartphone,
                  title: "Citizen Reports",
                  description: "A citizen reports water-logging within their assigned ward using GPS and images.",
                  color: "from-blue-400 to-cyan-500",
                  bgColor: "bg-blue-900/40"
                },
                {
                  step: "02",
                  icon: MapPinned,
                  title: "Automatic Assignment",
                  description: "The system automatically assigns the report to the Ward Admin of that ward.",
                  color: "from-cyan-400 to-blue-500",
                  bgColor: "bg-cyan-900/40"
                },
                {
                  step: "03",
                  icon: Target,
                  title: "Auto-Prioritization",
                  description: "If the report lies near a sensitive area (hospital, school, metro), it is auto-prioritized.",
                  color: "from-blue-500 to-indigo-500",
                  bgColor: "bg-blue-800/40"
                },
                {
                  step: "04",
                  icon: Building,
                  title: "Ward Admin Actions",
                  description: "Verifies the issue • Deploys pumps, personnel, and vehicles • Updates status in real time (Pending → In Progress → Resolved)",
                  color: "from-indigo-500 to-blue-600",
                  bgColor: "bg-indigo-900/40"
                },
                {
                  step: "05",
                  icon: Users,
                  title: "Field Workers Execute",
                  description: "Field workers act on the ground and upload resolution proof.",
                  color: "from-blue-600 to-cyan-600",
                  bgColor: "bg-blue-900/40"
                },
                {
                  step: "06",
                  icon: Activity,
                  title: "Live Updates & Feedback",
                  description: "Citizens receive live status updates and give feedback after resolution.",
                  color: "from-cyan-600 to-blue-500",
                  bgColor: "bg-cyan-900/40"
                },
                {
                  step: "07",
                  icon: ShieldCheck,
                  title: "Super Admin Monitoring",
                  description: "Monitors ward readiness • Resolution speed • High-risk zones across the city",
                  color: "from-blue-500 to-indigo-600",
                  bgColor: "bg-blue-800/40"
                },
                {
                  step: "08",
                  icon: LineChart,
                  title: "Data-Driven Planning",
                  description: "Historical data supports future planning and preparedness.",
                  color: "from-indigo-600 to-cyan-500",
                  bgColor: "bg-indigo-900/40"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group relative"
                >
                  <div className={`h-full p-6 rounded-2xl ${item.bgColor} backdrop-blur-sm border-2 border-white/20 hover:border-cyan-400/50 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                    {/* Step Number */}
                    <div className="absolute top-4 right-4">
                      <span className={`text-5xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity`}>
                        {item.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex p-3 bg-gradient-to-r ${item.color} rounded-xl shadow-md mb-4`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg font-black text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bottom Gradient Bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Result Summary */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-2 border-green-400/30 rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-10 w-10 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-3xl font-black text-white mb-4">
                    Result
                  </h3>
                  <p className="text-xl text-green-100 leading-relaxed">
                    Fast response, clear accountability, proactive flood management.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(59, 130, 246, 0.1) 35px, rgba(59, 130, 246, 0.1) 70px)' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <motion.div
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg"
              >
                <Database className="h-4 w-4" />
                Built With Modern Technologies
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Tech Stack
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Powered by cutting-edge technologies for performance and reliability
              </p>
            </motion.div>

            {/* Tech Stack Cards */}
            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {[
                {
                  name: "React 18",
                  category: "Frontend Framework",
                  description: "Component-based UI library enabling fast, interactive dashboards with real-time data updates",
                  logo: (
                    <svg viewBox="0 0 24 24" className="w-12 h-12">
                      <circle cx="12" cy="12" r="2" fill="currentColor" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
                      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
                    </svg>
                  ),
                  color: "from-blue-400 to-cyan-500"
                },
                {
                  name: "Vite",
                  category: "Build Tool",
                  description: "Lightning-fast development server and optimized production builds for superior performance",
                  logo: (
                    <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 19.5h20L12 2z" strokeLinejoin="round" />
                      <path d="M12 8v8M8 16l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  color: "from-cyan-400 to-blue-500"
                },
                {
                  name: "Tailwind CSS",
                  category: "Styling Framework",
                  description: "Utility-first CSS framework for rapid, responsive design with consistent styling patterns",
                  logo: (
                    <svg viewBox="0 0 24 24" className="w-12 h-12">
                      <path d="M12 6C8.5 6 6.5 8 6 12c1.5-2 3-2.5 5-1.5 1 .5 1.7 1.2 2.5 2S15.5 14.5 18 14.5c3.5 0 5.5-2 6-6-1.5 2-3 2.5-5 1.5-1-.5-1.7-1.2-2.5-2S14.5 6 12 6zM6 14.5c-3.5 0-5.5 2-6 6 1.5-2 3-2.5 5-1.5 1 .5 1.7 1.2 2.5 2S9.5 23 12 23c3.5 0 5.5-2 6-6-1.5 2-3 2.5-5 1.5-1-.5-1.7-1.2-2.5-2S8.5 14.5 6 14.5z" fill="currentColor" />
                    </svg>
                  ),
                  color: "from-blue-500 to-cyan-600"
                },
                {
                  name: "Leaflet",
                  category: "Mapping Library",
                  description: "Interactive maps with GIS capabilities for visualizing waterlogging hotspots and ward boundaries",
                  logo: (
                    <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" strokeLinejoin="round" />
                      <path d="M2 7l10 5M12 12v10M22 7l-10 5" strokeLinejoin="round" />
                    </svg>
                  ),
                  color: "from-cyan-500 to-blue-600"
                },
                {
                  name: "Firebase",
                  category: "Backend Platform",
                  description: "Real-time database, authentication, and cloud storage for seamless data synchronization",
                  logo: (
                    <svg viewBox="0 0 24 24" className="w-12 h-12">
                      <path d="M4.5 16.5l7.5 4.5 7.5-4.5M12 21V12M20.5 9L12 3 3.5 9l8.5 5 8.5-5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M7 5l5 3 5-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                  color: "from-blue-600 to-cyan-500"
                }
              ].map((tech, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="group relative"
                >
                  <div className="h-full p-6 rounded-2xl bg-white border-2 border-blue-100 hover:border-cyan-400 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      className={`absolute inset-0 bg-gradient-to-br ${tech.color}`}
                    />

                    {/* Icon with Glow Effect */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                      className="relative mb-6"
                    >
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${tech.color} rounded-xl shadow-lg text-white relative overflow-hidden`}>
                        <div className="relative z-10">
                          {tech.logo}
                        </div>
                        {/* Glow Effect */}
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                          className={`absolute inset-0 bg-gradient-to-br ${tech.color} blur-md`}
                        />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-gray-900 mb-1">
                        {tech.name}
                      </h3>
                      <p className={`text-xs font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent mb-3 uppercase tracking-wider`}>
                        {tech.category}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>

                    {/* Top Gradient Bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                      className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${tech.color} rounded-t-2xl`}
                    />

                    {/* Bottom Corner Accent */}
                    <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br ${tech.color} opacity-5 rounded-tl-full`}></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features/USP Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <motion.div
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-white rounded-full text-sm font-bold mb-6 shadow-lg"
              >
                <Target className="h-4 w-4" />
                Core Features
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                FEATURE/USP
              </h2>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  title: "WARD-LEVEL ACCOUNTABILITY",
                  icon: Building,
                  description: "Direct responsibility at ward level for faster, localized waterlogging response and resolution",
                  color: "from-blue-400 to-cyan-500",
                  bgColor: "bg-blue-900/40"
                },
                {
                  title: "CITIZEN AS REAL-TIME SENSORS",
                  icon: Users,
                  description: "Citizens report water-logging instantly with GPS and images, creating a live monitoring network",
                  color: "from-cyan-400 to-blue-500",
                  bgColor: "bg-cyan-900/40"
                },
                {
                  title: "GIS-DRIVEN VISIBILITY & PREPAREDNESS",
                  icon: MapPinned,
                  description: "Interactive maps show waterlogging hotspots, historical data, and preparedness status across all wards",
                  color: "from-blue-500 to-indigo-500",
                  bgColor: "bg-blue-800/40"
                },
                {
                  title: "CITY-LEVEL OVERSIGHT",
                  icon: ShieldCheck,
                  description: "Super Admin monitors ward performance, high-risk zones, and coordinates city-wide emergency response",
                  color: "from-indigo-500 to-cyan-500",
                  bgColor: "bg-indigo-900/40"
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group relative"
                >
                  <div className={`h-full p-8 rounded-2xl ${feature.bgColor} backdrop-blur-sm border-2 border-white/20 hover:border-cyan-400/50 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                    {/* Gradient Background on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color}`}
                    />

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-xl shadow-lg mb-6`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg font-black text-white mb-4 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Bottom Gradient Bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                      className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Vision Ahead Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(59, 130, 246, 0.1) 35px, rgba(59, 130, 246, 0.1) 70px)' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <motion.div
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg"
              >
                <TrendingUp className="h-4 w-4" />
                Future Roadmap
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                Our Vision Ahead
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Expanding capabilities for smarter waterlogging management
              </p>
            </motion.div>

            {/* Vision Cards */}
            <motion.div
              variants={staggerContainer}
              className="space-y-8"
            >
              {[
                {
                  title: "Smart Route Guidance",
                  icon: Navigation,
                  color: "from-blue-500 to-cyan-500",
                  description: "Use live location to warn users when they are approaching a water-logging hotspot and suggest safer alternative routes in real time.",
                  features: [
                    "Real-time proximity alerts",
                    "AI-powered alternative route suggestions",
                    "Integration with navigation apps",
                    "Traffic & waterlogging data correlation"
                  ]
                },
                {
                  title: "Mobile App Launch",
                  icon: Smartphone,
                  color: "from-cyan-500 to-blue-600",
                  description: "Next-generation mobile application with advanced features for seamless waterlogging reporting and monitoring.",
                  features: [
                    "Push notifications for citizens",
                    "AR-based waterlogging reporting (camera + GPS)",
                    "Offline reporting with sync capability",
                    "Voice-based incident reporting"
                  ]
                },
                {
                  title: "Citizen Gamification",
                  icon: Target,
                  color: "from-blue-600 to-indigo-600",
                  description: "Engage and reward active citizens who contribute to waterlogging monitoring and community safety.",
                  features: [
                    "Points for reporting verified incidents",
                    "Leaderboards for active wards",
                    "Badges for first responders",
                    "Monthly 'Waterlogging Warrior' awards"
                  ]
                }
              ].map((vision, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="group relative"
                >
                  <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-blue-100 hover:border-cyan-400 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.05 }}
                      className={`absolute inset-0 bg-gradient-to-r ${vision.color}`}
                    />

                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                      {/* Icon Section */}
                      <div className="flex-shrink-0">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className={`p-6 bg-gradient-to-br ${vision.color} rounded-2xl shadow-lg relative overflow-hidden`}
                        >
                          <vision.icon className="h-12 w-12 text-white relative z-10" />
                          {/* Glow Effect */}
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity
                            }}
                            className={`absolute inset-0 bg-gradient-to-br ${vision.color} blur-md`}
                          />
                        </motion.div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                          {vision.title}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                          {vision.description}
                        </p>

                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {vision.features.map((feature, fIdx) => (
                            <motion.div
                              key={fIdx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: fIdx * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${vision.color} flex items-center justify-center mt-0.5`}>
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Left Gradient Bar */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 + 0.3 }}
                      className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${vision.color} rounded-l-2xl`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Coming Soon Badge */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg">
                <Clock className="h-5 w-5" />
                <span className="font-bold text-lg">Coming Soon in 2026</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Gradient Animation */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-[length:200%_100%]"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
            >
              Be part of a smarter waterlogging response system
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-50 mb-12 leading-relaxed"
            >
              Join citizens, ward administrators, and city authorities working together to make Delhi waterlogging-resilient
            </motion.p>
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <Link to="/login">
                <motion.div
                  whileHover={{ scale: 1.1, boxShadow: "0 25px 50px rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-7 text-xl font-bold rounded-full shadow-2xl group"
                  >
                    <span className="flex items-center gap-3">
                      Start Your Journey
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`
            }}
          >
            <Droplets className="h-8 w-8 text-white/20" />
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/logo.png"
                  alt="Delhi WaterWatch Logo"
                  className="h-10 w-10 object-contain"
                />
              </motion.div>
              <span className="text-2xl font-bold text-white">Delhi WaterWatch</span>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-base mb-2">
              Ward-level waterlogging management and monsoon preparedness
            </motion.p>
            <motion.p variants={fadeInUp} className="text-sm text-gray-500">
              Built for civic accountability and public safety
            </motion.p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
