import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../../Context.js";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";

const Text = (props) => {
  // console.log(dayjs().format(props.text.date));
  let db_date = props.text.date;
  const newDate = db_date.split(" ").slice(0, 6).join(" ");
  return (
    <tr>
      <td>
        <Link
          style={{ textDecoration: "none", color: "#0a58ca" }}
          to={`/text/${props.text._id}`}
        >
          {" "}
          {props.text.title}
        </Link>{" "}
      </td>
      <td>{props.text.status}</td>
      <td>{newDate}</td>
      <td>
        <Link to={`/edit/${props.text._id}`}>
          <BsPencilSquare style={{ color: "#0a58ca" }} />
        </Link>

        <BsTrash
          style={{ marginLeft: "10px", color: "#0a58ca" }}
          type="button"
          onClick={() => {
            props.deleteText(props.text._id);
          }}
        />
      </td>
    </tr>
  );
};

function TextList() {
  const [texts, setTexts] = useState([]);

  const userObject = useContext(myContext);
  const req_googleId = userObject.googleId;

  useEffect(() => {
    async function getTexts() {
      const response = await fetch(
        `https://sanskrit-cms-backend.onrender.com/text`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ req_googleId }),
        }
      );
      if (!response.ok) {
        const message = "An error occurred:";
        window.alert(message);
        return;
      }
      const texts = await response.json();
      setTexts(texts);
    }
    getTexts();
    return;
  }, [req_googleId]);

  // This method will delete a record
  async function deleteText(id) {
    await fetch(`https://sanskrit-cms-backend.onrender.com/${id}`, {
      method: "DELETE",
    });

    const newTexts = texts.filter((el) => el._id !== id);
    setTexts(newTexts);
  }

  function textList() {
    return texts.map((text) => {
      return (
        <Text
          text={text}
          key={text._id}
          deleteText={() => deleteText(text._id)}
        />
      );
    });
  }
  return (
    <div className="mt-4">
      <table className="table">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Last Modified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{textList()}</tbody>
      </table>
    </div>
  );
}

export default TextList;
