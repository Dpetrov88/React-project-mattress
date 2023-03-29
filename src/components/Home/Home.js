import { useMattressContex } from "../../contexts/MattresContext";
import { HomeItem } from "./HomeItem";

export const Home = () => {
    const {mattress} = useMattressContex();
    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>The best mattress</h2>
                <h3>Only here</h3>
            </div>
            <img src="./images/back.webp" alt="hero" />

            <div id="home-page">
                <h1>Our mattress</h1>

               {mattress.map(x => 
                    <HomeItem key={x._id} {...x} />
                )}
              {mattress.length === 0 && (
                  
                  <p className="no-articles">No mattress yet</p>
              )}
            </div>
        </section>
    );
}