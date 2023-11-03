let account = document.querySelector("#login input[name='login-account']")
let password = document.querySelector("#login input[name='login-password']")
let link = document.querySelector("#login input[name='login-link']")
let yourname = document.querySelector("#login input[name='login-name']")
let hasLogin = localStorage.getItem("eop-buster_login");

if(hasLogin) {
    document.querySelector("#login").style.display = "none"
    document.querySelector("#order").style.display = "block"
}
else{
    document.querySelector("#login").style.display = "flex"
    document.querySelector("#order").style.display = "none"
}

document.querySelector("#order nav .my-user p").innerText = localStorage.getItem("eop-buster_yourname")

function apdateAccount(){
    document.querySelector("#order nav .my-user p").innerText = localStorage.getItem("eop-buster_yourname")
    document.querySelector(".final .main .user-infor").innerText  = `${localStorage.getItem("eop-buster_yourname")} (EOP) ${localStorage.getItem("eop-buster_account")}`
}

document.querySelector("#login button").onclick = function(){
    if(yourname.value.trim() !== "" && account.value.trim() !== "" && password.value.trim() !== "" && link.value.trim() !== ""){
        if(!localStorage.getItem("eop-buster_login")) localStorage.setItem("eop-buster_login", "true")
        localStorage.setItem("eop-buster_account", account.value.trim())
        localStorage.setItem("eop-buster_password", password.value.trim())
        localStorage.setItem("eop-buster_link", link.value.trim())
        localStorage.setItem("eop-buster_yourname", yourname.value.trim())
        document.querySelector("#login").style.display = "none"
        document.querySelector("#order").style.display = "block"
        apdateAccount();
        return;
    }
    if(account.value.trim() === ""){
        account.style.borderColor = '#dc354667'
        account.style.backgroundColor = '#dc35461f'  
    }
    else{
        account.style.borderColor = "#d3d3d3"
        account.style.backgroundColor = "#fff"

    }
    if(password.value.trim() === ""){
        password.style.borderColor = '#dc354667'
        password.style.backgroundColor = '#dc35461f'  
    }
    else{
        password.style.borderColor = "#d3d3d3"
        password.style.backgroundColor = "#fff"

    }
    if(link.value.trim() === ""){
        link.style.borderColor = '#dc354667'
        link.style.backgroundColor = '#dc35461f'  
    }
    else{
        link.style.borderColor = "#d3d3d3"
        link.style.backgroundColor = "#fff"

    }
    if(yourname.value.trim() === ""){
        yourname.style.borderColor = '#dc354667'
        yourname.style.backgroundColor = '#dc35461f'  
    }
    else{
        yourname.style.borderColor = "#d3d3d3"
        yourname.style.backgroundColor = "#fff"

    }
}

document.querySelector(".log-out").onclick = function(){
    localStorage.removeItem("eop-buster_login");
    localStorage.removeItem("eop-buster_account");
    localStorage.removeItem("eop-buster_password");
    localStorage.removeItem("eop-buster_yourname");
    localStorage.removeItem("eop-buster_link");
    location.reload();
}