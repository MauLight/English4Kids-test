import { animatedGradientText } from "../utils/styles"
import Symetria from '../assets/imgs/Symetria.svg'


function Home() {
    return (
        <div className="relative w-full h-screen flex justify-center items-center">
            <img className="w-screen h-screen absolute top-0 z-10" src={Symetria} />
            <div className="flex flex-col justify-center items-center z-20">
                <h1 className={`font-title ${animatedGradientText} text-[3rem] uppercase`}>Hello Symetria</h1>
                <p className="text-[1rem] text-sym_gray-50">This is Symetria Boilerplate.</p>
            </div>
        </div>
    )
}

export default Home