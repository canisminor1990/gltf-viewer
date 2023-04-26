import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

export interface IGltfModel {
  url: string

  zoom?: number

  color?: [number, number, number]
}

const formateColor = (c) => Math.floor((c / 255) * 1000) / 1000

const GltfModel: React.FC<IGltfModel> = ({ url, color = [255, 255, 255] }) => {
  const { scene } = useGLTF(url)

  // const clone = useMemo(() => SkeletonUtils.clone(scene), [scene, color])
  const clone = scene.clone(true)
  useEffect(() => {
    clone.traverse((obj: any) => {
      try {
        if (obj?.isMesh) {
          obj.material.color = {
            r: formateColor(color[0]),
            g: formateColor(color[1]),
            b: formateColor(color[2]),
          }
        }
      } catch {}
    })
  }, [clone, color])

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={clone} />
}

export default GltfModel
