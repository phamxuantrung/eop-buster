// Toast function
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle",
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
    }
}

function showSuccessToast() {
    toast({
        title: "Đăng ký thành công!",
        message: "Hãy chờ chúng tôi sẽ liên hệ với bạn để xác nhận",
        type: "success",
        duration: 8000,
    });
}

function showErrorToast() {
    toast({
        title: "Đăng ký thất bại!",
        message: "Có lỗi xảy ra, vui lòng thử lại sau.",
        type: "error",
        duration: 5000,
    });
}

let form = document.querySelector("#contact_form");
form.onsubmit = (e) => {
    e.preventDefault();
    document.querySelector(".loading").style.display = "flex";
    let data = new FormData(form);
    fetch(
        "https://script.google.com/macros/s/AKfycbzygjX_OleXTKys1UiNtn3WWQaVnKcid4RIhcyU2EoiVca_tJVWWmLhpoeCtS6PgGaH/exec",
        {
            method: "POST",
            body: data,
        }
    )
        // The fetch() method is used to make a request to the server and retrieve data.
        // This is an example API endpoint. Replace it with the actual URL for the API endpoint you want to use.
        .then(() => {
            document.querySelector(".loading").style.display = "none";
            document.querySelector("input#account").value = "";
            document.querySelector("input#password").value = "";
            document.querySelector("input#link").value = "";
            document.querySelector("textarea").value = "";
            showSuccessToast();
        })
        .catch(() => {
            document.querySelector(".loading").style.display = "none";
            document.querySelector("input#account").value = "";
            document.querySelector("input#password").value = "";
            document.querySelector("input#link").value = "";
            document.querySelector("textarea").value = "";
            showErrorToast();
        });

};

function toRegisterPage(string) {
    document.querySelector("select#package").value = string;
}
