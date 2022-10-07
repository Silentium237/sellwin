// import * as THREE from 'three'
// import React, { useEffect } from 'react'
// import { useSprings, a } from '@react-spring/three'
// import {Image} from "@react-three/drei";
//
// const number = 15
// const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']
// const random = (i) => {
//     const r = Math.random()
//     return {
//         position: [100 - Math.random() * 200, 100 - Math.random() * 200, i * 1.5],
//         color: colors[Math.round(Math.random() * (colors.length - 1))],
//         scale: [1 + r * 14, 1 + r * 14, 1],
//         rotation: [0, 0, THREE.MathUtils.degToRad(Math.round(Math.random()) * 45)]
//     }
// }
//
// const data = new Array(number).fill().map(() => {
//     return {
//         color: colors[Math.round(Math.random() * (colors.length - 1))],
//         args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10]
//     }
// })
//
// function Content() {
//     const [springs, set] = useSprings(number, (i) => ({
//         from: random(i),
//         ...random(i),
//         config: { mass: 20, tension: 150, friction: 50 }
//     }))
//     useEffect(() => void setInterval(() => set((i) => ({ ...random(i), delay: i * 40 })), 3000), [])
//     return data.map((d, index) => (
//         <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
//             <boxGeometry args={d.args} />
//             <a.meshStandardMaterial color={springs[index].color} roughness={0.75} metalness={0.5} toneMapped={false} />
//         </a.mesh>
//     ))
// }
// const doggos =
//     "data:image/png;base64,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";
//
// function Lights() {
//     return (
//         <group>
//             <pointLight intensity={0.3} />
//             <ambientLight intensity={2} />
//             <spotLight
//                 castShadow
//                 intensity={0.2}
//                 angle={Math.PI / 7}
//                 position={[150, 150, 250]}
//                 penumbra={1}
//                 shadow-mapSize-width={2048}
//                 shadow-mapSize-height={2048}
//             />
//         </group>
//     )
// }
//
// export default function App() {
//     return (
//         <group position={[0, 0, -200]}>
//             {/*<Lights />*/}
//             {/*<Content />*/}
//             <Image  url={doggos} scale={[100, 30, 100]} texture={THREE.TextureLoader} />
//         </group>
//     )
// }


import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useSprings, a } from '@react-spring/three'
import {Image} from "@react-three/drei";
import b2b from "../b2b.png"

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
const doggos = b2b

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