let fileinput = document.getElementById("fileflic");
let innerimg = document.querySelector(".inner-upload-image");
let image = null;
let url = null;
let inputimg = document.querySelector(".imputimg")
let icon = document.getElementById("icon")
let span = document.querySelector("span");
let genimg = document.querySelector("#generatedimg")
let uploadbtn = document.querySelector("#upload");
let orgimg = document.querySelector(".resultimg1 img")
let generatedimg = document.querySelector(".resultimg2 img");
let style2 = document.querySelector(".style2")
let resultpage = document.querySelector(".result");
let downloadimg = document.querySelector(".btn1")
let reset = document.querySelector(".btn2");

function handelupload(){
    const ApiKey = "aX86KTKpwDNBqsum81wc6tVx";
    
    if (!image) {
        alert("দয়া করে প্রথমে একটি ছবি সিলেক্ট করুন!");
        return;
    }

    const fromdata = new FormData();
    fromdata.append("image_file", image);
    fromdata.append("size", "auto");

    console.log("Uploading image for background removal...");

    fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": ApiKey },
        body: fromdata
    })
    .then(function(response){
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.errors[0].title || "Background removal failed");
            });
        }
        return response.blob();
    })
    .then(function(blob){
        style2.style.display = "none";
        resultpage.style.display = "flex";
        url = URL.createObjectURL(blob);
        generatedimg.src = url;
        console.log("Background removed successfully!");
    })
    .catch(function(error) {
        console.error("Error:", error);
        alert("সমস্যা হয়েছে: " + error.message);
    });
}

innerimg.addEventListener("click" , ()=>{
    fileinput.click();
});
fileinput.addEventListener("change" ,()=>{
     image = fileinput.files[0];
    if(!image)return;
    let reader = new FileReader();
    reader.onload=(e)=>{
        console.log(e)
        inputimg.src = e.target.result;
        inputimg.style.display = "block";
        icon.style.display = "none";
        span.style.display = "none"
        orgimg.src = e.target.result;
    }
    reader.readAsDataURL(image)
})
uploadbtn.addEventListener("click" , ()=>{
    handelupload()
})

function downolad(){
    fatch(url)
    .then(res=> res.blob())
    .then(file=>{
        let a = document.childElement("a")
        a.herf = url.createObjectURL(file)
        a.downolad = new Date().getTime();
        a.click();

    })
    .catch(alart("falled download"))
    
}

downloadimg.addEventListener("click" , ()=>{
    downolad();
} )

reset.addEventListener("click", ()=>{
    window.location.reload();
})
