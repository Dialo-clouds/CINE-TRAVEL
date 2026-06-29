"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GLSLHillsProps {
  width?: string;
  height?: string;
  cameraZ?: number;
  planeSize?: number;
  speed?: number;
  colorTop?: string;
  colorBottom?: string;
}

export function GLSLHills({
  width = '100vw',
  height = '100vh',
  cameraZ = 125,
  planeSize = 256,
  speed = 0.3,
  colorTop = '#D4AF37',
  colorBottom = '#070B14',
}: GLSLHillsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    const clock = new THREE.Clock();

    class Plane {
      uniforms: any;
      mesh: THREE.Mesh;
      time: number;

      constructor() {
        this.uniforms = { time: { value: 0 } };
        this.mesh = this.createMesh();
        this.time = speed;
      }

      createMesh() {
        const geometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSize, planeSize);
        const material = new THREE.RawShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: `
            attribute vec3 position;
            uniform mat4 projectionMatrix;
            uniform mat4 modelViewMatrix;
            uniform float time;
            varying vec3 vPosition;

            float noise3D(vec3 p) {
              return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
            }

            float fbm(vec3 p) {
              float value = 0.0;
              float amplitude = 0.5;
              float frequency = 1.0;
              for (int i = 0; i < 3; i++) {
                value += amplitude * noise3D(p * frequency);
                frequency *= 2.0;
                amplitude *= 0.5;
              }
              return value;
            }

            void main(void) {
              vec3 pos = position;
              float wave = fbm(vec3(pos.x * 0.02, pos.y * 0.02, time * 0.1)) * 20.0;
              wave += fbm(vec3(pos.x * 0.04, pos.y * 0.04, time * 0.15 + 1.0)) * 10.0;
              wave += sin(pos.x * 0.1 + time) * cos(pos.y * 0.1 + time * 0.5) * 5.0;
              pos.z += wave;
              vPosition = pos;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            precision highp float;
            varying vec3 vPosition;
            uniform float time;

            void main(void) {
              float height = vPosition.z / 40.0 + 0.5;
              vec3 topColor = vec3(${parseInt(colorTop.slice(1,3), 16) / 255}, ${parseInt(colorTop.slice(3,5), 16) / 255}, ${parseInt(colorTop.slice(5,7), 16) / 255});
              vec3 bottomColor = vec3(${parseInt(colorBottom.slice(1,3), 16) / 255}, ${parseInt(colorBottom.slice(3,5), 16) / 255}, ${parseInt(colorBottom.slice(5,7), 16) / 255});
              vec3 color = mix(bottomColor, topColor, smoothstep(-0.5, 0.8, height));
              float opacity = 0.3 + height * 0.3;
              gl_FragColor = vec4(color, opacity);
            }
          `,
          transparent: true,
        });
        return new THREE.Mesh(geometry, material);
      }

      render(delta: number) {
        this.uniforms.time.value += delta * this.time;
      }
    }

    const plane = new Plane();

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    const render = () => {
      plane.render(clock.getDelta());
      renderer.render(scene, camera);
    };

    const animate = () => {
      render();
      requestAnimationFrame(animate);
    };

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.set(0, 8, cameraZ);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(plane.mesh);
    
    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      renderer.dispose();
    };
  }, [cameraZ, planeSize, speed, colorTop, colorBottom]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width, height }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
}
