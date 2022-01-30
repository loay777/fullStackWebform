import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MainPage.css";

export default function MainPage() {
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/api/get",).then((data) => {
            console.log(data);
            setPostList(data.data)
        })
    }, []);

    return (
        <div className="MainPage">
            <table>
                <thead>
                    <tr>
                        <th>Record Title</th>
                        <th>Client Name</th>
                        <th>Location</th>
                        <th>Date and Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>showSpeed</strong></td>
                        <td>15</td>
                        <td>The speed of the show/reveal</td>

                    </tr>
                    {postList.map((val, key) => {
                        return (
                            <tr>
                                <td><strong>{val.title}</strong></td>
                                <td>{val.client_name}</td>
                                <td>{val.location}</td>
                                <td>{val.visit_date}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>



            {/* <div className="recordContainer">
                {postList.map((val, key) => {
                    return (
                        <div className="record">
                            <h1>{val.title}</h1>
                            <p>{val.location}</p>
                        </div>
                    )
                })
                }
            </div> */}
        </div>
    )
}