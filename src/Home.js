import React, { useState } from 'react'
import * as XLSX from "xlsx";

const Home = () => {
    const [items, setItems] = useState([]);

    const readExcel = (file) => {
        // setItems([])
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            d.forEach(item => {
                item.check = "Chưa kiểm tra"
            });
            setItems(d);

            console.log(d)
        });
    };
    const check_tamo = () => {
        for (let index = 0; index < items.length; index++) {

           
            if(index===items.length-1) console.log("done")

            console.log(items.length)
            console.log(items)
            // console.log(items[index].cmnd.length + "    " + items[index].cmnd + ",")
            if (items[index].cmnd.length !== 12 && items[index].cmnd.length !== 9) {
                items[index].check = "CMND/CCCD Không hợp lệ"

            }
            else
                fetch(
                    "https://thawing-hamlet-25516.herokuapp.com/https://api.tamo.vn/web/public/client/check/identificationNumber/" + items[index].cmnd,

                    {
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
                            Connection: "keep-alive",
                            Host: "api.tamo.vn",
                            Origin: "https://www.tamo.vn",
                            Referer: "https://www.tamo.vn/",
                            "sec-ch-ua": '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
                            "sec-ch-ua-mobile": '?0',
                            "sec-ch-ua-platform": '"Windows"',
                            "Sect-fetch-Dest": "empty",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "same-site",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
                        },
                    }
                )
                    .then((res) => {
                        if (!res.ok) {
                            // make the promise be rejected if we didn't get a 2xx response
                            items[index].check = "Chưa đăng ký"

                        } else {
                            // go the desired response
                            items[index].check = "Đã đăng ký"
                        }
                        // return res.json();
                    })



        }
    }
    const ex_excel = items.map((item, index) => {
        return (<tr key={item.check+index} >
            <th scope="row">{index + 1}</th>
            <td>{item.cmnd}</td>
            <td >{item.check}</td>
        </tr>)

    })
    let refresh = () => {
        let arr = { ...items }
        setItems(arr)
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12" style={{ height: "150px" }}> </div>
                <div className="col-3"></div>
                <div className="col-6">
                    <div class="input-group mb-3">

                        <input class="form-control" placeholder="" aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            type="file" onChange={(e) => {
                                const file = e.target.files[0];
                                readExcel(file);
                            }}


                        />

                    </div>
                    <button className="btn btn-primary" onClick={() => check_tamo()} >Check Tamo</button>
                    <button className="btn btn-primary" onClick={() => refresh()} >Refresh</button>

                </div>
                <div className="col-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">CMND</th>
                                <th scope="col">Tình trạng</th>

                            </tr>
                        </thead>
                        <tbody>

                            {ex_excel}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default Home
