import React from "react";

const Login = () => {
  return (
    <div className="row">
      <div className="col-12" style={{ height: "100px" }}></div>
      <div className="col-3"></div>
      <div className="col-6">
        <div class="card text-center">
          {/* <div class="card-header">Featured</div> */}
          <div class="card-body">
            <h5 class="card-title">Đăng nhập</h5>
            <div class="form-outline mb-4">
              <input type="email" class="form-control" id="email" />

              <label class="form-label" for="email">
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
              <input type="email" class="form-control" id="email" />

              <label class="form-label" for="email">
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
            <button href="#" class="btn btn-primary">
              Đăng nhập
            </button>
          </div>
          <div class="card-footer text-muted">Author: Tuan Kha</div>
        </div>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default Login;
