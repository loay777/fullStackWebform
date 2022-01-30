import React, { useEffect, useState } from "react";
import "./FollowUpForm.css";
import Axios from "axios";

export default function FollowUpForm() {

    const [formAttachment, setFormAttachment] = useState({
        files: [],
        filepreview: null,
    });

    const handleInputChange = (event) => {
        setFormAttachment({
            ...formAttachment,
            files: event.target.files,
            filepreview: URL.createObjectURL(event.target.files[0]),
        });

    }

    const [isSucces, setSuccess] = useState(null);

    const submit = () => {
        const formdata = new FormData();
        formdata.append('attachment', formAttachment.files);

        Axios.post("http://localhost:3001/api/imageupload", formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(res => { // then print response status
                console.warn(res);
                if (res.data.success === 1) {
                    setSuccess("Image upload successfully");
                }

            })
    }

    const [requestNumber, setRequestnumber] = useState("")
    const [followUpDate, setFollowUpDate] = useState("")
    const [requestType, setRequestType] = useState("")
    const [category, setCategory] = useState("")
    const [inIndustrialCity, setInIndustrialCity] = useState("")
    const [outIndustrialCity, setOutIndustrialCity] = useState("")
    const [institutionName, setInstitutionName] = useState("")
    const [crNumber, setCrNumber] = useState("")
    const [registrationDate, setRegistrationDate] = useState("")
    const [zatcaCertExp, setZatcaCertExp] = useState("")
    const [currentFacilities, setCurrentFacilities] = useState("")
    const [missing, setMissing] = useState("")
    const [notes, setNotes] = useState("")
    

    useEffect(() => {
        console.log("in indus city: " + inIndustrialCity +
            "\nout indus city: " + outIndustrialCity)
    }, [inIndustrialCity, outIndustrialCity])

    const submitRecord = () => {
      
         Axios.post('http://localhost:3001/api/createfollowup', {
            requestNumber: requestNumber,
            followUpDate: followUpDate,
            requestType: requestType,
            category: category,
            inIndustrialCity: inIndustrialCity,
            outIndustrialCity: outIndustrialCity,
            institutionName: institutionName,
            crNumber: crNumber,
            registrationDate: registrationDate,
            zatcaCertExp: zatcaCertExp,
            currentFacilities: currentFacilities,
            missing: missing,
            notes: notes,
           
        }).then(res => { // then print response status
            console.warn(res);
            if (res.data.success === 1) {
                setSuccess("Image upload successfully");
            }
            if (res.data.success === 0){

            }
        })

        console.log("Request Number = "+requestNumber)
        var attachmentKey = {
            reqNumber: requestNumber,
        }    
        const formdata = new FormData();
        formdata.append('attachment', formAttachment.files);
        formdata.append('requestNumber', JSON.stringify(attachmentKey));
        Axios.post("http://localhost:3001/api/imageupload", formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(res => { // then print response status
                console.warn(res);
                if (res.data.success === 1) {
                    setSuccess("Image upload successfully");
                }

            })
    };

    return (
        <div className="recordPage">

            <div className="recordForm">

                <label>Request Number - رقم الطلب</label>
                <input type="number" onChange={(e) => { setRequestnumber(e.target.value); }} />

                <label>Date - التاريخ</label>
                <input type="date" onChange={(e) => { setFollowUpDate(e.target.value); }} />

                <label>Request type -نوع الطلب </label>
                <input type="text" onChange={(e) => { setRequestType(e.target.value); }} />

                <label>Category - الفئة</label>
                <input type="text" onChange={(e) => { setCategory(e.target.value); }} />

                <label>In Industrial Area داخل منطقة صناعية </label>
                <input type="radio" id="in_industrial_city" name="fav_language" value="true" onChange={(e) => { setInIndustrialCity(true); setOutIndustrialCity(false); }} />
                <label>Out of Industrial City خارج منطقة صناعية</label><br></br>
                <input type="radio" id="out_industrial_city" name="fav_language" value="out" onChange={(e) => { setOutIndustrialCity(true); setInIndustrialCity(false); }} />


                <label>Institution Name - اسم المنشئة</label>
                <input type="text" onChange={(e) => { setInstitutionName(e.target.value); }}></input>

                <label>CR Number - رقم السجل التجاري</label>
                <input type="text" name="name" pattern="[0-9]" required onChange={(e) => { setCrNumber(e.target.value); }}></input>

                <label>Record Date -  التاريخ السجل</label>
                <input type="date" onChange={(e) => { setRegistrationDate(e.target.value); }} />

                <label>Zakat Cert Expiry Date -  صلاحية شهادة الزكاة والدخل</label>
                <input type="date" onChange={(e) => { setZatcaCertExp(e.target.value); }} />

                <label> Missing - النواقص</label>
                <textarea onChange={(e) => { setMissing(e.target.value); }} />

                <label> Notes - الملاحظات</label>
                <textarea onChange={(e) => { setNotes(e.target.value); }} />

                <div className="formdesign">
                    {isSucces !== null ? <h4> {isSucces} </h4> : null}
                    <div className="form-row">
                        <label className="text-white">Select Image :</label>
                        <input type="files" className="form-control" name="upload_file" onChange={handleInputChange} />
                    </div>


                </div>

                {formAttachment.filepreview !== null ?
                    <img className="previewimg" src={formAttachment.filepreview} alt="UploadImage" />
                    : null}

                {/* <label> Add Attchment</label>
                <input type='file' /> */}

                <button onClick={submitRecord}>Save</button>
            </div>
        </div>
    )
}