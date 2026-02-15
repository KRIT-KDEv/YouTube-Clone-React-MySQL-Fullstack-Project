import { useEffect, useState } from 'react';
import './SidebarStyle.css'

function Sidebar() {
  const [subscribe, setSubscribe] = useState([]);
  useEffect(() => {
    const fetchSubscribe = async () => {
      const data = await fetch("http://localhost:3000/subscribe?user_id=1");
      const json = await data.json();
      setSubscribe(json)
      console.log(json)
    }
    fetchSubscribe();
  }, []);
  return (
    <section id="side">
      <div className="-side-pmr">
        <a href="#!" className='-item'>
          <div className="-icon">
            <img src="https://placehold.co/24x24" alt="" />
          </div>
          <div className="-text">Home</div>
        </a>
        <a href="#!" className='-item'>
          <div className="-icon">
            <img src="https://placehold.co/24x24" alt="" />
          </div>
          <div className="-text">Shorts</div>
        </a>
        <a href="#!" className='-item'>
          <div className="-icon">
            <img src="https://placehold.co/24x24" alt="" />
          </div>
          <div className="-text">Subscription</div>
        </a>
      </div>
      <div className="-side-sec">
        <div className="-text">Subscription</div>
        {subscribe.map((sub) => (
          <a href="#!" className='-item'>
            <div className="-icon">
              <img src={sub.channel_profile_picture} alt="" />
            </div>
            <div className="-text">{sub.channel_name}</div>
            <div className="-stutus"></div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Sidebar
