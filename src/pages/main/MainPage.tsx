// import {useEffect, useState} from "react";
// import {api} from "@utils/api.ts";
import "./styles/MainPage.css"
import {Link} from "react-router-dom";

function MainPage() {

  // const [serverTime, setServerTime] = useState('Def: Null')

  // useEffect(() => {
  //   api.get('/api/test/time')
  //     .then(res => setServerTime(res.data))
  //     .catch(err => console.log(err))
  // }, []);

  return (
    <div className="main-page">
      {/*Hello World!*/}
      {/*{serverTime}*/}

      <section className="pages" id="home">
        <div className="logo-container">
          <Link to="/"><img src="/images/logo.svg" alt="로고" /></Link>
        </div>
      </section>
      <section className="pages">HomeC</section>
      <section className="pages">HomeB</section>
      <section className="pages" id="homea">HomeA</section>
    </div>
  );
}

export default MainPage;