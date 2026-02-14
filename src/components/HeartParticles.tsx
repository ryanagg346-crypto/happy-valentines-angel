import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HeartShape = () => {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const x = 0, y = 0;
    s.moveTo(x, y + 0.3);
    s.bezierCurveTo(x, y + 0.45, x - 0.15, y + 0.6, x - 0.35, y + 0.6);
    s.bezierCurveTo(x - 0.7, y + 0.6, x - 0.7, y + 0.225, x - 0.7, y + 0.225);
    s.bezierCurveTo(x - 0.7, y + 0.075, x - 0.55, y - 0.15, x, y - 0.45);
    s.bezierCurveTo(x + 0.55, y - 0.15, x + 0.7, y + 0.075, x + 0.7, y + 0.225);
    s.bezierCurveTo(x + 0.7, y + 0.225, x + 0.7, y + 0.6, x + 0.35, y + 0.6);
    s.bezierCurveTo(x + 0.15, y + 0.6, x, y + 0.45, x, y + 0.3);
    return s;
  }, []);
  return shape;
};

const Particles = ({ count = 60 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const heartShape = HeartShape();
  
  const geometry = useMemo(() => {
    const geo = new THREE.ShapeGeometry(heartShape);
    geo.scale(0.08, 0.08, 0.08);
    return geo;
  }, [heartShape]);

  const data = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      scale: 0.5 + Math.random() * 1.5,
      rotSpeed: (Math.random() - 0.5) * 0.5,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    data.forEach((d, i) => {
      dummy.position.set(
        d.position[0] + Math.sin(t * 0.3 + d.offset) * 0.5,
        d.position[1] + Math.sin(t * d.speed + d.offset) * 0.8,
        d.position[2]
      );
      dummy.rotation.z = Math.sin(t * d.rotSpeed + d.offset) * 0.3;
      dummy.scale.setScalar(d.scale * (0.8 + Math.sin(t * 0.5 + d.offset) * 0.2));
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
      <meshBasicMaterial color="#ff4d6d" transparent opacity={0.35} side={THREE.DoubleSide} />
    </instancedMesh>
  );
};

const HeartParticles = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <Particles />
      </Canvas>
    </div>
  );
};

export default HeartParticles;
