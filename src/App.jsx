import { PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { random } from "maath";
import React, { Suspense, useRef, useState } from "react";

function Stars(props) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function App() {
  return (
    <main className="min-h-screen min-h-screen bg-black text-white">
      <div className="z-0 h-screen w-screen fixed">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
          <Preload all />
        </Canvas>
      </div>

      <section className="min-h-screen flex items-center justify-center">
        <div className="text-8xl">
          <h1 className="animate__animated animate__fadeIn animate__slow">
            hello
          </h1>
          <h1 className="animate__animated animate__fadeIn animate__slower">
            world
          </h1>
        </div>
      </section>
    </main>
  );
}

export default App;
