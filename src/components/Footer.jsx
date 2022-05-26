import React from 'react';
import Button from './Button';
import {MdOutlineClearAll} from 'react-icons/md'

export default function Footer(props) {
    return(
        <div className="footer">
            <p>You have {props.pendingTask} pending task.</p>
            <Button
                icon={MdOutlineClearAll}
                title="Clear All"
                style={{
                    backgroundColor: "#F47C7C",
                    border: "none",
                    color: "white",
                    borderRadius: "5px"
                }
                }
                onClick={props.onClick}
            />
        </div>
    )
};
