
function CardShort({ content }) {

    // Convert View Function show on frontend
    const convertViewShort = (viewCount) => {
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

  return (
    
    // UI Show Short 
    <div className="short">
            <div className="-thumb">
              <img src={content.video_thumbnail} alt="" />
            </div>
            <div className="-about">
              <div className="-detail">
                <a href="" className="-title">{content.video_title}</a>
                <div className="view">{convertViewShort(content.view_count)}</div>
              </div>
            </div>
          </div>
  )
}

export default CardShort
