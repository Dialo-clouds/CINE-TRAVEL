"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  trustBadge?: { text: string; icons?: string[] };
  headline: { line1: string; line2: string };
  subtitle: string;
  buttons?: {
    primary?: { text: string; href: string };
    secondary?: { text: string; href: string };
  };
  className?: string;
}

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/min(R.x,R.y);
  vec3 col=vec3(0.02, 0.04, 0.12);
  
  float n = fbm(uv * 3.0 + T * 0.1);
  col += n * vec3(0.15, 0.12, 0.05);
  
  float n2 = fbm(uv * 5.0 - T * 0.05 + n);
  col += n2 * vec3(0.05, 0.08, 0.15);
  
  col += 0.02 / (length(uv) + 0.5) * vec3(0.8, 0.6, 0.2);
  
  O=vec4(col,1);
}`;

const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Create shader program
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, `#version 300 es
      precision highp float;
      in vec4 position;
      void main(){gl_Position=position;}`
    );
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, defaultShaderSource);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(fs));
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);
    
    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, 'resolution');
    const timeLoc = gl.getUniformLocation(program, 'time');

    const render = (now: number) => {
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, now * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };
    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return canvasRef;
};

export function AnimatedShaderHero({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = "",
}: HeroProps) {
  const canvasRef = useShaderBackground();

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Shader Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070B14]/30 to-[#070B14] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#070B14_70%)] pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        {/* Trust Badge */}
        {trustBadge && (
          <div className="mb-8 animate-[fadeInDown_0.8s_ease-out]">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37]/5 backdrop-blur-md border border-[#D4AF37]/20 rounded-full">
              <Star className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37]/80 font-mono tracking-wide">{trustBadge.text}</span>
            </div>
          </div>
        )}

        {/* Headline */}
        <div className="text-center space-y-4 max-w-6xl mx-auto">
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em] font-semibold animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <span className="bg-gradient-to-b from-[#F8FAFC] to-[#F8FAFC]/60 bg-clip-text text-transparent">
              {headline.line1}
            </span>
          </h1>
          <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.9] tracking-[-0.03em] font-semibold animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#D4AF37] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              {headline.line2}
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-xl text-[#F8FAFC]/50 max-w-2xl text-center leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
          {subtitle}
        </p>

        {/* Buttons */}
        {buttons && (
          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
            {buttons.primary && (
              <Link
                href={buttons.primary.href}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#D4AF37] text-[#070B14] font-semibold text-sm overflow-hidden transition-all duration-500 hover:bg-[#E8C547] hover:shadow-xl hover:shadow-[#D4AF37]/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>{buttons.primary.text}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            {buttons.secondary && (
              <Link
                href={buttons.secondary.href}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#F8FAFC]/70 text-sm hover:border-[#D4AF37]/40 hover:text-[#F8FAFC] transition-all duration-500 backdrop-blur-sm"
              >
                {buttons.secondary.text}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-[fadeIn_1s_ease-out_1.2s_both]">
        <div className="flex flex-col items-center gap-2 animate-[bounce_2s_ease-in-out_infinite]">
          <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/40 to-transparent" />
          <span className="text-[0.5rem] font-mono text-[#D4AF37]/30 uppercase tracking-[0.3em]">Scroll</span>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default AnimatedShaderHero;
