import { useEffect } from "react"

// Get content from content component "{}" dont for get to easy use
function CardVideo({ content }) {
    useEffect(() => {
        console.log(content) },[]);

      // Convert Date time -> Day
    const convertPublisDate = (date) => {
        const publis_date = new Date(date);
        const today = new Date();
        const differnce_time = today.getTime() - publis_date.getTime();
        const differnce_day = Math.round(differnce_time / 86400000)
        return differnce_day;
    };

    // Convert View Function show on frontend
    const convertView = (viewCount) => {
      let text_view_count = "";
      if (viewCount >= 1000 && viewCount < 10000) {
        viewCount /= 1000;
        text_view_count = viewCount + "K views"
      }else if (viewCount >= 10000 && viewCount < 100000){
        viewCount /= 1000;
        text_view_count = viewCount + "K views"
      }else if (viewCount >= 100000 && viewCount < 1000000){
        viewCount /= 1000;
        text_view_count = viewCount + "K views"
      }else if (viewCount >= 1000000){
        viewCount /= 1000000;
        text_view_count = viewCount + "M views"
      }else {
        text_view_count = viewCount + " views"
      }
      return text_view_count;
    };
    


    // Show component to UI 
  return (
   <div className="card">
        <div className="-thumb">
          <img src={content.video_thumbnail} alt="" />
        </div>
        <div className="-about">
          <div className="-channel-img">
            {/* can use  <img src={conntent.channel_profile_picture} alt="" />*/} 
            <img src={"https://placehold.co/36x36"} alt="" />
          </div>
          <div className="-detail">
            <div className="-title">{content.video_title}</div>
            <div className="-channel">{content.channel_name}</div>
            <div className="-view">{convertView(content.view_count)} •  {convertPublisDate(content.video_created_at)} days ago</div>
          </div>
        </div>
      </div>
  )
}

export default CardVideo
