function showPopUp(el) {
    document.getElementById("button_reset").disabled = true;
    var cvr = document.getElementById("cover")
    var dlg = document.getElementById(el)
    cvr.style.display = "block"
    dlg.style.display = "block"
    if (document.body.style.overflow = "hidden") {
	    cvr.style.width = "1024"
	    cvr.style.height = "100&#37;"
	}
}

function closePopUp(el) {
    document.getElementById("button_reset").disabled = false;
    var cvr = document.getElementById("cover")
    var dlg = document.getElementById(el)
    cvr.style.display = "none"
    dlg.style.display = "none"
    document.body.style.overflowY = "scroll"
}