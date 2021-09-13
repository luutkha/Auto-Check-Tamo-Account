import React from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useHistory } from "react-router";
const Login = () => {
  let history = useHistory()
  const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
       
    },
    validationSchema: Yup.object({
        username: Yup.string()
            .max(45, 'username quá dài')
            .min(2, 'username quá ngắn')
            .required('username là bắt buộc'),
        password: Yup.string()
            .min(2, 'Mật khẩu phải từ 6 ký tự trở lên')
            .required('Mật khẩu là bắt buộc'),
    }),
    onSubmit: values => {
      //  alert(JSON.stringify(values, null, 2));
       console.log(values.username)
       fetch("https://613f09e7e9d92a0017e173da.mockapi.io/users?username="+values.username)
       .then(res=> res.json())
       .then(res =>{
         if(typeof res[0] === 'undefined') alert("Tên đăng nhập không tồn tại")
         else
         if(res[0].username===values.username && values.password===res[0].password){
           console.log("xx")
            history.push("/trang-chu")
         }
         else alert("Tên đăng nhập hoặc tài khoản không đúng");
        // console.log(res)
       })
      // dispath(getLoginDataUser(values))
        //console.log(user)

    },
});
  return (
    <div className="row">
      <div className="col-12" style={{ height: "100px" }}></div>
      <div className="col-3"></div>
      <div className="col-6">
      <form onSubmit={formik.handleSubmit}>
        <div class="card text-center">
          {/* <div class="card-header">Featured</div> */}
          <div class="card-body">
            <h5 class="card-title">Đăng nhập</h5>
            <div class="form-outline mb-4">
              <input type="text" class="form-control" id="username" {...formik.getFieldProps('username')} />

              <label class="form-label" for="username">
                Tên đăng nhập:
              </label>
              <div class="form-notch">
                <div class="form-notch-leading" style={{ width: "9px" }}></div>
                <div
                  class="form-notch-middle"
                  style={{ width: "114.4px" }}
                ></div>
                <div class="form-notch-trailing"></div>
              </div>
            </div>
            <div class="form-outline mb-4">
              <input type="password" id="password"  {...formik.getFieldProps('password')} class="form-control"/>

              <label class="form-label" for="password">
                Mật khẩu:
              </label>
              <div class="form-notch">
                <div class="form-notch-leading" style={{ width: "9px" }}></div>
                <div
                  class="form-notch-middle"
                  style={{ width: "114.4px" }}
                ></div>
                <div class="form-notch-trailing"></div>
              </div>
            </div>
            <button href="#" type="submit" className="btn btn-primary">
              Đăng nhập
            </button>
          </div>
          <div class="card-footer text-muted">Author: Tuan Kha</div>
        </div>
        </form>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default Login;
