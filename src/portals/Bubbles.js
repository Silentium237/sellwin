// import { MathUtils } from 'three'
// import { useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
// import { Instances, Instance } from '@react-three/drei'
//
// const particles = Array.from({ length: 150 }, () => ({
//     factor: MathUtils.randInt(20, 100),
//     speed: MathUtils.randFloat(0.01, 1),
//     xFactor: MathUtils.randFloatSpread(80),
//     yFactor: MathUtils.randFloatSpread(40),
//     zFactor: MathUtils.randFloatSpread(40)
// }))
//
// export default function App() {
//     return (
//         <group position={[0, 0, -50]}>
//             <ambientLight intensity={1.5} />
//             <pointLight position={[100, 10, 0]} intensity={4} castShadow />
//             <pointLight position={[-100, -100, -100]} intensity={10} color="red" />
//             <Bubbles />
//         </group>
//     )
// }
//
// function Bubbles() {
//     const ref = useRef()
//     useFrame((state, delta) => void (ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, (-state.mouse.x * Math.PI) / 6, 0.75, delta)))
//     return (
//         <Instances limit={particles.length} ref={ref} castShadow receiveShadow position={[0, 0, 0]}>
//             <sphereGeometry args={[1, 32, 32]} />
//             <meshStandardMaterial roughness={0} color="#f0f0f0" />
//             {particles.map((data, i) => (
//                 <Bubble key={i} {...data} />
//             ))}
//         </Instances>
//     )
// }
//
// function Bubble({ factor, speed, xFactor, yFactor, zFactor }) {
//     const ref = useRef()
//     useFrame((state) => {
//         const t = factor + state.clock.elapsedTime * (speed / 2)
//         ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5))
//         ref.current.position.set(
//             Math.cos(t) + Math.sin(t * 1) / 10 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
//             Math.sin(t) + Math.cos(t * 2) / 10 + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
//             Math.sin(t) + Math.cos(t * 2) / 10 + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
//         )
//     })
//     return <Instance ref={ref} />
// }

import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useSprings, a } from '@react-spring/three'
import {Image} from "@react-three/drei";
import BH from "../BH.png"

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
const doggos = BH

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

export default function App() {
    return (
        <group position={[0, 0, -200]}>
            {/*<Lights />*/}
            {/*<Content />*/}
            <Image  url={doggos} scale={[110, 120, 110]} texture={THREE.TextureLoader} />
        </group>
    )
}
