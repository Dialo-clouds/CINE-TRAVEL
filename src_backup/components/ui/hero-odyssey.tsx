"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Globe, BookOpen, Star, Camera, Map } from 'lucide-react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Elastic Hue Slider (kept from original component)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface ElasticHueSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

const ElasticHueSlider: React.FC<ElasticHueSliderProps> = ({
  value, onChange, min = 0, max = 360, step = 1, label = 'Adjust Atmosphere',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const progress = ((value - min) / (max - min));
  const thumbPosition = progress * 100;

  return (
    <div className="relative w-full max-w-xs flex flex-col items-center">
      {label && <label className="text-gray-300 text-xs mb-2">{label}</label>}
      <div className="relative w-full h-6 flex items-center">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer z-20"
          style={{ WebkitAppearance: 'none' }}
        />
        <div className="absolute left-0 w-full h-px bg-gray-700 rounded-full z-0" />
        <div className="absolute left-0 h-px bg-blue-500 rounded-full z-10" style={{ width: `${thumbPosition}%` }} />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 z-30"
          style={{ left: `${thumbPosition}%` }}
          animate={{ scale: isDragging ? 1.3 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          <div className="w-4 h-4 rounded-full bg-white shadow-lg shadow-blue-500/30 cursor-grab" />
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={value} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="text-xs text-gray-500 mt-2">
          {value}°
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WebGL Lightning (kept exactly from original)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

const Lightning: React.FC<LightningProps> = ({ hue = 220, xOffset = 0, speed = 1.6, intensity = 0.6, size = 2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      vec3 hsv2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        return c.z * mix(vec3(1.0), rgb, c.y);
      }
      float hash11(float p) { p = fract(p * .1031); p *= p + 33.33; p *= p + p; return fract(p); }
      float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
      mat2 rotate2d(float theta) { float c = cos(theta); float s = sin(theta); return mat2(c, -s, s, c); }
      
      float noise(vec2 p) {
        vec2 ip = floor(p); vec2 fp = fract(p);
        float a = hash12(ip); float b = hash12(ip + vec2(1.0, 0.0));
        float c = hash12(ip + vec2(0.0, 1.0)); float d = hash12(ip + vec2(1.0, 1.0));
        vec2 t = smoothstep(0.0, 1.0, fp);
        return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }
      
      float fbm(vec2 p) {
        float value = 0.0; float amplitude = 0.5;
        for (int i = 0; i < 10; ++i) {
          value += amplitude * noise(p);
          p *= rotate2d(0.45); p *= 2.0; amplitude *= 0.5;
        }
        return value;
      }
      
      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord / iResolution.xy;
        uv = 2.0 * uv - 1.0;
        uv.x *= iResolution.x / iResolution.y;
        uv.x += uXOffset;
        uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
        float dist = abs(uv.x);
        vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
        vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
        col = pow(col, vec3(1.0));
        fragColor = vec4(col, 1.0);
      }
      
      void main() { mainImage(gl_FragColor, gl_FragCoord.xy); }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const iRes = gl.getUniformLocation(program, "iResolution");
    const iTime = gl.getUniformLocation(program, "iTime");
    const uHue = gl.getUniformLocation(program, "uHue");
    const uXOff = gl.getUniformLocation(program, "uXOffset");
    const uSpd = gl.getUniformLocation(program, "uSpeed");
    const uInt = gl.getUniformLocation(program, "uIntensity");
    const uSz = gl.getUniformLocation(program, "uSize");

    const startTime = performance.now();
    const render = () => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iRes, canvas.width, canvas.height);
      gl.uniform1f(iTime, (performance.now() - startTime) / 1000.0);
      gl.uniform1f(uHue, hue);
      gl.uniform1f(uXOff, xOffset);
      gl.uniform1f(uSpd, speed);
      gl.uniform1f(uInt, intensity);
      gl.uniform1f(uSz, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} className="w-full h-full relative" />;
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Feature Item
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface FeatureItemProps {
  name: string;
  value: string;
  position: string;
  icon: React.ReactNode;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ name, value, position, icon }) => {
  return (
    <div className={`absolute ${position} z-10 group transition-all duration-300 hover:scale-110`}>
      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <div className="w-3 h-3 bg-white rounded-full group-hover:animate-pulse" />
          <div className="absolute -inset-1.5 bg-white/20 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="text-white relative">
          <div className="flex items-center gap-2">
            <span className="text-white/70 group-hover:text-white transition-colors">{icon}</span>
            <span className="font-medium text-sm group-hover:text-white transition-colors">{name}</span>
          </div>
          <div className="text-white/50 text-xs mt-0.5">{value}</div>
          <div className="absolute -inset-2 bg-white/10 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity -z-10" />
        </div>
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CINETRAVEL HERO — Component style preserved, content ours
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function HeroOdyssey() {
  const [lightningHue, setLightningHue] = useState(220);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      {/* Main container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen flex flex-col">
        {/* Navigation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-3xl bg-black/50 rounded-full px-6 py-4 flex justify-between items-center border border-white/5"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-white" />
            <span className="text-xl font-bold">CineTravel</span>
            <span className="text-xs text-white/40 uppercase tracking-wider">AI</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="text-sm text-white/60 hover:text-white transition-colors">Explore</Link>
            <Link href="/auteur" className="text-sm text-white/60 hover:text-white transition-colors">AI Planner</Link>
            <Link href="/globe" className="text-sm text-white/60 hover:text-white transition-colors">Globe</Link>
            <Link href="/journal" className="text-sm text-white/60 hover:text-white transition-colors">Journal</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden md:block text-sm text-white/60 hover:text-white transition-colors">Sign In</Link>
            <Link href="/explore" className="px-5 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Begin Exploration
            </Link>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </motion.div>

        {/* Feature items scattered around */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative flex-1">
          <motion.div variants={itemVariants}>
            <FeatureItem name="AI Storyboards" value="Cinematic planning" position="left-0 sm:left-10 top-32" icon={<Sparkles className="w-4 h-4" />} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureItem name="3D Globe" value="Orbital exploration" position="left-1/4 top-20" icon={<Globe className="w-4 h-4" />} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureItem name="Field Notes" value="Journal & capture" position="right-1/4 top-20" icon={<BookOpen className="w-4 h-4" />} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureItem name="CineScore" value="Visual ratings" position="right-0 sm:right-10 top-32" icon={<Star className="w-4 h-4" />} />
          </motion.div>
        </motion.div>

        {/* Main hero content */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-30 flex flex-col items-center text-center max-w-4xl mx-auto pb-16">
          <ElasticHueSlider value={lightningHue} onChange={setLightningHue} label="Adjust Atmosphere" />

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-6 transition-all duration-300 group cursor-pointer"
          >
            <span className="text-sm text-white/70">The Cinematic Exploration Platform</span>
            <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-light mb-2">
            CineTravel
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl pb-3 font-light bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent">
            Lighting Up The Future
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-400 mb-9 max-w-2xl">
            Discover destinations like scenes from a film. AI-curated storyboards, an orbital globe, and expedition planning that feels like art direction.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Link href="/explore"
              className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2">
              Begin Exploration
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/auteur"
              className="px-8 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Planner
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Background effects */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-blue-500/20 to-purple-600/10 blur-3xl" />
        <div className="absolute top-0 w-full left-1/2 -translate-x-1/2 h-full">
          <Lightning hue={lightningHue} xOffset={0} speed={1.6} intensity={0.6} size={2} />
        </div>
        <div className="z-10 absolute top-[55%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] backdrop-blur-3xl rounded-full bg-[radial-gradient(circle_at_25%_90%,_#1e386b_15%,_#000000de_70%,_#000000ed_100%)]" />
      </motion.div>
    </div>
  );
}

export default HeroOdyssey;
