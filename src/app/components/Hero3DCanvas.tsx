"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Monogram from "./Monogram";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setPrefersReducedMotion(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // 2. Geometry Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Architectural Polyhedron (Icosahedron with wireframe + vertices)
    const baseRadius = 1.9;
    const icosahedronGeo = new THREE.IcosahedronGeometry(baseRadius, 1);

    // Subtle dark charcoal reflective facets
    const solidMat = new THREE.MeshPhysicalMaterial({
      color: 0x12151c,
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      wireframe: false,
      flatShading: true,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const solidMesh = new THREE.Mesh(icosahedronGeo, solidMat);
    mainGroup.add(solidMesh);

    // Precise architectural wireframe lines
    const wireframeGeo = new THREE.WireframeGeometry(icosahedronGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x334155,
      transparent: true,
      opacity: 0.55,
      linewidth: 1,
    });
    const wireframeLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
    mainGroup.add(wireframeLines);

    // Warm orange accent vertex nodes
    const vertices: number[] = [];
    const posAttr = icosahedronGeo.getAttribute("position");
    const uniquePositions: THREE.Vector3[] = [];
    const threshold = 0.05;

    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      const isDuplicate = uniquePositions.some((up) => up.distanceTo(v) < threshold);
      if (!isDuplicate) {
        uniquePositions.push(v);
        vertices.push(v.x, v.y, v.z);
      }
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    // Warm orange point texture
    const pointMat = new THREE.PointsMaterial({
      color: 0xff6b35,
      size: 0.09,
      transparent: true,
      opacity: 0.9,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointMat);
    mainGroup.add(pointsMesh);

    // Concentric architectural orbital rings
    const ringGeo = new THREE.TorusGeometry(2.7, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.28,
    });
    const orbitalRing1 = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing1.rotation.x = Math.PI / 3;
    mainGroup.add(orbitalRing1);

    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.008, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.22,
    });
    const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitalRing2.rotation.y = Math.PI / 4;
    mainGroup.add(orbitalRing2);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Warm orange key light
    const keyLight = new THREE.DirectionalLight(0xff6b35, 3.2);
    keyLight.position.set(4, 3, 4);
    scene.add(keyLight);

    // Cool slate fill light
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.8);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    // 4. Interactive Inertia & Rotation physics
    let isIntersecting = true;
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };
    const targetRotation = { x: 0.2, y: 0.4 };
    const currentRotation = { x: 0.2, y: 0.4 };
    let frameId: number;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousPointerPosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousPointerPosition.x;
        const deltaY = clientY - previousPointerPosition.y;

        targetRotation.y += deltaX * 0.008;
        targetRotation.x += deltaY * 0.008;

        previousPointerPosition = { x: clientX, y: clientY };
      } else {
        // Gentle parallax follow
        const rect = container.getBoundingClientRect();
        const normX = (clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
        const normY = (clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);

        targetRotation.y = normX * 0.35 + 0.4;
        targetRotation.x = normY * 0.25 + 0.2;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);

    // 5. Visibility observer to conserve GPU cycles
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    });
    observer.observe(container);

    // 6. Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!isIntersecting) return;

      const delta = clock.getDelta();

      // Continuous subtle idle rotation
      if (!isDragging) {
        targetRotation.y += delta * 0.15;
      }

      // Smooth inertia interpolation (lerp)
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;

      mainGroup.rotation.x = currentRotation.x;
      mainGroup.rotation.y = currentRotation.y;

      // Independent counter-rotation for orbital rings
      orbitalRing1.rotation.z += delta * 0.2;
      orbitalRing2.rotation.z -= delta * 0.14;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      icosahedronGeo.dispose();
      wireframeGeo.dispose();
      pointsGeo.dispose();
      ringGeo.dispose();
      ringGeo2.dispose();
      solidMat.dispose();
      wireframeMat.dispose();
      pointMat.dispose();
      ringMat.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, []);

  if (prefersReducedMotion || !webGLSupported) {
    // Static architectural blueprint fallback
    return (
      <div className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center">
        <div className="relative w-72 h-72 rounded-full border border-[#222735] flex items-center justify-center p-8 bg-[#12151c]/60 backdrop-blur-sm">
          <div className="absolute inset-4 rounded-full border border-dashed border-[#ff6b35]/30" />
          <div className="absolute inset-10 rounded-full border border-[#222735]" />
          <Monogram size={96} priority />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      aria-label="Interactive 3D Architectural Polyhedron - Drag to rotate"
      role="img"
    >
      {/* Center floating Monogram overlay */}
      <div className="absolute pointer-events-none opacity-35 transition-opacity">
        <Monogram size={64} />
      </div>
    </div>
  );
}
