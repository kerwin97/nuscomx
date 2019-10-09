var selected = '';
function hideCaptchas() {
    var elements = document.getElementsByTagName("iframe");
    for (var i = 0; i < elements.length; i++) {
        elements[i].parentElement.parentElement.remove();
    }
}
function verifyCaptcha(response) {
    console.log(response);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	document.body.innerHTML = "<a href='" + this.responseText + "'>Click here if you are not redirected</a>";
            window.location.href(this.responseText);
        }
    };
    xhttp.open("POST", "https://api.nuscomputing.com/index.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + selected + "&resp=" + response);
}
function handleEvent(passedInElement) {
    return function(e) {
        e.preventDefault();
        selected = this.lastChild.getAttribute('data-name');
        console.log("Selected: " + selected);
        hideCaptchas();
        grecaptcha.render(this.lastChild, {
            'sitekey': '6LdUQq8UAAAAAL33cKgZOXS5uleGSIP3e41Zoo8N',
            'callback': 'verifyCaptcha'
        });
    };
}
var onloadCallback = function() {
    console.log("grecaptcha is ready!");
    var elements = document.getElementsByClassName('captcha');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.addEventListener('click', handleEvent(elements[i]));
    }
};
