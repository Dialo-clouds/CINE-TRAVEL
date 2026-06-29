"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ArrowRight, Sparkles, Globe, BookOpen, Star, LogOut, LayoutDashboard, Plane, Map, Info, Menu, X, ChevronDown, ShoppingBag, Utensils, Film, Bus, Bell, Gift, Leaf, Users } from 'lucide-react';

interface ElasticHueSliderProps { value: number; onChange: (value: number) => void; min?: number; max?: number; step?: number; label?: string; }
const ElasticHueSlider: React.FC<ElasticHueSliderProps> = ({ value, onChange, min = 0, max = 360, step = 1, label = 'Adjust Atmosphere' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const progress = ((value - min) / (max - min));
  const thumbPosition = progress * 100;
  return (
    <div className="relative w-full max-w-[200px] sm:max-w-xs flex flex-col items-center">
      {label && <label className="text-gray-300 text-[10px] sm:text-xs mb-2">{label}</label>}
      <div className="relative w-full h-6 flex items-center">
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-20" style={{ WebkitAppearance: 'none' }} />
        <div className="absolute left-0 w-full h-px bg-gray-700 rounded-full z-0" />
        <div className="absolute left-0 h-px bg-blue-500 rounded-full z-10" style={{ width: thumbPosition + '%' }} />
        <motion.div className="absolute top-1/2 -translate-y-1/2 z-30" style={{ left: thumbPosition + '%' }} animate={{ scale: isDragging ? 1.3 : 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
          <div className="w-4 h-4 rounded-full bg-white shadow-lg shadow-blue-500/30 cursor-grab" />
        </motion.div>
      </div>
      <AnimatePresence mode="wait"><motion.div key={value} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="text-[10px] sm:text-xs text-gray-500 mt-2">{value}°</motion.div></AnimatePresence>
    </div>
  );
};

interface LightningProps { hue?: number; xOffset?: number; speed?: number; intensity?: number; size?: number; }
const Lightning: React.FC<LightningProps> = ({ hue = 220, xOffset = 0, speed = 1.6, intensity = 0.6, size = 2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const resizeCanvas = () => { canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; };
    resizeCanvas(); window.addEventListener("resize", resizeCanvas);
    const gl = canvas.getContext("webgl"); if (!gl) return;
    const vs = "attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }";
    const fs = "precision mediump float; uniform vec2 iResolution; uniform float iTime; uniform float uHue; uniform float uXOffset; uniform float uSpeed; uniform float uIntensity; uniform float uSize;vec3 hsv2rgb(vec3 c) { vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0); return c.z * mix(vec3(1.0), rgb, c.y); }float hash11(float p) { p = fract(p * .1031); p *= p + 33.33; p *= p + p; return fract(p); }float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }mat2 rotate2d(float theta) { float c = cos(theta); float s = sin(theta); return mat2(c, -s, s, c); }float noise(vec2 p) { vec2 ip = floor(p); vec2 fp = fract(p); float a = hash12(ip); float b = hash12(ip + vec2(1.0, 0.0)); float c = hash12(ip + vec2(0.0, 1.0)); float d = hash12(ip + vec2(1.0, 1.0)); vec2 t = smoothstep(0.0, 1.0, fp); return mix(mix(a, b, t.x), mix(c, d, t.x), t.y); }float fbm(vec2 p) { float value = 0.0; float amplitude = 0.5; for (int i = 0; i < 10; ++i) { value += amplitude * noise(p); p *= rotate2d(0.45); p *= 2.0; amplitude *= 0.5; } return value; }void main() { vec2 uv = gl_FragCoord.xy / iResolution.xy; uv = 2.0 * uv - 1.0; uv.x *= iResolution.x / iResolution.y; uv.x += uXOffset; uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0; float dist = abs(uv.x); vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8)); vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity; gl_FragColor = vec4(col, 1.0); }";
    const compile = (s: string, t: number) => { const sh = gl.createShader(t); if (!sh) return null; gl.shaderSource(sh, s); gl.compileShader(sh); return sh; };
    const vShader = compile(vs, gl.VERTEX_SHADER); const fShader = compile(fs, gl.FRAGMENT_SHADER);
    if (!vShader || !fShader) return;
    const prog = gl.createProgram()!; gl.attachShader(prog, vShader); gl.attachShader(prog, fShader); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const aP = gl.getAttribLocation(prog, "aPosition"); gl.enableVertexAttribArray(aP); gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);
    const iR = gl.getUniformLocation(prog, "iResolution"); const iT = gl.getUniformLocation(prog, "iTime");
    const uH = gl.getUniformLocation(prog, "uHue"); const uX = gl.getUniformLocation(prog, "uXOffset");
    const uSp = gl.getUniformLocation(prog, "uSpeed"); const uIn = gl.getUniformLocation(prog, "uIntensity"); const uSz = gl.getUniformLocation(prog, "uSize");
    const st = performance.now();
    const render = () => { resizeCanvas(); gl.viewport(0,0,canvas.width,canvas.height); gl.uniform2f(iR,canvas.width,canvas.height); gl.uniform1f(iT,(performance.now()-st)/1e3); gl.uniform1f(uH,hue); gl.uniform1f(uX,xOffset); gl.uniform1f(uSp,speed); gl.uniform1f(uIn,intensity); gl.uniform1f(uSz,size); gl.drawArrays(gl.TRIANGLES,0,6); requestAnimationFrame(render); };
    requestAnimationFrame(render);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [hue, xOffset, speed, intensity, size]);
  return <canvas ref={canvasRef} className="w-full h-full relative" />;
};

const FeatureItem: React.FC<{ name: string; value: string; position: string; icon: React.ReactNode }> = ({ name, value, position, icon }) => (
  <div className={`absolute ${position} z-10 group transition-all duration-300 hover:scale-110 hidden sm:block`}>
    <div className="flex items-center gap-3 relative">
      <div className="relative"><div className="w-3 h-3 bg-white rounded-full group-hover:animate-pulse" /><div className="absolute -inset-1.5 bg-white/20 rounded-full blur-sm opacity-70 group-hover:opacity-100" /></div>
      <div className="text-white relative">
        <div className="flex items-center gap-2"><span className="text-white/70 group-hover:text-white">{icon}</span><span className="font-medium text-sm group-hover:text-white">{name}</span></div>
        <div className="text-white/50 text-xs mt-0.5">{value}</div>
      </div>
    </div>
  </div>
);

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Book", href: "/book" },
  { label: "AI Planner", href: "/auteur" },
  { label: "Globe", href: "/globe" },
  { label: "Fleet", href: "/fleet" },
  { label: "Routes", href: "/routes" },
  {
    label: "Travel Info",
    children: [
      { label: "Requirements", href: "/travel-info" },
      { label: "Weather", href: "/travel-info/weather" },
      { label: "Currency", href: "/travel-info/currency" },
      { label: "Airports", href: "/travel-info/airports" },
    ],
  },
  {
    label: "On Board",
    children: [
      { label: "Menu", href: "/travel-info/menu" },
      { label: "Entertainment", href: "/travel-info/entertainment" },
      { label: "Duty-Free", href: "/travel-info/duty-free" },
    ],
  },
  { label: "Stories", href: "/stories" },
];

export function HeroOdyssey() {
  const [lightningHue, setLightningHue] = useState(220);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setUser(data.session?.user || null); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => { await supabase.auth.signOut(); };

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 min-h-screen flex flex-col">
        {/* NAVIGATION */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="backdrop-blur-3xl bg-black/50 rounded-full px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center border border-white/5">
          <div className="flex items-center gap-2 sm:gap-3">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <span className="text-lg sm:text-xl font-bold">CineTravel</span>
            <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider hidden sm:inline">AI</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            {navLinks.map((link) => (
              <div key={link.label} className="relative" onMouseEnter={() => setOpenDropdown(link.label)} onMouseLeave={() => setOpenDropdown(null)}>
                {link.children ? (
                  <>
                    <button className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1">{link.label} <ChevronDown className="w-3 h-3" /></button>
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl py-2 shadow-2xl">
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href} className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">{child.label}</Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {!loading && (user ? (
              <div className="flex items-center gap-2">
                <Link href="/customer" className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors"><LayoutDashboard className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden md:inline">Dashboard</span></Link>
                <button onClick={handleSignOut} className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors"><LogOut className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden md:inline">Sign Out</span></button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="hidden sm:block text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Sign In</Link>
                <Link href="/login" className="px-3 sm:px-5 py-1.5 sm:py-2 bg-white text-black rounded-full text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">Get Started</Link>
              </div>
            ))}
            {/* Mobile menu button */}
            <button className="lg:hidden p-1.5 sm:p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden mt-2 rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden">
              <div className="p-4 space-y-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.children ? (
                      <>
                        <p className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider">{link.label}</p>
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5">{child.label}</Link>
                        ))}
                      </>
                    ) : (
                      <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5">{link.label}</Link>
                    )}
                  </div>
                ))}
                <div className="border-t border-white/5 pt-2 mt-2">
                  <Link href="/stories" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg">Stories</Link>
                  <Link href="/alerts" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg">Fare Alerts</Link>
                  <Link href="/upgrade" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg">Seat Upgrade</Link>
                  <Link href="/carbon" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg">Carbon Offset</Link>
                  <Link href="/referral" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg">Refer & Earn</Link>
                  <Link href="/corporate" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg">Corporate Travel</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature items */}
        <div className="relative flex-1">
          <FeatureItem name="AI Storyboards" value="Cinematic planning" position="left-0 sm:left-10 top-32" icon={<Sparkles className="w-4 h-4" />} />
          <FeatureItem name="3D Globe" value="Orbital exploration" position="left-1/4 top-20" icon={<Globe className="w-4 h-4" />} />
          <FeatureItem name="Field Notes" value="Journal and capture" position="right-1/4 top-20" icon={<BookOpen className="w-4 h-4" />} />
          <FeatureItem name="CineScore" value="Visual ratings" position="right-0 sm:right-10 top-32" icon={<Star className="w-4 h-4" />} />
        </div>

        {/* Hero Content */}
        <div className="relative z-30 flex flex-col items-center text-center max-w-4xl mx-auto pb-8 sm:pb-16 px-2">
          <ElasticHueSlider value={lightningHue} onChange={setLightningHue} label="Adjust Atmosphere" />
          <div className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-4 sm:mb-6 transition-all cursor-pointer mt-4 sm:mt-0">
            <span className="text-xs sm:text-sm text-white/70">The Cinematic Exploration Platform</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/50" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light mb-2">CineTravel</h1>
          <h2 className="text-2xl sm:text-3xl md:text-5xl pb-2 sm:pb-3 font-light bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent">Lighting Up The Future</h2>
          <p className="text-gray-400 mb-6 sm:mb-9 max-w-2xl text-sm sm:text-base">Discover destinations like scenes from a film. AI-curated storyboards, an orbital globe, and expedition planning that feels like art direction.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/explore" className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-sm font-medium flex items-center justify-center gap-2">Begin Exploration <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/book" className="px-6 sm:px-8 py-2.5 sm:py-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors text-sm flex items-center justify-center gap-2"><Plane className="w-4 h-4" /> Book a Flight</Link>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full bg-gradient-to-b from-blue-500/20 to-purple-600/10 blur-3xl" />
        <div className="absolute top-0 w-full left-1/2 -translate-x-1/2 h-full"><Lightning hue={lightningHue} xOffset={0} speed={1.6} intensity={0.6} size={2} /></div>
        <div className="z-10 absolute top-[55%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] backdrop-blur-3xl rounded-full bg-[radial-gradient(circle_at_25%_90%,_#1e386b_15%,_#000000de_70%,_#000000ed_100%)]" />
      </div>
    </div>
  );
}

export default HeroOdyssey;