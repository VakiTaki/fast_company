import React from "react";

function Bookmark(props) {
  const clsIcon = "bi fs-3 text-warning bi-star";
  return (
    <div onClick={() => props.onToogleBookMark(props.user._id)}>
      <i className={props.user.bookmark ? clsIcon + "-fill" : clsIcon}></i>
    </div>
  );
}

export default Bookmark;
