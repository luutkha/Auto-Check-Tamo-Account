import React, { useState } from 'react'
import * as XLSX from "xlsx";
import { CSVLink, CSVDownload } from "react-csv";

const Home = () => {
    let [items, setItems] = useState([]);

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
            d.forEach((item, index) => {
                item.check = "Chưa kiểm tra"
                if(typeof item.cmnd !== "undefined")
                item.cmnd = item.cmnd.toString()

                var numb = item.cmnd.match(/\d/g);
                numb = numb.join("");
                item.cmnd= numb
                item.constractNo="x"+ item.constractNo
            });
            setItems(d);

            console.log(d)
        });
    };
    const check_tamo = () => {
        // console.log(items)
        items.map((item, index) => {



            if (index === items.length - 1) console.log("done")

            console.log(items.length)
            //   console.log(items)
            // console.log(items[index].cmnd.length + "    " + items[index].cmnd + ",")
            if (items[index].cmnd.length !== 12 && items[index].cmnd.length !== 9) {
                items[index].check = "CMND/CCCD Không hợp lệ"
                console.log(item)

            }
            else
                fetch(
                    "https://thawing-hamlet-25516.herokuapp.com/https://api.tamo.vn/web/public/client/check/identificationNumber/" + items[index].cmnd,

                    {
                        // headers: {
                        //     Accept: "application/json, text/plain, */*",
                        //     "Accept-Encoding": "gzip, deflate, br",
                        //     "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
                        //     Connection: "keep-alive",
                        //     Host: "api.tamo.vn",
                        //     Origin: "https://www.tamo.vn",
                        //     Referer: "https://www.tamo.vn/",
                        //     "sec-ch-ua": '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
                        //     "sec-ch-ua-mobile": '?0',
                        //     "sec-ch-ua-platform": '"Windows"',
                        //     "Sect-fetch-Dest": "empty",
                        //     "Sec-Fetch-Mode": "cors",
                        //     "Sec-Fetch-Site": "same-site",
                        //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
                        // },
                    }
                )
                    .then((response) => {
                        console.log(response)
                        if (!response.ok) { 
                            if (response.status === 404){ 
                                items[index].check = "Chưa đăng ký"
                                console.log("Phát hiện cmnd chưa đk")
                                //    throw Error(response.statusText); 
                             }
                             if (response.status === 429){ 
                                items[index].check = "Server block"
                                console.log("Server block api")
                                //    throw Error(response.statusText); 
                             }
                            return ; // will print '200 - ok'
                      } else {
                            // go the desired response
                            items[index].check = "Đã đăng ký"
                        }
                        // return res.json();
                    })
                   



        })
    }
    const ex_excel = items.map((item, index) => {
        return (<tr  >
            <th scope="row">{index + 1}</th>
            <td>{item.cmnd}</td>
            <td key={item.check} >{item.check}</td>
        </tr>)

    })
    let refresh = () => {
        // console.log(items)
        let check = 0
        let count = 0
        items.forEach(item => {
            if (item.check === "Chưa kiểm tra") {
                check = 1
            }
            else {
                if(item.cmnd.charAt(0)==='0')
                item.cmnd="x"+item.cmnd
                count = count + 1
            }
        });
        if (check === 1) alert("Kiếm tra CMND chưa hoàn thành. Tiến độ: " + count + " / " + items.length)
        else {
            alert("Đã kiểm tra xong, nhấn Download file kết quả để tải về")
        }
        let arr = [...items]
        setItems(arr)
    }
    let  headers = [
        { label: "cmnd/cccd", key: "cmnd" },
        { label: "Kết quả check", key: "check" },
        { label: "constractNo", key: "constractNo" },
        { label: "name", key: "name" },
        { label: "gender", key: "gender" }

      ];
    return (
        <div className="container">
            <div className="row">
                <div className="col-12" style={{ height: "50px" }}> </div>
                <div className="col-12">
                    Một số lưu ý khi sử dụng tools: <br></br>
                    1/ Chọn choose File để chọn file excel chứa cmnd. Cột chứa số CMND/CCCD phải đặt tên là "cmnd". Cột chứa tên ảnh CMND/CCCD phải đặt tên ảnh cmnd là "constractNo". Cột chứa tên người phải đặt tên là "name" <br/>
                    2/ File excel không quá 250 dòng. <br/>
                    3/ Nhấn nút check tamo để bắt đầu kiểm tra. <br/>
                    4/ Nhấn nút xem tiến độ để xem đã check được bao nhiêu số cmnd. nếu hiện thông báo "Đã kiểm tra xong,..." thì có thể tải file excel về.

                </div>
                <div className="col-12" style={{ height: "50px" }}> </div>
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

                </div>
                <div className="col-12">
                    <button className="btn btn-primary" onClick={() => check_tamo()} >1. Check Tamo</button>
                    <button className="btn btn-light" onClick={() => refresh()} >2. Xem tiến độ</button>
                    {/* <button className="btn btn-warning" onClick={() => refresh()} >Chỉ xuất chưa đăng ký</button> */}
                    {/* <button className="btn btn-danger" onClick={() => refresh()} >Xuất tất cả</button> */}
                    <CSVLink type="button"  className="btn btn-danger" data={items} headers={headers} filename="Check_Tamo.csv">
                       3. Download file kết quả
                    </CSVLink>

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
