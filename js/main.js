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

// Form Handling

let valueUnitChanged = false, valueTestChanged = false;
let totalPay = 0;
let totalFast = 0;
let
    pEnglish = ""
    pUnitCurrent = "",
    pUnit = "",
    pTestCurrent = "",
    pTest = "",
    pDeadline = "",
    pSpeed = "\nNORMAL SPEED";

function addValue() {
    document.getElementById("package").value = `${pEnglish}${pUnitCurrent}${pUnit}${pTestCurrent}${pTest}${pDeadline}${pSpeed}`;
    document.getElementById("pay").value = document.querySelector(".pay-total").innerText
}

document.querySelectorAll(".item-package").forEach((item, index) => {
    let price = Number(item.getAttribute("price"));
    item.querySelector("span:last-child").onclick = function () {
        let current = Number(item.querySelector(".amount-view").innerText);
        item.querySelector(".amount-view").innerText = ++current;
        totalFast += 3;
        if (document.querySelector(".check-writing input").checked && index === 0) totalPay += price + 3;
        else totalPay += price;
        if (document.querySelector("select[name='choose-fod-speed']").value === "fast") {
            document.querySelector(".fod-price").innerText = `₫ ${totalFast}.000`;
            document.querySelector(".pay-total").innerText = `₫ ${totalPay + totalFast}.000`;
        } else
            document.querySelector(".pay-total").innerText = `₫ ${totalPay}.000`;

        if (index === 0) {
            document.querySelector(".item-package-more .package-price-1").innerText = `₫ ${5 * current}.000`;
            document.querySelector(".item-package-more .package-price-2").innerText = `₫ ${3 * current}.000`;
        }

        if (index === 0) {
            if (document.querySelector(".check-writing input").checked) pUnit = `[Amount = ${current}, Writing]`
            else pUnit = `[Amount = ${current}]`
        };
        if (index === 1) pTest = `[Amount = ${current}]`;
        addValue();
    };
    item.querySelector("span:first-child").onclick = function () {
        let current = Number(item.querySelector(".amount-view").innerText);
        if (current === 0) return;
        item.querySelector(".amount-view").innerText = --current;
        totalFast -= 3;
        if (document.querySelector(".check-writing input").checked && index === 0) totalPay -= price + 3;
        else totalPay -= price;
        document.querySelector(".pay-total").innerText = `₫ ${totalPay}.000`;
        if (document.querySelector("select[name='choose-fod-speed']").value === "fast") {
            document.querySelector(".fod-price").innerText = `₫ ${totalFast}.000`;
            document.querySelector(".pay-total").innerText = `₫ ${totalPay + totalFast}.000`;
        } else
            document.querySelector(".pay-total").innerText = `₫ ${totalPay}.000`;
        if (index === 0) {
            document.querySelector(".item-package-more .package-price-1").innerText = `₫ ${5 * current}.000`;
            document.querySelector(".item-package-more .package-price-2").innerText = `₫ ${3 * current}.000`;
        }

        if (index === 0) {
            if (current === 0) {
                pUnit = "";
                pUnitCurrent = "";
                document.querySelector("select[name='choose-unit']").value = ""
                valueUnitChanged = false;
            }
            else {
                if (document.querySelector(".check-writing input").checked) pUnit = `[Amount = ${current}, Writing]`
                else pUnit = `[Amount = ${current}]`
            }
        };
        if (index === 1) {
            if (current === 0) {
                pTest = "";
                pTestCurrent = "";
                document.querySelector("select[name='choose-test']").value = ""
                valueTestChanged = false;
            }
            else pTest = `[Amount = ${current}]`
        };
        addValue();
    };
});

document.querySelector(".item-package-more .check-writing input").onclick =
    function () {
        let current = Number(document.querySelector(".amount-view").innerText);
        if (this.checked) {
            totalPay += 3 * current;
            pUnit = pUnit.replace("]", ", Writing]")
        }
        else {
            totalPay -= 3 * current;
            pUnit = pUnit.replace(", Writing]", "]")
        };
        if (
            document.querySelector("select[name='choose-fod-speed']").value === "fast"
        ) {
            document.querySelector(".fod-price").innerText = `₫ ${totalFast}.000`;
            document.querySelector(".pay-total").innerText = `₫ ${totalPay + totalFast}.000`;
        } else
            document.querySelector(".pay-total").innerText = `₫ ${totalPay}.000`;
        addValue();
    };

document.querySelector(".english-current input").oninput = function () {
    pEnglish = this.value.charAt(0).toUpperCase() + this.value.slice(1)
    addValue();
}

document.querySelector("select[name='choose-unit']").onchange = function () {
    if (!valueUnitChanged) document.querySelector(".item-package.unit span:last-child").click()
    valueUnitChanged = true
    pUnitCurrent = `\nUnit current: ${this.value}, `;
    addValue();
};

document.querySelector("select[name='choose-test']").onchange = function () {
    if (!valueTestChanged) document.querySelector(".item-package.test span:last-child").click()
    valueTestChanged = true
    pTestCurrent = `\nTest current: ${this.value}, `;
    addValue();
};

document.querySelector("select[name='choose-fod-speed']").onchange =
    function () {
        if (this.value === "fast") {
            document.querySelector(".fod-speed-des").innerText =
                "Làm xong ngay trong ngày";
            document.querySelector(
                ".fod-price"
            ).innerText = `₫ ${totalFast}.000`;
            document.querySelector(".pay-total").innerText = `₫ ${totalPay + totalFast
                }.000`;
            pSpeed = "\nFAST SPEED"

        } else {
            document.querySelector(".fod-speed-des").innerText =
                "Làm xong trong vòng 2 - 7 ngày";
            document.querySelector(".fod-price").innerText = "Free";
            document.querySelector(
                ".pay-total"
            ).innerText = `₫ ${totalPay}.000`;
            pSpeed = "\nNORMAL SPEED"
        }
        addValue()
    };


let today = new Date();
let deadline = document.querySelector(".deadline input")

let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();


deadline.min = `${yyyy}-${mm}-${dd}`;

document.querySelector("input[name='deadline']").onchange = function () {
    if (this.value == `${yyyy}-${mm}-${dd}`) {
        document.querySelector("select[name='choose-fod-speed']").value = "fast"
        document.querySelector("select[name='choose-fod-speed'] option[value='normal']").disabled = true
        document.querySelector(".fod-speed-des").innerText =
            "Làm xong ngay trong ngày";
        document.querySelector(
            ".fod-price"
        ).innerText = `₫ ${totalFast}.000`;
        document.querySelector(".pay-total").innerText = `₫ ${totalPay + totalFast
            }.000`;
        pSpeed = "\nFAST SPEED"
    } else {
        document.querySelector("select[name='choose-fod-speed'] option[value='normal']").disabled = false
    }
    pDeadline = `\nDeadline: ${formatDate(this.value)}`
    addValue();
}

let form = document.querySelector("#contact_form");
form.onsubmit = (e) => {
    e.preventDefault();
    document.querySelector(".loading").style.display = "flex";
    let data = new FormData(form);
    fetch(
        "https://script.google.com/macros/s/AKfycbwIUl7OtZxqfhseHn-cNwdnrxcd1dpg6oRBY9NtrpXEifSM8ebWM21uRv8cdTZ2MROb/exec",
        {
            method: "POST",
            body: data,
        }
    )
        // The fetch() method is used to make a request to the server and retrieve data.
        // This is an example API endpoint. Replace it with the actual URL for the API endpoint you want to use.
        .then(() => {
            clearData();
            showSuccessToast();
        })
        .catch(() => {
            clearData();
            showErrorToast();
        });
};

function clearData() {
    document.querySelector(".loading").style.display = "none";
    document.querySelectorAll("input").forEach(e => e.value = "")
    document.querySelectorAll("textarea").forEach(e => e.value = "")
    document.querySelector("select[name='choose-unit']").value = ""
    document.querySelector("select[name='choose-test']").value = ""
    document.querySelector("select[name='choose-fod-speed']").value = "normal"
    document.querySelector(".fod-price").innerText = "Free"
    document.querySelector(".fod-speed-des").innerText = "Làm xong trong ngày 2 - 7 ngày"
    document.querySelector(".pay-total").innerText = "₫ 0"
    document.querySelectorAll(".amount-view").forEach(e => e.innerText = "0")
    document.querySelector(".check-writing input").checked = false
    deadline.value = '';
    totalPay = 0;
    totalFast = 0;
}

function formatDate(inputDate) {
    // Tách ngày, tháng và năm từ chuỗi đầu vào
    const parts = inputDate.split("-");
    
    // Kiểm tra xem định dạng đầu vào có đúng không
    if (parts.length !== 3) {
      return "Ngày không hợp lệ";
    }
    
    // Sắp xếp lại thành "dd/mm/yyyy" và trả về
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  }
