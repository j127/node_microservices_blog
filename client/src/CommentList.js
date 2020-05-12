import React from "react";

export default ({ comments }) => {
    const renderedComments = comments.map(c => <li key={c.id}>{c.content}</li>);

    return (
        <div>
            <ul>{renderedComments}</ul>
        </div>
    );
};
