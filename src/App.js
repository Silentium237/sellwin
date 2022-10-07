import * as THREE from 'three'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, createPortal } from '@react-three/fiber'
import { useFBO, useCursor, PerspectiveCamera, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import getUuid from 'uuid-by-string'

import { RenderTexture, OrbitControls, ContactShadows } from '@react-three/drei'



const GOLDENRATIO = 1.61803398875

export default function App({ images }) {
    return (

        <mesh>
            <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 0, 15] }}>

                <mesh position={[0, 3, 0]}>
                        <Cube />
                    {/*<OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />*/}
                </mesh >

                    <mesh position={[-1.75, 1.3, 0.25]}  rotation={[0, Math.PI / 2.5, 0]} >
                        <Text
                            fontSize={0.15}
                            color="red"
                        >
                           BeautyHouse
                        </Text>
                    </mesh>
                <mesh position={[-2.15, 1.3, 1.5]}  rotation={[0, Math.PI / 2.5, 0]} >
                        <Text
                            fontSize={0.15}
                            color="red"
                        >
                           Oil Motor
                        </Text>
                    </mesh>

                <mesh position={[-2, 1.3, 2.75]}  rotation={[0, Math.PI / 2.5, 0]} >
                        <Text
                            fontSize={0.15}
                            color="red"
                        >
                           SellwinSystem
                        </Text>
                    </mesh>
                <mesh position={[1.75, 1.3, 0.25]}  rotation={[0, -Math.PI / 2.5, 0]} >
                        <Text
                            fontSize={0.15}
                            color="red"
                        >
                           SellwinPro
                        </Text>
                    </mesh>
                <mesh position={[-0.8, 1.3, -0.6]}  rotation={[0, 0, 0]} >
                        <Text
                            fontSize={0.15}
                            color="red"
                        >
                            BeautyHouse
                        </Text>
                    </mesh>
                <mesh position={[0.8, 1.3, -0.6]}  rotation={[0, 0, 0]} >
                        <Text
                            fontSize={0.15}
                            color="red"
                        >
                            B2B.Sellwin
                        </Text>
                    </mesh>




                <color attach="background" args={['#191920']} />
                <fog attach="fog" args={['#191920', 0, 15]} />
                <Environment preset="city" />

                <group position={[0, -0.5, 0]}>
                    <Frames images={images} />
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                        <planeGeometry args={[50, 50]} />
                        <MeshReflectorMaterial
                            blur={[300, 100]}
                            resolution={2048}
                            mixBlur={1}
                            mixStrength={60}
                            roughness={1}
                            depthScale={1.2}
                            minDepthThreshold={0.3}
                            maxDepthThreshold={1.4}
                            color="#151515"
                            metalness={0.5}
                        />
                    </mesh>
                </group>

            </Canvas>
        </mesh>



    )
}

function Cube() {
    const textRef = useRef()
    useFrame((state) => (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2))
    return (
        <mesh position={[0, 1, -5]}>
            <sphereBufferGeometry visible
                              position={[0, 0, 2]}
                              args={[1, 250, 250]} />
            <meshStandardMaterial>
                <RenderTexture attach="map" anisotropy={16}>
                    <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 5]} />
                    <color attach="background" args={['#00cfff']} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} />
                    <Text ref={textRef} fontSize={1} color="white">
                        Sellwin Group
                    </Text>
                    {/*<Dodecahedron />*/}
                </RenderTexture>
            </meshStandardMaterial>
        </mesh>
    )
}

function Dodecahedron(props) {
    const meshRef = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    useFrame(() => (meshRef.current.rotation.x += 0.01))
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={clicked ? 1.5 : 1}
            onClick={() => click(!clicked)}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}>
            <dodecahedronGeometry args={[0.75]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : '#5de4c7'} />
        </mesh>
    )
}



function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/item/:id')
    const [, setLocation] = useLocation()
    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.parent.updateWorldMatrix(true, true)
            clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.5))
            clicked.current.parent.getWorldQuaternion(q)
        } else {
            p.set(0, 0, 5.5)
            q.identity()
        }
    })
    useFrame((state, dt) => {
        state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, dt))
        state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 3, dt))
    })
    return (
        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
            onPointerMissed={() => setLocation('/')}>
            {images.map(({ Scene, ...props }) => (
                <Frame key={props.url} {...props}>
                    <Scene />
                </Frame>
            ))}
        </group>
    )
}

function Frame({ children, url, c = new THREE.Color(), ...props }) {
    const image = useRef()
    const [hovered, hover] = useState(false)
    const frame = useRef()
    const name = getUuid(url)
    useCursor(hovered)
    useFrame((state) => {
        image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1)
        image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1)
        frame.current.material.color.lerp(c.set(hovered ? 'orange' : 'white').convertSRGBToLinear(), 0.1)
    })
    return (
        <group {...props}>
            <mesh
                name={name}
                onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                onPointerOut={() => hover(false)}
                scale={[1, GOLDENRATIO, 0.05]}
                position={[0, GOLDENRATIO / 2, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
                <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} />
                </mesh>
                <Portal ref={image} position={[0, 0, 0.7]}>
                    <group {...props}>{children}</group>
                </Portal>
            </mesh>

            <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
                {/*{name.split('-').join(' ')}*/}
            </Text>
        </group>
    )
}

const Portal = forwardRef(({ children, ...props }, ref) => {
    const cam = useRef()
    const fbo = useFBO()
    const [scene] = useState(() => new THREE.Scene())
    useFrame((state) => {
        cam.current.matrixWorldInverse.copy(state.camera.matrixWorldInverse)
        state.gl.setRenderTarget(fbo)
        state.gl.render(scene, cam.current)
        state.gl.setRenderTarget(null)
    })
    return (
        <mesh ref={ref} raycast={() => null} {...props}>
            <PerspectiveCamera manual ref={cam} fov={50} aspect={1 / GOLDENRATIO} onUpdate={(c) => c.updateProjectionMatrix()} />
            {createPortal(children, scene)}
            <planeGeometry />
            <meshBasicMaterial map={fbo.texture} toneMapped={false} />
        </mesh>
    )
})
