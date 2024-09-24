import React from "react";
import project from "../images/projects-banner.png"

function ProjectBody() {
  return (
    <div>
      <img src={project} style={{width: "100%"  , objectFit: 'cover'}} />
    </div>
  );
}

export default ProjectBody;
