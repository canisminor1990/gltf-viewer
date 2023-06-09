import EnvList from '@/pages/EnvList'
import { OrbitControls, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import GltfModel from './GltfModel'
export interface IGltfViewer {
  url: string
  color?: [number, number, number]
}

const GltfViewer: React.FC<IGltfViewer> = ({ url, color }) => {
  return (
    <Canvas camera={{ position: [4, 0, -12], fov: 35 }} style={{ height: 300, width: '100%' }}>
      <Suspense fallback={null}>
        <Stage
          shadows={false}
          adjustCamera={1.5}
          environment={{
            files: EnvList.cube,
            background: false,
          }}
        >
          <GltfModel url={url} color={color} />
        </Stage>
      </Suspense>
      <OrbitControls autoRotate={true} enablePan={false} enableZoom={false} enableDamping={false} makeDefault />
    </Canvas>
  )
}

export default GltfViewer
