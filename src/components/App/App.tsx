import { useState } from 'react'
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import About from '@/pages/about/About';
import testPng from "@/assets/test-png.png";
import testJpg from "@/assets/test-jpg.jpg";
import TestSvg from "@/assets/test-svg.svg";

// TREE SHAKING (пока функция не будет вызываться, то в итоговый бандл она не попадет)
function TODO() {
    console.log("TODOFUNCTION");
    TODO2();
}

function TODO2() {
    console.log("TODOFUNCTION2");
    throw new Error();
}

export const App = () => {
    const [count, setSount] = useState<number>(0);
    
    const increment = () => {
        // setSount(prev => prev + 1);
        TODO();
    }

    // TODO("11");

    // if (__PLATFORM__ === "desktop") {
    //     return <div>IS DESKTOP PLATFORM</div>;
    // }

    // if (__PLATFORM__ === "mobile") {
    //     return <div>IS MOBILE PLATFORM</div>;
    // }

    // if (__ENV__ === "development") {
    //     // addDevtools();
    // }

    return (
        <div data-testid={'App.DataTestId'}>
            <h1 data-testid={'Platform'}>PLATFORM: {__PLATFORM__}</h1>
            <div>
                <img width={100} height={100} src={testPng} alt='' />
                <img width={100} height={100} src={testJpg} alt='' />
            </div>
            <div>
                <TestSvg width={500} height={500} />
            </div>
            <Link to={'/about'}>about</Link>
            <br />
            <Link to={'/shop'}>shop</Link>
            <h1>{count}</h1>
            <button onClick={increment} className={classes.button}>
                <span>Increment</span>
            </button>
            {/* <Outlet /> */}
            <About />
        </div>
    )
}