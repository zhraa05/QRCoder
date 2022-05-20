const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
btn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");
const wraper = document.querySelector(".wraper"),
form = document.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = document.querySelector(".close"),
copyBtn = document.querySelector(".copy");
let preValue;
btn.addEventListener("click", () => {

    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    btn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("activ");
        btn.innerText = "Generate QR Code";
    });
});
qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("activ");
        preValue = "";
    }
});

function fatchreques(fromdata, file){
           infoText.innerText = "Scanning QR Code...";
 fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST' , body: fromdata
    }).then(res => res.json() ).then(reslt =>{
        reslt=reslt[0].symbol[0].data
                infoText.innerText = reslt ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
                if(!reslt) return
 document.querySelector('textarea').innerHTML =reslt     
        form.querySelector("img").src=URL.createObjectURL(file)
        //   form.querySelector("img").src = URL.createObjectURL(file);
       
        wraper.classList.add('activ')
    })
}

fileInp.addEventListener('change',  e => {
let file = e.target.files[0]
if(!file) return
let fromdata = new FormData()
fromdata.append('file', file) 
fatchreques(fromdata, file)
})
copyBtn.addEventListener("click", () =>{
    let text =wraper.querySelector('textarea').textContent
    navigator.clipboard.writeText(text)
})


form.addEventListener("click", () => fileInp.click())
closeBtn.addEventListener("click", () => wraper.classList.remove('activ') )


