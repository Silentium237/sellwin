import { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom'
import './styles.css'
import App from './App'
import {Text} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const images = [
    // Front
    { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970), Scene: lazy(() => import('./portals/Front')), name: 'Новости ' },
    // Back
    { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430), Scene: lazy(() => import('./portals/Bubbles')), name: 'Главная'  },
    { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452), Scene: lazy(() => import('./portals/SpringyBoxes')), name: 'Контакты' },
    // Left
    { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(464646), Scene: lazy(() => import('./portals/Lefr1')), name: 'Контакты'  },
    { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(416477), Scene: lazy(() => import('./portals/Left2')), name: 'Контакты'  },
    { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(416488), Scene: lazy(() => import('./portals/Left3')), name: 'Контакты'  },
    // Right
    { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(416433), Scene: lazy(() => import('./portals/Right1')), name: 'Контакты'  },
    { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(416430), Scene: lazy(() => import('./portals/SpringyBoxes')), name: 'Контакты'  },
    { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(416430), Scene: lazy(() => import('./portals/SpringyBoxes')), name: 'Контакты'  }

]

createRoot(document.getElementById('root')).render(
    <Suspense fallback={null}>
        <App images={images} />


    </Suspense>
)
