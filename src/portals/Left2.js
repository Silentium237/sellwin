import * as THREE from 'three'
import React, { useEffect , Suspense} from 'react'
import { useSprings, a } from '@react-spring/three'
import {Image, useVideoTexture, useAspect} from "@react-three/drei";
import logo from "../logo.svg"
import sellwinOil from "../sellwinOil.mp4"
import {Canvas} from "@react-three/fiber";

const number = 15
const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']
const random = (i) => {
    const r = Math.random()
    return {
        position: [100 - Math.random() * 200, 100 - Math.random() * 200, i * 1.5],
        color: colors[Math.round(Math.random() * (colors.length - 1))],
        scale: [1 + r * 14, 1 + r * 14, 1],
        rotation: [0, 0, THREE.MathUtils.degToRad(Math.round(Math.random()) * 45)]
    }
}

const data = new Array(number).fill().map(() => {
    return {
        color: colors[Math.round(Math.random() * (colors.length - 1))],
        args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10]
    }
})

function Content() {
    const [springs, set] = useSprings(number, (i) => ({
        from: random(i),
        ...random(i),
        config: { mass: 20, tension: 150, friction: 50 }
    }))
    useEffect(() => void setInterval(() => set((i) => ({ ...random(i), delay: i * 40 })), 3000), [])
    return data.map((d, index) => (
        <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
            <boxGeometry args={d.args} />
            <a.meshStandardMaterial color={springs[index].color} roughness={0.75} metalness={0.5} toneMapped={false} />
        </a.mesh>
    ))
}
const doggos = logo;

function Lights() {
    return (
        <group>
            <pointLight intensity={0.3} />
            <ambientLight intensity={2} />
            <spotLight
                castShadow
                intensity={0.2}
                angle={Math.PI / 7}
                position={[150, 150, 250]}
                penumbra={1}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
        </group>
    )
}



// const sellwinVideo = sellwinVideo;
function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial  scale={[100, 1000, 100]}  map={texture}   />
}

export default function App() {
    const size = useAspect(1000, 1000,  )
    return (
        <mesh scale={size} position={[-4, 2, -24]}   >
            <planeGeometry />
            <Suspense >
                <VideoMaterial   url={sellwinOil} />
            </Suspense>

        </mesh>

        // <group position={[0, 0, -200]}>
        //     {/*<Lights />*/}
        //     {/*<Content />*/}
        //     {/*<Image  url={doggos} scale={[100, 30, 100]} texture={THREE.TextureLoader} />*/}
        //     <Suspense >
        //         <VideoMaterial url={sellwinVideo} />
        //     </Suspense>
        // </group>
    )
}
