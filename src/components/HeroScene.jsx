import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

// Generate random points inside a sphere of radius 2.0
const spherePoints = (() => {
  const points = new Float32Array(3600);
  for (let i = 0; i < 3600; i += 3) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 2.2;
    
    points[i] = r * Math.sin(phi) * Math.cos(theta);
    points[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[i + 2] = r * Math.cos(phi);
  }
  return points;
})();

function Particles() {
  const ref = useRef();
  

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 22;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={spherePoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.007}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingGeometry() {
  const meshRef = useRef();
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;

      // Smooth mouse follow interpolation
      const targetX = mouse.x * 0.45;
      const targetY = mouse.y * 0.45;
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.06;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.06;
      
      // Fine oscillation
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 1.2) * 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[0.5, 0.16, 120, 16]} />
      <meshPhysicalMaterial
        color="#6366f1"
        emissive="#1e1b4b"
        roughness={0.1}
        metalness={0.8}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        transmission={0.7}
        thickness={0.5}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full bg-[#050505] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 2] }} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#2dd4bf" />
        <directionalLight position={[0, 5, 2]} intensity={0.9} color="#ffffff" />
        <Particles />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
