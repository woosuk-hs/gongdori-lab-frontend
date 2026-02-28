import {useEffect, useState} from "react";
import {api} from "@utils/api.ts";

function MainPage() {

  const [serverTime, setServerTime] = useState('Def: Null')

  useEffect(() => {
    api.get('/api/test/time')
      .then(res => setServerTime(res.data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="main-page">
      Hello World!
      {serverTime}
    </div>
  );
}

export default MainPage;